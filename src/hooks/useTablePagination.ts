import { useState } from "react";
import { TableParams } from "../app/config/interfaces";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";

const useTablePagination = <T>() => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const resetPagination = () => {
        setTableParams(tableParams => ({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                current: 1,
            },
        }))
    }

    const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[],) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    return { tableParams, setTableParams, handleTableChange, resetPagination };
}

export default useTablePagination;
