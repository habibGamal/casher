import { Col, Modal, Row, message } from "antd";
import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import TableController from "../components/TableController";
import useTableController from "../../hooks/useTableController";
import useModal from "../../hooks/useModal";
import ProductsTable from "../common/tables/ProductsTable";
import ProductForm from "../common/forms/ProductForm";

export default function Products() {
  const {
    search,
    setSearch,
    attribute,
    setAttribute,
    searchMode,
    enterSearchMode,
    exitSearchMode,
  } = useTableController("name");
  const { open, confirmLoading, showModal, handleOk, handleCancel } =
    useModal();
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <Row gutter={[0, 25]} className="m-8">
        <PageTitle name="أضافة الاصناف" />
        <Modal
          title="أضافة صنف"
          open={open}
          onOk={handleOk}
          footer={null}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose={true}
          width="90%"
        >
          <ProductForm setRefresh={setRefresh} />
        </Modal>
      <Col span="24" className="isolate">
        <TableController
          addButtonText="أضافة صنف"
          addButtonAction={showModal}
          searchButtonAction={() => enterSearchMode()}
          setSearch={setSearch}
          setAttribute={setAttribute}
          showSearchCancelButton={searchMode}
          exitSearchMode={exitSearchMode}
          defaultValue="name"
          options={[
            { label: "اسم الصنف", value: "name" },
            { label: "السعر", value: "product_price" },
            { label: "الكمية", value: "product_quantity" },
          ]}
        />
        <ProductsTable
          searchMode={searchMode}
          search={search}
          attribute={attribute}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Col>
    </Row>
  );
}
