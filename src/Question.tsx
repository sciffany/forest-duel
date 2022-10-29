import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function Question() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const [state, setState] = React.useState({ title: "", description: "" });

  async function submit() {
    const docRef = await addDoc(collection(db, "codes"), {
      name: "Tokyo",
      country: "Japan",
    });
  }
  return (
    <>
      <input placeholder="Quiz Title"></input>
      <input placeholder="Quiz Description"></input>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
        }}
      />
      <button className="button" onClick={submit}>
        Submit
      </button>
    </>
  );
}
