'use client';

import Communication, { Method } from "./communication";

//export enum Direction {
//    FORWARD     = "fw",
//    BACKWARD    = "bw",
//    LEFT        = "lt",
//    RIGHT       = "rt",
//    STOP        = "st"
//}

// Inverted
export enum Direction {
    FORWARD     = "bw",
    BACKWARD    = "fw",
    LEFT        = "rt",
    RIGHT       = "lt",
    STOP        = "st"
}

export class EduRobot {
    communication: Communication;
    one_degree_in_ms: number = (1060 / 360);
    one_cm_in_ms: number = (2000 / 148);

    constructor(hostname: string) {
        this.communication = new Communication(hostname);
    }

    async delay(ms: number) {
        var now = new Date().getTime();
        while(now + ms >= new Date().getTime()){
        }
    }

    async move(direction: Direction, arg: number){
        let res;
        if (direction == Direction.FORWARD  || 
            direction == Direction.BACKWARD || 
            direction == Direction.LEFT     || 
            direction == Direction.RIGHT){
                res = await this.communication.sendCommand("move", Method.POST, {"direction": direction});
                if(direction == Direction.LEFT || direction == Direction.RIGHT){
                    this.delay(this.one_degree_in_ms*arg);
                }else if(direction == Direction.FORWARD  || direction == Direction.BACKWARD){
                    //148 cm = 1.48 m     1.48 m : 2 s = 1 m : x s
                    this.delay(this.one_cm_in_ms*arg);
                }
                res = await this.communication.sendCommand("move", Method.POST, {"direction": Direction.STOP});
        }
        return (res?.status != undefined)? res?.status : '000';
    }

    async isHealthy(){
        let res = await this.communication.sendCommand("health", Method.GET, {})
        let data = await res.json()
        return (data["health"] == "alive") ? true : false;
    }

    async becomeMaster(code: string){
        let res = await this.communication.sendCommand("become_master", Method.POST, {"code": code})
        return {[res.status]: res.statusText}
    }
}