import { SidebarWithHeader } from '@/components/Sider';

const Page = () => {
  return <>"trending"</>;
};

export default function TrendingPage() {
  return <SidebarWithHeader children={<Page />} activeLink="/trending" />;
}
