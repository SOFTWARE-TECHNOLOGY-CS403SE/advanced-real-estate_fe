import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../redux/reducers/authReducer";
import {Link, useNavigate} from "react-router-dom";
import handleAPINotToken from "../../apis/handleAPINotToken";
import {message} from "antd";
import {appVariables} from "../../constants/appVariables";

const DetailAuctionModal = ({auctionId}) => {

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auction, setAuction] = useState(null);

    useEffect(() => {
        if(auctionId){
            handleAPINotToken(`/api/user/auctions/${auctionId}`, {}, 'GET')
                .then(res=>{
                    console.log(res?.data);
                    setAuction(res?.data);
                })
                .catch(error=>{
                    console.log(error);
                    message.error(error.message);
                });
        }
    }, [auctionId]);

    const handleRedirectDetailBuilding = () => {
        window.location.pathname = `/buildings/${auction?.building?.id}`;
    };

    return (
        <div>
            <div className="modal fade" id="auctionDetailModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <i className="fa fa-balance-scale text-primary" id="exampleModalLabel"></i>
                            <b style={{paddingLeft: 5}}>Chi tiết phiên đấu giá {" "}</b>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-md-12">
                                <h3>Phiên {auction?.name}</h3>
                                <h3>Ngày bắt đầu: {auction?.start_date}</h3>
                                <h3>Thời hạn đấu giá: {`${auction?.start_time} - ${auction?.end_time}`}</h3>
                                <h3>Mô tả: {auction?.description}</h3>
                                <div>
                                    <h3>Thông tin nhà đấu giá</h3>
                                    <b>Nhà đấu giá: {auction?.building?.name}</b>
                                    <br/>
                                    <b>Diện tích nhà: {auction?.building?.area}</b>
                                    <br/>
                                    <b>Kiến trúc nhà: {auction?.building?.structure}</b>
                                    <br/>
                                    <b>Số tầng: {auction?.building?.number_of_basement}</b>
                                    <br/>
                                    <b>Giá khởi điểm: {appVariables.formatMoney(auction?.building?.price)}</b>
                                    <br/>
                                    <b>Địa chỉ: {auction?.map?.map_name}</b>
                                    <br/>
                                    <b>Tính pháp lý: sổ đỏ đầy đủ</b>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link className="w-100 text-center"
                                  onClick={handleRedirectDetailBuilding}
                                  to={'#'}
                            >
                                XEM NHÀ NGAY
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailAuctionModal;