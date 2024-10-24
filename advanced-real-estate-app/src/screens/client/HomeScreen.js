import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const HomeScreen = () => {
    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState({
        username: "",
        connected: false,
        message: "",
    });

    useEffect(() => {
        if (userData.connected) {
            connect();
        }
    }, [userData.connected]);

    const connect = () => {
        console.log("Attempting to connect...");
        const socket = new SockJS("http://localhost:8080/ws");
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log("debug: " + str);
            },
            onConnect: () => {
                console.log("Connected to WebSocket");
                onConnected();
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
            },
            onWebSocketClose: (event) => {
                console.log("WebSocket connection closed.", event);
                setUserData((prevData) => ({ ...prevData, connected: false }));
            },
        });

        try {
            stompClient.activate();
            console.log("WebSocket activation initiated.");
        } catch (error) {
            console.error("Error activating WebSocket:", error);
        }
    };

    const onConnected = () => {
        stompClient.subscribe("/topic/public", (message) => {
            onMessageReceived(message);
        });
        stompClient.publish({
            destination: "/app/addUser",
            body: JSON.stringify({ sender: userData.username, type: "JOIN" }),
        });
    };

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (stompClient && stompClient.connected && userData.message.trim() !== "") {
            const chatMessage = {
                sender: userData.username,
                content: userData.message,
                type: "CHAT",
            };
            stompClient.publish({
                destination: "/app/sendMessage",
                body: JSON.stringify(chatMessage),
            });
            setUserData({ ...userData, message: "" });
        } else {
            console.log("STOMP connection is not established yet.");
        }
    };

    const handleMessageChange = (event) => {
        setUserData({ ...userData, message: event.target.value });
    };

    const handleUsernameChange = (event) => {
        setUserData({ ...userData, username: event.target.value });
    };

    return (
        <div>
            {!userData.connected ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={userData.username}
                        onChange={handleUsernameChange}
                    />
                    <button onClick={() => setUserData({ ...userData, connected: true })}>
                        Connect
                    </button>
                </div>
            ) : (
                <div>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                {msg.sender}: {msg.content}
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={userData.message}
                        onChange={handleMessageChange}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
