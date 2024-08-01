'use client';

import Editor from "./components/Editor";
import Driver from "./components/Driver";
import { EduRobot } from "@/lib/communication/edurobot";

export default function Home() {
  let robot = new EduRobot("192.168.4.1");
  return (
    <main className="h-screen w-screen flex flex-row items-center justify-center">
      <Driver robot={robot}/>
      <Editor robot={robot}/>
    </main>
  );
}
