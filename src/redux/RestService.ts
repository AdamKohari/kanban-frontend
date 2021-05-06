import {BACKEND} from "../env";

export default async function RestService (method: 'GET' | 'POST', url: string, body?: any) {
    const resp = await fetch(BACKEND.LOCAL + url, {
        method: 'POST',
        body: body ? JSON.stringify(body) : '',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken') || 'NO_LOGIN'
        }
    });
    return await resp.json();
}