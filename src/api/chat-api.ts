import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

export class ChatApi {
    private httpClient = new HTTPClient();

    public chats(): Promise<Chat[]> {
        return this.httpClient.get(`${environment.praktikum}/chats`, {
            data: {},
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.response).then(res => JSON.parse(res))
    }

    public createChat(title: string): Promise<boolean> {
        return this.httpClient.post(`${environment.praktikum}/chats`, {
            data: JSON.stringify({ title }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }

    public addUsersToChat(data: ChatUserReq): Promise<boolean> {
        return this.httpClient.put(`${environment.praktikum}/chats/users`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }

    public removeUsersFromChat(data: ChatUserReq): Promise<boolean> {
        return this.httpClient.delete(`${environment.praktikum}/chats/users`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }
}

export interface Chat {
    id: number;
    title: string;
    avatar: string;
}

export interface ChatUserReq {
    users: number[];
    chatId: number;
}