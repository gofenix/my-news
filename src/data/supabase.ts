import { User, createClient } from '@supabase/supabase-js';
import { NewItem, UpdData } from '@/data/data';

const supabaseUrl = 'https://picwqygjdjkgpkoivdxn.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY3dxeWdqZGprZ3Brb2l2ZHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1ODc2NTcsImV4cCI6MTk4MjE2MzY1N30.LlVa9L-n1b7PSVszZRzH8W5_SIaQb6qI5Xy7e16NN6g';
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
      digest: item.digest,
    } as NewItem;
  });

  console.log(error);

  return news || [];
}

export async function getTrending(): Promise<NewItem[]> {
  let { data, error } = await supabase
    .from('news')
    .select('*')
    .order('up_count', { ascending: false })
    .limit(10);

  const news: NewItem[] | undefined = data?.map((item) => {
    return {
      id: item.id,
      title: item.title,
      url: item.url,
      author: item.author,
      upCount: item.up_count,
      date: item.created_at,
      digest: item.digest,
    } as NewItem;
  });

  console.log(error);

  return news || [];
}

export async function getFavorites(user_name: string): Promise<NewItem[]> {
  let { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_name', user_name);

  const uniqIDs = new Set(data?.map((value, index) => value.news_id))
  console.log(uniqIDs)

  const items = await getByIDs(Array.from(uniqIDs))

  return items;
}

export async function getByIDs(ids: string[]) : Promise<NewItem[]> {
  let { data, error } = await supabase
    .from('news')
    .select('*')
    .in("id", ids)
    .order('id', { ascending: false });

  const news: NewItem[] | undefined = data?.map((item) => {
    return {
      id: item.id,
      title: item.title,
      url: item.url,
      author: item.author,
      upCount: item.up_count,
      date: item.created_at,
      digest: item.digest,
    } as NewItem;
  });

  console.log(error);

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
        digest: item.digest,
      } as NewItem;
    })
    .at(0);

  return item as NewItem;
}

export async function addFavorite(news_id: number, user_name: string) {
  let { data } = await supabase
    .from('favorites')
    .insert({ user_name, news_id });
}

export async function addItem(item: NewItem): Promise<NewItem> {
  const { data } = await supabase
    .from('news')
    .insert([
      {
        title: item.title,
        url: item.url,
        author: item.author,
        up_count: 0,
        digest: item.digest || '',
      },
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
          digest: item.digest,
        } as NewItem;
      })
      .at(0) || ({} as NewItem)
  );
}

export async function updateById(id: number, updData: UpdData): Promise<void> {
  console.log(updData);
  await supabase
    .from('news')
    .update({ ...updData })
    .eq('id', id)
    .select();
}

export async function signInWithGitHub() {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
}

export async function getUser(): Promise<User> {
  const { data, error } = await supabase.auth.getUser();
  return data.user!;
}
