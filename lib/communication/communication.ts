'use client';

export enum Method{
    GET,
    POST
}

export interface CommandParams{
    [key: string]: string | number;
}

class Communication{
    baseUri: string;

    constructor(hostname: string){
        this.baseUri = `http://${hostname}`;
    }

    async sendCommand(command: string, method: Method, args: CommandParams){
        let response: Response;

        if (method === Method.POST){
            response = await fetch(`${this.baseUri}/${command}`,
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(args),
                });
        } else {
            let params = "";
            for (let k in args){
                params += `?${k}=${args[k]}`;
            }
            response = await fetch(`${this.baseUri}/${command}${params}`);
        }
        return response;
    }
}


export default Communication;