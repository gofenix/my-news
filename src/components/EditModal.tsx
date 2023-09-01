import { NewItem, UpdData } from '@/data/data';
import { addItem, updateById } from '@/data/supabase';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

type EditProps = {
  isOpen: boolean;
  onClose: () => void;
  item: NewItem;
  handleUp: () => void;
};

export default function EditModal(props: EditProps) {
  const { isOpen, onClose, item, handleUp } = props;

  const [updData, setUpdData] = useState({} as UpdData);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder=""
              type="text"
              defaultValue={item.title}
              onChange={(e) => {
                e.preventDefault();
                updData.title = e.target.value;
                setUpdData(updData);
              }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>URL</FormLabel>
            <Input
              placeholder=""
              type="url"
              defaultValue={item.url}
              onChange={(e) => {
                e.preventDefault();
                updData.url = e.target.value;
                setUpdData(updData);
              }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Digest</FormLabel>
            <Textarea
              placeholder="The digest of this news"
              size="md"
              resize="vertical"
              defaultValue={item.digest}
              onChange={(e) => {
                e.preventDefault();
                updData.digest = e.target.value;
                setUpdData(updData);
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="purple"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={async () => {
              if (item.id == undefined) {
                await addItem({
                  title: updData.title,
                  url: updData.url || item.url,
                  digest: updData.digest,
                  author: item.author,
                } as NewItem);
              } else {
                await updateById(item.id, updData);
              }
              onClose();
              handleUp();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
