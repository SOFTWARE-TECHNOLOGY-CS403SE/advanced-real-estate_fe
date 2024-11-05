import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import styles from "../../assets/css/building.module.css";
import {appVariables} from "../../constants/appVariables";
import handleAPI from "../../apis/handlAPI";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../redux/reducers/authReducer";
import {message} from "antd";
import {
    addBuildingDetails,
    buildingSelector,
    removeBuildingDetails,
    setBuildingDetails
} from "../../redux/reducers/buildingReducer";
import handleAPINotToken from "../../apis/handleAPINotToken";
import LeafLetMapComponent from "../../component/map/LeafLetMapComponent";

const BuildingDetailScreen = () => {

    const { id } = useParams();
    const buildingReducer = useSelector(buildingSelector);
    const [building, setBuilding] = useState(null);
    const auth = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    const fetchData = async ()=> {
        try {
            const res = await handleAPI(`/api/user/buildings/${id}`, {}, "get");
           setBuilding(res?.data);
            console.log(res?.data);
        } catch (error) {
            console.log("error: ",error);
        }
    }

    useEffect(() => {
        fetchData().then();
    }, [id]);

    useEffect(() => {
        // console.log(building);
    }, [building]);
    
    const handleClickKyHopDong = () => {
      if(!auth?.info?.firstName ||
          !auth?.info?.lastName ||
          !auth?.info?.birthday ||
          !auth?.info?.gender ||
          !auth?.info?.phoneNumber ||
          !auth?.info?.address){
          message.error("Vui lòng cập nhật đầy đủ thông tin cá nhân của bạn để ký hợp đồng!");
          navigate("/user/info");
          return;
      }
      dispatch(addBuildingDetails(building));
    }

    const getLocationData = async (lat, lon) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
        try {
            const data = await handleAPINotToken(url, {}, 'GET');

            // console.log(data);
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }


    return (
        <div style={
            {
                paddingTop: "150px"
            }
        }
        >
            <div className="container-xxl py-5">
                <div className="container">

                    <div className="row g-4">
                        {/* Carousel Section */}
                        <div id="carouselExample" className="carousel slide mb-4" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0"
                                        className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"
                                        aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"
                                        aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        src={`data:${building?.file_type};base64,${building?.image}`}
                                        alt={building?.file_type}
                                        className="d-block w-100 rounded"
                                        style={{
                                            height: "500px",
                                            objectFit: "cover",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                        }}
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src={`data:${building?.file_type};base64,${building?.image}`}
                                        alt={building?.file_type}
                                        className="d-block w-100 rounded"
                                        style={{
                                            height: "500px",
                                            objectFit: "cover",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                        }}
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src={`data:${building?.file_type};base64,${building?.image}`}
                                        alt={building?.file_type}
                                        className="d-block w-100 rounded"
                                        style={{
                                            height: "500px",
                                            objectFit: "cover",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                        }}
                                    />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                    data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                    data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* Details Section */}
                        <div className="col-12">
                            <div className="p-4 border rounded bg-light shadow-sm">
                                <h3 className="mb-3">{building?.name}</h3>
                                <div className="row mb-2">
                                    <div className="col-md-12 mb-3">
                                        <i className="fa fa-circle text-primary me-2"/>
                                        <strong>Loại nhà:</strong> {building?.type}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <i className="fa fa-arrows text-primary me-2"/>
                                        <strong>Diện tích:</strong> {building?.area}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <i className="fa fa-money text-primary me-2"/>
                                        <strong>Gía:</strong> {appVariables.formatMoney(building?.price)}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <i className="fa fa-home text-primary me-2"/>
                                        <strong>Kiến trúc:</strong> {building?.structure}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <i className="fa fa-home text-primary me-2"/>
                                        <strong>Số tầng:</strong> {building?.number_of_basement}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <i className="fa fa-map-marker text-primary me-2"/>
                                        <strong>Địa chỉ:</strong> {building?.map?.map_name}
                                    </div>

                                </div>
                                <h4 className="mt-3">Mô tả: </h4>
                                <p className={`text-muted ${isExpanded ? '' : styles.collapsedDescription}`}>
                                    {building?.description}
                                </p>
                                <Link onClick={toggleDescription} to={'#'}>
                                    {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                                </Link>
                                <div style={{ paddingTop: '20px' }}>
                                    <LeafLetMapComponent latitude={building?.map?.latitude}
                                                         longitude={building?.map?.longitude}
                                    />
                                </div>
                                <div style={{ paddingTop: '20px' }}>
                                    <button className={"btn btn-primary"}
                                            onClick={handleClickKyHopDong}>
                                        Ký hợp đồng ngay
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default BuildingDetailScreen;