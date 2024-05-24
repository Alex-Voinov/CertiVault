import { makeAutoObservable, runInAction } from "mobx";
import { IUser } from "../Models/User";
import UserService from "../Servies/UserServise";
import Cookies from 'js-cookie';


export default class Store {
    user = {} as IUser;
    notificationTitle: string = '';
    notificationDesc: string = '';
    accessToken: string = localStorage.getItem('accessToken') || '';
    refreshToken: string = Cookies.get('refreshToken') || '';
    currentStruct: { [key: string]: any } = {}
    sigFiles: { [key: string]: File } = {}

    constructor() {
        makeAutoObservable(this);
    }

    setNotification(titleNtf: string, descNtf: string) {
        this.notificationTitle = titleNtf;
        this.notificationDesc = descNtf;
    }


    async verify() {
        try {
            const response = await UserService.verify();
            runInAction(() => {
                if (response.data) {
                    this.user = response?.data;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async login(logOrEmail: string, pass: string): Promise<boolean> {
        return UserService.login(logOrEmail, pass).then(
            response => {
                const { accessToken, refreshToken, user } = response.data;
                if (accessToken && refreshToken && user) {
                    runInAction(() => {
                        this.accessToken = accessToken;
                        this.refreshToken = refreshToken;
                        this.user = user;
                        localStorage.setItem('accessToken', accessToken);
                    });
                    return true;
                }
                return false;
            }
        ).catch(error => {
            runInAction(() => {
                if (error.response) {
                    const errorMessage = error.response.data.message || "Неизвестная ошибка";
                    this.setNotification("Ошибка авторизации", errorMessage);
                } else if (error.request) {
                    this.setNotification("Сервер не отвечает", 'Попробуйте cделать запрос позже');
                } else {
                    this.setNotification("Произошла неизвестная ошибка", '...');
                    console.log(error);
                }
            })
            return false;
        }
        )
    }

    async registration(data: string[]): Promise<boolean> {
        return UserService.createUser(data).then(
            () => true
        ).catch(error => {
            if (error.response) {
                const errorMessage = error.response.data.message || "Неизвестная ошибка";
                this.setNotification("Ошибка регистрации", errorMessage);
            } else if (error.request) {
                this.setNotification("Сервер не отвечает", 'Попробуйте cделать запрос позже');
            } else {
                this.setNotification("Произошла неизвестная ошибка", '...');
                console.log(error);
            }
            return false;
        });
    }

    async uploadSigFiles(name: string, file: File): Promise<boolean> { // загрузить новый файл
        if (this.sigFiles.hasOwnProperty(name)) { //файл с таким именем уже загружен
            return false
        }
        this.sigFiles.name = file; // создаем этот файл в сторе у пользователя
        try { // пытаемся отправить его на сервер
            const renamedFile = new File([file], `${name}.sig`, {
                type: file.type,
                lastModified: file.lastModified
            });
            const formData = new FormData();
            formData.append('file', renamedFile);
            await UserService.uploadSigFiels(formData);
            console.log('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        return true;
    }

    getOldSigFiles() {

    }

    setValueByPath(path: string[], nameKey: string, value: any): void {
        let currentLink = this.currentStruct;
        path.forEach(
            intermediateKey => {
                if (!currentLink.hasOwnProperty(intermediateKey)) {
                    currentLink.intermediateKey = {};
                }
                currentLink = currentLink.intermediateKey
            }
        )
        if (Array.isArray(value) && value.length === 2 && value[0] === 'array') {
            if (!currentLink[nameKey]) currentLink[nameKey] = [];
            currentLink[nameKey].push(value)
        } else {
            currentLink[nameKey] = value;
        }
    }
}

//console.log(JSON.stringify(this.currentStruct));