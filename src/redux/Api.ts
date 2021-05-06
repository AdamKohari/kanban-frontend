import RestService from "./RestService";

export async function getUserDataAPI (userId: number) {
}

export async function loginUserAPI (emailPassword: {email: string, password: string}) {
    const resp = await RestService('POST', '/login', emailPassword);
    if (resp.status === 'OK') {
        localStorage.setItem('authToken', resp.authToken);
    } else {
        throw resp.error;
    }
}