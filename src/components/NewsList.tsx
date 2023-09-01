import { Fade, Divider, Box } from '@chakra-ui/react';
import Item from './Item';
import { NewItem } from '@/data/data';

type NewsListProps = {
  data: NewItem[];
  handleUp: () => void;
};

export default function NewsList(props: NewsListProps) {
  const { data, handleUp } = props;

  return (
    <Box m="10">
      {data.map((x, index) => {
        return (
          <Fade in key={index}>
            <Box>
              <Item item={x} handleUp={handleUp} />
              <Divider m={3} />
            </Box>
          </Fade>
        );
      })}
    </Box>
  );
}
