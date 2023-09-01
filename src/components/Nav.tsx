import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Icon,
} from '@chakra-ui/react';
import { CalendarIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { getUser, signInWithGitHub } from '@/data/supabase';
import { GoPerson } from 'react-icons/go';
import { User } from '@supabase/supabase-js';

interface Props {
  children: React.ReactNode;
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    getUser().then((value) => {
      setUser(value);
    });
  }, []);

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      bgImage={'bg.svg'}
      px={4}
    >
      <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Icon as={CalendarIcon} boxSize={6}></Icon>
        </Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={5}>
            <Button
              onClick={toggleColorMode}
              variant={'link'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {user && user.user_metadata && user.user_metadata.avatar_url ? (
              <Avatar size={'sm'} src={user.user_metadata.avatar_url} />
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
                <GoPerson />
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
