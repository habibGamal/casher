import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProductGroup from "../../../app/models/ProductGroup";
import useModal from "../../../hooks/useModal";
import useSortTable from "../../../hooks/useSortTable";
import ProductService from "../../../app/services/ProductService";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import { QueryResult } from "tauri-plugin-sql-api";
import ProductGroupForm from "../forms/ProductGroupForm";
import ProductsInGroup from "../../products/modals/ProductsInGroup";
import ProductGroupService from "../../../app/services/ProductGroupService";

interface ProductGroupsTableProps {
  searchMode: boolean;
  search: string;
  attribute: string;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const ProductGroupsTable = ({
  searchMode,
  search,
  attribute,
  refresh,
  setRefresh,
}: ProductGroupsTableProps) => {
  const [loading, setLoading] = useState(false);
  const { tableParams, handleTableChange, resetPagination } =
    useTablePagination<ProductGroup>();
  const [data, setData] = useState<ProductGroup[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [productToEdit, setProductToEdit] = useState<ProductGroup | null>(null);
  const {
    open: openEditForm,
    closeModal: closeEditForm,
    showModal: showEditForm,
    handleCancel: handleCancelEditForm,
  } = useModal();
  const {
    open: openProductsInGroup,
    handleCancel: handleCancelProductsInGroup,
    showModal: showProductsInGroupModal,
  } = useModal();
  const { getSortProps, sortDB, sortedInfo } = useSortTable<ProductGroup>();

  const editModel = (product: ProductGroup) => {
    setProductToEdit(product);
    showEditForm();
  };

  const showProductsInGroup = (id: number) => {
    showProductsInGroupModal();
  };

  const columns: ColumnsType<ProductGroup> = [
    {
      title: "أسم المجموعة",
      dataIndex: "name",
      key: "name",
      ...getSortProps("name"),
    },
    {
      title: "عدد الاصناف في المجموعة",
      dataIndex: "productsCount",
      key: "productsCount",
    },
    {
      title: "تحكم",
      key: "control",
      render: (record: ProductGroup) => (
        <Space size="middle">
          <Button onClick={() => showProductsInGroup(9)}>
            عرض اصناف المجموعة
          </Button>
          <Button
            type="primary"
            onClick={() => editModel(record)}
            icon={<EditOutlined />}
          />
          <Button
            danger
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const fetchData = async (search?: string) => {
    setLoading(true);
    const { productGroups, count } = await ProductGroupService.getProductGroupsWithProductsCount(
      tableParams,
      sortDB(),
      search
    );
    setData(productGroups);
    setTotal(count);
    setLoading(false);
  };

  const handleDelete = async (product: ProductGroup) => {
    const res = (await product.delete()) as QueryResult;
    if (res && res.rowsAffected === 1) {
      setRefresh(!refresh);
      message.info("تم حذف الصنف بنجاح");
    } else {
      message.error("حدث خطأ أثناء حذف الصنف");
    }
  };

  useEffect(() => {
    searchMode ? fetchData(`${attribute} LIKE '%${search}%'`) : fetchData();
  }, [JSON.stringify(tableParams), searchMode, attribute, sortedInfo, refresh]);

  useWhileTyping(
    () => {
      resetPagination();
      fetchData(`${attribute} LIKE '%${search}%'`);
    },
    searchMode,
    [searchMode, search]
  );

  return (
    <>
      <Modal
        title="اصناف المجموعة"
        open={openProductsInGroup}
        onCancel={handleCancelProductsInGroup}
        footer={null}
        destroyOnClose={true}
        width="90%"
      >
        <ProductsInGroup />
      </Modal>
      <Modal
        title="تعديل المجموعة"
        open={openEditForm}
        footer={null}
        onCancel={handleCancelEditForm}
        destroyOnClose={true}
        width="90%"
      >
        {/* <ProductGroupForm
          closeModal={closeEditForm}
          modelToEdit={productToEdit || undefined}
        /> */}
      </Modal>
      <Table
        columns={columns}
        rowKey={(record) => record.id!}
        dataSource={data}
        pagination={{ ...tableParams.pagination, total }}
        loading={loading}
        bordered
        onChange={handleTableChange}
        footer={() => "عدد النتائج : " + total}
        className="custom-table"
      />
    </>
  );
};

export default ProductGroupsTable;
