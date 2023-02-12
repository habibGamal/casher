import { SortOrder, SorterResult } from "antd/es/table/interface";
import { useState } from "react";

const useSortTable = <T>() => {
    const [sortedInfo, setSortedInfo] = useState<SorterResult<T>>({ order: null, columnKey: 'name' });
    const updateSortState = (columnKey: string) => {
        // null -> descend -> ascend -> null
        if (sortedInfo.order === 'descend') {
            setSortedInfo({ order: 'ascend', columnKey });
            return;
        }
        if (sortedInfo.order === 'ascend') {
            setSortedInfo({ order: null, columnKey });
            return;
        }
        if (sortedInfo.order === null)
            setSortedInfo({ order: 'descend', columnKey });
    }

    const sortDB = () => {
        if (sortedInfo.order === null) return 'created_at DESC';
        return `${sortedInfo.columnKey} ${sortedInfo.order === 'descend' ? 'DESC' : 'ASC'}`
    }

    const getSortProps = (columnKey: string) => {
        return {
            sorter: true,
            sortOrder: sortedInfo.columnKey === columnKey ? sortedInfo.order : null,
            onHeaderCell: () => {
                return {
                    onClick: () => {
                        updateSortState(columnKey);
                    }
                }
            },
            sortDirections: ['descend', 'ascend'] as SortOrder[],
        }
    }
    return { getSortProps, sortDB, sortedInfo }
}

export default useSortTable;