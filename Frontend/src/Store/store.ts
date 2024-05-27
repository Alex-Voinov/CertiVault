import { makeAutoObservable, runInAction } from "mobx";
import { IUser } from "../Models/User";
import UserService from "../Servies/UserServise";
import Cookies from 'js-cookie';

export enum LoginStauts {
    unsuccessfully,
    correct,
    confirmEmail
}

export default class Store {
    user = {} as IUser;
    notificationTitle: string = '';
    notificationDesc: string = '';
    isAuth: boolean = false;
    accessToken: string = localStorage.getItem('accessToken') || '';
    refreshToken: string = Cookies.get('refreshToken') || '';
    currentStruct: { [key: string]: any } = {}
    sigFiles: { [key: string]: File } = {}
    sigFileNames: string[] = []

    constructor() {
        makeAutoObservable(this);
    }

    setNotification(titleNtf: string, descNtf: string) {
        this.notificationTitle = titleNtf;
        this.notificationDesc = descNtf;
    }

    verificate() {
        this.isAuth = true;
    }

    makeErNtf(title: string, er: any) {
        runInAction(() => {
            if (er.response) {
                const errorMessage = er.response.data.message || "Неизвестная ошибка";
                this.setNotification(title, errorMessage);
            } else if (er.request) {
                this.setNotification('Сервер не отвечает', 'Попробуйте cделать запрос позже');
            } else {
                this.setNotification('Неизвестная ошибка', '...');
                console.log(er);
            }
        })
    }

    async verify() {
        try {
            const response = await UserService.verify();
            runInAction(() => {
                if (response.data) {
                    this.user = response?.data;
                    this.verificate()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async login(logOrEmail: string, pass: string): Promise<number> {
        return UserService.login(logOrEmail, pass).then(
            response => {
                const { accessToken, refreshToken, user } = response.data;

                if (user && !(accessToken || refreshToken)) {
                    runInAction(() => {
                        this.user = user;
                    });
                    return LoginStauts.confirmEmail;
                }
                if (user && accessToken && refreshToken) {
                    runInAction(() => {
                        this.user = user;
                        this.verificate();
                        this.accessToken = accessToken;
                        this.refreshToken = refreshToken;
                    });
                    localStorage.setItem('accessToken', accessToken);
                    return LoginStauts.correct;
                }
                return LoginStauts.unsuccessfully;
            }
        ).catch(error => {
            this.makeErNtf('Ошибка авторизации', error)
            return LoginStauts.unsuccessfully;
        }
        )
    }

    async registration(data: string[]): Promise<boolean> {
        return UserService.createUser(data).then(
            () => true
        ).catch(error => {
            this.makeErNtf('Ошибка регистрации', error)
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

    async getAllNameSigFiels() {
        if (!this.sigFileNames.length) {
            return UserService.getAllNameSigFiels().then(
                response => (response ? response.data : []) as string[]
            ).catch(
                er => {
                    this.makeErNtf('Ошибка sigNames', er)
                    return [] as string[]
                }
            )
        }
        return this.sigFileNames
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