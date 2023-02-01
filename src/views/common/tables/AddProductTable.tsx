import React, { useEffect, useState } from 'react';
import { Button, Space, Table, message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Product from '../../../app/models/Product';
import { dbPromise } from '../../../app/config/database';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const AddProductTable = ({ searchMode, search, attribute }: { searchMode: boolean, search: string, attribute: string }) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<Product> = [
    {
      title: 'أسم الصنف',
      dataIndex: 'name',
      key: 'name',
      //   ...getColumnSearchProps('name'),
    },
    {
      title: 'سعر الشراء',
      dataIndex: 'buying_price',
    },
    {
      title: 'كود الصنف',
      dataIndex: 'barcode',
    },
    {
      title: 'سعر البيع',
      dataIndex: 'selling_price',
    },
    {
      title: 'له تاريخ صلاحية',
      dataIndex: 'has_expiry_date',
      render: (has_expiry_date) => (has_expiry_date ? 'نعم' : 'لا'),
    },
    {
      title: 'تحكم',
      render: () => (
        <Space>
          <Button type='primary' icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </Space>
      )
    }
    ,
  ];
  const fetchOnSearch = async () => {
    // enterSearchMode();
    setLoading(true);
    const data = await Product.chunck(['*'], tableParams.pagination?.pageSize!, tableParams.pagination?.current!, `${attribute} LIKE '%${search}%'`) as Product[];
    const count = await Product.count(`${attribute} LIKE '%${search}%'`);
    if (count === 0) message.error(`لم يتم العثور على نتائج`);
    message.success(`تم العثور على ${count} نتيجة`);
    setData(data);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: count,
      },
    });
  }
  const fetchData = async () => {
    setLoading(true);
    const data = await Product.chunck(['*'], tableParams.pagination?.pageSize!, tableParams.pagination?.current!) as Product[];
    const count = await Product.count();
    setData(data);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: count,
      },
    });
  };

  useEffect(() => {
    if (searchMode) {
      fetchOnSearch();
    } else {
      fetchData();
    }
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<Product> | SorterResult<Product>[],) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id!}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      bordered
      onChange={handleTableChange}
    />
  );
};

export default AddProductTable;
