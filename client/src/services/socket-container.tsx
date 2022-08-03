import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = React.createContext(null);
export const ConnectContext = React.createContext(null);

function SocketContainer({ children }: any) {
  let [socket, setSocket] = useState(null);
  // debugger;
  let connect: Function = (token: string) => {
   
    let newSocket = io('http://localhost:3002', {
      query: { token },
      transports: ["websocket"]
    });

    console.log('newSocket:' +newSocket);
    setSocket(newSocket);
    console.log('Successful websocket connection');
  };

  let send: Function = (token: string, msg: string) => {
    socket.emit("msg-from-client", msg)
  }

  // useEffect(() => {
  //     if (!socket){
  //         let token = localStorage.getItem("token");
  //         if (token) {
  //           console.log("token: " +token);
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
