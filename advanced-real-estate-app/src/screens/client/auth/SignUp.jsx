import React from 'react';
import {appInfo} from "../../../constants/appInfos";

const SignUp = () => {

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
                            ĐĂNG KÝ <span className="text-primary text-uppercase">TÀI KHOẢN</span>
                        </h1>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="row g-3">
                                <div className="col-6 text-start">
                                    <img
                                        className="img-fluid rounded w-100 wow zoomIn"
                                        data-wow-delay="0.3s"
                                        src="img/about-2.jpg"
                                        style={{
                                            visibility: "visible",
                                            animationDelay: "0.3s",
                                            animationName: "zoomIn"
                                        }}
                                    />
                                </div>
                                <div className="col-6 text-start">
                                    <img
                                        className="img-fluid rounded w-100 wow zoomIn"
                                        data-wow-delay="0.3s"
                                        src="img/about-2.jpg"
                                        style={{
                                            visibility: "visible",
                                            animationDelay: "0.3s",
                                            animationName: "zoomIn"
                                        }}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div
                                className="wow fadeInUp"
                                data-wow-delay="0.2s"
                                style={{
                                    visibility: "visible",
                                    animationDelay: "0.2s",
                                    animationName: "fadeInUp"
                                }}
                            >
                                <div className="row g-3">
                                    <div className="col-md-12">
                                    <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Your Name"
                                            />
                                            <label htmlFor="name">TÊN CỦA BẠN</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Your Email"
                                            />
                                            <label htmlFor="email">EMAIL</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Your password"
                                            />
                                            <label htmlFor="password">Mật khẩu</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">
                                            ĐĂNG KÝ NGAY
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;