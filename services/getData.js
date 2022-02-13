import fetch from 'node-fetch';

export async function getData(url, headers = {}) {
    const response = await fetch(`${url}`, { method: 'GET', headers: headers });
    const data = await response.json();
    return data;
}