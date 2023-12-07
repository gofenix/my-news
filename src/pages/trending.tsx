import Item from '@/components/Item';
import { SidebarWithHeader } from '@/components/Sider';
import { NewItem } from '@/data/data';
import { getTrending } from '@/data/supabase';
import { Box, Fade, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([] as NewItem[]);

  useEffect(() => {
    getTrending().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <Box px="20" pt={10}>
      {data.map((x, index) => {
        return (
          <Fade in key={index}>
            <Box>
              <Item item={x} handleUp={() => {}} />
              <Divider m={3} />
            </Box>
          </Fade>
        );
      })}
    </Box>
  );
};

export default function TrendingPage() {
  return (
    <SidebarWithHeader activeLink="/trending">
      <Page />
    </SidebarWithHeader>
  );
}
