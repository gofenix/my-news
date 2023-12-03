import { NewItem } from '@/data/data';
import { getAll } from '@/data/supabase';
import { useState, useEffect } from 'react';
import NewsList from '@/components/NewsList';
import Simple from '@/components/Simple';
import { SidebarWithHeader } from '@/components/Sider';

const Page = () => {
  const [data, setData] = useState([] as NewItem[]);

  const handleUp = async () => {
    const all = await getAll();
    setData(all);
  };

  useEffect(() => {
    getAll().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Simple handleUp={handleUp}></Simple>
      <NewsList data={data} handleUp={handleUp} />
    </>
  );
};

export default function HomePage() {
  return <SidebarWithHeader children={<Page />} activeLink="/" />;
}
