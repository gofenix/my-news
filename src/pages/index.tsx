import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Box, Center, Divider, Flex, Stack } from '@chakra-ui/react';
import ClickMe from '@/components/ClickMe';
import Simple from '@/components/Sub';
import Nav from '@/components/Nav';
import Item from '@/components/Item';
import { FormEvent, useEffect, useState } from 'react';
import { NewItem } from '@/data/data';
import { createClient } from '@supabase/supabase-js';
import { InferGetServerSidePropsType } from 'next';
import { addCountById, addItem, getAll } from '@/data/supabase';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [data, setData] = useState([] as NewItem[]);

  useEffect(() => {
    getAll().then((res) => {
      setData(res);
    });
  }, []);

  const handleClick = async (item: NewItem) => {
    const added = await addItem(item);
    setData([added].concat(data));
  };

  const handleUp = async () => {
    console.log('handle up');
    const all = await getAll();
    setData(all);
  };

  return (
    <Box bgImage={'bg.svg'} bgRepeat={'no-repeat'} bgSize={'auto'}>
      <Nav></Nav>
      <Center m={5}>
        <Stack>
          <Simple handleClick={handleClick}></Simple>
          <Box m={5}></Box>
          {data.map((x, index) => {
            return (
              <Box key={index}>
                <Item item={x} handleUp={handleUp} />
                <Divider m={3} maxWidth={'90%'} />
              </Box>
            );
          })}
        </Stack>
      </Center>
    </Box>
  );
}
