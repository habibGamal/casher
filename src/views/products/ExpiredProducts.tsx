import { Col, Modal, Row, message } from 'antd'
import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import TableController from '../components/TableController'
import useTableController from '../../hooks/useTableController'
import useModal from '../../hooks/useModal'
import ProductsTable from '../common/tables/ProductsTable'
import ProductForm from '../common/forms/ProductForm'
import ExpiredProductsTable from '../common/tables/ExpiredProductsTable'



export default function ExpiredProducts() {
    const { search, setSearch, attribute, setAttribute, searchMode, enterSearchMode, exitSearchMode } = useTableController('name');
    const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()
    const [refresh, setRefresh] = useState<boolean>(false);

    return (
        <Row gutter={[0, 25]} className="m-8">
            <Col span="24">
                <PageTitle name="الاصناف منتهية الصلاحية" />
            </Col>
            <Col span="24">
                <TableController
                    searchButtonAction={() => enterSearchMode()}
                    setSearch={setSearch}
                    setAttribute={setAttribute}
                    showSearchCancelButton={searchMode}
                    exitSearchMode={exitSearchMode}
                    defaultValue="name"
                    options={[
                        { label: 'اسم الصنف', value: 'name' },
                        { label: 'الكود', value: 'barcode' },
                    ]}
                />
            </Col>
            <Col span="24">
                <ExpiredProductsTable
                    searchMode={searchMode}
                    search={search}
                    attribute={attribute}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            </Col>
        </Row>
    )
}
