import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import Navigation from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type Message = {
  author: string;
  message: string;
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");
  const [landing, setLanding] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log(messages);
    });
  };

  const sendMessage = async () => {
    socket.emit("createdMessage", { author: chosenUsername, message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: chosenUsername, message },
    ]);
    setMessage("");
  };

  const handleKeypress = (e: { keyCode: any }) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <>
      <Navigation />
      <Box padding={2} minH="400">
        <Box>
          {landing == true ? (
            <>
              {/* landingpage */}
              <VStack boxShadow="md" width="50%" margin="auto" p="2">
                <Text textAlign="center" fontSize="2xl">
                  Fill Out Guest Name
                </Text>
                <Button
                  onClick={() => setLanding(!landing)}
                  justifyContent="center"
                  bgColor="blue.300"
                  bg="white"
                  rounded="md"
                  p="2"
                  fontSize="xl"
                >
                  Let's Chat
                </Button>
              </VStack>
            </>
          ) : !chosenUsername ? (
            <VStack width="50%" margin="auto" p="2">
              <Text fontSize="xl">How you like to be called?</Text>
              <Input
                type="text"
                placeholder="Identity..."
                value={username}
                size="md"
                p={3}
                rounded="md"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                bgColor="blue.300"
                onClick={() => {
                  setChosenUsername(username);
                }}
                // className="bg-white rounded-md px-4 py-2 text-xl"
                bg="white"
                rounded="md"
                p="2"
                fontSize="xl"
                margin="auto"
              >
                Go!
              </Button>
            </VStack>
          ) : (
            <VStack width="50%" margin="auto" p="2">
              <Text
                textAlign="center"
                fontWeight="bold"
                color="black.500"
                fontSize="xl"
              >
                Your username: {username}
              </Text>
              <VStack className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
                <Box className="h-full last:border-b-0 overflow-y-scroll">
                  {messages.map((msg, i) => {
                    return (
                      <Box
                        className="w-full py-1 px-2 border-b border-gray-200"
                        key={i}
                      >
                        {msg.author} : {msg.message}
                      </Box>
                    );
                  })}
                </Box>
                <Box className="border-t border-gray-300 w-full flex rounded-bl-md">
                  <Input
                    type="text"
                    placeholder="New message..."
                    value={message}
                    className="outline-none py-2 px-2 rounded-bl-md flex-1"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={handleKeypress}
                  />
                  <Box className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                    <Button
                      height="full"
                      padding={3}
                      className="group-hover:text-white px-3 h-full"
                      onClick={() => {
                        sendMessage();
                      }}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </VStack>
            </VStack>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
