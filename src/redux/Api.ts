export async function getUserDataAPI (userId: number) {
    const resp = await fetch('https://reqres.in/api/users/2');
    return await resp.json();
}