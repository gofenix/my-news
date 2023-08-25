import { FormEvent, ChangeEvent, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  SimpleGrid,
  Box,
  Spacer,
  Center,
  Icon,
  Wrap,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Divider,
} from "@chakra-ui/react";
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import { NewItem } from "@/data/data";
import delay from "delay";
import axios from "axios";

type Simple = {
  handleClick: (item: NewItem) => void;
};

async function getTitle(url: string): Promise<string | undefined> {
  try {
    const res = await axios.get(`/api/title?url=${encodeURIComponent(url)}`);
    if (res.data.title !== "") {
      return res.data.title;
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
}

export default function Simple(props: Simple) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction={"row"} spacing={"20"}>
      <Stack>
        <Wrap>
          <Icon as={CalendarIcon} boxSize={7}></Icon>
          <Heading
            as={"h1"}
            fontSize={{ base: "xl", sm: "2xl" }}
            textAlign={"left"}
            mb={5}
          >
            News
          </Heading>
        </Wrap>

        <Text>
          Get your daily dose of Phoenix, Elixir, Tailwind, Alpine JS and
          LiveView news
        </Text>
      </Stack>

      <Stack
        direction="row"
        as={"form"}
        spacing={"12px"}
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          setError(false);
          setState("submitting");
          await delay(1000);
          const title = await getTitle(url);
          if (title == undefined) {
            await onOpen();
          } else {
            const item: NewItem = {
              title: title,
              url: url,
              author: "zhuzhenfeng.code",
              date: "2023-08-18",
              upCount: 0,
            };

            await props.handleClick(item);
            setState("success");
            // await delay(1000);
            setState("initial");
          }
        }}
      >
        <FormControl>
          <Input
            variant={"solid"}
            borderWidth={1}
            color={"gray.800"}
            _placeholder={{
              color: "gray.400",
            }}
            borderColor={useColorModeValue("gray.300", "gray.700")}
            id={"text"}
            type={"url"}
            required
            placeholder={"Your URL"}
            aria-label={"Your URL"}
            value={url}
            disabled={state !== "initial"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
        </FormControl>
        <FormControl w={{ base: "100%", md: "40%" }}>
          <Button
            colorScheme={state === "success" ? "green" : "purple"}
            isLoading={state === "submitting"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            w="20"
            type={state === "success" ? "button" : "submit"}
            disabled={state === "success"}
          >
            {state === "success" ? <CheckIcon /> : "Add"}
          </Button>
        </FormControl>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>编辑</ModalHeader>
          <ModalCloseButton
            onClick={async () => {
              setState("initial");
              await onClose();
            }}
          />
          <Divider />
          <ModalBody></ModalBody>
          <Stack m={3}>
            <Text>Title</Text>
            <Input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value != "") {
                  setTitle(e.target.value);
                }
              }}
            ></Input>
            <Text>Url</Text>
            <Input type="url" value={url}></Input>
          </Stack>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => {
                const item: NewItem = {
                  title: title,
                  url: url,
                  author: "fenix",
                  date: "2023-07-20",
                };

                props.handleClick(item);
                setState("success");
                await onClose();
                await delay(1000);
                setState("initial");
              }}
            >
              Submit
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                setState("initial");
                await onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
