import { makeAutoObservable } from "mobx";
import { IUser } from "../Models/User";

export default class Store {
    user = {} as IUser;
    currentStruct: { [key: string]: any } = {}
    sigFiles: { [key: string]: File } = {}

    constructor() {
        makeAutoObservable(this);
    }

    setupSigFiles(name: string, file: File): boolean {
        if (this.sigFiles.hasOwnProperty(name)) return false
        this.sigFiles.name = file;
        return true;
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