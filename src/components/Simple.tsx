import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import {
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Flex,
  Box,
  Icon,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react';
import { CalendarIcon, CheckIcon } from '@chakra-ui/icons';
import { NewItem } from '@/data/data';
import delay from 'delay';
import axios from 'axios';
import { addItem, getUser, signInWithGitHub } from '@/data/supabase';
import EditModal from './EditModal';
import { User } from '@supabase/supabase-js';

async function getTitle(url: string): Promise<string | undefined> {
  try {
    const res = await axios.get(`/api/title?url=${encodeURIComponent(url)}`);
    if (res.data.title !== '') {
      return res.data.title;
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
}

type SimpleProps = {
  handleUp: () => void;
};

export default function Simple(props: SimpleProps) {
  const [url, setUrl] = useState('');
  const [item, setItem] = useState({} as NewItem);
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
    'initial'
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleUp } = props;
  const addModalClose = async () => {
    await onClose();
    setState('initial');
  };
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    getUser().then((value) => {
      setUser(value);
    });
  }, []);

  return (
    <Box>
      <Flex direction={'row'} justifyContent={'space-between'}>
        <Flex direction={'column'}>
          <Wrap>
            <Icon as={CalendarIcon} boxSize={7}></Icon>
            <Heading
              as={'h1'}
              fontSize={{ base: 'xl', sm: '2xl' }}
              textAlign={'left'}
              mb={5}
            >
              News
            </Heading>
          </Wrap>

          <Text>
            Get your daily dose of Phoenix, Elixir, Tailwind, Alpine JS and
            LiveView news
          </Text>
        </Flex>

        <Flex
          direction="row"
          as={'form'}
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            setState('submitting');
            if (user && user.user_metadata && user.user_metadata.avatar_url) {
              await delay(1000);
              const title = await getTitle(url);
              if (title == undefined) {
                const item = {
                  title: '',
                  url: url,
                  author: 'zhuzhenfeng.code',
                } as NewItem;
                setItem(item);
                await onOpen();
              } else {
                const item: NewItem = {
                  title: title,
                  url: url,
                  author: 'zhuzhenfeng.code',
                  date: '2023-08-18',
                  upCount: 0,
                };

                setState('success');
                await addItem(item);
                await handleUp();
                await delay(1000);
                setState('initial');
              }
            } else {
              signInWithGitHub();
            }
          }}
        >
          <FormControl>
            <Input
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id={'text'}
              type={'url'}
              required
              placeholder={'Your URL'}
              aria-label={'Your URL'}
              value={url}
              disabled={state !== 'initial'}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
            />
          </FormControl>
          <Box m="1"></Box>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              colorScheme={state === 'success' ? 'green' : 'purple'}
              isLoading={state === 'submitting'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              w="20"
              type={state === 'success' ? 'button' : 'submit'}
              disabled={state === 'success'}
            >
              {state === 'success' ? <CheckIcon /> : 'Add'}
            </Button>
          </FormControl>
        </Flex>
      </Flex>

      <EditModal
        isOpen={isOpen}
        item={item}
        onClose={addModalClose}
        handleUp={handleUp}
      ></EditModal>
    </Box>
  );
}
