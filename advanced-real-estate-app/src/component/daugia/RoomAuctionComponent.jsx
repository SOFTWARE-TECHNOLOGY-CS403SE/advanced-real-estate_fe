import React, {useEffect, useState} from 'react';
import styles from "../../assets/css/room-auction.module.css";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../redux/reducers/authReducer";
import handleAPINotToken from "../../apis/handleAPINotToken";
import {Link, useNavigate} from "react-router-dom";
import {message} from "antd";
import {add} from "../../redux/reducers/chatReducer";
import {appVariables} from "../../constants/appVariables";
import DetailAuctionModal from "./DetailAuctionModal";

const RoomAuctionComponent = ({pageSize}) => {

    const [auctionRooms, setAuctionRooms] = useState([]);
    const [auctionId, setAuctionId] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    // const pageSize = 3;

    const indexOfLast = currentPage * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentItems = auctionRooms.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(auctionRooms.length / pageSize);

    useEffect(() => {
        handleAPINotToken('/api/user/auctions', {}, 'get')
        .then(res => setAuctionRooms(res?.data))
        .catch(error => console.error("Fetch error: ",error));
    }, []);

    useEffect(() => {
        console.log(auctionRooms);
    }, [auctionRooms]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRoomChange = (roomId) => {
        if(!auth?.token){
            message.error("Bạn không thể vào phòng vui lòng đăng nhập để vào đấu giá!");
            return;
        }
        const data = {
            roomId: roomId,
            userData : {
                connected: true,
                message: "",
            }
        }
    };

    return (
        <div>
            <DetailAuctionModal auctionId={auctionId}/>
            <div className={styles.roomContainer}>
                {currentItems.map((item, index) => (
                    <div key={index} className={styles.roomCard}>
                        <img src={`data:${item?.building?.file_type};base64,${item?.building?.image}`}
                             alt={item?.building?.name} className={styles.roomImage}
                        />
                        <div className={styles.roomContent}>
                            <Link to={'#'}>
                                <div>
                                    <h3 className={styles.roomTitle}>
                                        <i className={`fa fa-balance-scale text-primary ${styles.titleIcon}`}></i>
                                        <span>
                                            {'Phiên ' + item.name}
                                        </span>
                                    </h3>
                                </div>
                                <div className={styles.timeContent}>
                                    <span className={styles.startEndTime}>
                                        <i className="fa fa-circle text-primary" id="exampleModalLabel"></i>
                                        {' Trạng thái:'} {
                                        appVariables.checkStatus(item?.start_date, item?.start_time, item?.end_time) ===
                                        appVariables.BEFORE ? (
                                                <span className={'text-primary'}>
                                                Chưa bắt đầu
                                            </span>) :
                                            appVariables.checkStatus(item?.start_date, item?.start_time, item?.end_time) ===
                                            appVariables.NOW ? (
                                                <span className={'text-success'}>
                                                Đang bắt đầu
                                            </span>) : (
                                                <span className={'text-danger'}>
                                                Đã kết thúc
                                            </span>
                                            )
                                    }
                                    </span>
                                </div>
                                <div className={styles.timeContent}>
                                    <span className={`${styles.startDate}`}>
                                        <i className="fa fa-money text-primary" id="exampleModalLabel"></i>
                                        <span>
                                            {' Giá khởi điểm:'}
                                        </span>
                                        <span className={'text-primary'}>
                                            {' ' + appVariables.formatMoney(item?.building?.price)}
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.timeContent}>
                                    <i className="fa fa-calendar text-primary" id="exampleModalLabel"></i>
                                    <span className={styles.startDate}>{' Ngày bắt đầu: ' + item.start_date}</span>
                                </div>
                                <div className={styles.timeContent}>
                                    <span className={styles.startEndTime}>
                                        <i className="fa fa-clock text-primary" id="exampleModalLabel"></i>
                                        {` Thời gian đấu giá: ${item.start_time} - ${item.end_time}`}
                                    </span>
                                </div>
                                {/*<p className={styles.roomDescription}>{item.description}</p>*/}
                            </Link>
                            <div className={styles.linkContainer}>
                                <Link onClick={() => handleRoomChange(item.id)}
                                      className={styles.linkJoin} to={'#'}>
                                    VÀO NGAY
                                </Link>
                                <Link type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#auctionDetailModal"
                                    className={styles.linkDetail}
                                    onClick={()=>{setAuctionId(item?.id)}}
                                    to={`#`}>
                                    XEM CHI TIẾT
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="pagination mt-4">
                {Array.from({length: totalPages}, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`btn btn-primary mx-1 ${currentPage === i + 1 ? "active" : ""}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RoomAuctionComponent;