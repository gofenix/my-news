import { createClient } from '@supabase/supabase-js';
import { NewItem } from '@/data/data';
import dayjs from 'dayjs';

const supabaseUrl = 'https://picwqygjdjkgpkoivdxn.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey || '');

export async function getAll(): Promise<NewItem[]> {
  let { data } = await supabase
    .from('news')
    .select('*')
    .order('id', { ascending: false });

  const news: NewItem[] | undefined = data?.map((item) => {
    return {
      id: item.id,
      title: item.title,
      url: item.url,
      author: item.author,
      upCount: item.up_count,
      date: item.created_at,
      digest:
        '摘要又称概要、内容提要，意思是摘录要点或摘录下来的要点。 摘要是以提供文献内容梗概为目的，不加评论和补充解释，简明、确切地记述文献重要内容的短文。 其基本要素包括研究目的、方法、结果和结论。 具体地讲就是研究工作的主要对象和范围，采用的手段和方法，得出的结果和重要的结论，有时也包括具有情报价值的其它重要的信息。',
    } as NewItem;
  });

  return news || [];
}

export async function addCountById(
  id: number,
  count: number
): Promise<NewItem> {
  let { data } = await supabase
    .from('news')
    .update({ up_count: count })
    .eq('id', id)
    .select();

  const item = data
    ?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        url: item.url,
        author: item.author,
        upCount: item.up_count,
        date: item.created_at,
      } as NewItem;
    })
    .at(0);

  return item as NewItem;
}

export async function addItem(item: NewItem): Promise<NewItem> {
  const { data } = await supabase
    .from('news')
    .insert([
      { title: item.title, url: item.url, author: item.author, up_count: 0 },
    ])
    .select();
  console.log(data);

  return (
    data
      ?.map((item) => {
        return {
          id: item.id,
          title: item.title,
          url: item.url,
          author: item.author,
          upCount: item.up_count,
          date: item.created_at,
        } as NewItem;
      })
      .at(0) || ({} as NewItem)
  );
}
