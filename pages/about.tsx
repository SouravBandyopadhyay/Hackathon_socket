import {
  Avatar,
  Box,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navbar";

export default function About() {
  return (
    <>
      <Navigation />
      <Stack
        py={16}
        px={8}
        spacing={{ base: 8, md: 10 }}
        align={"center"}
        direction={"column"}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign={"center"}
          maxW={"3xl"}
        >
          We had an incredible experience working with <strong>FINCHAT</strong>{" "}
          Team and were impressed we made such a big difference in only two
          days. Our team is so grateful for the wonderful improvements they were
          working on and their ability to get familiar with the product concept
          so quickly and trying to implement.
        </Text>
        <HStack textAlign={"center"} gap={4}>
          <Box>
            <Avatar
              src={
                "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
              mb={2}
            />

            <Text fontWeight={600}>Vivek Belwal</Text>
            <Text fontSize={"sm"} color="blue.600">
              Vice President
            </Text>
          </Box>
          <Box>
            <Avatar
              src={
                "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
              mb={2}
            />

            <Text fontWeight={600}>Akshay Ingle</Text>
            <Text fontSize={"sm"} color="blue.600">
              Vice President
            </Text>
          </Box>
          <Box>
            <Avatar
              src={
                "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
              mb={2}
            />

            <Text fontWeight={600}>Harsh Updhyay</Text>
            <Text fontSize={"sm"} color="blue.600">
              Vice President
            </Text>
          </Box>
          <Box>
            <Avatar
              src={
                "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
              mb={2}
            />

            <Text fontWeight={600}>Sourav Bandyopadhyay</Text>
            <Text fontSize={"sm"} color="blue.600">
              Vice President
            </Text>
          </Box>
        </HStack>
      </Stack>
      <Footer />
    </>
  );
}
