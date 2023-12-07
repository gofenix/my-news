import { ChevronUpIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { NewItem, UpdData } from '@/data/data';
import { addCountById, addFavorite, getUser } from '@/data/supabase';
import dayjs from 'dayjs';
import EditModal from './EditModal';

type NewItemProps = {
  item: NewItem;
  handleUp: () => void;
};

export default function Item(props: NewItemProps) {
  const { item, handleUp } = props;
  const [count, setCount] = useState(item.upCount || 0);
  const [loading, setLoading] = useState(false);
  const [digestOpen, setDigestOpen] = useState(true);
  const [iconVisible, setIconVisible] = useState(
    item.digest !== null && item.digest != ''
  );
  const [updData, setUpdData] = useState({} as UpdData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex direction={'row'} align={'baseline'}>
        <Stack
          direction="column"
          border="1px solid"
          borderColor="purple.200"
          w={12}
          h={12}
          disabled={loading}
          justify={'center'}
          align={'center'}
          as={Button}
          onClick={async () => {
            setLoading(true);
            const addCount = (item.upCount || 0) + 1;
            const user = await getUser();
            await addFavorite(item?.id || 0, user?.user_metadata?.user_name);
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
        <Box m="2"></Box>
        <Flex direction={'column'}>
          <Link href={item.url} isExternal>
            <Flex align={'baseline'} direction={'column'}>
              <Text fontSize="md" as={'b'} isTruncated={true}>
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
            </Flex>
          </Link>
          <Stack direction={'row'} align={'center'}>
            <Text fontSize="sm">by</Text>
            <Text fontSize="sm" as="i">
              @{item.author}
            </Text>
            <Text fontSize="sm">at</Text>
            <Text fontSize="sm" as="i">
              {formatDate(item.date)}
            </Text>
            <Icon
              as={EditIcon}
              boxSize={3}
              color={'purple'}
              onClick={() => {
                onOpen();
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            ></Icon>
            {iconVisible && (
              <Icon
                as={InfoOutlineIcon}
                boxSize={3}
                color={'purple'}
                onClick={() => {
                  setDigestOpen(!digestOpen);
                }}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              ></Icon>
            )}
          </Stack>
          <Collapse in={digestOpen} animateOpacity>
            <Stack direction={'row'} align={'baseline'}>
              <Text fontSize={'sm'}>{item.digest}</Text>
            </Stack>
          </Collapse>
        </Flex>
      </Flex>

      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
        handleUp={handleUp}
      />
    </Box>
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
