import { NewItem } from '@/data/data';
import { getAll } from '@/data/supabase';
import { useState, useEffect } from 'react';
import NewsList from '@/components/NewsList';
import Simple from '@/components/Simple';
import { SidebarWithHeader } from '@/components/Sider';

const Page = () => {
  return <>favorites</>;
};

export default function FavoritesPage() {
  return (
    <SidebarWithHeader activeLink="/favorites">
      <Page />
    </SidebarWithHeader>
  );
}
