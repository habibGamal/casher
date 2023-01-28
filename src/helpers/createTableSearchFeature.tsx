import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { useTableSearchReturn } from '../hooks/useTableSearch';
export default function createSearchFearure<DataType>([searchText, searchedColumn, setSearchText, setSearchedColumn, handleSearch, handleReset, searchInput]: useTableSearchReturn<keyof DataType>) {
    return (dataIndex: keyof DataType): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex as string}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                    >
                        بحث
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                    >
                        افراغ
                    </Button>
                    <Button
                        type="link"
                        // size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex as string);
                        }}
                    >
                        فلتر
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        danger
                        onClick={() => {
                            close();
                        }}
                    >
                        اغلق
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            console.log(record, dataIndex);

            return (record[dataIndex] as any)
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
}