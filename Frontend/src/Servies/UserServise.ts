import $api from "../HTTP/index";
import { AxiosResponse } from 'axios';
import ISigFiels from "../Models/SifFiels";
import IAuthResponse from "../Models/AuthResponse";


export default class UserService {
    static fetchSigFiels(): Promise<AxiosResponse<ISigFiels>> {
        return $api.get<ISigFiels>('/fetch_sig_fiels')
    }

    static createUser(data: string[]) {
        return $api.post('/create_user', {
            name: data[1],
            surName: data[0],
            email: data[2],
            login: data[3],
            password: data[4],
        })
    }

    static editEmail(login: string, password: string, email: string) {
        return $api.post('/edit_email', {
            login,
            password,
            email,
        })
    }

    static getUniqeData(): Promise<AxiosResponse<[string[], string[]]>> {
        return $api.get<[string[], string[]]>('/get_uniqe_data')
    }

    static checkConfirmEmail(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.get<IAuthResponse>('/check_confirm_email',
            {
                params:{
                    login,
                    password
                }
            }
        )
    }

    static sendSigFiels(formData: FormData) {
        return $api.post(
            '/get_sig_fiels',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }


}