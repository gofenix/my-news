import { createClient } from '@supabase/supabase-js';
import { NewItem } from '@/data/data';
import dayjs from 'dayjs';

const supabaseUrl = 'https://picwqygjdjkgpkoivdxn.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey || '');

export async function getAll(): Promise<NewItem[]> {
  let { data, error } = await supabase
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
      digest: item.digest
    } as NewItem;
  });

  console.log(error)

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
        digest: item.digest
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
          digest: item.digest
        } as NewItem;
      })
      .at(0) || ({} as NewItem)
  );
}
