import { ChevronUpIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { NewItem } from "@/data/data";
import { addCountById } from "@/data/supabase";

type NewItemProp = {
  item: NewItem;
};

export default function Item(props: NewItemProp) {
  const { item } = props;
  const [count, setCount] = useState(item.upCount || 0);
  return (
    <Stack direction={"row"} spacing={"3"} align={"center"}>
      <Stack
        direction="column"
        border="1px solid"
        borderColor="purple.200"
        w={12}
        h={12}
        justify={"center"}
        align={"center"}
        as={Button}
        onClick={() => {
          const addCnt = count + 1;
          addCountById(item.id || 0, addCnt);
          setCount(addCnt);
        }}
        variant={"outline"}
        colorScheme="purple"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
      >
        <Icon as={ChevronUpIcon} boxSize={"4"}></Icon>
        <Text color={"gray.500"} m={"-1"}>
          +{count}
        </Text>
      </Stack>

      <Stack spacing={3}>
        <Link href={item.url} isExternal>
          <Stack align={"baseline"} direction={"row"}>
            <Text
              fontSize="md"
              as={"b"}
              isTruncated={true}
              maxWidth={window.innerWidth * 0.4}
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
        <Text fontSize="sm">{`by ${item.author} at ${item.date}`}</Text>
      </Stack>
    </Stack>
  );
}
