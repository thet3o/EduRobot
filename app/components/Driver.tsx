'use client';

import { Direction, EduRobot } from "@/lib/communication/edurobot";

export default function Driver({robot} : {robot: any}){

    return (
        <div className="w-full h-full flex items-center justify-center">
            <button onClick={() => robot.move(Direction.FORWARD, 0)} className="bg-slate-200 rounded-lg m-2 p-2">Avanti</button>
            <button onClick={() => robot.move(Direction.BACKWARD, 0)} className="bg-slate-200 rounded-lg m-2 p-2">Indietro</button>
            <button onClick={() => robot.move(Direction.RIGHT, 0)} className="bg-slate-200 rounded-lg m-2 p-2">Destra</button>
            <button onClick={() => robot.move(Direction.LEFT, 0)} className="bg-slate-200 rounded-lg m-2 p-2">Sinistra</button>
            <button onClick={() => robot.move(Direction.STOP, 0)} className="bg-red-600 text-white border border-double border-yellow-400 rounded-lg m-2 p-2 font-extrabold">STOP</button>
        </div>
    );
}