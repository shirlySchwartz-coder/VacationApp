import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = React.createContext(null);
export const ConnectContext = React.createContext(null);

function SocketContainer({ children }: any) {
  let [socket, setSocket] = useState(null);
  // debugger;
  let connect: Function = (token: string) => {
    // let newSocket = io("http://localhost:3002", {
    //     extraHeaders: { token }
    // });
    let newSocket = io('http://localhost:3002', {
      query: { token },
      // transports: ["websocket"]
    });

    // !!!!!!! IMPORTANT !!!!!!!!!!!
    // For the following line to work,
    // you must add "strictNullChecks": false to the tsConfig.json file
    // (Typescript compiler definition file)
    // !!!!!!! IMPORTANT !!!!!!!!!!!
    setSocket(newSocket);
    console.log('Successful websocket connection');
  };

  // useEffect(() => {
  //     if (!socket){
  //         let token = localStorage.getItem("token");
  //         if (token) {
  //             connect(token);
  //         }
  //     }
  // }, []);

  return (
    <SocketContext.Provider value={socket}>
      <ConnectContext.Provider value={connect}>
        {children}
      </ConnectContext.Provider>
    </SocketContext.Provider>
  );
}
export default SocketContainer;
