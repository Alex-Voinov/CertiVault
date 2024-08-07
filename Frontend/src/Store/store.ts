import { makeAutoObservable, runInAction } from "mobx";
import { IUser } from "../Models/User";
import UserService from "../Servies/UserServise";
import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from "react";


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
    sigFiles: { [key: string]: File } = {};
    commentFiles: { [key: string]: File } = {};
    sigFileNames: string[] = [];
    commentFileNames: string[] = [];
    currentPosition: [string, JSX.Element][] = []
    navigateFunc: Dispatch<SetStateAction<JSX.Element>> | null = null;
    initialDCCElement: JSX.Element | null = null;

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

    setupNewPositionMap = (
        navigateFunc: Dispatch<SetStateAction<JSX.Element>>,
        initialElement: JSX.Element
    ) => {
        this.navigateFunc = navigateFunc;
        this.initialDCCElement = initialElement;
        this.currentPosition = [];
    }

    navigateToStartPoint = () => {
        if (!this.navigateFunc || !this.initialDCCElement) return;
        this.currentPosition = [];
        this.navigateFunc(this.initialDCCElement);
    }

    activeNavigatePoint = (stepName: string) => {
        if (this.navigateFunc && this.getPositionMap().includes(stepName)) {
            while (this.currentPosition.length > 0 && this.currentPosition.at(-1)![0] !== stepName) {
                this.currentPosition.pop();
            }
            this.navigateFunc(this.currentPosition.at(-1)![1])
        }
    }

    getPositionMap = () => this.currentPosition.map(recordPoint => recordPoint[0])

    addNavigatePoint = (stepName: string, stepElement: JSX.Element) => {
        const currentNavigateName = this.getPositionMap();
        let uniqeName = stepName;
        if (currentNavigateName.includes(stepName)) {
            let i = 2;
            while (currentNavigateName.includes(`${stepName}${i}`)) {
                i++;
            }
            uniqeName = `${stepName}${i}`;
        }
        this.currentPosition.push([uniqeName, stepElement]);
    }

    backStep = () => {
        this.currentPosition.pop();
        const newCurrentPoint = this.currentPosition.at(-1);
        if (this.navigateFunc)
            if (newCurrentPoint && newCurrentPoint[1]) this.navigateFunc(newCurrentPoint[1])
            else if (this.initialDCCElement) {
                this.navigateFunc(this.initialDCCElement);
            }
    }

    navigateNewPoint = (
        stepName: string,
        stepElement: JSX.Element
    ) => {
        if (!this.addNavigatePoint || !this.navigateFunc) return;
        this.addNavigatePoint(
            stepName,
            stepElement
        )
        this.navigateFunc(stepElement);
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

    logout() {
        Cookies.remove('refreshToken');
        this.user.login = ''
        this.user = {} as IUser;
        this.isAuth = false;
        this.accessToken = '';
        this.refreshToken = '';
        return UserService.logout().then(
            () => { localStorage.removeItem('accessToken'); }
        )
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
        try { // пытаемся отправить его на сервер
            const renamedFile = new File([file], `${name}.sig`, {
                type: file.type,
                lastModified: file.lastModified
            });
            const formData = new FormData();
            formData.append('file', renamedFile);
            return UserService.uploadSigFiels(formData).then(
                response => {
                    this.sigFiles.name = response.data.fileName; // создаем этот файл в сторе у пользователя
                    return true;
                }
            )
        } catch (error) {
            console.error('Error uploading file:', error);
            return false;
        }
    }

    async uploadCommentFiles(name: string, file: File): Promise<boolean> { // загрузить новый файл
        if (this.commentFiles.hasOwnProperty(name)) { //файл с таким именем уже загружен
            return false
        }
        try { // пытаемся отправить его на сервер
            const renamedFile = new File([file], name, {
                type: file.type,
                lastModified: file.lastModified
            });
            const formData = new FormData();
            formData.append('file', renamedFile);
            return UserService.uploadCommentFiels(formData).then(
                response => {
                    this.commentFiles.name = response.data.fileName; // создаем этот файл в сторе у пользователя
                    this.setNotification(
                        'Успешно',
                        `Оставшейся дневной лимит: ${(Number(response.data.daylyLimit) / 1024 / 1024).toFixed(2)}Mб`
                    )
                    return true
                }
            ).catch(
                er => {
                    this.makeErNtf('Неудачно', er);
                    return false;
                }
            )
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        return true;
    }

    async getAllNameSigFiels() {
        if (this.sigFileNames.length === 0) {
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

    async getAllNameCommentFiels() {
        if (this.commentFileNames.length === 0) {
            return UserService.getAllNameComment().then(
                response => (response ? response.data : []) as string[]
            ).catch(
                er => {
                    this.makeErNtf('Ошибка commentNames', er)
                    return [] as string[]
                }
            )
        }
        return this.commentFileNames
    }
}