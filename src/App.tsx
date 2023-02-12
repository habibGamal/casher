import Database from "tauri-plugin-sql-api";
import { productSql } from "./sql/sql-exports";
import { Button, Col, Divider, Input, Row, Select, Space } from "antd";
import "./style.scss";
import Navbar, { MenuKeys } from "./views/components/Navbar";
import Products from "./views/products/Products";
import fakerRunner from "./app/faker/faker-runner";
import { useState } from "react";
import ShouldImplement from "./views/ShouldImplement";
import ProductGroups from "./views/products/ProductGroups";
import ExpiredProducts from "./views/products/ExpiredProducts";
import OpeningStocks from "./views/products/OpeningStocks";
// import { mockIPC  } from '@tauri-apps/api/mocks'
// mockIPC(()=>{})
const dbWork = async () => {
  const db = await Database.load("mysql://root:root@localhost/test2");
  // const drop = await db.execute('DROP TABLE IF EXISTS `products`');
  const res = await db.execute(productSql);
};
const pages: { [K in MenuKeys]: JSX.Element } = {
  add_products: <Products />,
  product_groups: <ProductGroups />,
  product_details: <ShouldImplement />,
  expired_products: <ExpiredProducts />,
  openning_stock: <OpeningStocks />,
  add_stock: <ShouldImplement />,
  stock_inventory: <ShouldImplement />,
  stock_waste: <ShouldImplement />,
  stock_transfer: <ShouldImplement />,
  supporters: <ShouldImplement />,
  invoices: <ShouldImplement />,
  accounting: <ShouldImplement />,
  repoting: <ShouldImplement />,
  managment: <ShouldImplement />,
  notifications: <ShouldImplement />,
  logout: <ShouldImplement />,
};

function App() {
  dbWork();
  // fakerRunner();
  const [currentPage, setCurrentPage] = useState<MenuKeys>("openning_stock");

  return (
    <Row wrap={false}>
      <Col>
        <Navbar setCurrentPage={setCurrentPage} />
      </Col>
      <Col flex="auto">{pages[currentPage]}</Col>
    </Row>
  );
}

export default App;
