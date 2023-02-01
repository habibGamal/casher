import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Database from 'tauri-plugin-sql-api'
import { productSql } from "./sql/sql-exports";
import { Button, Col, Divider, Input, Row, Select, Space } from "antd";
import add from './assets/icons/linear/add.svg';
import "./style.scss";
import Navbar from "./views/components/Navbar";
import IconSax from "./views/components/IconSax";
import FormComponent from "./views/components/FormComponent";
import TableComponent from "./views/components/TableComponent";
import PageTitle from "./views/components/PageTitle";
import ButtonSax from "./views/components/ButtonSax";
import ModalComponent from "./views/components/ModalComponent";
import Product from "./app/models/Product";
import fakerRunner from "./app/faker/faker-runner";
import { PlusCircleOutlined } from "@ant-design/icons";
import TableController from "./views/components/TableController";
import useTableController from "./hooks/useTableController";
import AddProducts from "./views/products/AddProducts";
// import { mockIPC  } from '@tauri-apps/api/mocks'
// mockIPC (()=>{})
const dbWork = async () => {
  const db = await Database.load('mysql://root:root@localhost/test2')
  const res = await db.execute(productSql);
  // measure performance
  const start = performance.now();
  // const data = await Product.select(['*'] ,"name LIKE '%ant%'" );
  // const all = await db.select('select * from products');
  // console.log(all);
  const end = performance.now();
  console.log(`Performance: ${end - start} ms`);
  // (new Product({ productForm: { name: 'test', price: 100 } })).create()
  // console.log(res);
}

function App() {
  dbWork();
  // fakerRunner();
  return (
    <Row wrap={false}>
      <Col flex="280px">
        <Navbar />
      </Col>
      <Col flex="auto" >
        <AddProducts />
      </Col>
    </Row>
  );
}

export default App;
