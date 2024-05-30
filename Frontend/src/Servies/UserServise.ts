import $api from "../HTTP/index";
import { AxiosResponse } from 'axios';
import ISigFiels from "../Models/SifFiels";
import IAuthResponse from "../Models/AuthResponse";
import IRegResponse from "../Models/RegResponse";
import { IUser } from "../Models/User";



export default class UserService {
    static fetchSigFiels(): Promise<AxiosResponse<ISigFiels>> {
        return $api.get<ISigFiels>('/fetch_sig_fiels')
    }

    static getAllNameSigFiels(): Promise<AxiosResponse<string[]>>{
        return $api.get<string[]>('/get_all_names_sig')
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

    static editEmail(login: string, email: string, hashPas: string) {
        return $api.post('/edit_email', {
            login,
            email,
            hashPas
        })
    }

    static login(logOrEmail: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.get<IAuthResponse>('/login', {
            params: {
                logOrEmail,
                password
            }
        })
    }

    static getUniqeData(): Promise<AxiosResponse<[string[], string[]]>> {
        return $api.get<[string[], string[]]>('/get_uniqe_data')
    }

    static verify(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/verify')
    }

    static checkConfirmEmail(login: string, password: string): Promise<AxiosResponse<IRegResponse>> {
        return $api.get<IRegResponse>('/check_confirm_email',
            {
                params: {
                    login,
                    password
                }
            }
        )
    }

    static uploadSigFiels(formData: FormData) {
        return $api.post(
            '/upload_sig_fiels',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }

    static logout() {
        return $api.post('/logout')
    }
}