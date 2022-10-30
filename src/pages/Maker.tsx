import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../features/firebase";

export default function Question() {
  const [state, setState] = React.useState({
    title: "",
    description: "",
    quizId: "",
    quizPassword: "",
    code: `function preparation() {

};
function generateQuestion(){
  const factor1 = Math.floor(Math.random() * 10 + 1);
  const factor2 = Math.floor(Math.random() * 10 + 1);
  const question = factor1 + " x " + factor2;
  const answer = factor1 * factor2;
  return [question, answer];
}`,
  });
  const [sampleQuestions, setSampleQuestions] = React.useState<
    [string, string][]
  >([]);

  function onChange(fieldName: string, value: string) {
    if (fieldName === "quizId" || fieldName === "quizPassword") {
      value = value.replace(/\s/g, "");
    }
    setState((state) => ({ ...state, [fieldName]: value }));
  }

  function test() {
    setSampleQuestions([]);
    var blob = new Blob([
      `onmessage = async function(e) {
        ${state.code}
        
        for(var i = 0; i < 10; i++){
          postMessage(JSON.stringify(generateQuestion()));
        };
      }`,
    ]);

    var blobURL = window.URL.createObjectURL(blob);

    var worker = new Worker(blobURL);
    worker.onmessage = function (e) {
      setSampleQuestions((sampleQuestions) => [
        ...sampleQuestions,
        JSON.parse(e.data),
      ]);
    };
    worker.postMessage("start");
  }

  async function submit() {
    if (state.quizId === "") {
      return;
    }
    await setDoc(doc(db, "codes", state.quizId), state);
  }
  return (
    <>
      <div>
        <input
          onChange={(e) => onChange("quizId", e.target.value)}
          value={state.quizId}
          placeholder="Quiz Id"
        ></input>
        <input
          onChange={(e) => onChange("quizPassword", e.target.value)}
          value={state.quizPassword}
          placeholder="Quiz Password"
        ></input>
      </div>
      <div>
        <input
          onChange={(e) => onChange("title", e.target.value)}
          value={state.title}
          placeholder="Quiz Title"
        ></input>
      </div>
      <div>
        <textarea
          onChange={(e) => onChange("description", e.target.value)}
          value={state.description}
          placeholder="Quiz Description"
        ></textarea>
      </div>
      <Editor
        value={state.code}
        onValueChange={(code) => onChange("code", code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
        }}
      />
      <button className="button" onClick={test}>
        Test
      </button>
      <button className="button" onClick={submit}>
        Submit
      </button>
      {sampleQuestions.map((sampleQuestion: [string, string]) => {
        return (
          <div key={Math.random()}>
            {sampleQuestion[0] + " --> " + sampleQuestion[1]}
          </div>
        );
      })}
    </>
  );
}
