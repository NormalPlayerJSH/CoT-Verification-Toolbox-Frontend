import React, { useState } from 'react';

const questionList = [
  '정답이 정확한가요?',
  '풀이과정 Step 1은 합당한가요?',
  '풀이과정 Step 2는 합당한가요?',
  '풀이과정 Step 3은 합당한가요?',
];

function FinishedRate({ question, rate }: { question: string; rate: number }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="text-xl">{question}</div>
      <div className="text-2xl font-bold">{rate} / 5</div>
    </div>
  );
}

function NowRate({
  question,
  handler,
}: {
  question: string;
  handler: (rate: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="text-2xl">{question}</div>
      <div className="flex gap-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <button
              className="w-10 h-10 text-lg font-semibold bg-red-200 hover:bg-red-500 hover:text-white rounded-full"
              onClick={() => handler(i + 1)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

function MakeRate() {
  const [Answer, setAnswer] = useState<(null | number)[]>(
    questionList.map(() => null),
  );
  const [Now, setNow] = useState(0);
  const scoreSelectHandler = (rate: number) => {
    const newAnswer = [...Answer];
    newAnswer[Now] = rate;
    setAnswer(newAnswer);
    setNow((d) => d + 1);
    setAnswer(newAnswer);
  };
  return (
    <div className="flex flex-col items-center w-full h-full gap-4">
      <div className="font-bold text-blue-700 text-2xl">
        이 풀이과정을 평가해주세요!
      </div>
      {Answer.map((rate, i) => {
        if (rate === null) return <></>;
        return <FinishedRate question={questionList[i]} rate={rate} />;
      })}
      {Now === questionList.length ? (
        <div>답변해주셔서 감사합니다!</div>
      ) : (
        <NowRate question={questionList[Now]} handler={scoreSelectHandler} />
      )}
    </div>
  );
}

export default MakeRate;
