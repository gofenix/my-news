import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiStar,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUser, signInWithGitHub } from '@/data/supabase';
import { User } from '@supabase/supabase-js';
import { ConnectWallet } from '@thirdweb-dev/react';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  activeLink: string;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  activeLink: string;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Trending', icon: FiTrendingUp, href: '/trending' },
  //   { name: 'Explore', icon: FiCompass, href: '/explore' },
  { name: 'Favorites', icon: FiStar, href: '/favorites' },
  //   { name: 'Settings', icon: FiSettings, href: '/settings' },
];

export const SidebarContent = ({
  onClose,
  activeLink,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={'gray.200'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Web3 News
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          activeLink={activeLink}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export const NavItem = ({
  icon,
  href,
  activeLink,
  children,
  ...rest
}: NavItemProps) => {
  const router = useRouter();

  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={activeLink === href ? 'cyan.200' : 'transparent'}
        // _hover={{
        //   transform: 'translateY(-2px)',
        //   boxShadow: 'lg',
        // }}
        {...rest}
        onClick={() => {
          router.push(href);
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            // _groupHover={{
            //   color: 'white',
            // }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    getUser().then((value) => {
      setUser(value);
    });
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={'gray.200'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Web3 News
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <ConnectWallet btnTitle="Login" />

        {/* <Flex alignItems={'center'}>
          {user && user.user_metadata && user.user_metadata.avatar_url ? (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Avatar size={'sm'} src={user.user_metadata.avatar_url} />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm"> {user.user_metadata.name} </Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList borderColor={'gray.200'}>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              onClick={async () => {
                await signInWithGitHub();
                const user = await getUser();
                setUser(user);
              }}
              variant={'ghost'}
              colorScheme="green.300"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              <FiUser />
            </Button>
          )}
        </Flex> */}
      </HStack>
    </Flex>
  );
};

interface ContentProps {
  children: ReactNode;
  activeLink: string;
}
export const SidebarWithHeader = ({ children, activeLink }: ContentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        activeLink={activeLink}
        display={{ base: 'none', md: 'block' }}
      />

      <MobileNav onOpen={onOpen} />

      <Box
        ml={{ base: 0, md: 60 }}
        p={'4'}
        bgImage={'bg.svg'}
        bgRepeat={'no-repeat'}
        bgSize={'auto'}
      >
        {children}
      </Box>
    </Box>
  );
};
