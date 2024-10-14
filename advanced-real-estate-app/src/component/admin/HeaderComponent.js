import { Avatar, Button, Dropdown, Space } from 'antd';
import { Notification } from 'iconsax-react';
import { colors } from '../../constants/colors';
import { useSelector } from 'react-redux';
import { authSeletor } from '../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const user = useSelector(authSeletor);

    const navigate = useNavigate();

    const items = [
        {
            key: 'logout',
            label: 'Đăng xuất',
            onClick: async () => {
                // signOut(auth);
                navigate('/');
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