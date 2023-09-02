import { OpenAIStream, streamToResponse } from 'ai';
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  const aiResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content: 'What is love?' }],
  });

  const stream = OpenAIStream(aiResponse);

  /**
   * Converts the stream to a Node.js Response-like object
   */
  return streamToResponse(stream, res);
}
