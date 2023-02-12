import { Checkbox, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useState } from "react";
import Product from "../../../app/models/Product";
import Model from "../../../app/models/Model";
import ErrorList from "antd/es/form/ErrorList";
import { Errors, ErrorResult } from "../../../app/config/interfaces";
import { QueryResult } from "tauri-plugin-sql-api";
import useFormError from "../../../hooks/useFormError";
import ProductService from "../../../app/services/ProductService";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    md: {
      span: 12,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 20,
    },
  },
  wrapperCol: {
    md: {
      span: 12,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 20,
    },
  },
};

interface ProductFormProps {
  modelToEdit?: Product;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal?: () => void;
}
const ProductForm = ({
  modelToEdit,
  setRefresh,
  closeModal,
}: ProductFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [unitOrWeight, setUnitOrWeight] = useState(0);
  const { setErrors, isError, getErrorMessage } = useFormError();
  const onFinish = async (values: any) => {
    setLoading(true);
    if (modelToEdit) {
      const result = await ProductService.updateProduct(modelToEdit, values);
      handleResult(result, "تم تعديل الصنف بنجاح");
    } else {
      const result = await ProductService.createProduct(values);
      handleResult(result, "تم اضافة الصنف بنجاح");
      if (setRefresh) setRefresh((refresh) => !refresh);
    }
    setLoading(false);
    closeModal!();
  };

  const handleResult = (
    result: Errors | QueryResult | undefined,
    messageOnSucess: string
  ) => {
    if (result && (result as QueryResult).rowsAffected > 0) {
      message.success(messageOnSucess);
      form.resetFields();
    }
    if (result && (result as Errors).errors) {
      setErrors((result as Errors).errors);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={modelToEdit?.toForm()}
      className="p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 "
      layout="vertical"
      scrollToFirstError
    >
      <Row gutter={24}>
        <Col md={24} lg={12} xl={8}>
          <Form.Item
            name="name"
            label="أسم الصنف"
            rules={[
              {
                required: true,
                message: "هذا الحقل مطلوب",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="barcode"
            label="كود الصنف"
            rules={[
              { required: true, message: "هذا الحقل مطلوب" },
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "رقم الصنف يجب ان يكون ارقام فقط",
              },
            ]}
            validateStatus={isError("barcode") ? "error" : "success"}
            help={isError("barcode") ? getErrorMessage("barcode") : ""}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="product_group_id"
            initialValue={1}
            label="مجموعة الصنف"
            rules={[{ required: true, message: "هذا الحقل مطلوب" }]}
          >
            <Select>
              <Option value={1}>غير مصنف</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={24} lg={12} xl={8}>
          <Form.Item
            name="buying_price"
            label="سعر الشراء"
            rules={[
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "رقم الصنف يجب ان يكون ارقام فقط",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="selling_price" label="سعر البيع">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="minimum_stock" label="الحد الادنى من المخزون">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col md={24} lg={12} xl={8}>
          <Form.Item
            name="has_expire_date"
            initialValue={1}
            valuePropName="checked"
          >
            <Checkbox>يمتلك صلاحية</Checkbox>
          </Form.Item>

          <Form.Item initialValue={0} name="unit_or_weight">
            <Radio.Group onChange={(e) => setUnitOrWeight(e.target.value)}>
              <Radio.Button value={0}>وحدة</Radio.Button>
              <Radio.Button value={1}>وزن</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="unit"
            label="اسم الوحدة"
            initialValue="قطعة"
            rules={[{ required: true, message: "هذا الحقل مطلوب" }]}
          >
            <Input disabled={unitOrWeight === 1} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="grid place-items-center mt-8">
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            حفظ
          </Button>
          <Button htmlType="button" onClick={() => {}}>
            اعادة ملئ المدخلات
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
