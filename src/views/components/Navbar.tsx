import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Badge, MenuProps } from 'antd';
import { Menu } from 'antd';
import IconSax from './IconSax';
import logo from '../../assets/images/logo.png';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [

  getItem('الاصناف', 'categories', <IconSax icon="shopping-bag" />, [
    getItem('اضافة الاصناف', 'add_products'),
    getItem('مجموعات الاصناف', 'product_groups'),
    getItem('تفاصيل الصنف', 'product_details'),
    getItem('الاصناف منتهية الصلاحية', 'expired_products'),
    getItem('الارصدة الافتتاحية', 'openning_stock'),
    getItem('الوحدات', 'units'),
  ]),

  getItem('المخازن', 'stock', <IconSax icon="stock" dir='custom' className='w-[24px]' />, [
    getItem('Item 1', 'g1'),
    getItem('Item 2', 'g2'),
  ]),
  getItem('الموردين والعملاء', 'supporters', <IconSax icon="people" />, [
    getItem('Item 1', 'g1'),
    getItem('Item 2', 'g2'),
  ]),
  getItem('الفواتير', 'invoices', <IconSax icon="receipt-item" />, [
    getItem('Item 1', 'g1'),
    getItem('Item 2', 'g2'),
  ]),
  getItem('الحسابات', 'accounting', <IconSax icon="calculator" />, [
    getItem('Item 1', 'g1'),
    getItem('Item 2', 'g2'),
  ]),
  getItem('التقارير', 'repoting', <IconSax icon="reports" dir='custom' className='w-[24px]' />, [
    getItem('Item 1', 'g1'),
    getItem('Item 2', 'g2'),
  ]),
  getItem('الادارة', 'managment ', <IconSax icon="key-square" />, [
    getItem('Item 1', 'g1'),
  ]),
  { type: 'divider' },
  getItem('تنبيهات', 'notifications',
    <Badge dot={true}>
      <IconSax icon="notification" className='text-red-400' />
    </Badge>,),
    getItem('تسجيل خروج', 'logout', <IconSax icon="login" className='text-red-400' />),


];

const Navbar: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  const width = 280;
  return (
    <div
      className={`w-[${width}px] min-h-screen border-l sticky top-0 border-[#e5e7eb] bg-white`}
    >
      <div className="grid place-items-center">
        <div className='aspect-square m-8 w-24 rounded-full border-0 border-gray-300 grid place-items-center'>
          <img src={logo} />
        </div>
      </div>
      <Menu
        onClick={onClick}
        style={{
          width: width,
          fontSize: 18
        }}
        defaultSelectedKeys={['add_products']}
        defaultOpenKeys={['categories']}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Navbar;