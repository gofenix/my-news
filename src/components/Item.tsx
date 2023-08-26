import { AtSignIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { NewItem } from '@/data/data';
import { addCountById } from '@/data/supabase';
import dayjs from 'dayjs';
import delay from 'delay';
import Digest from './Digest';

type NewItemProps = {
  item: NewItem;
  handleUp: () => {};
};

export default function Item(props: NewItemProps) {
  const { item, handleUp } = props;
  const [count, setCount] = useState(item.upCount || 0);
  const [loading, setLoading] = useState(false);
  return (
    <Stack direction={'row'} spacing={'3'} align={'baseline'}>
      <Stack
        direction="column"
        border="1px solid"
        borderColor="purple.200"
        w={12}
        h={12}
        // isLoading={loading}
        disabled={loading}
        justify={'center'}
        align={'center'}
        as={Button}
        onClick={async () => {
          setLoading(true);
          const addCount = (item.upCount || 0) + 1;
          console.log(item);
          console.log(addCount);
          await addCountById(item.id || 0, addCount);
          await handleUp();
          setLoading(false);
        }}
        variant={'outline'}
        colorScheme="purple"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
      >
        <Icon as={ChevronUpIcon} boxSize={'4'}></Icon>
        <Text color={'gray.500'} m={'-1'}>
          +{item.upCount}
        </Text>
      </Stack>

      <Stack spacing={1}>
        <Link href={item.url} isExternal>
          <Stack align={'baseline'} direction={'row'}>
            <Text
              fontSize="md"
              as={'b'}
              isTruncated={true}
              maxWidth={window.innerWidth * 0.25}
            >
              {item.title}
            </Text>
            <Text
              fontSize="md"
              isTruncated={true}
              maxWidth={window.innerWidth * 0.4}
            >
              {`(${item.url})`}
              <ExternalLinkIcon />
            </Text>
          </Stack>
        </Link>
        <Stack direction={'row'} align={'center'}>
          <Text fontSize="sm">by</Text>
          <Text fontSize="sm">@{item.author}</Text>
          <Text fontSize="sm">at {formatDate(item.date)}</Text>
        </Stack>

        <Digest url={item.url} />
      </Stack>
    </Stack>
  );
}

function formatDate(date: string): string {
  const diff = dayjs().diff(dayjs(date), 'minute');
  if (diff < 5) {
    return 'just now';
  } else if (diff >= 5 && diff < 120) {
    return `${diff} minutes ago`;
  } else if (diff >= 120 && diff < 720) {
    return `${Math.round(diff / 60)} hours ago`;
  } else {
    return dayjs(date).format('YYYY-MM-DD');
  }
}
