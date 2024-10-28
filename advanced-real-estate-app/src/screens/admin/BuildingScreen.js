import React, {useEffect, useState} from 'react';
import {authSelector} from "../../redux/reducers/authReducer";
import {useSelector} from "react-redux";
import {handleApiBuilding} from "../../apis/api";
import { Button, Card, Form, Input, message, Typography } from "antd";

const BuildingScreen = () => {

    const [buildings, setBuildings] = useState([]);
    const auth = useSelector(authSelector);
    const [editingBuilding, setEditingBuilding] = useState(null);
    const [file, setFile] = useState();

    function handleChooseFileChange(event) {
        setFile(event.target.files[0])
    }

    const refresh = async () =>{
        return await handleApiBuilding("/api/admin/buildings", {}, "get", auth?.token)
        .then(res => setBuildings(res?.data))
        .catch(error=> {
            message.error("Fetch error: ", error);
            console.log("Fetch error: ", error);
        });
    }

    const handleEditClick = (building) => {
        setEditingBuilding({
            id: building?.id,
            name: building?.name,
            structure: building?.structure,
            area: building?.area,
            type: building?.type,
            description: building?.description,
            number_of_basement: building?.number_of_basement,
            price: building?.price
        });
    };

    const handleCloneClick = (building) => {
        setEditingBuilding({
            id: building?.id,
            name: building?.name,
            structure: building?.structure,
            area: building?.area,
            type: building?.type,
            description: building?.description,
            number_of_basement: building?.number_of_basement,
            price: building?.price
        });
    };

    const handleUpLoadClick = (building) => {
        setEditingBuilding({
            id: building?.id,
        });
    };

    const handleUpload = async () => {
        setEditingBuilding(null);
        console.log(editingBuilding);

        if (!file) {
            message.error("Choose file please!");
            setEditingBuilding(null);
            return;
        }
        const formData = new FormData();
        formData.append("image", file);

        try {
            await handleApiBuilding(`/api/admin/buildings/${editingBuilding?.id}/upload-image`,
                formData, "post", auth?.token
            );
            message.success("Upload image successfully!");
            await refresh();
        } catch (error) {
            message.error("Upload error: " + error);
            console.log("Upload error: ", error);
        }
    };


    const handleClone = async () => {
        setEditingBuilding(null);
        console.log(editingBuilding);
        const payload = {
            name: editingBuilding?.name,
            structure: editingBuilding?.structure,
            area: editingBuilding?.area,
            type: editingBuilding?.type,
            description: editingBuilding?.description,
            number_of_basement: editingBuilding?.number_of_basement,
            price: editingBuilding?.price
        }
        await handleApiBuilding(`/api/admin/buildings`, payload, "post", auth?.token)
            .then(res => message.success("Clone Building successfully!"))
            .catch(error=> {
                message.error("Clone error: ", error);
                console.log("Clone error: ", error);
            });
        await refresh();
    };

    const handleSaveClick = async (id) => {
        setEditingBuilding(null);
        console.log(id);
        console.log(editingBuilding);
        const payload = {
            name: editingBuilding?.name,
            structure: editingBuilding?.structure,
            area: editingBuilding?.area,
            type: editingBuilding?.type,
            description: editingBuilding?.description,
            number_of_basement: editingBuilding?.number_of_basement,
            price: editingBuilding?.price,
        }
        await handleApiBuilding(`/api/admin/buildings/${id}`, payload, "patch", auth?.token)
            .then(res => message.success("Update Building successfully!"))
            .catch(error=> {
                message.error("Update error: ", error);
                console.log("Update error: ", error);
            });
       await refresh();
    };
    
    useEffect(() => {
        handleApiBuilding("/api/admin/buildings", {}, "get", auth?.token)
            .then(res => setBuildings(res?.data))
            .catch(error=> {
                message.error("Fetch error: ", error);
                console.log("Fetch error: ", error);
            });
    }, [auth?.token]);

    const deleteById = async (id) =>{
        await handleApiBuilding(`/api/admin/buildings/${id}`, {}, "delete", auth?.token)
            .then(res => message.success("Delete Building successfully!"))
            .catch(error=> {
                message.error("Delete error: ", error);
                console.log("Delete error: ", error);
            });
        await refresh();
    }

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
                                <th className="align-middle text-center">Ảnh</th>
                                <th className="align-middle text-center">Tên nhà</th>
                                <th className="align-middle text-center">Kiến trúc</th>
                                <th className="align-middle text-center">Gía</th>
                                <th className="align-middle text-center">vị trí</th>
                                <th className="align-middle text-center">kiểu</th>
                                <th className="align-middle text-center">mô tả</th>
                                <th className="align-middle text-center">số tầng</th>
                                <th colSpan={"5"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                buildings?.map((building, index) => (
                                    <tr key={index}>
                                        <td>{building?.id}</td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <input type="file"
                                                       className="form-control"
                                                       id="file" name={"file"}
                                                       onChange={handleChooseFileChange}
                                                       style={{ width: "250px" }}
                                                />
                                            ) : (
                                                <img src={`data:${building?.file_type};base64,${building?.image}`}
                                                     alt={building?.file_type} width={"200px"}
                                                />
                                            )}
                                        </td>
                                        <td>
                                        {editingBuilding?.id === building.id ? (
                                                <input
                                                    type="text"
                                                    value={editingBuilding.name}
                                                    onChange={(e) => setEditingBuilding({
                                                        ...editingBuilding,
                                                        name: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={building.name} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <input
                                                    type="text"
                                                    value={editingBuilding.structure}
                                                    onChange={(e) => setEditingBuilding({
                                                        ...editingBuilding,
                                                        structure: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={building.structure} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <input
                                                    type="text"
                                                    value={editingBuilding.price}
                                                    onChange={(e) => setEditingBuilding({
                                                        ...editingBuilding,
                                                        price: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={building.price} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <input
                                                    type="text"
                                                    value={editingBuilding.area}
                                                    onChange={(e) => setEditingBuilding({
                                                        ...editingBuilding,
                                                        area: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={building.area} readOnly/>
                                            )}
                                        </td>
                                        <td>

                                            {editingBuilding?.id === building.id ? (
                                                <select name="type" onChange={(e) => setEditingBuilding({
                                                    ...editingBuilding,
                                                    type: e.target.value
                                                })}>
                                                    <option value={building?.type}>{building?.type}</option>
                                                    <option value={"nhà cho thuê"}>
                                                        {"nhà cho thuê"}
                                                    </option>
                                                    <option value={"nhà bán"}>
                                                        {"nhà bán"}
                                                    </option>
                                                </select>
                                            ) : (
                                                <textarea value={building.type} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <input
                                                    type="text"
                                                    value={editingBuilding.description}
                                                    onChange={(e) => setEditingBuilding({
                                                        ...editingBuilding,
                                                        description: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={building.description} readOnly/>
                                            )}
                                        </td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <input
                                                    type="text"
                                                    value={editingBuilding.number_of_basement}
                                                    onChange={(e) => setEditingBuilding({
                                                        ...editingBuilding,
                                                        number_of_basement: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <textarea value={building.number_of_basement} readOnly/>
                                            )}
                                        </td>
                                        {editingBuilding?.id === building.id ?
                                            <td>
                                                <Button className={'btn btn-danger'}
                                                        onClick={() => {
                                                            setEditingBuilding(null);
                                                        }}>
                                                    X
                                                </Button>
                                            </td>
                                            : null
                                        }
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <div>
                                                    <Button onClick={() => {
                                                        handleSaveClick(building.id).then()
                                                    }}>
                                                        Lưu
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        className={'btn btn-warning'}
                                                        onClick={() => handleEditClick(building)}>
                                                        Sửa
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <div>
                                                    <Button onClick={handleClone}>
                                                        Tạo
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        className={'btn btn-success'}
                                                        onClick={() => handleCloneClick(building)}>
                                                        Nhân đôi
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {editingBuilding?.id === building.id ? (
                                                <div>
                                                    <Button onClick={handleUpload}>
                                                        Đăng
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Button
                                                        className={'btn btn-info'}
                                                        onClick={()=>{handleUpLoadClick(building)}}>
                                                        Đăng ảnh
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <Button className={'btn btn-danger'}
                                                    onClick={() => {
                                                        deleteById(building?.id).then()
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

export default BuildingScreen;