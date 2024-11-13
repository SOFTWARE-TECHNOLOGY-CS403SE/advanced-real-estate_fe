import React, {useEffect, useState} from 'react';
import {Button, message} from "antd";
import {useSelector} from "react-redux";
import {authSelector} from "../../redux/reducers/authReducer";
import handleAPI from "../../apis/handlAPI";
import MapAdminComponent from "../../component/map/MapAdminComponent";
import handleAPINotToken from "../../apis/handleAPINotToken";
import {appVariables} from "../../constants/appVariables";

const MapScreen = () => {

    const [maps, setMaps] = useState([]);
    const auth = useSelector(authSelector);
    const [editing, setEditing] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { coords } = position;
                    setCurrentLocation(coords);
                },
                (error) => {
                    console.log("Error getting location: " + error.message);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const refresh = async () =>{
        return await handleAPI("/api/admin/maps", {}, "get", auth?.token)
        .then(res => {
            setMaps(res?.data);
        })
        .catch(error=> {
            message.error("Fetch error: ", error);
            console.log("Fetch error: ", error);
        });
    }

    const handleEditClick = (map) => {
        setEditing({
            id: map?.id,
            map_name: map?.map_name,
            latitude: map?.latitude,
            longitude: map?.longitude,
            address: map?.address,
            province: map?.province,
            district: map?.district,
            ward: map?.ward,
        });
    };

    const handleCloneClick = (map) => {
        setEditing({
            id: map?.id,
            map_name: map?.map_name,
            latitude: map?.latitude,
            longitude: map?.longitude,
            address: map?.address,
            province: map?.province,
            district: map?.district,
            ward: map?.ward,
        });
    };


    const handleClone = async () => {
        setEditing(null);
        console.log(editing);
        const payload = {
            map_name: editing?.map_name,
            latitude: editing?.latitude,
            longitude: editing?.longitude,
            address: editing?.address,
            province: editing?.province,
            district: editing?.district,
            ward: editing?.ward,
        }
        await handleAPI(`/api/admin/maps`, payload, "post", auth?.token)
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
            map_name: editing?.map_name,
            latitude: editing?.latitude,
            longitude: editing?.longitude,
            address: editing?.address,
            province: editing?.province,
            district: editing?.district,
            ward: editing?.ward,
        }
        await handleAPI(`/api/admin/maps/${id}`, payload, "patch", auth?.token)
            .then(res => {
                message.success("Update successfully!");
            })
            .catch(error=> {
                message.error("Update error: ", error);
                console.log("Update error: ", error);
            });
        await refresh();
    };

    useEffect(() => {
        refresh().then();
    }, [auth?.token]);

    const deleteById = async (id) =>{
        await handleAPI(`/api/admin/maps/${id}`, {}, "delete", auth?.token)
            .then(res => message.success("Delete successfully!"))
            .catch(error=> {
                message.error("Delete error: ", error);
                console.log("Delete error: ", error);
            });
        await refresh();
    }

    return (
        <div>
            <div>
                <MapAdminComponent />
            </div>
            <div className="card">
                <div className="card-header">Danh Sách Địa chỉ của tòa nhà</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th className="align-middle text-center">ID</th>
                                <th className="align-middle text-center">Tên map</th>
                                <th className="align-middle text-center">Khoảng cách</th>
                                <th className="align-middle text-center">Vĩ độ</th>
                                <th className="align-middle text-center">Kinh độ</th>
                                <th className="align-middle text-center">Địa chỉ cụ thể</th>
                                <th className="align-middle text-center">Tỉnh</th>
                                <th className="align-middle text-center">Huyện</th>
                                <th className="align-middle text-center">Xã</th>
                                <th colSpan={"3"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                maps?.map((map, index) => (
                                    <tr key={index}>
                                        <td>{map?.id}</td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.map_name}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        map_name: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={map.map_name} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {`${appVariables.calculateDistance(
                                                currentLocation?.latitude,
                                                currentLocation?.longitude,
                                                parseFloat(map?.latitude),
                                                parseFloat(map?.longitude)
                                            )?.toFixed(2)} km`}
                                        </td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.latitude}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        latitude: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={map.latitude} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.longitude}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        longitude: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={map.longitude} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.address}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        address: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={map.address} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.province}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        province: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={map.province} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.district}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        district: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={map.district} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <input
                                                    type="text"
                                                    value={editing.ward}
                                                    onChange={(e) => setEditing({
                                                        ...editing,
                                                        ward: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={map.ward} readOnly/>
                                            )}
                                        </td>
                                        {editing?.id === map.id ?
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
                                            {editing?.id === map.id ? (
                                                <div>
                                                    <Button onClick={() => {
                                                        handleSaveClick(map.id).then()
                                                    }}>
                                                        Lưu
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        className={'btn btn-warning'}
                                                        onClick={() => handleEditClick(map)}>
                                                        Sửa
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {editing?.id === map.id ? (
                                                <div>
                                                    <Button onClick={handleClone}>
                                                        Tạo
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        className={'btn btn-success'}
                                                        onClick={() => handleCloneClick(map)}>
                                                        Nhân đôi
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <Button className={'btn btn-danger'}
                                                    onClick={() => {
                                                        deleteById(map?.id).then()
                                                    }}
                                            >Xóa</Button>
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

export default MapScreen;