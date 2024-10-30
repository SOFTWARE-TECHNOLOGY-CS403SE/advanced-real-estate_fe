/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import handleAPI from "./../../apis/handlAPI";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import { GalleryImport, Setting2 } from "iconsax-react";
import { Image, Upload } from 'antd';

const AdminScreen = () => {
    const [admins, setAdmins] = useState([]);
    const auth = useSelector(authSelector);

    const [fileList, setFileList] = useState([]);
    const [updateAdmin, setUpdateAdmin] = useState({});
    const [listCheckBox, setListCheckBox] = useState([]);
    useEffect(() => {
        console.log(listCheckBox);
        
    }, [listCheckBox])
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

    const handleUpdateAdmin = async() => {
        const url = `/api/users/${updateAdmin.id}`;
        try {
            const data = await handleAPI(url, updateAdmin, "put", auth?.token);
            console.log(data);
            getData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-header">Danh Sách User</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="align-middle text-center"></th>
                                    <th className="align-middle text-center">Last Name</th>
                                    <th className="align-middle text-center">First Name</th>
                                    <th className="align-middle text-center">User Name</th>
                                    <th className="align-middle text-center">Birthday</th>
                                    <th className="align-middle text-center">Dob</th>
                                    <th className="align-middle text-center">Email</th>
                                    <th className="align-middle text-center">Gender</th>
                                    <th className="align-middle text-center">Phone Number</th>
                                    <th className="align-middle text-center">Image</th>
                                    <th className="align-middle text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((value, key) => (
                                    <tr key={key} className={listCheckBox.includes(value.id) ? "table-secondary" : ""}>
                                        <td className="text-center align-middle">
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
                                        <td className="text-center align-middle">{value.lastName || ""}</td>
                                        <td className="text-center align-middle">{value.firstName || ""}</td>
                                        <td className="text-center align-middle">{value.username || ""}</td>
                                        <td className="text-center align-middle">{value.birthday || ""}</td>
                                        <td className="text-center align-middle">{value.dob || ""}</td>
                                        <td className="text-center align-middle">{value.email || ""}</td>
                                        <td className="text-center align-middle">{value.gender || ""}</td>
                                        <td className="text-center align-middle">{value.phoneNumber || ""}</td>
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
                                                        <GalleryImport />
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
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <Upload
                                                                            listType="picture-card"
                                                                            fileList={fileList}
                                                                            onChange={onChange}
                                                                            onPreview={onPreview}
                                                                            showUploadList={{ showPreviewIcon: false }}
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
                                            <Space direction="vertical">
                                                <Space wrap>
                                                    <Dropdown
                                                        menu={{
                                                            items: [
                                                                {
                                                                    key: "1",
                                                                    label: (
                                                                        <>
                                                                            <a data-bs-toggle="modal" data-bs-target="#EditModal">Cập Nhật Thông Tin</a>
                                                                        </>
                                                                    ),
                                                                },
                                                                {
                                                                    key: "2",
                                                                    label: (
                                                                        <>
                                                                            <a data-bs-toggle="modal" data-bs-target="#RemoveModal">Xóa</a>
                                                                        </>
                                                                    ),
                                                                },
                                                                {
                                                                    key: "3",
                                                                    label: (
                                                                        <>
                                                                            <a data-bs-toggle="modal" data-bs-target="#EditPassModal">Cập Nhật Mật Khẩu</a>
                                                                        </>
                                                                    ),
                                                                },
                                                            ],
                                                        }}
                                                        placement="bottomRight"
                                                        trigger={["click"]}
                                                        onClick={() => setUpdateAdmin(value)}
                                                    >
                                                        <Button
                                                            icon={<Setting2 />}
                                                        />
                                                    </Dropdown>
                                                </Space>
                                            </Space>                                            
                                            <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Cập Nhật Tài Khoản</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                                <div className="col mb-3">
                                                                    <label className="form-label float-start">Last Name</label>
                                                                    <input type="text" className="form-control" value={updateAdmin.lastName}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            lastName: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label className="form-label float-start">First Name</label>
                                                                    <input type="text" className="form-control" value={updateAdmin.firstName}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            firstName: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label className="form-label float-start">Birthday</label>
                                                                    <input type="date" className="form-control" value={updateAdmin.birthday || ""}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            birthday: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col mb-3">
                                                                    <label className="form-label float-start">Email</label>
                                                                    <input type="email" className="form-control" value={updateAdmin.email || ""}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            email: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col mb-3">
                                                                    <label className="form-label float-start">Phone Number</label>
                                                                    <input type="text" className="form-control" value={updateAdmin.phoneNumber || ""}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            phoneNumber: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col mb-3">
                                                                    <label className="form-label float-start">Dob</label>
                                                                    <input type="text" className="form-control" value={updateAdmin.dob || ""}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            dob: e.target.value
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="col mb-3">
                                                                    <label className="form-label float-start">Gender</label>
                                                                    <input type="text" className="form-control" value={updateAdmin.gender || ""}
                                                                        onChange={(e) => setUpdateAdmin({
                                                                            ...updateAdmin,
                                                                            gender: e.target.value
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

                                            <div className="modal fade" id="RemoveModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Xóa Tài Khoản</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            ...
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                                            <button type="button" className="btn btn-primary">Xác Nhận</button>
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
                                                                    <input type="text" className="form-control"
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
                                                            <button type="button" className="btn btn-primary">Xác Nhận</button>
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