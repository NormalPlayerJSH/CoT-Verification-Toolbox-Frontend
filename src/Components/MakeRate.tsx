import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { getQuery, postResult } from '../api';
import data from '../db/db.json';
import { queryI } from '../types';

export interface questionInfo {
  type: 'subAnswer' | 'finalAnswer';
  innerType: 'rate' | 'text';
  question: string;
  text: string;
  answer: string | number | null;
}

const questionList = [
  '정답이 정확한가요?',
  '풀이과정 Step 1은 합당한가요?',
  '풀이과정 Step 2는 합당한가요?',
  '풀이과정 Step 3은 합당한가요?',
];

const dummyData = {
  sub: [
    'testStep1Subanswer',
    'testStep2Subanswer',
    'testStep3Subanswer',
    'ddd',
  ],
  final: 'testFinalAnswer',
};

function FinishedRate({ info }: { info: questionInfo }) {
  return (
    <div className="flex gap-4 items-center flex-col w-full">
      <div className="text-xl">{info.question}</div>
      {info.innerType === 'rate' && (
        <div className="text-2xl font-bold">{`${info.answer} / 5`}</div>
      )}
      {info.innerType === 'text' && (
        <div className="text-lg font-bold">{info.answer}</div>
      )}
      {/* <div className="text-2xl font-bold">
        {info.innerType === 'rate' ? `${info.answer} / 5` : info.answer}
      </div> */}
    </div>
  );
}

function NowRate({
  info,
  handler,
}: {
  info: questionInfo;
  handler: (answer: number | string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 items-center w-full">
      <div className="text-2xl">{info.question}</div>
      <div className="w-full bg-gray-200 border-gray-500 border-2 border-dashed p-4">
        {info.text}
      </div>
      {info.innerType === 'rate' && (
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
      )}
      {info.innerType === 'text' && (
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const answer = (e.target as any)[0].value.trim();
            handler(answer.length === 0 ? '없음' : answer);
          }}
        >
          <input
            type="text"
            className="w-full h-12 bg-gray-100 border-2 border-blue-400 rounded-full px-6 py-2"
          />
          <div className="w-full flex gap-2">
            <button
              className="w-full bg-gray-200 hover:bg-gray-500 hover:text-white rounded py-2"
              type="button"
              onClick={() => handler('없음')}
            >
              없음
            </button>
            <button
              className="w-full bg-red-200 hover:bg-red-500 hover:text-white rounded py-2"
              type="submit"
            >
              확인
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function MakeRate() {
  const { data } = useSWR('/query', () => getQuery('hello'), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [Info, setInfo] = useState<questionInfo[]>([]);
  const lastRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!data) return;
    setInfo([
      ...data.nodeList.flatMap<questionInfo>((t, i) => [
        {
          type: 'subAnswer',
          innerType: 'rate',
          text: t.subAnswer,
          question: `Step ${i + 1}은(는) 합당한가요?`,
          answer: null,
        },
        {
          type: 'subAnswer',
          innerType: 'text',
          text: t.subAnswer,
          question: `더 나은 Step ${i + 1}을(를) 입력해주세요!`,
          answer: null,
        },
      ]),
      {
        type: 'finalAnswer',
        innerType: 'rate',
        text: data.finalAnswer,
        question: '정답은 합당한가요?',
        answer: null,
      },
      {
        type: 'finalAnswer',
        innerType: 'text',
        text: data.finalAnswer,
        question: '더 나은 정답을 입력해주세요!',
        answer: null,
      },
    ]);
  }, [data]);
  const getNow = (info: questionInfo[]) => {
    return info.reduce((prev, curr) => {
      if (prev.length === 0) return [curr];
      if (prev[prev.length - 1].answer === null) return prev;
      return [...prev, curr];
    }, [] as questionInfo[]);
  };
  useEffect(() => {
    lastRef?.current && lastRef?.current.scrollIntoView();
    const now = getNow(Info);
    if (
      now.length === Info.length &&
      now.length !== 0 &&
      now[now.length - 1].answer !== null
    ) {
      (async () => {
        if (!data) return;
        const rateList = Info.filter(
          (t) => t.innerType === 'rate' && t.type === 'subAnswer',
        );
        const textList = Info.filter(
          (t) => t.innerType === 'text' && t.type === 'subAnswer',
        );
        const res = await postResult({
          ...data,
          finalAnswerRating:
            Info.find((t) => t.innerType === 'rate' && t.type === 'finalAnswer')
              ?.answer || -1,
          finalAnswerAlt:
            Info.find((t) => t.innerType === 'text' && t.type === 'finalAnswer')
              ?.answer || '',
          nodeList: data.nodeList.map((t, i) => ({
            ...t,
            subAnswerAlt: (textList[i].answer as any as string) || '',
            subAnswerRating: (rateList[i].answer as any as number) || -1,
          })),
        });
        console.log(res);
      })();
    }
  }, [Info]);

  const setAnswerHandler = (i: number, answer: number | string) => {
    setInfo((t) => {
      const newArray = [...t];
      const newObj = { ...newArray[i] };
      newObj.answer = answer;
      newArray[i] = newObj;
      return newArray;
    });
  };
  const nowShowing = getNow(Info);
  return (
    <div className="flex flex-col items-center w-full h-full gap-4">
      <div className="font-bold text-blue-700 text-2xl">
        이 풀이과정을 평가해주세요!
      </div>
      {nowShowing.map((t, i) =>
        t.answer === null ? (
          <NowRate info={t} handler={(a) => setAnswerHandler(i, a)} />
        ) : (
          <FinishedRate info={t} />
        ),
      )}
      {nowShowing.length === Info.length &&
        nowShowing.length !== 0 &&
        nowShowing[nowShowing.length - 1].answer !== null && (
          <div>답변해주셔서 감사합니다!</div>
        )}
      <div ref={lastRef}></div>
    </div>
  );
}

export default MakeRate;
