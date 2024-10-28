import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Welcome} from "../../component";
import handleAPINotToken from "../../apis/handleAPINotToken";
import styles from "../../assets/building.module.css";
import {Link} from "react-router-dom";


let stompClient = null;

const HomeScreen = () => {
    const [buildings, setBuildings] = useState([]);

    const callApiBuildings = async ()=>{
        return await handleAPINotToken('/api/user/buildings', {}, 'get');
    }

    useEffect(() => {
        callApiBuildings()
            .then(res => setBuildings(res?.data))
            .catch(error => console.error("Fetch error: ",error));
    }, []);

    return (
        <div>
            <Welcome/>
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
                            Our Buildings
                        </h6>
                        <h1 className="mb-5">
                            Explore Our <span className="text-primary text-uppercase">Buildings</span>
                        </h1>
                    </div>
                    <div className="row g-4">

                        {
                            buildings.map((building, index) => (
                                <div
                                    key={index}
                                    className="col-lg-4 col-md-6 wow fadeInUp"
                                    data-wow-delay="0.6s"
                                    style={{
                                        visibility: "visible",
                                        animationDelay: "0.6s",
                                        animationName: "fadeInUp"
                                    }}
                                >
                                    <div className="room-item shadow rounded overflow-hidden">
                                        <div className="position-relative">
                                            <img className="img-fluid" src={`data:${building?.file_type};base64,${building?.image}`} alt={building?.file_type}/>
                                            <small
                                                className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                                                $100/Night
                                            </small>
                                        </div>
                                        <div className="p-4 mt-2">
                                            <div className="d-flex justify-content-between mb-3">
                                                <h5 className="mb-0">
                                                    {building?.name}
                                                </h5>
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
                                                    <i className="fa fa-hotel text-primary me-2"/>
                                                    {building?.structure}
                                                </small>
                                                <small className="border-end me-3 pe-3">
                                                    <i className="fa fa-home text-primary me-2"/>
                                                    {`Diện tích ${building?.area}`}
                                                </small>
                                                <small>
                                                    <i className="fa fa-home text-primary me-2"/>
                                                    {`Số tầng ${building?.number_of_basement}`}
                                                </small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <Link className="btn btn-sm btn-primary rounded w-100" to={"/"}>
                                                    View Detail
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomeScreen;
