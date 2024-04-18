'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Questions } from '@/types/questions';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  questions: z.string().array(),
});

export default function ResultQuestions({
  items,
  isOpen,
  onOpenChange,
}: {
  items: Questions | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [results, setResults] = useState<boolean[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (items) {
      setResults(
        items.map(
          (item, index) => item.answer === parseInt(data.questions[index])
        )
      );
    }
  }

  const hasResults = results.length > 0;
  const score = hasResults ? results.filter((result) => !!result).length : 0;
  const isPassed = hasResults ? score > Math.floor(results.length / 2) : false;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setResults([]);
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="max-w-[960px]">
        <DialogHeader>
          <DialogTitle>Questions</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col overflow-auto max-h-[80vh] font-mono gap-4">
              {items?.map((item, index) => (
                <FormField
                  key={item.question}
                  control={form.control}
                  name={`questions.${index}`}
                  render={({ field }) => {
                    const isCorrect = !!results[index];

                    return (
                      <FormItem className="flex flex-col gap-2 pb-6 border-b border-border">
                        <FormLabel className="flex items-center gap-2">
                          <strong>
                            {index + 1}. {item.question}
                          </strong>
                          {hasResults && (
                            <div
                              className={cn({
                                'text-green': isCorrect,
                                'text-red': !isCorrect,
                              })}
                            >
                              {isCorrect ? (
                                <CheckIcon width={20} height={20} />
                              ) : (
                                <Cross2Icon width={20} height={20} />
                              )}
                            </div>
                          )}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            disabled={hasResults}
                            onValueChange={field.onChange}
                          >
                            {item.choices.map((choice, i) => (
                              <FormItem
                                key={choice}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={`${i}`} />
                                </FormControl>
                                <FormLabel>{choice}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            {hasResults ? (
              <div>
                <h2 className="font-bold m-0">
                  Score:{' '}
                  <span
                    className={cn({
                      'text-green': isPassed,
                      'text-red': !isPassed,
                    })}
                  >
                    {score}/{results.length}
                  </span>
                </h2>
              </div>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
