'use server';

import OpenAI from 'openai';
import retry from 'async-retry';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generate(prompt: string) {
  const initialPrompt = `
    Generate 5 multiple choice questions with correct answers based on the topic given. Your response should only be a JSON string in this format:
    [
      {
        question: 'Where was Jose Rizal born?',
        choices: ['Manila', 'Cebu', 'Laguna', 'Ilocos'],
        answer: 2,
      },
    ]
  `;
  const completion = await retry(
    () =>
      openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'Your response must be in HTML format, includes appropriate line breaks (include multiple line breaks in between questions), and uses <strong> tags to emphasize important text',
          },
          {
            role: 'system',
            content: initialPrompt,
          },
          { role: 'user', content: prompt },
        ],
        model: 'gpt-3.5-turbo',
      }),
    {
      retries: 2,
    }
  );

  return completion;
}
