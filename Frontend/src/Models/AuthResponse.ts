import { IUser } from "./User";

interface IAuthResponse{
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export default IAuthResponse