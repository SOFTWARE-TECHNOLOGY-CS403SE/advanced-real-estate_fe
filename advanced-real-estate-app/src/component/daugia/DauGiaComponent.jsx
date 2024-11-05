import React, {useEffect, useRef, useState} from 'react';
import styles from '../../assets/css/daugia.module.css';
import {appInfo} from "../../constants/appInfos";
import {appVariables} from "../../constants/appVariables";

const DauGiaComponent = () => {


    const [bidAmount, setBidAmount] = useState(0);
    const [highestBid, setHighestBid] = useState(100);
    const chatMessagesRef = useRef(null);
    const messages = [
        { user: "Người dùng 1", text: "đã đấu giá 100 tỷ" },
        { user: "Người dùng 2", text: "đã đấu giá 100 tỷ" },
        { user: "Người dùng 2", text: "đã đấu giá 100 tỷ" },
        { user: "Người dùng 2", text: "đã đấu giá 100 tỷ" },
        { user: "Người dùng 2", text: "đã đấu giá 100 tỷ" },
        { user: "Người dùng 2", text: "đã đấu giá 100 tỷ" },
        { user: "Người dùng 2", text: "đã đấu giá 100 tỷ" },
        { user: "Người dùng 2", text: "đã đấu giá 100 tỷ" },

    ];

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleBidSubmit = () => {
        const newBid = parseFloat(bidAmount);
        if (newBid > highestBid) {
            setHighestBid(newBid);
            setBidAmount(newBid);
        }
    };

    const handleBidChange = (e) => {
        setBidAmount(parseFloat(e.target.value) || 0);
    };

    const handleIncrement = () => {
        setBidAmount((prevBid) => prevBid + 100000);
    };

    const handleDecrement = () => {
        setBidAmount((prevBid) => Math.max(0, prevBid - 100000));
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h1 className={styles.auctionTitle}>Đấu giá nhà</h1>
                <div className={styles.dates}>
                    <p className={styles.startDate}>Thời gian bắt dầu: </p>
                    <p className={styles.endDate}>Thời gian kết thúc: </p>
                </div>
            </div>

            <div className={styles.columnsContainer}>
                <div className={styles.auctionColumn}>
                    <div className={styles.itemSection}>
                        <img src={appInfo.nha1} alt="Auction Item" className={styles.itemImage}/>
                        <div className={styles.itemSection}>
                            <div className={styles.itemDescription}>
                                <h4>Tên nhà:</h4>
                            </div>
                            <div className={styles.itemDescription}>
                                <b>Gía gốc:</b>
                            </div>
                            <div className={styles.itemDescription}>
                                <span>Loại nhà: nhà đấu giá</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bidColumn}>
                    <div className={styles.timeSection}>
                        <p className={styles.timeRemaining}>Thời gian đấu giá còn lại: </p>
                    </div>
                    <div className={styles.bidSection}>
                    <p className={styles.currentBid}>
                            Gía khởi điểm của bạn: {appVariables.formatMoney(highestBid)}
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
                    <p className={styles.userTitle}>NHỮNG NGƯỜI TRONG PHÒNG</p>
                    <p className={styles.userName}>người dùng 1</p>
                    <p className={styles.userName}>người dùng 2</p>
                    <p className={styles.userName}>người dùng 3</p>
                    <div className={styles.chatContent}>
                        <div className={styles.chatMessages} ref={chatMessagesRef}>
                            {messages.map((msg, index) => (
                                <div className={styles.message} key={index}>
                                    <span className={styles.messageUser}>{msg.user}:</span>
                                    <span className={styles.messageText}>{msg.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DauGiaComponent;