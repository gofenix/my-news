import { Box, Flex } from '@chakra-ui/react';
import Simple from '@/components/Simple';
import Nav from '@/components/Nav';
import { useEffect, useState } from 'react';
import { NewItem } from '@/data/data';
import { getAll } from '@/data/supabase';
import NewsList from '@/components/NewsList';

export default function Home() {
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
    <Box bgImage={'bg.svg'} bgRepeat={'no-repeat'} bgSize={'auto'}>
      <Nav></Nav>
      <Box m={'6'}></Box>
      <Flex justifyContent={'center'}>
        <Box w={'60%'}>
          <Simple handleUp={handleUp}></Simple>
          <NewsList data={data} handleUp={handleUp} />
        </Box>
      </Flex>
    </Box>
  );
}
