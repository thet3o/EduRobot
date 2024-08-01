'use client';

import { EduRobot, Direction } from "../communication/edurobot";

interface InstructionCommand{
    [instruction: string]: any;
}

export class Runner{

    robot: EduRobot;

    constructor(robot: EduRobot) {
        this.robot = robot;
    }

    async executeSequence(rawSequence: string){
        let sequence = rawSequence.split("\n");
        for (let fullCommand of sequence){
            let splitted = fullCommand.split(/\(| |\)/);
            splitted.pop();
            let command = splitted[0];
            let arg = (splitted.length < 1)? '0' : splitted[1];
            switch (command){
                case "stop": await this.robot.move(Direction.STOP, Number(arg)) ; break ;
                case "avanti": await this.robot.move(Direction.FORWARD, Number(arg)) ; break ;
                case "indietro": await this.robot.move(Direction.BACKWARD, Number(arg)) ; break ;
                case "sinistra": await this.robot.move(Direction.LEFT, Number(arg)) ; break ;
                case "destra": await this.robot.move(Direction.RIGHT, Number(arg)) ; break ;
                case "stop": await this.robot.move(Direction.STOP, Number(arg)) ; break ;
                case "aspetta": await this.robot.delay(Number(arg)) ; break ;
            }
        }
    }
}
