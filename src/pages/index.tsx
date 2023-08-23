import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Center, Divider, Flex, Stack } from "@chakra-ui/react";
import ClickMe from "@/components/ClickMe";
import Simple from "@/components/Sub";
import Nav from "@/components/Nav";
import Item from "@/components/Item";
import { FormEvent, useState } from "react";
import { NewItem } from "@/data/data";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([] as NewItem[]);

  const handleClick = (item: NewItem) => {
    setData(data.concat([item]));
  };

  return (
    <Box bgImage={"bg.svg"} bgRepeat={"no-repeat"} bgSize={"auto"}>
      <Nav></Nav>
      <Center m={5}>
        <Stack>
          <Simple handleClick={handleClick}></Simple>
          <Box m={5}></Box>
          {data.map((x, index) => {
            return (
              <Box key={index}>
                <Item item={x}  />
                <Divider m={3} />
              </Box>
            );
          })}
        </Stack>
      </Center>
    </Box>
  );
}
