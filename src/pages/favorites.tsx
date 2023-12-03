import { NewItem } from '@/data/data';
import { getAll } from '@/data/supabase';
import { useState, useEffect } from 'react';
import NewsList from '@/components/NewsList';
import Simple from '@/components/Simple';
import { SidebarWithHeader } from '@/components/Sider';
import { Box } from '@chakra-ui/react';

const Page = () => {
  return (
    <Box bgImage={'bg.svg'} bgRepeat={'no-repeat'} bgSize={'auto'}>
      favorites
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
