import { Col, Modal, Row, message } from 'antd'
import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import TableController from '../components/TableController'
import TableComponent from '../components/TableComponent'
import useTableController from '../../hooks/useTableController'
import useModal from '../../hooks/useModal'
import AddProductTable from '../common/tables/AddProductTable'
import Product from '../../app/models/Product'



export default function AddProducts() {
    const { search, setSearch, attribute, setAttribute, searchMode, enterSearchMode, exitSearchMode } = useTableController('name');
    const { open, setOpen, confirmLoading, setConfirmLoading, showModal, handleOk, handleCancel } = useModal()


    return (
        <Row gutter={[0, 25]} className="m-8">
            <Col span="24">
                <PageTitle name="أضافة الاصناف" />
            </Col>
            <Col span="24">
                {/* <FormComponent /> */}
            </Col>
            <Col span="24">
                <Modal
                    title="تعديل الصنف"
                    open={open}
                    onOk={handleOk}
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    width="90%"
                >
                    {/* <FormComponent /> */}
                </Modal>
            </Col>
            <Col span="24">
                <TableController
                    addButtonText="أضافة صنف"
                    addButtonAction={() => console.log('add')}
                    searchButtonAction={() => enterSearchMode()}
                    setSearch={setSearch}
                    setAttribute={setAttribute}
                    showSearchCancelButton={searchMode}
                    exitSearchMode={exitSearchMode}
                    defaultValue="name"
                    options={[
                        { label: 'اسم الصنف', value: 'name' },
                        { label: 'السعر', value: 'product_price' },
                        { label: 'الكمية', value: 'product_quantity' },
                    ]}
                />
            </Col>
            <Col span="24">
                <AddProductTable
                    searchMode={searchMode}
                    search={search}
                    attribute={attribute}
                />
            </Col>
        </Row>
    )
}
