import React from "react";

const AdminScreen = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">Danh Sách User</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="align-middle text-center">STT</th>
                                    <th className="align-middle text-center">Last Name</th>
                                    <th className="align-middle text-center">First Name</th>
                                    <th className="align-middle text-center">User Name</th>
                                    <th className="align-middle text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminScreen;
