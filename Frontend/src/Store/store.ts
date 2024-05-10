import { makeAutoObservable } from "mobx";
import { IUser } from "../Models/User";

export default class Store {
    user = {} as IUser;
    constructor() {
        makeAutoObservable(this);
    }
}