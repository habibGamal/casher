import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Database from 'tauri-plugin-sql-api'
import { productSql } from "./sql/sql-exports";
import { Button, Col, Divider, Row, Space } from "antd";
import add from './assets/icons/linear/add.svg';
import "./style.scss";
import Navbar from "./views/components/Navbar";
import IconSax from "./views/components/IconSax";
import FormComponent from "./views/components/FormComponent";
import TableComponent from "./views/components/TableComponent";
import PageTitle from "./views/components/PageTitle";
import ButtonSax from "./views/components/ButtonSax";
import ModalComponent from "./views/components/ModalComponent";
// import { mockIPC  } from '@tauri-apps/api/mocks'
// mockIPC (()=>{})

const t = async () => {
  const db = await Database.load('mysql://root:root@localhost/test2')
  const res = await db.execute(productSql);
  console.log(db);

  // console.log(res);
}

function App() {
  // t();
  return (
    <Row wrap={false}>
      <Col flex="280px">
        <Navbar />
      </Col>
      <Col flex="auto" >
        <Row gutter={[0, 25]} className="m-8">
          <Col span="24">
            <PageTitle name="أضافة الاصناف" />
          </Col>
          <Col span="24">
            <FormComponent />
          </Col>
          <Col span="24">
            <TableComponent />
          </Col>
          <Col span="24">
            <ModalComponent />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default App;
