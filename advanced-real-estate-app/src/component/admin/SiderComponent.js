/* eslint-disable no-unused-vars */
import { Layout, Menu, Typography } from 'antd';
import {
	Box,
	Chart,
	Home2,
	PercentageSquare,
	ProfileCircle,
} from 'iconsax-react';
import { Link } from 'react-router-dom';
import { CiViewList } from 'react-icons/ci';
import { MdOutlineInventory } from 'react-icons/md';
import { appInfo } from '../../constants/appInfos';
import { colors } from '../../constants/colors';
import { FaTags } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import classNames from 'classnames';

const { Sider } = Layout;
const { Text } = Typography;

const SiderComponent = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) { // sm và md breakpoint
				setIsCollapsed(true);
			} else {
				setIsCollapsed(false);
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const items = [
		{
			key: 'admin',
			label: <Link to={'/admin'}>Quản Lý Admin</Link>,
			icon: <Home2 size={20} />,
		},
		{
			key: 'service',
			label: <Link to={'/admin/service'}>Quản Lý Service</Link>,
			icon: <Home2 size={20} />,
		},
		// {
		// 	key: 'inventory',
		// 	label: 'Inventory',
		// 	icon: <MdOutlineInventory size={20} />,
		// 	children: [
		// 		{
		// 			key: 'inventory',
		// 			label: <Link to={'/inventory'}>All</Link>,
		// 		},
		// 		{
		// 			key: 'addNew',
		// 			label: <Link to={`/inventory/add-product`}>Add new</Link>,
		// 		},
		// 	],
		// },
	];

	return (
		<Sider
			collapsible
			collapsed={isCollapsed}
			width={280}
			theme='light'
			style={{ height: '100vh' }}
		>
			<div className='p-2 d-flex align-items-center justify-content-center'>
				<img src={appInfo.logo} width={48} alt='App Logo' />
				{!isCollapsed && (
					<Text
						style={{
							alignContent: 'center',
							fontWeight: 'bold',
							fontSize: '1rem',
							color: colors.primary500,
							margin: 0,
						}}>
						{appInfo.title}
					</Text>
				)}
			</div>
			<Menu mode='inline' items={items} theme='light' />
		</Sider>
	);
};

export default SiderComponent;