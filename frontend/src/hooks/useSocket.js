import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("https://swissmote-yq3v.onrender.com", { withCredentials: true });

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket");
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    return socket;
};

export default useSocket;
