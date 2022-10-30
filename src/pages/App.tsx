import React from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { ForestDuelSingleton } from "../game/Game";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../features/firebase";

export default function App(props: any) {
  const { quizId } = useParams();

  const [qnas, setQnas] = React.useState<[string, string][]>();
  const [questionNumber, setQuestionNumber] = React.useState<number>(0);
  const [userAnswer, setUserAnswer] = React.useState<string>("");

  React.useEffect(() => {
    ForestDuelSingleton.getInstance();
    async function loadQuiz() {
      if (!quizId) return;
      const docRef = doc(db, "codes", quizId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("No such document!");
        return;
      } else {
        const loadedQns = await loadQuizCode(docSnap.data().code);
        setQnas(loadedQns);
      }
    }
    loadQuiz();
  }, [quizId]);

  React.useEffect(() => {
    ForestDuelSingleton.getInstance().setQuestion(
      qnas?.[questionNumber][0] ?? ""
    );
  }, [qnas, questionNumber]);

  function onAnswerChange(e: any) {
    setUserAnswer(e.target.value);
    if (e.target.value === qnas?.[questionNumber][1]) {
      setQuestionNumber((questionNumber) => questionNumber + 1);
      setUserAnswer("");
      ForestDuelSingleton.getInstance().attack();
    }
  }

  const loadQuizCode = (code: string): Promise<[string, string][]> => {
    return new Promise((resolve) => {
      var blob = new Blob([
        `onmessage = async function(e) {
        ${code}
        await preparation();
        postMessage(
          JSON.stringify(
            await Promise.all(Array(10).fill().map(async (_) => {
              const qna = await generateQuestion();
              return qna;
            })
           )
          )
        );
      }`,
      ]);

      var blobURL = window.URL.createObjectURL(blob);

      var worker = new Worker(blobURL);
      worker.onmessage = function (e) {
        resolve(JSON.parse(e.data) as [string, string][]);
      };
      worker.postMessage("start");
    });
  };

  function submit() {}
  return (
    <>
      <div className="center" id="game-display"></div>
      <div className="hidden">{qnas?.length}</div>
      <div className="center">
        <input
          className="button"
          value={userAnswer}
          onChange={onAnswerChange}
        ></input>
      </div>
      <div className="center">
        <button className="button" onClick={submit}>
          Attack
        </button>
      </div>
      <div className="center">
        <button className="button" onClick={submit}>
          Heal
        </button>
      </div>
    </>
  );
}
