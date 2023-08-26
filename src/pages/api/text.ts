import { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  const { url } = req.query;
  let content = '';
  try {
    content = await getContent(url as string);
  } catch (e) {
    content = '';
  }
  res.status(200).json({ content });
}

async function getContent(url: string): Promise<string> {
  const res = await axios.get(url as string);
  const $ = cheerio.load(res.data);

  if (url.includes('www.8btc.com/article/')) {
    const text = $('.article-content__container');
    return text.text();
  } else {
    return '';
  }
}
