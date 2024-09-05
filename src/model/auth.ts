
export interface ILogin {
    email: string;
    password: string
}

export interface IResetRequest {
    email: string; 
}

export interface IResetPassword {
    email: string;
    resetCode: string;
    password: string;
}