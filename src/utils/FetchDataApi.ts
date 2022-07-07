type MethodRequest = "GET" | "POST" | "PATCH" | "DELETE";

interface FetchInit {
    method: string;
    headers?: HeadersInit;
    body?: string;
}

interface FetchResp {
    data: any;
    errorMsg: string;
}

export class FetchDataApi {

    private static readonly url = "http://localhost:3001";

    private static async request<T>(url: string, method: MethodRequest = "GET", dataPost: T | null = null): Promise<FetchResp> {
        let errorMsg = "";
        let data = null;
        let init: FetchInit = {
            method: method,
        }

        if (method === "POST" || method === "PATCH") {
            init = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataPost),
            }
        }

        try {
            const res = await fetch(url, init);
            if ([400, 404, 500].includes(res.status)) {
                throw new Error(`Error code: ${res.status}, which means: ${res.statusText}.`);
            }
            if (method !== "DELETE") {
                data = await res?.json();
            }
        } catch ({message}) {
            if (message === "unknown") {errorMsg = "";} else {errorMsg = `${message}`;}
        }
        return {
            data,
            errorMsg,
        } as FetchResp
    }


    static async getData(endpoint: string): Promise<FetchResp> {
        return this.request(`${this.url}${endpoint}`);
    }

    static async postData<T>(endpoint: string, dataPost: T) {
        return this.request(`${this.url}${endpoint}`, "POST", dataPost);
    }

    static async updateData(endpoint: string, dataPost: object) {
        return this.request(`${this.url}${endpoint}`, "PATCH", dataPost);
    }

    static async deleteData(endpoint: string): Promise<any> {
        return this.request(`${this.url}${endpoint}`, "DELETE");
    }
}