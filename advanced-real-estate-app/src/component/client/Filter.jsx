import React from 'react';

const Filter = () => {
    return (
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
                <div className="bg-white shadow" style={
                    {
                        padding: 35,
                        marginTop: "120px"
                    }
                }>
                    <div className="row g-2">
                        <div className="col-md-10">
                            <div className="row g-2">
                                <h2>TÌM KIẾM</h2>
                                <div className="col-md-3">
                                    <select className="form-select">
                                        <option selected="">Loại nhà</option>
                                        <option value={1}>Adult 1</option>
                                        <option value={2}>Adult 2</option>
                                        <option value={3}>Adult 3</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select">
                                        <option selected="">Child</option>
                                        <option value={1}>Child 1</option>
                                        <option value={2}>Child 2</option>
                                        <option value={3}>Child 3</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select">
                                        <option selected="">Child</option>
                                        <option value={1}>Child 1</option>
                                        <option value={2}>Child 2</option>
                                        <option value={3}>Child 3</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select">
                                        <option selected="">Child</option>
                                        <option value={1}>Child 1</option>
                                        <option value={2}>Child 2</option>
                                        <option value={3}>Child 3</option>
                                    </select>
                                </div>

                                <div className="col-md-12">
                                    <button className="btn btn-primary w-100">TÌM</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Filter;