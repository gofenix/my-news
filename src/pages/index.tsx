import { Box, Button, Flex } from '@chakra-ui/react';
import Simple from '@/components/Simple';
import Nav from '@/components/Nav';
import { useEffect, useState } from 'react';
import { NewItem, UpdData } from '@/data/data';
import { getAll, updateById } from '@/data/supabase';
import NewsList from '@/components/NewsList';
import { genDigest, getContent } from '@/data/ai';

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
      <Button
        onClick={async () => {

        }}
      >
        {' '}
        get digest
      </Button>
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
