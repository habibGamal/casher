import React, { useRef, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Badge, Button, MenuProps } from "antd";
import { Menu } from "antd";
import IconSax from "./IconSax";
import logo from "../../assets/images/logo.png";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// make type that containes all the keys of the items manually
export type MenuKeys =
  | "add_products"
  | "product_groups"
  | "product_details"
  | "expired_products"
  | "openning_stock"
  | "add_stock"
  | "tracking_stocks"
  | "stock_waste"
  | "stock_transfer"
  | "supporters"
  | "invoices"
  | "accounting"
  | "repoting"
  | "managment"
  | "notifications"
  | "logout";

const items: MenuProps["items"] = [
  getItem("الاصناف", "products_section", <IconSax icon="shopping-bag" />, [
    getItem("اضافة الاصناف", "add_products"),
    getItem("مجموعات الاصناف", "product_groups"),
    getItem("تفاصيل الصنف", "product_details"),
    getItem("الاصناف منتهية الصلاحية", "expired_products"),
    getItem("الارصدة الافتتاحية", "openning_stock"),
  ]),

  getItem(
    "ادارة المخازن",
    "stock_section",
    <IconSax icon="stock" dir="custom" className="w-[24px]" />,
    [
      getItem("اضافة مخزن", "add_stock"),
      getItem("جرد المخازن", "tracking_stocks"),
      getItem("الهالك", "stock_waste"),
      getItem("التحويل بين المخازن", "stock_transfer"),
    ]
  ),
  getItem("الموردين والعملاء", "supporters", <IconSax icon="people" />, [
    getItem("Item 1", "g1"),
    getItem("Item 2", "g2"),
  ]),
  getItem("الفواتير", "invoices", <IconSax icon="receipt-item" />, [
    getItem("Item 1", "g1"),
    getItem("Item 2", "g2"),
  ]),
  getItem("الحسابات", "accounting", <IconSax icon="calculator" />, [
    getItem("Item 1", "g1"),
    getItem("Item 2", "g2"),
  ]),
  getItem(
    "التقارير",
    "repoting",
    <IconSax icon="reports" dir="custom" className="w-[24px]" />,
    [getItem("Item 1", "g1"), getItem("Item 2", "g2")]
  ),
  getItem("الادارة", "managment ", <IconSax icon="key-square" />, [
    getItem("Item 1", "g1"),
  ]),
  { type: "divider" },
  getItem(
    "تنبيهات",
    "notifications",
    <Badge dot={true}>
      <IconSax icon="notification" className="text-red-400" />
    </Badge>
  ),
  getItem(
    "تسجيل خروج",
    "logout",
    <IconSax icon="login" className="text-red-400" />
  ),
];

const Navbar = ({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<MenuKeys>>;
}) => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrentPage(e.key as MenuKeys);
  };
  const width = 280;
  const [collapsed, setCollapsed] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggleCollapsed = () => {
    menu.current?.classList.toggle("w-[280px]");
    setCollapsed(!collapsed);
  };
  return (
    <div
      ref={menu}
      className={`w-[280px] min-h-screen border-l sticky top-0 border-[#e5e7eb] bg-white`}
    >
      <div className="grid place-items-center">
        <div className="aspect-square my-16 w-[50px] rounded-full border-0 border-gray-300 grid place-items-center">
          <img src={logo} />
        </div>
      </div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["product_groups"]}
        defaultOpenKeys={["categories"]}
        mode="inline"
        items={items}
        inlineCollapsed={collapsed}
      />
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className="absolute bottom-4 left-0 w-full rounded-none"
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

export default Navbar;
