import clsx from "clsx";
import { useState } from "react";

type Answer = boolean | undefined;

export const QUESTIONS = [
  "Er du stærkt optaget af spil eller måder at skaffe penge til spil?",
  "Har du oplevet et behov for at spille om større pengebeløb, for at opnå den samme spænding?",
  "Har du haft gentagne og fejlslagne forsøg på at stoppe eller kontrollere dit spil?",
  "Bliver du rastløs eller irritabel, når du forsøger at stoppe eller kontrollere dit spil?",
  "Spiller du for at undgå negative følelser eller problemer?",
  "Vender du ofte tilbage en anden dag for at genvinde tab?",
  "Har du løjet overfor familie og venner om omfanget af dit spil?",
  "Har du mistet eller bragt familierelationer, job eller uddannelse i fare på grund af dit spil?",
  "Er du afhængig af andre for at finansiere dit spil eller betale spillegæld?",
];

const useQuiz = () => {
  const [answers, setAnswers] = useState<boolean[]>(
    new Array(QUESTIONS.length).fill(undefined),
  );
  const [index, setIndex] = useState(0);

  function progress() {
    setIndex((oldIndex) => {
      const newIndex = oldIndex + 1;
      return newIndex;
    });
  }

  const count = answers.reduce(
    (sum, answer) => sum + (answer === true ? 1 : 0),
    0,
  );

  const showResult =
    answers.reduce((sum, answer) => sum + (answer !== undefined ? 1 : 0), 0) >=
    QUESTIONS.length;

  return {
    answers,
    index,
    count,
    question: `${index + 1}: ${QUESTIONS[index]}`,
    answerYes: () => {
      setAnswers((oldVal) => {
        const newVal = [...oldVal];
        newVal[index] = true;
        return newVal;
      });
      progress();
    },
    answerNo: () => {
      setAnswers((oldVal) => {
        const newVal = [...oldVal];
        newVal[index] = false;
        return newVal;
      });
      progress();
    },
    reverse: () => {
      setIndex((oldIndex) => Math.max(0, oldIndex - 1));
    },
    reset: () => {
      setAnswers(new Array(QUESTIONS.length).fill(undefined));
      setIndex(0);
    },
    showResult,
  };
};

function Answers({ answers, index }: { answers: Answer[]; index: number }) {
  return (
    <ul className="bg-white rounded-full py-1 px-2 gap-x-2 inline-flex">
      {answers.map((result, idx) => {
        const current = idx === index;
        return (
          <li
            key={idx}
            className={clsx([
              "w-2.5 h-2.5 rounded-full border",
              !current && result === true && "bg-accent border-accent",
              !current && result === false && "bg-primary border-primary",
              !current &&
                result === undefined &&
                "bg-transparent border-primary/20",
              current && "bg-transparent border-primary",
            ])}
          />
        );
      })}
    </ul>
  );
}

function Result({ count }: { count: number }) {
  switch (count) {
    case 0:
      return (
        <p>
          Testen peger på, at du ikke har et problem med spil. Er du nysgerrig
          på mere viden om ansvarligt spil, er du velkommen til at tage kontakt
          til StopSpillet på{" "}
          <a
            className="font-bold underline hover:no-underline"
            href="tel:70222825"
          >
            70 22 28 25
          </a>
          .
        </p>
      );
    case 1:
      return (
        <p>
          Testen peger på, at du kan være i risiko for at udvikle et problem med
          spil. Du bør derfor være opmærksom på, om dine spillevaner ændrer sig.
          Er du i tvivl og har brug for vejledning, er du velkommen til at tage
          kontakt til StopSpillet på{" "}
          <a
            className="font-bold underline hover:no-underline"
            href="tel:70222825"
          >
            70 22 28 25
          </a>
          .
        </p>
      );
    case 2:
    case 3:
      return (
        <p>
          Testen peger på, at du kan have et problem med spil. Dine spilvaner
          kan udvikle sig til en egentlig afhængighed. Derfor opfordres du til
          at tage kontakt til StopSpillet på{" "}
          <a
            className="font-bold underline hover:no-underline"
            href="tel:70222825"
          >
            70 22 28 25
          </a>
          , hvor vi kan hjælpe dig med afklaring og sammen finde ud af
          eventuelle videre tiltag.
        </p>
      );
    default:
      return (
        <>
          <p>
            Testen peger på, at du kan have en spilafhængighed. Du opfordres til
            at tage kontakt til StopSpillet på 70 22 28 25, hvor vi kan hjælpe
            dig med afklaring og sammen finde ud af eventuelle videre tiltag.
          </p>
          <p className="my-4">
            <a
              className="font-bold underline hover:no-underline"
              href="tel:70222825"
            >
              Kontakt os nu på 70 22 28 25
            </a>
          </p>
        </>
      );
  }
}

export function Quiz() {
  const {
    answers,
    count,
    question,
    index,
    answerYes,
    answerNo,
    showResult,
    reverse,
    reset,
  } = useQuiz();

  return (
    <div className="border border-white rounded-xl py-4 px-10">
      <Answers answers={answers} index={index} />

      {showResult && (
        <>
          <h2 className="text-2xl uppercase font-bold leading-none my-4">
            Resultat
          </h2>
          <Result count={count} />
          <button
            onClick={() => reset()}
            className="mt-4 bg-accent text-primary uppercase font-bold py-1.5 px-2 rounded hover:brightness-110 transition-all"
          >
            Prøv igen
          </button>
        </>
      )}

      {!showResult && (
        <>
          <p className="mt-4 h-20">{question}</p>

          <div className="flex items-center justify-between max-w-xs mx-auto">
            <button
              onClick={() => reverse()}
              className="bg-boulder text-white uppercase font-bold py-1.5  px-2 rounded hover:brightness-110 transition-all disabled:opacity-0"
              disabled={index <= 0}
            >
              Tilbage
            </button>
            <div className="flex gap-1">
              <button
                onClick={() => answerNo()}
                className="bg-light text-primary uppercase font-bold py-1.5 w-14 rounded hover:brightness-110 transition-all"
              >
                Nej
              </button>
              <button
                onClick={() => answerYes()}
                className="bg-accent text-primary uppercase font-bold py-1.5 w-14 rounded hover:brightness-110 transition-all"
              >
                Ja
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
