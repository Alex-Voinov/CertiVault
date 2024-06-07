import { makeAutoObservable } from "mobx";
import IInitional from "../Models/DCCStructure/Initial";

export default class DCC {
    initial: IInitional = {} as IInitional;
    constructor() {
        makeAutoObservable(this);
    }

    viewCurrentStruct() {

        const allField: { [key: string]: any } = {
            initial: this.initial,
        }
        for (let fieldName in allField) {
            console.log(
                `${fieldName}: ${JSON.stringify(allField[fieldName])}`
            )
        }

    }
}