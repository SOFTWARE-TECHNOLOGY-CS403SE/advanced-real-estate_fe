import React, {useEffect, useState} from 'react';
import MapAdminComponent from "../../component/map/MapAdminComponent";
import {Button, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../redux/reducers/authReducer";
import {useNavigate} from "react-router-dom";
import handleAPI from "../../apis/handlAPI";
import {appVariables} from "../../constants/appVariables";

const AuctionScreen = () => {

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auctions, setAuctions] = useState([]);
    const [editing, setEditing] = useState(null);
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        refresh().then();
    }, [auth?.token]);

    useEffect(() => {
        console.log(editing);
    }, [editing]);

    useEffect(() => {
        handleAPI("/api/admin/buildings", {}, "get", auth?.token)
            .then(res => {
                setBuildings(res?.data);
            })
            .catch(error=> {
                message.error("Fetch error: ", error);
                console.log("Fetch error: ", error);
            });
    }, [auth?.token]);

    const refresh = async () =>{
        return await handleAPI("/api/admin/auctions", {}, "get", auth?.token)
            .then(res => {
                setAuctions(res?.data);
            })
            .catch(error=> {
                message.error("Fetch error: ", error);
                console.log("Fetch error: ", error);
            });
    }

    const handleEditClick = (item) => {
        setEditing({
            id: item?.id,
            name: item?.name,
            start_date: item?.start_date,
            start_time: item?.start_time,
            end_time: item?.end_time,
            description: item?.description,
            building_id: item?.building?.id,
        });
    };

    const handleCloneClick = (item) => {
        setEditing({
            id: item?.id,
            name: item?.name,
            start_date: item?.start_date,
            start_time: item?.start_time,
            end_time: item?.end_time,
            description: item?.description,
            building_id: item?.building?.id,
        });
    };

    const handleClone = async () => {
        setEditing(null);
        console.log(editing);
        const payload = {
            name: editing?.name,
            start_date: editing?.start_date,
            start_time: editing?.start_time,
            end_time: editing?.end_time,
            description: editing?.description,
            building_id: editing?.building_id,
        }
        await handleAPI(`/api/admin/auctions`, payload, "post", auth?.token)
            .then(res => message.success("Clone successfully!"))
            .catch(error=> {
                message.error("Clone error: ", error);
                console.log("Clone error: ", error);
            });
        await refresh();
    };

    const handleSaveClick = async (id) => {
        setEditing(null);
        console.log(id);
        console.log(editing);
        const payload = {
            name: editing?.name,
            start_date: editing?.start_date,
            start_time: editing?.start_time,
            end_time: editing?.end_time,
            description: editing?.description,
            building_id: editing?.building_id
        }
        await handleAPI(`/api/admin/auctions/${id}`, payload, "patch", auth?.token)
            .then(res => {
                message.success("Update successfully!");
            })
            .catch(error=> {
                message.error("Update error: ", error);
                console.log("Update error: ", error);
            });
        await refresh();
    };

    const deleteById = async (id) =>{
        await handleAPI(`/api/admin/auctions/${id}`, {}, "delete", auth?.token)
            .then(res => message.success("Delete successfully!"))
            .catch(error=> {
                message.error("Delete error: ", error);
                console.log("Delete error: ", error);
            });
        await refresh();
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">Danh Sách phiên đấu giá</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th className="align-middle text-center">ID</th>
                                <th className="align-middle text-center">Ảnh nhà</th>
                                <th className="align-middle text-center">Tên phiên đấu giá</th>
                                <th className="align-middle text-center">Nhà đấu giá</th>
                                <th className="align-middle text-center">Trạng thái</th>
                                <th className="align-middle text-center">Ngày bắt đầu</th>
                                <th className="align-middle text-center">Thời gian bắt đầu</th>
                                <th className="align-middle text-center">Thời gian kết thúc</th>
                                <th className="align-middle text-center">Mô tả</th>
                                <th colSpan={"3"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                auctions?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.id}</td>
                                        <td>
                                            <img
                                                src={`data:${item?.building?.file_type};base64,${item?.building?.image}`}
                                                alt={item?.building?.file_type} width={"200px"}
                                            />
                                        </td>
                                        <td>
                                            {editing?.id === item.id ? (
                                                <input
                                                    type="text"
                                                    value={`${editing.name}`}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        name: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={item.name} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {
                                                appVariables.checkStatus(item?.start_date, item?.start_time, item?.end_time)
                                                === appVariables.BEFORE ? (
                                                    <span className={'text-warning'}>
                                                        Chưa bắt đầu
                                                    </span>) :
                                                appVariables.checkStatus(item?.start_date, item?.start_time, item?.end_time)
                                                === appVariables.NOW ? (
                                                    <span className={'text-success'}>
                                                        Đang bắt đầu
                                                    </span>) : (
                                                    <span className={'text-danger'}>
                                                        Đã kết thúc
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {editing?.id === item.id ? (
                                                <select name="building_id" onChange={(e) => {
                                                    setEditing({
                                                        ...editing,
                                                        building_id: e.target.value
                                                    });
                                                }}>
                                                    <option value={item?.building?.id}>
                                                        {item?.building?.name}
                                                    </option>
                                                    {buildings.map((building, index) => (
                                                        <option key={index} value={building?.id}>
                                                            {building?.name} - {building?.type} - {building?.status}
                                                        </option>
                                                    ))
                                                    }
                                                </select>
                                            ) : (
                                                <textarea value={`${item?.building?.name} - ${item?.building?.type}`}
                                                          readOnly/>
                                            )}

                                        </td>
                                        <td>
                                            {editing?.id === item.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.start_date}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        start_date: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={item.start_date} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === item.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.start_time}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        start_time: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={item.start_time} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === item.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.end_time}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        end_time: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={item.end_time} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === item.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.description}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        description: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={item.description} readOnly/>
                                            )}
                                        </td>
                                        {editing?.id === item.id ?
                                            <td>
                                                <Button className={'btn btn-danger'}
                                                        onClick={() => {
                                                            setEditing(null);
                                                        }}>
                                                    X
                                                </Button>
                                            </td>
                                            : null
                                        }
                                        <td>
                                            {editing?.id === item.id ? (
                                                <div>
                                                    <Button onClick={() => {
                                                        handleSaveClick(item.id).then()
                                                    }}>
                                                        Lưu
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        className={'btn btn-warning'}
                                                        onClick={() => handleEditClick(item)}>
                                                        Sửa
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === item.id ? (
                                                <div>
                                                    <Button onClick={handleClone}>
                                                        Tạo
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        className={'btn btn-success'}
                                                        onClick={() => handleCloneClick(item)}>
                                                        Nhân đôi
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <Button className={'btn btn-danger'}
                                                    onClick={() => {
                                                        deleteById(item?.id).then()
                                                    }}>
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionScreen;