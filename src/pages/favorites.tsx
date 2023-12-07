import { NewItem } from '@/data/data';
import { getAll, getFavorites, getTrending } from '@/data/supabase';
import { useState, useEffect } from 'react';
import NewsList from '@/components/NewsList';
import Simple from '@/components/Add';
import { SidebarWithHeader } from '@/components/Sider';
import { Box, Divider, Fade } from '@chakra-ui/react';
import Item from '@/components/Item';
import { useAddress } from '@thirdweb-dev/react';

const Page = () => {
  const [data, setData] = useState([] as NewItem[]);
  const address = useAddress()

  useEffect(() => {
    getFavorites(address!).then((res) => {
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

export default function FavoritesPage() {
  return (
    <SidebarWithHeader activeLink="/favorites">
      <Page />
    </SidebarWithHeader>
  );
}
