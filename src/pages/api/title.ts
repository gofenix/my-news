// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  title: string;
};

async function getTitle(url: string): Promise<string | undefined> {
  try {
    const response = await axios.get(url);
    const titleRegex = /<title>(.*?)<\/title>/;
    const matches = titleRegex.exec(response.data);
    if (matches && matches.length > 1) {
      const title = matches[1];
      return title;
    }
  } catch (error) {
    console.log('get title error: ');
    console.error(error);
  }

  return undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query);

  const { url } = req.query;
  const title = await getTitle(url as string);
  console.log(title);
  res.status(200).json({ title: title || '' });
}
