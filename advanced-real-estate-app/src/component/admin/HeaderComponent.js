import { Avatar, Button, Dropdown, Space, message } from 'antd';
import { Notification } from 'iconsax-react';
import { colors } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import handleAPI from '../../apis/handlAPI'; // Import handleAPI để gọi API

const HeaderComponent = () => {
    const user = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Sử dụng useDispatch để tạo dispatch
    const items = [
        {
            key: 'logout',
            label: 'Đăng xuất',
            onClick: async () => {
                const adminData = localStorage.getItem("admin");
                const parsedData = JSON.parse(adminData); // Chuyển chuỗi JSON thành đối tượng
                const token = parsedData.token; // Lấy giá trị token từ đối tượng

                const payload = {
                    token: token
                };
                
                try {
                    // Gọi API để đăng xuất
                    const res = await handleAPI('/api/auth/logout', payload, 'post', 'admin');
                    if (res.code === 1000) {
                        // Thông báo đăng xuất thành công
                        message.success('Đăng xuất thành công!');
                        
                        // Xóa thông tin khỏi localStorage
                        localStorage.removeItem('admin');
                        // Dispatch action để lưu vào Redux store
                        dispatch(removeAuth());
                        // Điều hướng đến trang đăng nhập
                        navigate('/admin/login');
                    } else {
                        // Thông báo nếu có lỗi từ API
                        message.error('Đăng xuất thất bại!');
                    }
                } catch (error) {
                    // Thông báo nếu có lỗi xảy ra khi gọi API
                    message.error('Có lỗi xảy ra khi đăng xuất!');
                }
            },
        },
    ];

    return (
        <div className='p-2 row bg-white m-0'>
            <div className='col text-end'>
                <Space>
                    <Button
                        type='text'
                        icon={<Notification size={22} color={colors.gray600} />}
                    />
                    <Dropdown menu={{ items }}>
                        <Avatar src={user.photoUrl} size={40} />
                    </Dropdown>
                </Space>
            </div>
        </div>
    );
};

export default HeaderComponent;
