/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { authSelector } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { Button, Checkbox, Dropdown, Space } from "antd";
import handleAPI from "../../apis/handlAPI";
import Toast from "../../config/ToastConfig";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { appInfo } from './../../constants/appInfos';
import { Bag, Setting2 } from 'iconsax-react';

const BuildingScreen = () => {
    const auth = useSelector(authSelector);
    const [listCheckBox, setListCheckBox] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [createBuilding, setCreateBuilding] = useState({ image: null });
    const [updateBuilding, setUpdateBuilding] = useState({});
    const [moTa, setMoTa] = useState("");
    const [arrayImage,setArrayImage] = useState([]);
    const [typeBuilding, setTypeBuilding] = useState([]);
    const [maps, setMaps] = useState([]);
    const [userLocation, setUserLocation] = useState(null); // Tọa độ người dùng
    const [destinationLocation, setDestinationLocation] = useState(null); // Tọa độ địa chỉ được chọn
    const [images, setImages] = useState([]); 
    const [files, setFiles] = useState([]); 
    const inputFileRef = useRef(null);
    const inputFileCreateRef = useRef(null);
    // Định nghĩa biểu tượng `currentLocationIcon` với kích thước và ảnh tùy chỉnh
    const currentLocationIcon = L.icon({
        iconUrl: appInfo.currentLocationIcon,
        iconSize: [35, 35],
        iconAnchor: [17, 35] 
    });

    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        last_page: 1,
    });

    const [offset] = useState(4);

    const getDataTypeBuilding = async () => {
        const url = `/api/type-building`;
        try {
            const data = await handleAPI(url, {}, "get", auth?.token);
            setTypeBuilding(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDataMap = async () => {
        const url = `/api/admin/maps`;
        try {
            const data = await handleAPI(url, {}, "get", auth?.token);
            setMaps(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Lấy vị trí hiện tại của người dùng khi component được mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error("Lỗi khi lấy vị trí người dùng: ", error);
                }
            );
        } else {
            console.error("Trình duyệt không hỗ trợ Geolocation.");
        }
    }, []);

    const getData = async (page) => {
        const url = `/api/admin/buildings?page=${page}&size=5`;
        try {
            const data = await handleAPI(url, {}, "get", auth?.token);
            setBuildings(data.data.data);
            setPagination(data.data.pagination);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Load dữ liệu ban đầu khi component được mount
    useEffect(() => {
        getData(pagination.current_page);
        getDataTypeBuilding();
        getDataMap();
    }, [pagination.current_page]);

    // Hàm để thay đổi trang
    const changePage = (page) => {
        setPagination((prev) => ({
            ...prev,
            current_page: page
        }));

        getData(page);
    };

    const isActived = useMemo(() => {
        return pagination.current_page;
    }, [pagination]);

    const pagesNumber = useMemo(() => {
        if (!pagination.to) {
            return [];
        }
        let from = pagination.current_page - offset;
        if (from < 1) {
            from = 1;
        }
        let to = from + offset * 2;
        if (to >= pagination.last_page) {
            to = pagination.last_page;
        }
        const pagesArray = [];
        while (from <= to) {
            pagesArray.push(from);
            from++;
        }
        return pagesArray;
    }, [pagination, offset]);

    // Component để kích hoạt invalidateSize và vẽ tuyến đường khi modal mở
    const MapWrapper = () => {
        const map = useMap();
        useEffect(() => {
            const handleModalShown = () => {
                map.invalidateSize(); // Invalidate kích thước khi modal mở

                // Vẽ tuyến đường nếu có vị trí người dùng và điểm đích
                if (userLocation && destinationLocation) {
                    L.Routing.control({
                        waypoints: [
                            L.latLng(userLocation[0], userLocation[1]),
                            L.latLng(destinationLocation[0], destinationLocation[1])
                        ],
                        routeWhileDragging: true,
                    }).addTo(map);
                }
            };

            // Lắng nghe sự kiện mở modal
            const modalElement = document.getElementById('themMoiModal');
            const modalElement1 = document.getElementById('EditModal');
            modalElement?.addEventListener('shown.bs.modal', handleModalShown);
            modalElement1?.addEventListener('shown.bs.modal', handleModalShown);

            // Cleanup để tránh lắng nghe sự kiện dư thừa
            return () => {
                modalElement?.removeEventListener('shown.bs.modal', handleModalShown);
                modalElement1?.removeEventListener('shown.bs.modal', handleModalShown);
            };
        }, [map, userLocation, destinationLocation]);

        return null;
    }

    const handleImageChange = (e) => { 
        const files = Array.from(e.target.files); 
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setFiles(files)
        setImages(imageUrls);
        setArrayImage(imageUrls);
    };

    const handlCreateBuilding = async () => {
        const formData = new FormData();
        formData.append("name", createBuilding.name);
        formData.append("id_type_building", createBuilding.id_type_building);
        formData.append("id_map", createBuilding.id_map);
        formData.append("description", createBuilding.description);
        formData.append("status", createBuilding.status);
        formData.append("number_of_basement", createBuilding.number_of_basement);
        formData.append("acreage", createBuilding.acreage);
        files.forEach((file) => {
            formData.append('image', file);
        });
    
        const url = `/api/admin/buildings`;
        
        try {
            const res = await handleAPI(url, formData, "post", auth?.token);
            Toast("success", res.message);
            getData(pagination.current_page);
            window.$('#themMoiModal').modal('hide');
            setFiles(null);
            setImages([]);
            setCreateBuilding({
                id_map : "",
                id_type_building : "",
                description : "",
                name : "",
                status : 0,
                number_of_basement : 0,
                acreage : ""
            });
            
            if (inputFileCreateRef.current) {
                inputFileCreateRef.current.value = "";
            }
        } catch (error) {
            Toast("error", error.message);
        }
    }

    const handleChangeStatus = async (value, newStatus) => {
        const url = `/api/admin/buildings/${value.id}`;
        const updatedNew = { ...value, status: newStatus };
        try {
            const res = await handleAPI(url, updatedNew, "put", auth?.token)
            console.log(res.status);
            
            if(res.status === 200) {
                Toast("success", res.message);
                getData(pagination.current_page);
                setUpdateBuilding({
                    id_map : "",
                    id_type_building : "",
                    description : "",
                    name : "",
                    status : 0,
                    number_of_basement : 0,
                    acreage : ""
                });
                
            }
        } catch (error) {
            Toast("error", error.message);
        }
    }

    const handlUpdateBuilding = async () => {
        const url = `/api/admin/buildings/${updateBuilding.id}`;
        // copy value và loại bỏ area trong updateBuilding thay vào đó là acreage
        const { area, ...rest } = updateBuilding;
        const updatedNew = { ...rest, acreage: area };
        console.log(updatedNew);
        
        try {
            const res = await handleAPI(url, updatedNew, "put", auth?.token)
            console.log(res.status);
            
            if(res.status === 200) {
                Toast("success", res.message);
                getData(pagination.current_page);
                window.$('#EditModal').modal('hide');
                setUpdateBuilding({
                    id_map : "",
                    id_type_building : "",
                    description : "",
                    name : "",
                    status : 0,
                    number_of_basement : 0,
                    acreage : ""
                });
            }
        } catch (error) {
            Toast("error", error.message);
        }
    }

    const handlUpdateImage = async () => {
        console.log(updateBuilding.name);
        const url = `/api/admin/buildings/image/${updateBuilding.id}`;
        const formData = new FormData();
        // formData.append("image", createBuilding.image);
        files.forEach((file) => {
            formData.append('image', file);
        });
    
        
        try {
            const res = await handleAPI(url, formData, "put", auth?.token)
            
            if(res.status === 200) {
                Toast("success", res.message);
                getData(pagination.current_page);
                window.$('#XemAnhModal').modal('hide');
                setFiles([]);
                setImages([]);
                setUpdateBuilding({
                    id_map : "",
                    id_type_building : "",
                    description : "",
                    name : "",
                    status : 0,
                    number_of_basement : 0,
                    acreage : ""
                });
                
                if (inputFileRef.current) {
                    inputFileRef.current.value = "";
                }
            }
        } catch (error) {
            Toast("error", error.message);
        }
    }

    const handlDeleteBuilding = async () => {
        console.log(listCheckBox);
        
        if(listCheckBox.length === 1) {
            const url = `/api/admin/buildings/${listCheckBox}`;
            try {
                const res = await handleAPI(url, {}, "delete", auth?.token)
                console.log(res.status);
                
                if(res.status === 200) {
                    Toast("success", res.message);
                    getData(pagination.current_page);
                    setListCheckBox((prev) => prev.filter((id) => id !== listCheckBox[0]));
                    window.$('#deleteModal').modal('hide');
                }
            } catch (error) {
                Toast("error", error.message);
            }
        } else {
            const url = `/api/admin/buildings/delete-all`;
            const object = {
                ids : listCheckBox
            }
            try {
                const res = await handleAPI(url, object, "delete", auth?.token)
                console.log(res.status);
                
                if(res.status === 200) {
                    Toast("success", res.message);
                    getData(pagination.current_page);
                    setListCheckBox([]);
                    window.$('#deleteModal').modal('hide');
                }
            } catch (error) {
                Toast("error", error.message);
            }
        }
    }

    return (
        <>
            <div className='card'>
                <div className='card-header'>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="p-2 bd-highlight">
                            <span>Danh Sách Tòa Nhà</span>
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
                            <div className="modal fade" id="themMoiModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Mới Tòa Nhà</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className='row d-flex align-items-stretch'>
                                                <div className='col-4'>
                                                    <h5>Vị trí của tòa nhà trên bản đồ</h5>
                                                    <MapContainer
                                                        center={[14.0583, 108.2772]} // Tọa độ trung tâm Việt Nam
                                                        zoom={5} // Độ zoom phù hợp để hiển thị toàn bộ lãnh thổ
                                                        style={{ height: '620px', width: '100%' }} // Kích thước của bản đồ
                                                    >
                                                        <TileLayer
                                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        />
                                                        {userLocation && (
                                                            <Marker
                                                                position={userLocation}
                                                                icon={currentLocationIcon} // Sử dụng biểu tượng tùy chỉnh
                                                            />
                                                        )}
                                                        <MapWrapper />
                                                    </MapContainer>
                                                </div>
                                                <div className='col-8'>
                                                    <div className='row mb-2'>
                                                        <div className='col'>
                                                            <label className='mb-2'>Tên Tòa Nhà</label>
                                                            <input className='form-control' type='text'
                                                                value={createBuilding.name}
                                                                onChange={(e) => setCreateBuilding({
                                                                    ...createBuilding,
                                                                    name : e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Kiểu Tòa Nhà</label>
                                                            <select className='form-control'
                                                                value={createBuilding.id_type_building}
                                                                onChange={(e) => setCreateBuilding({
                                                                    ...createBuilding,
                                                                    id_type_building : e.target.value
                                                                })}
                                                            >
                                                                <option value="">Vui lòng chọn kiểu tòa nhà</option>
                                                                {
                                                                    typeBuilding.map((value, key) => (
                                                                        <option key={key} value={value.id}>{value.type_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Địa Chỉ</label>
                                                            <select className='form-control'
                                                                value={createBuilding.id_map}
                                                                onChange={(e) => setCreateBuilding({
                                                                    ...createBuilding,
                                                                    id_map : e.target.value
                                                                })}
                                                            >
                                                                <option value="">Vui lòng chọn địa chỉ</option>
                                                                {
                                                                    maps.map((value, key) => (
                                                                        <option key={key} value={value.id}>{value.map_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='row mb-2'>
                                                        <div className='col'>
                                                            <label className='mb-2'>Số Tầng</label>
                                                            <input className='form-control' type='number'
                                                                value={createBuilding.number_of_basement}
                                                                onChange={(e) => setCreateBuilding({
                                                                    ...createBuilding,
                                                                    number_of_basement : e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Diện Tích</label>
                                                            <input className='form-control' type='text'
                                                                value={createBuilding.acreage}
                                                                onChange={(e) => setCreateBuilding({
                                                                    ...createBuilding,
                                                                    acreage : e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Trạng Thái</label>
                                                            <select className='form-control'
                                                                value={createBuilding.status}
                                                                onChange={(e) => setCreateBuilding({
                                                                    ...createBuilding,
                                                                    status : e.target.value
                                                                })}
                                                            >
                                                                <option value="">Vui lòng chọn trạng thái</option>
                                                                <option value="1">Mở</option>
                                                                <option value="0">Đóng</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label className='mb-2'>Mô Tả</label>
                                                            <textarea style={{height: "470px"}} rows="10" className='form-control'
                                                                value={createBuilding.description}
                                                                onChange={(e) => setCreateBuilding({
                                                                    ...createBuilding,
                                                                    description : e.target.value
                                                                })}
                                                            ></textarea>
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Hình Ảnh</label>
                                                            {/* chưa có ảnh thì hiển thị 4 khung ảnh rổng */}
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                multiple
                                                                accept=".jpg,.jpeg,.png"
                                                                ref={inputFileCreateRef}
                                                                onChange={handleImageChange} // Gắn hàm xử lý sự kiện
                                                            />
                                                            <div className='row mt-2'>
                                                                {images.map((image, index) => (
                                                                    <div className='col-6'>
                                                                        <img key={index} style={{width:"300%", height:"200px", marginBottom:"20px", objectFit:"cover"}} src={image} alt={`Selected ${index}`} className="img-fluid" /> 
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                            <button type="button" className="btn btn-primary" onClick={() => handlCreateBuilding()}>Xác Nhận</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
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
                                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Loại Tòa Nhà</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body ">
                                                                <span>Bạn có chắc chắn muốn xóa <span className="text-danger">{listCheckBox.length}</span> kiểu toàn nhà này không?</span>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                                                <button type="button" class="btn btn-primary" onClick={() => handlDeleteBuilding()}>Xác Nhận</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : 
                                            <>
                                            </>
                                        }
                                    </th>
                                    <th className="align-middle text-center">Tên Tòa Nhà</th>
                                    <th className="align-middle text-center">Kiểu Tòa Nhà</th>
                                    <th className="align-middle text-center">Địa Chỉ</th>
                                    <th className="align-middle text-center">Số Tầng</th>
                                    <th className="align-middle text-center">Diện Tích</th>
                                    <th className="align-middle text-center">Mô Tả</th>
                                    <th className="align-middle text-center">Hình Ảnh</th>
                                    <th className="align-middle text-center">Trạng Thái</th>
                                    <th className="align-middle text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    buildings.map((value, key) => (
                                        <>
                                            <tr key={key} className={listCheckBox.includes(value.id) ? "table-secondary" : ""}>
                                                <td className="text-center align-middle" style={{ width: "60px" }}>
                                                    <Checkbox 
                                                        checked={listCheckBox.includes(value.id)}
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
                                                <td className="align-middle">{value.name}</td>
                                                <td className="align-middle">{value.map.map_name}</td>
                                                <td className="align-middle">{value.typeBuilding.type_name}</td>
                                                <td className="align-middle text-center">{value.number_of_basement}</td>
                                                <td className="align-middle text-center">{value.area}</td>
                                                <td className="align-middle text-center">
                                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#MoTaModal" onClick={() => setMoTa(value.description)}>
                                                        Mô Tả
                                                    </button>
                                                    
                                                </td>
                                                <td className="align-middle text-center">
                                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#XemAnhModal" 
                                                        onClick={() => {
                                                            // Kiểm tra xem value.image có tồn tại không
                                                            const imagesArray = value.image;
                                                            setArrayImage(imagesArray);
                                                            setUpdateBuilding(value)
                                                        }}
                                                    >
                                                        Xem Ảnh
                                                    </button>
                                                </td>
                                                <td className="align-middle text-center">
                                                    {value.status === 1 ? (
                                                        <button className="btn btn-success" style={{width:"100px"}} onClick={() => handleChangeStatus(value, 0)}>
                                                            Mở
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-warning" style={{width:"100px"}} onClick={() => handleChangeStatus(value, 1)}>
                                                            Đóng
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="align-middle text-center">
                                                    <Space direction="vertical">
                                                        <Space wrap>
                                                            <Dropdown
                                                                menu={{
                                                                    items: [
                                                                        {
                                                                            key: "1",
                                                                            label: (
                                                                                <>
                                                                                    <a onClick={() => setUpdateBuilding(value)} data-bs-toggle="modal"
                                                                                    data-bs-target="#EditModal">Cập Nhật Thông Tin</a>
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
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                            <div class="modal fade" id="MoTaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Mô Tả Tòa Nhà</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <textarea rows="10" className='form-control' value={moTa}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="XemAnhModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ảnh Tòa Nhà</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="row">
                                                {arrayImage && arrayImage.length > 0 ? (
                                                    arrayImage.map((imageUrl, index) => (
                                                        <div className="col-3 mb-3" key={index}>
                                                            <div
                                                                style={{
                                                                    width: '100%',
                                                                    height: '200px', 
                                                                    overflow: 'hidden',
                                                                }}
                                                            >
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={`Ảnh ${index + 1}`}
                                                                    className="img-fluid"
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover',
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Không có hình ảnh để hiển thị.</p>
                                                )}
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <label className='mb-2'>Chỉnh Sửa Hình Ảnh</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        multiple
                                                        accept=".jpg,.jpeg,.png"
                                                        ref={inputFileRef}
                                                        onChange={handleImageChange} // Gắn hàm xử lý sự kiện
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                            <button type="button" class="btn btn-primary" onClick={()=> handlUpdateImage()}>Xác Nhận</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Tòa Nhà</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className='row d-flex align-items-stretch'>
                                                <div className='col-4'>
                                                    <h5>Vị trí của tòa nhà trên bản đồ</h5>
                                                    <MapContainer
                                                        center={[14.0583, 108.2772]} // Tọa độ trung tâm Việt Nam
                                                        zoom={5} // Độ zoom phù hợp để hiển thị toàn bộ lãnh thổ
                                                        style={{ height: '620px', width: '100%' }} // Kích thước của bản đồ
                                                    >
                                                        <TileLayer
                                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        />
                                                        {userLocation && (
                                                            <Marker
                                                                position={userLocation}
                                                                icon={currentLocationIcon} // Sử dụng biểu tượng tùy chỉnh
                                                            />
                                                        )}
                                                        <MapWrapper />
                                                    </MapContainer>
                                                </div>
                                                <div className='col-8'>
                                                    <div className='row mb-2'>
                                                        <div className='col'>
                                                            <label className='mb-2'>Tên Tòa Nhà</label>
                                                            <input className='form-control' type='text'
                                                                value={updateBuilding.name}
                                                                onChange={(e) => setUpdateBuilding({
                                                                    ...updateBuilding,
                                                                    name : e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Kiểu Tòa Nhà</label>
                                                            <select className='form-control'
                                                                value={updateBuilding?.typeBuilding?.id}
                                                                onChange={(e) => setUpdateBuilding({
                                                                    ...updateBuilding,
                                                                    id_type_building : e.target.value
                                                                })}
                                                            >
                                                                <option value="">Vui lòng chọn kiểu tòa nhà</option>
                                                                {
                                                                    typeBuilding.map((value, key) => (
                                                                        <option key={key} value={value.id}>{value.type_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Địa Chỉ</label>
                                                            <select className='form-control'
                                                                value={updateBuilding?.map?.id}
                                                                onChange={(e) => setUpdateBuilding({
                                                                    ...updateBuilding,
                                                                    id_map : e.target.value
                                                                })}
                                                            >
                                                                <option value="">Vui lòng chọn địa chỉ</option>
                                                                {
                                                                    maps.map((value, key) => (
                                                                        <option key={key} value={value.id}>{value.map_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='row mb-2'>
                                                        <div className='col'>
                                                            <label className='mb-2'>Số Tầng</label>
                                                            <input className='form-control' type='number'
                                                                value={updateBuilding.number_of_basement}
                                                                onChange={(e) => setUpdateBuilding({
                                                                    ...updateBuilding,
                                                                    number_of_basement : e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Diện Tích</label>
                                                            <input className='form-control' type='text'
                                                                value={updateBuilding.area}
                                                                onChange={(e) => setUpdateBuilding({
                                                                    ...updateBuilding,
                                                                    area : e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='mb-2'>Trạng Thái</label>
                                                            <select className='form-control'
                                                                value={updateBuilding.status}
                                                                onChange={(e) => setUpdateBuilding({
                                                                    ...updateBuilding,
                                                                    status : e.target.value
                                                                })}
                                                            >
                                                                <option value="">Vui lòng chọn trạng thái</option>
                                                                <option value="1">Mở</option>
                                                                <option value="0">Đóng</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <label className='mb-2'>Mô Tả</label>
                                                            <textarea style={{height: "470px"}} rows="10" className='form-control'
                                                                value={updateBuilding.description}
                                                                onChange={(e) => setUpdateBuilding({
                                                                    ...updateBuilding,
                                                                    description : e.target.value
                                                                })}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                            <button type="button" class="btn btn-primary" onClick={() => handlUpdateBuilding()}>Xác Nhận</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </table>
                    </div>
                    <nav className="m-b-30" aria-label="Page navigation example">
                        <ul className="pagination justify-content-end pagination-primary">
                            {pagination.current_page > 1 && (
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Previous"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            changePage(pagination.current_page - 1);
                                        }}
                                    >
                                        <span aria-hidden="true">Pre</span>
                                    </a>
                                </li>
                            )}

                            {pagesNumber.map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${page === isActived ? 'active' : ''}`}
                                >
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            changePage(page);
                                        }}
                                    >
                                        {page}
                                    </a>
                                </li>
                            ))}

                            {pagination.current_page < pagination.last_page && (
                                <li className="page-item">
                                    <a
                                        href="#"
                                        className="page-link"
                                        aria-label="Next"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            changePage(pagination.current_page + 1);
                                        }}
                                    >
                                        <span aria-hidden="true">Next</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default BuildingScreen;
