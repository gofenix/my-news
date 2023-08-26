import {
  AtSignIcon,
  ChatIcon,
  ChevronUpIcon,
  EditIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Wrap,
  useDisclosure,
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
  const [digestOpen, setDigestOpen] = useState(false);
  const [iconVisible, setIconVisible] = useState(item.digest != '');
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Text fontSize="sm" as="i">
            @{item.author}
          </Text>
          <Text fontSize="sm">at</Text>
          <Text fontSize="sm" as="i">
            {formatDate(item.date)}
          </Text>
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
          <Stack
            direction={'row'}
            align={'baseline'}
            maxWidth={window.innerWidth * 0.55}
          >
            <Text fontSize={'sm'}>
              {item.digest}
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
            </Text>
          </Stack>
        </Collapse>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update this new</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>hello world</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
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
