import Database from "tauri-plugin-sql-api";
import { productGroupSql, productSql } from "./sql/sql-exports";
import { Button, Col, Divider, Input, Row, Select, Space } from "antd";
import "./style.scss";
import Navbar, { MenuKeys } from "./views/components/Navbar";
import Products from "./views/products/Products";
import fakerRunner from "./app/faker/faker-runner";
import { useEffect, useState } from "react";
import ShouldImplement from "./views/ShouldImplement";
import ProductGroups from "./views/products/ProductGroups";
import ExpiredProducts from "./views/products/ExpiredProducts";
import OpeningStocks from "./views/products/OpeningStocks";
import { dbPromise } from "./app/config/database";
import Stocks from "./views/stocks/Stocks";
import TrackingStocks from "./views/stocks/TrackingStocks";
// import { mockIPC  } from '@tauri-apps/api/mocks'
// mockIPC(()=>{})
const migration = async () => {
  const db = await dbPromise;
  // const drop = await db.execute('DROP TABLE IF EXISTS `products`');
  await db.execute(productGroupSql);
  await db.execute(productSql);
};
const dropAll = async () => {
  const db = await dbPromise;
  await db.execute("DROP TABLE IF EXISTS `products`");
  await db.execute("DROP TABLE IF EXISTS `product_groups`");
};
const pages: { [K in MenuKeys]: JSX.Element } = {
  add_products: <Products />,
  product_groups: <ProductGroups />,
  product_details: <ShouldImplement />,
  expired_products: <ExpiredProducts />,
  openning_stock: <OpeningStocks />,
  add_stock: <Stocks />,
  tracking_stocks: <TrackingStocks />,
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
  // migration();
  // initData();
  // dropAll();
  // fakerRunner();
  const [currentPage, setCurrentPage] = useState<MenuKeys>("openning_stock");
  useEffect(() => {
    // return () => {
    //   dbPromise.then((db) => db.close());
    // };
  }, []);
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
