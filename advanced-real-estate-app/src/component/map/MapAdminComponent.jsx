import React, {useState} from 'react';
import handleAPINotToken from "../../apis/handleAPINotToken";
import {MapContainer, Marker, Popup, ScaleControl, TileLayer, ZoomControl, useMap} from "react-leaflet";
import L from "leaflet";
import {appInfo} from "../../constants/appInfos";
import {Button, message} from "antd";
import styles from '../../assets/css/map.module.css'

const customIcon = new L.Icon({
    iconUrl: appInfo.vitri4,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
});

const MapUpdater = ({ position }) => {
    const map = useMap();

    React.useEffect(() => {
        if (position.lat !== 0 && position.lon !== 0) {
            map.setView([position.lat, position.lon], 18, { animate: true });
        }
    }, [position, map]);

    return null;
};

const MapAdminComponent = () => {
    const [position, setPosition] = useState({
            lat: 0, lon: 0 ,
            display_name: ''
        }
    );
    const [address, setAddress] = useState('');

    const handleSearch = async () => {
        try {
            const data = await handleAPINotToken(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
                {},
                'GET'
            );
            console.log(data);
            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                setPosition({
                    lat: parseFloat(lat),
                    lon: parseFloat(lon),
                    display_name
                });
            } else {
                message.error("Không tìm thấy vị trí!");
                console.log("Không tìm thấy vị trí!");
            }
        } catch (error) {
            message.error('Lỗi khi tìm kiếm địa chỉ:', error);
            console.error('Lỗi khi tìm kiếm địa chỉ:', error);
        }
    };

    return (
        <div>
            <h4 style={{ marginBottom: '10px', textAlign: 'start' }}>Tìm kiếm vị trí tòa nhà trên bản đồ</h4>
            <div>
                <input
                    className={styles.inputSearch}
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ"
                />
                <Button className={styles.buttonSearch} onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </div>

            <MapContainer
                center={[position.lat, position.lon]}
                zoom={position.lat !== 0 && position.lon !== 0 ? 20 : 2}
                style={{
                    height: '350px',
                    width: '100%',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                zoomControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[position.lat, position.lon]} icon={customIcon}>
                    <Popup>
                        {'Vĩ độ: '+position.lat+ '\n'},
                        {'Kinh độ: '+position.lon+ '\n'}
                        {'Địa chỉ: '+position?.display_name}
                    </Popup>
                </Marker>
                <ZoomControl position="topright" />
                <ScaleControl position="bottomleft" />
                <MapUpdater position={position} />
            </MapContainer>
        </div>
    );
};


export default MapAdminComponent;