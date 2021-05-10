import RestService from "./RestService";


export async function loginUserAPI (emailPassword: {email: string, password: string}) {
    const resp = await RestService('POST', '/login', emailPassword);
    if (resp.status === 'OK') {
        sessionStorage.setItem('authToken', resp.data.authToken);
    } else {
        throw resp.error;
    }
}

export async function registerUserAPI (emailFullnamePassword: {email: string, fullName: string, password: string}) {
    const resp = await RestService('POST', '/register', emailFullnamePassword);
    if (resp.status !== 'OK') {
        throw resp.error;
    }
}

export async function getUserDataAPI () {
    const resp = await RestService('GET', '/projects');
    if (resp.status === 'OK') {
        return resp.data;
    } else {
        throw resp.error;
    }
}

export type ProjectData = {
    name: string,
    shortName: string,
    emails: string[]
}
export async function createProjectAPI (projectData: ProjectData) {
    const resp = await RestService('POST', '/projects', projectData);
    if (resp.status === 'OK') {
        return resp.data;
    } else {
        throw resp.error;
    }
}

export async function getBoardAPI (projectId: string) {
    const resp = await RestService('GET', `/board?projectId=${projectId}`);
    if (resp.status === 'OK') {
        return resp.data;
    } else {
        throw resp.error;
    }
}

export async function createCardAPI (cardDataProjectId: any) {
    const resp = await RestService('POST', '/board', cardDataProjectId);
    if (resp.status !== 'OK') {
        throw resp.error;
    }
}