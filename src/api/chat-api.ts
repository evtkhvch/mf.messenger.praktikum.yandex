import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

class ChatApi {
    private httpClient = new HTTPClient();

    public chats(): Promise<XMLHttpRequest> {
        return this.httpClient.get(`${environment.praktikum}/chats`, {
            data: {},
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public createChat(title: string): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/chats`, {
            data: JSON.stringify({ title }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    public addUsersToChat(data: ChatUserReq): Promise<XMLHttpRequest> {
        return this.httpClient.put(`${environment.praktikum}/chats/users`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    public removeUsersFromChat(data: ChatUserReq): Promise<XMLHttpRequest> {
        return this.httpClient.delete(`${environment.praktikum}/chats/users`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export const chatApi = new ChatApi();

export interface ChatUserReq {
    users: number[];
    chatId: number;
}
