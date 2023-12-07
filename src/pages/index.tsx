import { NewItem } from '@/data/data';
import { getAll } from '@/data/supabase';
import { useState, useEffect } from 'react';
import NewsList from '@/components/NewsList';
import Add from '@/components/Add';
import { SidebarWithHeader } from '@/components/Sider';
import { Box } from '@chakra-ui/react';
import { useAddress, useLogin } from '@thirdweb-dev/react';

const Page = () => {
  const [data, setData] = useState([] as NewItem[]);

  const address = useAddress();

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
    <Box>
      <Add handleUp={handleUp}></Add>
      <NewsList data={data} handleUp={handleUp} />
    </Box>
  );
};

export default function HomePage() {
  return (
    <SidebarWithHeader activeLink="/">
      <Page />
    </SidebarWithHeader>
  );
}
