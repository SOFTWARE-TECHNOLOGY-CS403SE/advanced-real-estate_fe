import React, {useEffect, useState} from 'react';
import handleAPINotToken from "../../apis/handleAPINotToken";
import {Link, useLocation} from "react-router-dom";
import {appInfo} from "../../constants/appInfos";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../redux/reducers/authReducer";
import {buildingSelector, failed, setSelectedArea, success} from "../../redux/reducers/buildingReducer";
import styles from "../../assets/css/building.module.css";
import {appVariables} from "../../constants/appVariables";
import Modal from "./Modal";

const BuildingComponent = () => {
    const buildingReducer = useSelector(buildingSelector);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const dispatch = useDispatch();
    const [filteredBuildings, setFilteredBuildings] = useState([]);
    const listPathNoFilterClick = appVariables.listPathNoFilterClick;
    const location = useLocation();

    const callApiBuildings = async () => {
        return await handleAPINotToken('/api/user/buildings', {}, 'get');
    }

    useEffect(() => {
        callApiBuildings()
            .then(res => dispatch(success(res?.data)))
            .catch(error => {
                dispatch(failed());
                console.error("Fetch error: ", error);
            });
    }, [dispatch]);

    useEffect(() => {
        const allBuildings = buildingReducer?.buildings || [];

        const filteredData = allBuildings.filter((building) => {
            const matchesType = buildingReducer?.selectedType ?
                building?.type === buildingReducer?.selectedType : true;
            const matchesArea = buildingReducer?.selectedArea ?
                building?.area === buildingReducer?.selectedArea : true;
            const matchesStructure = buildingReducer?.selectedStructure ?
                building?.structure === buildingReducer?.selectedStructure : true;
            const matchesPrice = buildingReducer?.inputPrice ?
                building?.price <= buildingReducer?.inputPrice : true;
            return matchesType && matchesArea && matchesStructure && matchesPrice;
        });
        setFilteredBuildings(filteredData);
    }, [
        buildingReducer?.buildings,
        buildingReducer?.selectedType,
        buildingReducer?.selectedArea,
        buildingReducer?.selectedStructure,
        buildingReducer?.inputPrice
    ]);

    const indexOfLastBuilding = currentPage * pageSize;
    const indexOfFirstBuilding = indexOfLastBuilding - pageSize;
    const currentBuildings = filteredBuildings.slice(indexOfFirstBuilding, indexOfLastBuilding);
    const totalPages = Math.ceil(filteredBuildings.length / pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if(buildingReducer?.isError){
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <div>
            <div className="container-xxl py-5">
                <div className="container">
                    <div
                        className="text-center wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{
                            visibility: "visible",
                            animationDelay: "0.1s",
                            animationName: "fadeInUp"
                        }}
                    >
                        <h6 className="section-title text-center text-primary text-uppercase">
                            {appInfo.title}
                        </h6>
                        <h1 className="mb-5">
                            NHÀ CỦA <span className="text-primary text-uppercase">CHÚNG TÔI</span>
                        </h1>
                    </div>
                    <div className="row g-4">

                        {!listPathNoFilterClick.includes(location.pathname) &&
                            <div>
                                <div
                                    className={styles.filterContainer}
                                    data-bs-toggle="modal"
                                    data-bs-target="#RemoveModal"
                                >
                                    <span className={`${styles.filterIcon} text-primary`}>
                                        <i className="fa fa-search"/>
                                    </span>
                                    <span className={`${styles.filterText}`}>
                                        BẤM VÀO ĐIỂM TÌM KIẾM
                                    </span>
                                </div>

                            </div>
                        }
                        <Modal/>

                        {currentBuildings.map((building, index) => (
                            <div
                                key={index}
                                className="col-lg-4 col-md-6 wow fadeInUp"
                                data-wow-delay="0.6s"
                                style={{
                                    visibility: "visible",
                                    animationDelay: "0.6s",
                                    animationName: "fadeInUp"
                                }}>
                                <div className="room-item shadow rounded overflow-hidden">
                                    <div className="position-relative">
                                        <img className="img-fluid"
                                             src={`data:${building?.file_type};base64,${building?.image}`}
                                             alt={building?.file_type}/>
                                        <small
                                            className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                                            <i className="fa fa-money text-default me-2"/>
                                            {" "+appVariables.formatMoney(building?.price)}
                                        </small>
                                    </div>
                                    <div className="p-4 mt-2">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">{building?.name}</h5>
                                            <div className="ps-2">
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                                <small className="fa fa-star text-primary"/>
                                            </div>
                                        </div>
                                        <div className="d-flex mb-3">
                                            <small className="border-end me-3 pe-3">
                                                <i className="fa fa-home text-primary me-2"/>
                                                {building?.structure}
                                            </small>
                                            <small className="border-end me-3 pe-3">
                                                <i className="fa fa-arrows text-primary me-2"/>
                                                {`Diện tích ${building?.area}`}
                                            </small>
                                            <small>
                                                <i className="fa fa-home text-primary me-2"/>
                                                {`Số tầng ${building?.number_of_basement}`}
                                            </small>
                                            <small>
                                                <i className="fa fa-circle text-primary me-2"/>
                                                {`Loại nhà ${building?.type}`}
                                            </small>
                                            <small>
                                                <i className="fa fa-map-marker text-primary me-2"/>
                                                {`Đường ${building?.map?.address}`}
                                            </small>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <Link className="btn btn-sm btn-primary rounded w-100"
                                                  to={`/buildings/${building?.id}`}>
                                                XEM CHI TIẾT
                                            </Link>
                                        </div>
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
            </div>
        </div>
    );
};
export default BuildingComponent;