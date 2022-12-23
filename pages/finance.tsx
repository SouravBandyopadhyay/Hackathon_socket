import { SetStateAction, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";
import io, { Socket } from "socket.io-client";
import Navigation from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DefaultEventsMap } from "@socket.io/component-emitter";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Finance = () => {
  useEffect(() => {
    socketInitializer();
  }, []);

  type NEWDATA = {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
    value: number;
  };

  const [input, setInput] = useState("");
  const [newData, setNewData] = useState<Array<NEWDATA>>([]);
  //
  const onChangeHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("crypto", (msg) => {
      console.log(msg);
    });

    socket.on("updatedCurrency", ({ data, interval }) => {
      setNewData(data);
      console.log(data);
    });
  };

  const handelClick = (ele: any) => {
    console.log(ele);
  };

  return (
    <>
      <Navigation />
      <Box minH="400" color="black.400" width="70%" margin="auto">
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th fontSize="md">Name</Th>
                <Th fontSize="md">Symbol</Th>
                <Th fontSize="md">Code</Th>
                <Th fontSize="md" isNumeric>
                  Value
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {newData &&
                newData.map((ele: any, i: number) => (
                  <Tr key={i}>
                    <Td>{ele.name}</Td>
                    <Td>{ele.symbol}</Td>
                    <Td>{ele.code}</Td>
                    <Td>{ele.value}</Td>
                    <Button
                      marginLeft="1"
                      fontSize="sm"
                      marginTop="2"
                      onClick={() => handelClick(ele)}
                    >
                      Buy Now
                    </Button>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </>
  );
};

export default Finance;
