import { makeAutoObservable } from "mobx";
import { IUser } from "../Models/User";
import UserService from "../Servies/UserServise";

export default class Store {
    user = {} as IUser;
    notificationTitle: string = '';
    notificationDesc: string = '';
    currentStruct: { [key: string]: any } = {}
    sigFiles: { [key: string]: File } = {}

    constructor() {
        makeAutoObservable(this);
    }

    setNotification(titleNtf: string, descNtf: string) {
        this.notificationTitle = titleNtf;
        this.notificationDesc = descNtf;
    }

    async registration(data: string[]): Promise<boolean> {
        return UserService.createUser(data).then(response => {
            return true;
        }).catch(error => {
            if (error.response) {
                const errorMessage = error.response.data.message || "Неизвестная ошибка";
                this.setNotification("Ошибка регистрации", errorMessage);
            } else if (error.request) {
                this.setNotification("Сервер не отвечает", 'Попробуйте делать запрос позже');
            } else {
                this.setNotification("Произошла неизвестная ошибка", '...');
                console.log(error);
            }
            return false;
        });
    }

    async downloadSigFiles(name: string, file: File): Promise<boolean> { // загрузить новый файл
        if (this.sigFiles.hasOwnProperty(name)) { //файл с таким именем уже загружен
            return false
        }
        this.sigFiles.name = file; // создаем этот файл в сторе у пользователя
        try { // пытаемся отправить его на сервер
            const formData = new FormData();
            formData.append('file', file);
            await UserService.sendSigFiels(formData);
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