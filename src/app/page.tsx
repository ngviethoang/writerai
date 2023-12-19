'use client';

import GptButtons from '@/components/common/buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  contentButtons,
  generateButtons,
  topicTypes,
  vocabButtons,
} from '@/const';
import { getCompletion } from '@/lib/prompt';
import { useAppStore } from '@/store';
import React, { useRef, useState } from 'react';

export default function Home() {
  const {
    apiKey,
    setApiKey,
    topicType,
    setTopicType,
    question,
    setQuestion,
    content,
    setContent,
  } = useAppStore();
  const [selectedContent, setSelectedContent] = useState('');
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [result, setResult] = useState({ title: '', content: '' });

  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const queryPrompt = async (promptType: string, content: string) => {
    setLoadingPrompt(true);
    const response = await getCompletion(
      apiKey,
      topicType,
      promptType,
      question,
      content
    );
    const data = response[0].message;
    setLoadingPrompt(false);
    return data.content || '';
  };

  const setSelectContent = () => {
    if (contentRef.current && selectedContent) {
      contentRef.current.focus();
      contentRef.current.setSelectionRange(
        contentRef.current.selectionStart,
        contentRef.current.selectionEnd
      );
    }
  };

  const handleClickGptButton = (item: any) => async () => {
    setSelectContent();
    const resultContent = await queryPrompt(item.promptType, content);
    if (resultContent) {
      setResult({ title: item.name, content: resultContent });
    }
  };

  return (
    <main className="p-4 h-screen">
      <div className="mb-5">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-center first:mt-0">
          Improve your writing with AI
        </h2>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 border-r-gray-400 border-r-2 pr-2 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <div className="w-[250px] text-sm font-semibold">
              Enter your OpenAI API Key:
            </div>
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
            />
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-semibold">Select a topic: </div>
            <RadioGroup
              defaultValue={topicType}
              onValueChange={(e) => {
                setTopicType(e);
              }}
              className="flex"
            >
              {topicTypes.map((item) => (
                <div className="flex items-center space-x-2" key={item}>
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor="r1">{item}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <div className="text-sm font-semibold">Question</div>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <div className="text-sm font-semibold">Your writing</div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onSelect={(e: any) => {
                // console.log(e);
                e.preventDefault();

                const { selectionStart, selectionEnd }: any = e.target;
                const selectedText = content.slice(
                  selectionStart,
                  selectionEnd
                );
                setSelectedContent(selectedText);
              }}
              rows={20}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-red-400 text-muted-foreground">
              *Enter the question and click a button below to generate:
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-sm">Brainstorming: </div>{' '}
              <GptButtons
                buttons={generateButtons}
                disabled={false}
                onClick={handleClickGptButton}
              />
            </div>
            <p className="text-sm text-red-400 text-muted-foreground">
              *Select text in your writing and click a button below to generate:
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-sm">Generate content: </div>{' '}
              <GptButtons
                buttons={contentButtons}
                disabled={!selectedContent}
                onClick={handleClickGptButton}
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-sm">Ask vocabulary: </div>{' '}
              <GptButtons
                buttons={vocabButtons}
                disabled={!selectedContent}
                onClick={handleClickGptButton}
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="pb-5">
            {loadingPrompt && <div>Asking ChatGPT, please wait...</div>}
            {!loadingPrompt && !!result.title && (
              <div className="flex flex-col gap-2">
                <div className="font-bold">{result.title}</div>
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html: result.content.replaceAll('\n', '<br />'),
                  }}
                ></div>
                <div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setContent(result.content);
                    }}
                  >
                    Insert to writing
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
