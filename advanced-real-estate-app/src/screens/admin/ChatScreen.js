import React, {useState, useEffect, useRef} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import styles from "../../assets/chat-box.module.css";
import handleAPINotToken from "../../apis/handleAPINotToken";
import {Link} from "react-router-dom";

let stompClient = null;

const ChatScreen = () => {

    const auth = useSelector(authSelector);
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [countUser, setCountUser] = useState("");
    const [getting, setGettingUser] = useState("");
    const [room, setRoom] = useState("");
    const [bot, setBot] = useState("");
    const [botMessageId, setBotMessageId] = useState(null);
    const [botPendingStatus, setBotPendingStatus] = useState(false);
    const chatContainerRef = useRef(null);
    const [userData, setUserData] = useState({
        connected: false,
        message: "",
    });

    const callApiRoomChat = async ()=>{
        return await handleAPINotToken('/api/user/room-chats', {}, 'get');
    }

    useEffect(() => {
        callApiRoomChat()
        .then(res => setRooms(res?.data))
        .catch(error => console.error("Fetch error: ",error));
    }, []);

    useEffect(() => {
        console.log(rooms)
    }, [rooms]);

    useEffect(() => {
        if (userData.connected) {
            connect();
        }
    }, [userData.connected, room]);

    useEffect(() => {
        return () => {
            if (stompClient && stompClient.connected) {
                disconnect().then();
            }
        };
    }, [userData.connected, room]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (stompClient && stompClient.connected) {
                disconnect().then(() => {
                    console.log("Disconnected successfully before reloading.");
                });
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [stompClient]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleRoomChange = (room) => {
        setRoom(room);
        setUserData({ ...userData, connected: true });
    };

    const connect = () => {
        console.log("Attempting to connect...");
        const socket = new SockJS("http://localhost:9090/ws");
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log("debug: " + str);
            },
            onConnect: () => {
                console.log("WebSocket connected!");
                onConnected();
            },
            onStompError: (frame) => {
                console.error("ERROR STOMP:", frame);
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
        stompClient.subscribe(`/topic/room/${room}`, (message) => {
            onMessageReceived(message).then();
        });

        stompClient.publish({
            destination: `/app/addUser/${room}`,
            body: JSON.stringify({
                sender: auth?.info?.email,
                email: auth?.info?.email,
                type: "JOIN", room
            }),
        });
    };

    const disconnect = async () => {
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/app/leaveRoom/${room}`,
                body: JSON.stringify({
                    sender: auth?.info?.username,
                    email: auth?.info?.email,
                    type: 'LEAVE'
                })
            });
            stompClient.deactivate();
            console.log("WebSocket disconnected.");
            setUserData((prevData) => ({ ...prevData, connected: false }));
            setMessages([]);
        } else {
            console.log("WebSocket is already disconnected.");
        }
    };

    const onMessageReceived = async (payload) => {
        const message = JSON.parse(payload.body);
        console.log("msg: ",message);
        if(message?.count){
            setCountUser("Số user trong phòng: " + message?.count);
        }
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (stompClient && stompClient.connected && userData.message.trim() !== "") {
            const chatMessage = {
                sender: auth?.info?.email,
                email: auth?.info?.email,
                content: userData.message,
                type: "CHAT",
                room,
            };
            stompClient.publish({
                destination: `/app/sendMessageToRoom/${room}`,
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

    return (
        <div>
            {!userData.connected ? (
                <div>
                    <div className={styles.roomContainer}>
                        {rooms.map((room, index) => (
                            <div key={index} className={styles.roomCard}>
                                <img src={`data:${room?.file_type};base64,${room?.image}`} alt={room.name} className={styles.roomImage}/>
                                <div className={styles.roomContent}>
                                    <Link
                                        onClick={() => handleRoomChange(room.name)}
                                        to={'#'}
                                    >
                                        <h3 className={styles.roomTitle}>{room.name}</h3>
                                        <p className={styles.roomDescription}>{room.description}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.chatContainer}>
                    <div className={styles.chatHeader}>
                        <h2>Room: {room}</h2>
                        <h3>Username: {auth?.info?.username}</h3>
                        <b>{countUser}</b>
                        <button onClick={disconnect}>Thoát phòng</button>
                    </div>

                    <div className={styles.chatMessages} ref={chatContainerRef}>
                        <ul>
                            {messages.map((msg, index) => (
                                <li key={index}>
                                    <div className={
                                        msg.content !== null && msg.sender !== undefined ?
                                            (msg.sender === auth?.info?.email ?
                                                `${styles.chatMessage} ${styles.chatMessageSelf}` :
                                                `${styles.chatMessage} ${styles.chatMessageOther}`) : ''}>
                                        <b>
                                            {msg.content === null ? '' : msg.sender === undefined ? '' : msg.sender + ": "}
                                        </b>
                                        <span>
                                            {msg.content}
                                        </span>
                                    </div>

                                    {msg?.bot && (
                                        <div className={`${styles.chatMessage} ${styles.chatBot}`}>
                                            <span>
                                                 <b>Bot: </b>{msg.bot}
                                            </span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.chatInput}>
                        <input
                            type="text"
                            value={userData.message}
                            onChange={handleMessageChange}
                            placeholder="Type your message here..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatScreen;
