'use client';

import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { Runner } from "@/lib/runner/runner";

export default function Editor({robot} : {robot: any}) {
    const [sequence, setSequence] = useState<string>("");

    const runner = new Runner(robot);

    function downloadSequence(){
        const blob = new Blob([sequence], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const filename = new Date().toISOString() + "-codesequence.txt" ;
        link.download = filename || "downloaded-file";
        return link.click();
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl">Sequence Editor</h1>
            <div className="flex flex-row m-1">
                <button onClick={async () => await runner.executeSequence(sequence)} type="button" className="bg-green-500 rounded-lg p-2">
                    RUN
                </button>
            </div>
            <CodeMirror height="80vh" onChange={(e) => setSequence(e)}/>
            <button onClick={downloadSequence} type="button">Download Sequence</button>
        </div>
    );
}