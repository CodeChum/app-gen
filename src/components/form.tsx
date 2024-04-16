'use client';

import { MagicWandIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { generate } from '@/app/actions';
import { useState, useTransition } from 'react';
import { ChatCompletion } from 'openai/src/resources/index.js';
import Result from './result';

export default function Form() {
  const [value, setValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ChatCompletion | null>(null);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setResult(null);
    }
  };

  return (
    <>
      <div className="rounded-xl border p-8 bg-card text-card-foreground flex flex-col items-center text-center gap-8 max-w-[800px] w-full shadow">
        <Textarea
          className="h-[200px] text-lg"
          disabled={isPending}
          name="prompt"
          placeholder="Type your prompt here."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          className="w-full"
          disabled={isPending}
          size="lg"
          type="button"
          onClick={() => {
            startTransition(async () => {
              const response = await generate(value);
              setResult(response);
            });
          }}
        >
          {isPending ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MagicWandIcon className="mr-2" />
          )}
          Generate
        </Button>
      </div>
      <Result
        isOpen={!!result}
        text={result ? result.choices[0].message.content : null}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
