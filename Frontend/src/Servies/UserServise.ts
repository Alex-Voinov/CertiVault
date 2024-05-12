import $api from "../HTTP/index";
import { AxiosResponse } from 'axios';
import ISigFiels from "../Models/SifFiels";
import IAuthResponse from "../Models/AuthResponse";



export default class UserService {
    static fetchSigFiels(): Promise<AxiosResponse<ISigFiels>> {
        return $api.get<ISigFiels>('/fetch_sig_fiels')
    }

    static createUser(data: string[]): Promise<AxiosResponse<IAuthResponse>> {
        return $api.get<IAuthResponse>('/create_user', {
            params: {
                surName: data[0],
                name: data[1],
                email: data[2],
                login: data[3],
                password: data[4],
            }
        })
    }

    static getAllLogin(): Promise<AxiosResponse<string[]>> {
        return $api.get<string[]>('/get_all_login')
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