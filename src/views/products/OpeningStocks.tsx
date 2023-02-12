import { Col, Modal, Row, message } from 'antd'
import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import TableController from '../components/TableController'
import useTableController from '../../hooks/useTableController'
import useModal from '../../hooks/useModal'
import ProductsTable from '../common/tables/ProductsTable'
import ProductForm from '../common/forms/ProductForm'
import OpeningStocksTable from '../common/tables/OpeningStocksTable'
import OpeningStockForm from '../common/forms/OpeningStockForm'



export default function OpeningStocks() {
    const { search, setSearch, attribute, setAttribute, searchMode, enterSearchMode, exitSearchMode } = useTableController('name');
    const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()
    const [refresh, setRefresh] = useState<boolean>(false);

    return (
        <Row gutter={[0, 25]} className="m-8">
            <Col span="24">
                <PageTitle name="الارصدة الافتتاحية" />
            </Col>
            <Col span="24">
                <Modal
                    title="اضافة رصيد افتتاحي للمنتج"
                    open={open}
                    onOk={handleOk}
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    width="90%"
                >
                    <OpeningStockForm
                        setRefresh={setRefresh}
                    />
                </Modal>
            </Col>
            <Col span="24">
                <TableController
                    addButtonText="اضافة رصيد افتتاحي"
                    addButtonAction={showModal}
                    searchButtonAction={() => enterSearchMode()}
                    setSearch={setSearch}
                    setAttribute={setAttribute}
                    showSearchCancelButton={searchMode}
                    exitSearchMode={exitSearchMode}
                    defaultValue="name"
                    options={[
                        { label: 'اسم الصنف', value: 'name' },
                        { label: 'كود الصنف', value: 'barcode' },
                        { label: 'المخزن', value: 'stock_id' },
                    ]}
                />
            </Col>
            <Col span="24">
                <OpeningStocksTable
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
