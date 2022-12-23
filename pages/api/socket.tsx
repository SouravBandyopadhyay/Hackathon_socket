import { Server } from "socket.io";
import messageHandler from "../../utils/messageHandler";

//...........
require("events").EventEmitter.defaultMaxListeners = 50;
//............

let currencyData = [
  {
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars",
    value: 150,
  },
  {
    symbol: "CA$",
    name: "Canadian Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "CAD",
    name_plural: "Canadian dollars",
    value: 120,
  },
  {
    symbol: "€",
    name: "Euro",
    symbol_native: "€",
    decimal_digits: 2,
    rounding: 0,
    code: "EUR",
    name_plural: "euros",
    value: 130,
  },
  {
    symbol: "AED",
    name: "United Arab Emirates Dirham",

    decimal_digits: 2,
    rounding: 0,
    code: "AED",
    name_plural: "UAE dirhams",
    value: 200,
  },
  {
    symbol: "BN$",
    name: "Brunei Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "BND",
    name_plural: "Brunei dollars",
    value: 80,
  },
  {
    symbol: "£",
    name: "British Pound Sterling",
    symbol_native: "£",
    decimal_digits: 2,
    rounding: 0,
    code: "GBP",
    name_plural: "British pounds sterling",
    value: 70,
  },
  {
    symbol: "Rs",
    name: "Indian Rupee",
    symbol_native: "টকা",
    decimal_digits: 2,
    rounding: 0,
    code: "INR",
    name_plural: "Indian rupees",
    value: 250,
  },
];
let interval = 5000;
export default function SocketHandler(req: any, res: any) {
  // It means that socket server was already initialised
  // if (res.socket.server.io) {
  //   console.log("Already set up");
 
  
  //   const onConnection = (socket: any) => {
  //     messageHandler(io, socket);
  //     let id = setInterval(() => {
  //       currencyData = currencyData.map((ele) => {
  //         let price = Math.floor(Math.random() * 200);
  //         ele.value = price;
  //         return ele;
  //       });
  
  //       socket.emit("updatedCurrency", { data: currencyData, interval });
  //     }, interval);
  //   };
  //   // Define actions inside
  //   // io.on("connection", onConnection);
  //   res.end();
  //   return;
  // }
  const io = new Server(res.socket.server);

  res.socket.server.io = io;
  //........................
 
  //.................................
  const onConnection = (socket: any) => {
    messageHandler(io, socket);
    // socket.emit("updatedCurrency", { data: currencyData, interval })
    let id = setInterval(() => {
      currencyData = currencyData.map((ele) => {
        let price = Math.floor(Math.random() * 200);
        ele.value = price;
        return ele;
      });

      socket.emit("updatedCurrency", { data: currencyData, interval });
    }, interval);
  };
  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}
