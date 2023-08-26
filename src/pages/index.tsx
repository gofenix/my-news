import {
  Box,
  Center,
  Divider,
  Fade,
  Stack,
} from '@chakra-ui/react';
import Simple from '@/components/Sub';
import Nav from '@/components/Nav';
import Item from '@/components/Item';
import { useEffect, useState } from 'react';
import { NewItem } from '@/data/data';
import { addItem, getAll } from '@/data/supabase';


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
              <Fade in key={index}>
                <Box >
                  <Item item={x} handleUp={handleUp} />
                  <Divider m={3} maxWidth={'90%'} />
                </Box>
              </Fade>
            );
          })}
        </Stack>
      </Center>
    </Box>
  );
}
