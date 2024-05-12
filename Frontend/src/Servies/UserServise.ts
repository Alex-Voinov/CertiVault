import $api from "../HTTP/index";
import { AxiosResponse } from 'axios';
import ISigFiels from "../Models/SifFiels";



export default class UserService {
    static fetchSigFiels(): Promise<AxiosResponse<ISigFiels>> {
        return $api.get<ISigFiels>('/fetch_sig_fiels')
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