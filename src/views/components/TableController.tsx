import { Button, Input, Select } from 'antd'
import React from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';

interface TableComponentProps {
    options?: {
        label: string;
        value: string;
    }[] | undefined,
    defaultValue?: string | null | undefined,
    addButtonText: string,
    addButtonAction: () => void,
    searchButtonAction: () => void,
    setSearch: (value: string) => void,
    setAttribute: (value: string) => void,
    showSearchCancelButton: boolean,
    exitSearchMode: () => void,
}

export default function TableController({ options, defaultValue, addButtonText, addButtonAction, searchButtonAction, setSearch, setAttribute, showSearchCancelButton, exitSearchMode }: TableComponentProps) {
    return (
        <div className="grid grid-cols-2 gap-8">
            <div className={`grid grid-cols-${showSearchCancelButton ? 4 : 3} gap-8`}>
                <Input placeholder="بحث" onChange={(e) => setSearch(e.target.value)} />
                <Select
                    defaultValue={defaultValue}
                    onChange={value => setAttribute(value)}
                    options={options}
                />
                <Button onClick={searchButtonAction} >بحث</Button>
                {showSearchCancelButton && <Button danger onClick={exitSearchMode} >الغاء البحث</Button>}
            </div>
            <div>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={addButtonAction} > {addButtonText} </Button>
            </div>
        </div>
    )
}
