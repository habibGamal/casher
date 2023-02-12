import { Col, Modal, Row, message } from 'antd'
import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import TableController from '../components/TableController'
import useTableController from '../../hooks/useTableController'
import useModal from '../../hooks/useModal'
import ProductsTable from '../common/tables/ProductsTable'
import ProductGroupForm from '../common/forms/ProductGroupForm'
import ProductGroupsTable from '../common/tables/ProductGroupsTable'



export default function ProductGroups() {
    const { search, setSearch, attribute, setAttribute, searchMode, enterSearchMode, exitSearchMode } = useTableController('name');
    const { open, confirmLoading, showModal, handleOk, handleCancel } = useModal()
    const [refresh, setRefresh] = useState<boolean>(false);

    return (
        <Row gutter={[0, 25]} className="m-8">
            <Col span="24">
                <PageTitle name="مجموعات الاصناف" />
            </Col>
            <Col span="24">
                <Modal
                    title="اضافة مجموعة"
                    open={open}
                    onOk={handleOk}
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    width="90%"
                >
                    <ProductGroupForm
                        setRefresh={setRefresh}
                    />
                </Modal>
            </Col>
            <Col span="24">
                <TableController
                    addButtonText="اضافة مجموعة"
                    addButtonAction={showModal}
                    searchButtonAction={() => enterSearchMode()}
                    setSearch={setSearch}
                    setAttribute={setAttribute}
                    showSearchCancelButton={searchMode}
                    exitSearchMode={exitSearchMode}
                />
            </Col>
            <Col span="24">
                <ProductGroupsTable
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
