import React, {useEffect, useRef, useState} from 'react';
import styles from '../../assets/css/daugia.module.css';
import {appInfo} from "../../constants/appInfos";
import {appVariables} from "../../constants/appVariables";
import {useDispatch, useSelector} from "react-redux";
import {
    addBidMessages,
    auctionSelector,
    removeBidMessages,
    updatedAuctionRoom
} from "../../redux/reducers/auctionReducer";
import {authSelector} from "../../redux/reducers/authReducer";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {update} from "../../redux/reducers/chatReducer";
import RoomAuctionComponent from "./RoomAuctionComponent";

let stompClient= appVariables.stompClient;
const DauGiaComponent = () => {


    const chatMessagesRef = useRef(null);
    const dispatch = useDispatch();
    const auctionReducer = useSelector(auctionSelector);
    const auth = useSelector(authSelector);
    const userData = auctionReducer?.userData;
    const roomId = auctionReducer?.roomId;
    const [messages, setMessages] = useState([]);
    const [countUser, setCountUser] = useState("");
    const [timeLeft, setTimeLeft] = useState('');
    const [bidAmount, setBidAmount] = useState(0.0);
    const [highestBid, setHighestBid] = useState(0.0);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [auctionReducer?.bidMessages]);

    useEffect(() => {
        if (userData.connected) {
            connect();
        }
    }, [userData.connected, roomId]);

    useEffect(() => {
        setBidAmount(parseFloat(auctionReducer?.auction?.price));
        setHighestBid(parseFloat(auctionReducer?.auction?.price));
    }, [userData.connected, roomId]);

    useEffect(() => {
        const interval = setInterval(() => {
            const countdown = appVariables.calculateCountdownAuction(
                auctionReducer?.auction?.start_time,
                auctionReducer?.auction?.end_time,
                dispatch,
                updatedAuctionRoom
            );
            setTimeLeft(countdown);
        }, 1000);
        return () => clearInterval(interval);
    }, [
        auctionReducer?.auction?.start_time,
        auctionReducer?.auction?.end_time
    ]);

    useEffect(() => {
        console.log(auctionReducer?.bidMessages);
    }, [auctionReducer?.bidMessages]);

    const connect = () => {
        const socket = new SockJS("http://localhost:9090/ws");
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                // console.log("debug: " + str);
            },
            onConnect: () => {
                // console.log("WebSocket connected!");
                onConnected();
            },
            onStompError: (frame) => {
                console.error("ERROR STOMP:", frame);
            },
            onWebSocketClose: (event) => {
                dispatch(updatedAuctionRoom({
                    connected: false,
                }));
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
        stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
            onMessageReceived(message).then();
        });

        stompClient.publish({
            destination: `/app/userJoinAuction/${roomId}`,
            body: JSON.stringify({
                sender: auth?.info?.email,
                email: auth?.info?.email,
                type: "JOIN", roomId
            }),
        });
    };

    const disconnect = async () => {
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/app/leaveRoom/${roomId}`,
                body: JSON.stringify({
                    sender: auth?.info?.username,
                    email: auth?.info?.email,
                    type: 'LEAVE'
                })
            });
            stompClient.deactivate();
            dispatch(updatedAuctionRoom({
                connected: false,
            }));
            setMessages([]);
        } else {
            dispatch(updatedAuctionRoom({
                connected: false,
            }));
            console.log("WebSocket is already disconnected.");
        }
    };

    const onMessageReceived = async (payload) => {
        const message = JSON.parse(payload.body);
        console.log("msg: ", message);
        dispatch(addBidMessages(message));
        if(message?.count){
            setCountUser(message?.count);
        }
        // console.log(auctionReducer?.bidMessages);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleBidSubmit = () => {
        const newBid = parseFloat(bidAmount);
        if(newBid < highestBid) {
            appVariables.toast_notify_error("Bạn không được đấu giá thấp hơn giá khởi điểm!");
            return;
        }
        if(newBid === highestBid){
            appVariables.toast_notify_error("Bạn không được đấu giá bằng giá khởi điểm!");
            return;
        }
        if (newBid > highestBid) {
            setHighestBid(newBid);
            setBidAmount(newBid);
            if (stompClient && stompClient.connected) {
                const chatMessage = {
                    sender: auth?.info?.email,
                    email: auth?.info?.email,
                    content: `${newBid}`,
                    type: "AUCTION",
                    roomId,
                };
                stompClient.publish({
                    destination: `/app/sendBidToRoom/${roomId}`,
                    body: JSON.stringify(chatMessage),
                });
            } else {
                console.log("STOMP connection is not established yet.");
            }
        }
    };

    const handleBidChange = (e) => {
        const bidAmount = parseFloat(e.target.value);
        setBidAmount(bidAmount || 0);
    };

    const deleteBidMessage = () => {
       dispatch(removeBidMessages());
    };

    const handleIncrement = () => {
        setBidAmount((prevBid) => prevBid + 1000000);
    };

    const handleDecrement = () => {
        const originPrice = parseFloat(auctionReducer?.auction?.price);
        setBidAmount((prevBid) => {
            if(bidAmount < originPrice){
                appVariables.toast_notify_error("Bạn không được đấu giá thấp hơn giá khởi điểm!");
                return originPrice;
            }
            return Math.max(0, prevBid - 1000000);
        });
    };

    return (
        <div>
            {!userData.connected ?
            (
                <div>
                    <RoomAuctionComponent pageSize={4}/>
                </div>
            ) :
                (<div className={styles.container}>
                        <div className={styles.headerRow}>
                            <h1 className={styles.auctionTitle}>Phiên {auctionReducer?.auction?.nameAuction}</h1>
                            <button onClick={disconnect}>Rời phòng</button>
                            <button onClick={deleteBidMessage}>Xóa tin nhắn</button>
                            <div className={styles.dates}>
                                <p className={styles.startDate}>Ngày bắt đầu: {auctionReducer?.auction?.start_date}</p>
                                <p className={styles.startDate}>Thời hạn đấu giá:
                                    {` ${auctionReducer?.auction?.start_time} - ${auctionReducer?.auction?.end_time}`}
                                </p>
                            </div>
                        </div>
                        <div className={styles.chatContent}>
                            <div className={styles.chatMessages} ref={chatMessagesRef}>
                                {auctionReducer?.bidMessages?.map((msg, index) => (
                                    <div className={styles.message} key={index}>
                                        {msg?.sender ? (
                                            <div>
                                                <div className={msg.content !== null && msg.sender !== undefined
                                                    ? (msg.sender === auth?.info?.email
                                                        ? `${styles.messageText} ${styles.messageSelf}`
                                                        : `${styles.messageText} ${styles.messageOther}`)
                                                    : ''}>
                                                    <span className={styles.messageUser}>
                                                        {msg.sender}:
                                                    </span>
                                                        <span>
                                                        {' Vừa đấu giá: ' + appVariables.formatMoney(msg.content)}
                                                    </span>
                                                </div>
                                                <div className={styles?.timeMessage}>
                                                    <span>
                                                        {msg?.currentDateTime}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : ''}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.columnsContainer}>
                            <div className={styles.auctionColumn}>
                                <div className={styles.itemSection}>
                                    <img src={appInfo.nha1} alt="Auction Item" className={styles.itemImage}/>
                                    <div className={styles.itemSection}>
                                        <div className={styles.itemDescription}>
                                            <h4>Tên nhà: {auctionReducer?.auction?.name}</h4>
                                        </div>
                                        <div className={styles.itemDescription}>
                                        <b>Giá gốc: {appVariables.formatMoney(auctionReducer?.auction?.price)}</b>
                                        </div>
                                        <div className={styles.itemDescription}>
                                            <span>Loại nhà: {auctionReducer?.auction?.type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.bidColumn}>
                                <div className={styles.timeSection}>
                                    <p className={styles.timeRemaining}>
                                        Thời gian đấu giá còn lại: {timeLeft}
                                    </p>
                                </div>
                                <div className={styles.bidSection}>
                                    <p className={styles.currentBid}>
                                        Giá khởi điểm của bạn: {appVariables.formatMoney(highestBid)}
                                    </p>
                                    <button onClick={handleDecrement} className={styles.decrementButton}>−</button>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        onChange={handleBidChange}
                                        placeholder="Enter your bid"
                                        className={styles.bidInput}
                                    />
                                    <button onClick={handleIncrement} className={styles.incrementButton}>+</button>
                                    <button onClick={handleBidSubmit} className={styles.bidButton}>ĐẤU GIÁ</button>
                                </div>
                            </div>

                            <div className={styles.userColumn}>
                                <p className={styles.userTitle}>NHỮNG NGƯỜI TRONG PHÒNG: {countUser}</p>
                                <p className={styles.userName}>người dùng 1</p>
                                <p className={styles.userName}>người dùng 2</p>
                                <p className={styles.userName}>người dùng 3</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DauGiaComponent;