import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div className="container-fluid bg-dark px-0">
                <div className="row gx-0">
                    <div className="col-lg-3 bg-dark d-none d-lg-block">
                        <a
                            href="index.html"
                            className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
                        >
                            <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
                        </a>
                    </div>
                    <div className="col-lg-9">
                        <div className="row gx-0 bg-white d-none d-lg-flex">
                            <div className="col-lg-7 px-5 text-start">
                                <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                    <i className="fa fa-envelope text-primary me-2"/>
                                    <p className="mb-0">info@example.com</p>
                                </div>
                                <div className="h-100 d-inline-flex align-items-center py-2">
                                    <i className="fa fa-phone-alt text-primary me-2"/>
                                    <p className="mb-0">+012 345 6789</p>
                                </div>
                            </div>
                            <div className="col-lg-5 px-5 text-end">
                                <div className="d-inline-flex align-items-center py-2">
                                    <a className="me-3" href="">
                                        <i className="fab fa-facebook-f"/>
                                    </a>
                                    <a className="me-3" href="">
                                        <i className="fab fa-twitter"/>
                                    </a>
                                    <a className="me-3" href="">
                                        <i className="fab fa-linkedin-in"/>
                                    </a>
                                    <a className="me-3" href="">
                                        <i className="fab fa-instagram"/>
                                    </a>
                                    <a className="" href="">
                                        <i className="fab fa-youtube"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                            <a href="index.html" className="navbar-brand d-block d-lg-none">
                                <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
                            </a>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-between"
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to={"/"} className="nav-item nav-link active">
                                        Home
                                    </Link>
                                    <Link to={"/buildings"} className="nav-item nav-link">
                                        Building
                                    </Link>
                                    <Link to={"/chat"} className="nav-item nav-link">
                                        Chat
                                    </Link>
                                    <div className="nav-item dropdown">
                                        <Link
                                            to="#"
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            Pages
                                        </Link>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <Link to={'/'} className="dropdown-item">
                                                Booking
                                            </Link>
                                            <Link to={'/'} className="dropdown-item">
                                                Our Team
                                            </Link>
                                            <Link to={'/'} className="dropdown-item">
                                                Testimonial
                                            </Link>
                                        </div>
                                    </div>
                                    <Link className="nav-item nav-link" to={'/contact'}>
                                        Contact
                                    </Link>
                                </div>
                                <a
                                    href="https://htmlcodex.com/hotel-html-template-pro"
                                    className="btn btn-primary rounded-0 py-4 px-md-5 d-none d-lg-block"
                                >
                                    Premium Version
                                    <i className="fa fa-arrow-right ms-3"/>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0 mb-5">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active carousel-item-start">
                            <img className="w-100" src="img/carousel-1.jpg" alt="Image"/>
                            <div
                                className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: 700}}>
                                    <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                                        Luxury Living
                                    </h6>
                                    <h1 className="display-3 text-white mb-4 animated slideInDown">
                                        Discover A Brand Luxurious Hotel
                                    </h1>
                                    <a
                                        href=""
                                        className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                                    >
                                        Our Rooms
                                    </a>
                                    <a
                                        href=""
                                        className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                                    >
                                        Book A Room
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item carousel-item-next carousel-item-start">
                            <img className="w-100" src="img/carousel-2.jpg" alt="Image"/>
                            <div
                                className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: 700}}>
                                    <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                                        Luxury Living
                                    </h6>
                                    <h1 className="display-3 text-white mb-4 animated slideInDown">
                                        Discover A Brand Luxurious Hotel
                                    </h1>
                                    <a
                                        href=""
                                        className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                                    >
                                        Our Rooms
                                    </a>
                                    <a
                                        href=""
                                        className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                                    >
                                        Book A Room
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#header-carousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#header-carousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div
                className="container-fluid booking pb-5 wow fadeIn"
                data-wow-delay="0.1s"
                style={{
                    visibility: "visible",
                    animationDelay: "0.1s",
                    animationName: "fadeIn"
                }}
            >
                <div className="container">
                    <div className="bg-white shadow" style={{padding: 35}}>
                        <div className="row g-2">
                            <div className="col-md-10">
                                <div className="row g-2">

                                    <div className="col-md-6">
                                        <select className="form-select">
                                            <option selected="">Loại nhà</option>
                                            <option value={1}>Adult 1</option>
                                            <option value={2}>Adult 2</option>
                                            <option value={3}>Adult 3</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <select className="form-select">
                                            <option selected="">Căn hộ</option>
                                            <option value={1}>Child 1</option>
                                            <option value={2}>Child 2</option>
                                            <option value={3}>Child 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary w-100">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;