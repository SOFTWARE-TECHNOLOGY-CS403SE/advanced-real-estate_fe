import React from 'react';

const BuildingScreen = () => {
    return (
        <div>
            <div className="card">
                <div className="card-header">Danh Sách tòa nhà</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th className="align-middle text-center">ID</th>
                                <th className="align-middle text-center">Tên nhà</th>
                                <th className="align-middle text-center">Kiến trúc</th>
                                <th className="align-middle text-center">cấp độ</th>
                                <th className="align-middle text-center">vị trí</th>
                                <th className="align-middle text-center">kiểu</th>
                                <th className="align-middle text-center">mô tả</th>
                                <th className="align-middle text-center">số tầng hầm</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildingScreen;