/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import handleAPI from "./../../apis/handlAPI";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import { Bag, GalleryImport, Setting2 } from "iconsax-react";
import { Image, Upload } from 'antd';
import Toast from "../../config/ToastConfig";
import moment from "moment";
// import $ from "jquery";
const AdminScreen = () => {
    const [admins, setAdmins] = useState([]);
    const auth = useSelector(authSelector);

    const [fileList, setFileList] = useState([]);
    const [createAdmins, setCreateAdmins] = useState({});
    const [updateAdmin, setUpdateAdmin] = useState({});
    const [updatePasswordAdmin, setUpdatePasswordAdmin] = useState({});
    const [listCheckBox, setListCheckBox] = useState([]);
    const [file, setFile] = useState();

    function handleChooseFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                console.log(base64String); // Chuỗi base64
                setFile(base64String); // Đặt base64 vào state, hoặc thực hiện các thao tác khác
            };
            reader.readAsDataURL(file); // Chuyển file thành dạng base64
        }
    }

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const url = "/api/users";
        try {
            const data = await handleAPI(url, {}, "get", auth?.token);
            setAdmins(data.result);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateAdmin = async () => {
        // const formData = new FormData();
        // formData.append("first_name", createAdmins.first_name);
        // formData.append("last_name", createAdmins.last_name);
        // formData.append("user_name", createAdmins.user_name);
        // formData.append("password", createAdmins.password);
        // formData.append("status", createAdmins.status);
        // formData.append("email", createAdmins.email);
        // formData.append("phone_number", createAdmins.phone_number);
        // formData.append("birthday", createAdmins.birthday);
        // formData.append("address", createAdmins.address);

        const url = `/api/users`;

        try{
            const res = await handleAPI(url, createAdmins, "post", auth?.token);
            Toast("success", res.message);
            getData();
            window.$('#themMoiModal').modal('hide');
            setCreateAdmins({});
        }catch(Error){
            Toast("error", Error.message);
        }
    }

    const handleUpdateAdmin = async() => {
        const url = `/api/users/${updateAdmin.id}`;
        
        try {
            const res = await handleAPI(url, updateAdmin, "PUT", auth?.token);
            Toast("success", res.message);
            getData();
            //dùng js để tắt modal
            window.$('#EditModal').modal('hide');
            
        } catch (error) {
            Toast("error", error.message);
        }
    }

    const handleChangeStatusAdmin = async(value, newStatus) => {
        const url = `/api/users/${value.id}`;

        const updatedAdmin = { ...updateAdmin, status: newStatus };

        try {
            const res = await handleAPI(url, updatedAdmin, "PUT", auth?.token);
            Toast("success", res.message);
            getData(); // Tải lại dữ liệu sau khi cập nhật
        } catch (error) {
            Toast("error", error.message);
        }
    }

    const handleChangePasswordAdmin = async() => {
        const newPassword = {password : updateAdmin.password};
        console.log(newPassword);
        const url = `/api/users/reset-password/${updateAdmin.id}`;

        try {
            const res = await handleAPI(url, newPassword, "PUT", auth?.token);
            Toast("success", res.message);
            getData(); // Tải lại dữ liệu sau khi cập nhật
            window.$("#EditPassModal").modal('hide');
            setUpdateAdmin({password:""});
        } catch (error) {
            Toast("error", error.message);
        }
    }

    const formatDateVN = (date) => {
        return moment(date).format("DD/MM/YYYY");
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="p-2 bd-highlight">
                            <span>Danh Sách User</span>
                        </div>
                        <div className="p-2 bd-highlight">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#themMoiModal"
                            >
                               Thêm Mới
                            </button>
                            <div
                                className="modal fade"
                                id="themMoiModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5
                                                className="modal-title"
                                                id="exampleModalLabel"
                                            >
                                                Thêm Mới
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-6">
                                                    <label className="mb-2">First Name</label>
                                                    <input className="form-control" type="text"
                                                        value={createAdmins.first_name}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            first_name: e.target.value
                                                        })}
                                                    />
                                                </div>
                                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-6">
                                                    <label className="mb-2">Last Name</label>
                                                    <input className="form-control" type="text"
                                                        value={createAdmins.last_name}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            last_name: e.target.value
                                                        })}
                                                    />
                                                </div>
                                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-6">
                                                    <label className="mb-2">User Name</label>
                                                    <input className="form-control" type="text"
                                                        value={createAdmins.user_name}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            user_name: e.target.value
                                                        })}
                                                    />
                                                </div>
                                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-6">
                                                    <label className="mb-2">Password</label>
                                                    <input className="form-control" type="text"
                                                        value={createAdmins.password}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            password: e.target.value
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label className="mb-2">Status</label>
                                                    <select className="form-control" 
                                                        value={createAdmins.status}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            status: e.target.value
                                                        })}>
                                                        <option value="">Vui lòng chọn trạng thái...</option>
                                                        <option value="1">Open</option>
                                                        <option value="0">Close</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label className="mb-2">Email</label>
                                                    <input className="form-control" type="email"
                                                        value={createAdmins.email}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            email: e.target.value
                                                        })}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="mb-2">Phone Number</label>
                                                    <input className="form-control" type="text"
                                                        value={createAdmins.phone_number}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            phone_number: e.target.value
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label className="mb-2">Birthday</label>
                                                    <input className="form-control" type="date"
                                                        value={createAdmins.birthday}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            birthday: e.target.value
                                                        })}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="mb-2">Avatar</label>
                                                    <input type="file"
                                                       className="form-control"
                                                       id="file" name={"file"}
                                                       onChange={handleChooseFileChange}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="mb-2">Address</label>
                                                    <input className="form-control" type="text"
                                                        value={createAdmins.address}
                                                        onChange={(e) => setCreateAdmins({
                                                            ...createAdmins,
                                                            address: e.target.value
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                            <button type="button" className="btn btn-primary" onClick={handleCreateAdmin}>Xác Nhận</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="align-middle text-center" style={{ width: "60px", height:"42px"}}>
                                        {
                                            listCheckBox.length > 0 ?
                                            <>
                                                <span type="button" className="text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                    <Bag/>
                                                </span>
                                                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa user</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body ">
                                                                <span>Bạn có chắc chắn muốn xóa <span className="text-danger">{listCheckBox.length}</span> tài khoản này không?</span>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-primary">Save changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : 
                                            <>
                                            </>
                                        }
                                    </th>
                                    <th className="align-middle text-center">First Name</th>
                                    <th className="align-middle text-center">Last Name</th>
                                    <th className="align-middle text-center">User Name</th>
                                    <th className="align-middle text-center">Birthday</th>
                                    <th className="align-middle text-center">Email</th>
                                    <th className="align-middle text-center">Phone Number</th>
                                    <th className="align-middle text-center">Image</th>
                                    <th className="align-middle text-center">Status</th>
                                    <th className="align-middle text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((value, key) => (
                                    <tr key={key} className={listCheckBox.includes(value.id) ? "table-secondary" : ""}>
                                        <td className="text-center align-middle" style={{ width: "60px" }}>
                                            <Checkbox 
                                                onChange={() => {
                                                    setListCheckBox((prev) => {
                                                        if (prev.includes(value.id)) {
                                                            // Nếu đã có trong danh sách, loại bỏ nó
                                                            return prev.filter((id) => id !== value.id);
                                                        } else {
                                                            // Nếu chưa có trong danh sách, thêm vào
                                                            return [...prev, value.id];
                                                        }
                                                    });
                                                }}
                                            />
                                        </td>
                                        <td className="align-middle">{value.first_name || ""}</td>
                                        <td className="align-middle">{value.last_name || ""}</td>
                                        <td className="align-middle">{value.user_name || ""}</td>
                                        <td className="text-center align-middle">{value.birthday != null ? formatDateVN(value.birthday) : ""}</td>
                                        <td className="align-middle">{value.email || ""}</td>
                                        <td className="text-center align-middle">{value.phone_number || ""}</td>
                                        <td className="text-center">
                                            {value.avatar ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                    >
                                                        Launch demo modal
                                                    </button>

                                                    <div
                                                        className="modal fade"
                                                        id="exampleModal"
                                                        tabIndex="-1"
                                                        aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true"
                                                    >
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5
                                                                        className="modal-title"
                                                                        id="exampleModalLabel"
                                                                    >
                                                                        Modal title
                                                                    </h5>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-close"
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"
                                                                    ></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    ...
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-info text-secondary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#UploadModal"
                                                    >
                                                        <GalleryImport/>
                                                    </button>

                                                    <div
                                                        className="modal fade"
                                                        id="UploadModal"
                                                        tabIndex="-1"
                                                        aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true"
                                                    >
                                                        <div className="modal-dialog modal-sm">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5
                                                                        className="modal-title"
                                                                        id="exampleModalLabel"
                                                                    >
                                                                        Upload Avatar
                                                                    </h5>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-close"
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"
                                                                    ></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div
                                                                        className="d-flex justify-content-center align-items-center">
                                                                        <Upload
                                                                            listType="picture-card"
                                                                            fileList={fileList}
                                                                            onChange={onChange}
                                                                            onPreview={onPreview}
                                                                            showUploadList={{showPreviewIcon: false}}
                                                                            beforeUpload={() => false}
                                                                        >
                                                                            {fileList.length < 1 && '+ Upload'}
                                                                        </Upload>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary"
                                                                        data-bs-dismiss="modal"
                                                                    >
                                                                        Đóng
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Xác nhận
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                        <td className="text-center align-middle">
                                            {value.status === 1 ? (
                                                <button className="btn btn-primary" onClick={() => handleChangeStatusAdmin(value, 0)}>
                                                    Open
                                                </button>
                                            ) : (
                                                <button className="btn btn-danger" onClick={() => handleChangeStatusAdmin(value, 1)}>
                                                    Close
                                                </button>
                                            )}
                                        </td>
                                        <td className="text-center align-middle">
                                            <Space direction="vertical">
                                                <Space wrap>
                                                    <Dropdown
                                                        menu={{
                                                            items: [
                                                                {
                                                                    key: "1",
                                                                    label: (
                                                                        <>
                                                                            <a onClick={() => setUpdateAdmin(value)} data-bs-toggle="modal"
                                                                               data-bs-target="#EditModal">Cập Nhật
                                                                                Thông Tin</a>
                                                                        </>
                                                                    ),
                                                                },
                                                                {
                                                                    key: "2",
                                                                    label: (
                                                                        <>
                                                                            <a onClick={() => setUpdateAdmin(value)} data-bs-toggle="modal"
                                                                               data-bs-target="#EditPassModal">Cập Nhật
                                                                                Mật Khẩu</a>
                                                                        </>
                                                                    ),
                                                                },
                                                            ],
                                                        }}
                                                        placement="bottomRight"
                                                        trigger={["click"]}
                                                    >
                                                        <Button
                                                            icon={<Setting2/>}
                                                        />
                                                    </Dropdown>
                                                </Space>
                                            </Space>
                                            <div className="modal fade" id="EditModal" tabIndex="-1"
                                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Cập Nhật
                                                                Tài Khoản</h5>
                                                            <button type="button" className="btn-close"
                                                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                                <div className="col-lg-4 col-xl-4 col-md-6 col-sm-6">
                                                                    <label className="mb-2 float-start">First Name</label>
                                                                    <input className="form-control" type="text"
                                                                        value={updateAdmin.first_name || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            first_name: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-4 col-xl-4 col-md-6 col-sm-6">
                                                                    <label className="mb-2 float-start">Last Name</label>
                                                                    <input className="form-control" type="text"
                                                                        value={updateAdmin.last_name || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            last_name: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-4 col-xl-4 col-md-6 col-sm-6">
                                                                    <label className="mb-2 float-start">User Name</label>
                                                                    <input className="form-control" type="text"
                                                                        value={updateAdmin.user_name || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            user_name: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col">
                                                                    <label className="mb-2 float-start">Status</label>
                                                                    <select className="form-control" 
                                                                        value={updateAdmin.status}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            status: e.target.value
                                                                        })}>
                                                                        <option value="">Vui lòng chọn trạng thái...</option>
                                                                        <option value="1">Open</option>
                                                                        <option value="0">Close</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col">
                                                                    <label className="mb-2 float-start">Email</label>
                                                                    <input className="form-control" type="email"
                                                                        value={updateAdmin.email || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            email: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label className="mb-2 float-start">Phone Number</label>
                                                                    <input className="form-control" type="text"
                                                                        value={updateAdmin.phone_number || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            phone_number: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col">
                                                                    <label className="mb-2 float-start">Birthday</label>
                                                                    <input className="form-control" type="date"
                                                                        value={updateAdmin.birthday || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            birthday: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label className="mb-2 float-start">Address</label>
                                                                    <input className="form-control" type="text"
                                                                        value={updateAdmin.address || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            address: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                                            <button type="button" className="btn btn-primary" onClick={handleUpdateAdmin}>Xác Nhận</button>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>

                                            <div className="modal fade" id="EditPassModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Cập Nhật Mật Khẩu</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                        <div className="row">
                                                                <div className="col mb-3">
                                                                    <label className="form-label float-start">Password New</label>
                                                                    <input type="text" className="form-control" value={updateAdmin.password || ''}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            password: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => handleChangePasswordAdmin()}>Xác Nhận</button>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminScreen;