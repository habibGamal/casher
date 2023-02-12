import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Product from "../../../app/models/Product";
import useModal from "../../../hooks/useModal";
import ProductForm from "../forms/ProductForm";
import useSortTable from "../../../hooks/useSortTable";
import ProductService from "../../../app/services/ProductService";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import { QueryResult } from "tauri-plugin-sql-api";

interface ProductsInGroupTableProps {
  searchMode: boolean;
  search: string;
  attribute: string;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const ProductsInGroupTable = ({
  searchMode,
  search,
  attribute,
  refresh,
  setRefresh,
}: ProductsInGroupTableProps) => {
  const [loading, setLoading] = useState(false);
  const { tableParams, handleTableChange, resetPagination } =
    useTablePagination<Product>();
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { getSortProps, sortDB, sortedInfo } = useSortTable<Product>();

  const columns: ColumnsType<Product> = [
    {
      title: "أسم الصنف",
      dataIndex: "name",
      key: "name",
      ...getSortProps("name"),
    },
    {
      title: "كود الصنف",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "تحكم",
      key: "control",
      render: (record: Product) => (
        <Space size="middle">
          <Button danger icon={<DeleteOutlined />}>
            ازالة من المجموعة
          </Button>
        </Space>
      ),
    },
  ];

  const fetchData = async (search?: string) => {
    setLoading(true);
    const { products, count } = await ProductService.chunk(
      tableParams,
      sortDB(),
      search
    );
    setData(products);
    setTotal(count);
    setLoading(false);
  };

  const handleRemove = async (product: Product) => {
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
      <Table
        columns={columns}
        rowKey={(record) => record.id!}
        dataSource={data}
        pagination={{ ...tableParams.pagination, total }}
        loading={loading}
        bordered
        onChange={handleTableChange}
        footer={() => "عدد النتائج : " + total}
      />
    </>
  );
};

export default ProductsInGroupTable;
