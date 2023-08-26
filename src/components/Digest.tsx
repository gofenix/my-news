import { InfoIcon } from '@chakra-ui/icons';
import { Icon, Stack, Text } from '@chakra-ui/react';
import { useCompletion } from 'ai/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

type DigestProps = {
  url: string;
};

export default function Digest(props: DigestProps) {
  const { url } = props;

  const [content, setContent] = useState('');

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/completion',
  });

  useEffect(() => {
    axios
      .get(`/api/text?url=${encodeURIComponent(url)}`)
      .then((value) => {
        setContent(value.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url]);

  return (
    <Stack
      direction={'row'}
      align={'baseline'}
      maxWidth={window.innerWidth * 0.55}
    >
      <Text noOfLines={[1, 2, 3]}>{content}</Text>
    </Stack>
  );
}
