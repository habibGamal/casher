import { Select, Space } from 'antd';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
} from 'antd';
import React, { useState } from 'react';
import ButtonSax from './ButtonSax';


const { Option } = Select;


const formItemLayout = {
  labelCol: {
    md: {
      span: 12
    },
    lg: {
      span: 24
    },
    xl: {
      span: 20
    }
  },
  wrapperCol: {
    md: {
      span: 12
    },
    lg: {
      span: 24
    },
    xl: {
      span: 20
    }
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    span: 3,
    offset: 0,
  },
};

const FormComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {

    console.log('Received values of form: ', values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ email: "habibmisi3@gmail.com" }}
      className='p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 '
      layout="vertical"
      scrollToFirstError
    >
      <Row gutter={24}>
        <Col md={24} lg={12} xl={8}>

          <Form.Item
            name="email"
            label="أسم الصنف"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="number"
            label="رقم"
            rules={[
              { pattern: new RegExp(/^[0-9]+$/), message: 'رقم الصنف يجب ان يكون ارقام فقط' },
            ]}

          >
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={()=>{}}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="سعر الصنف"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="كود الصنف"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="fsfs"
            label="مجموعة الصنف"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

        </Col>
        <Col md={24} lg={12} xl={8}>
          <Form.Item
            name="email"
            label="سعر الشراء"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="سعر البيع"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="الحد الادنى"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="الوزن"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

        </Col>
        <Col md={24} lg={12} xl={8}>

          <Form.Item
            name="phone"
            label="الوحدة"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Row>
              <Col span="18">
                <Input style={{ width: '100%' }} />
              </Col>

              <Col span="4" offset={2}>
                <ButtonSax icon="add" shape='circle' type='dashed' />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="donation"
            label="يمتلك صلاحية"
            rules={[{ required: true, message: 'Please input donation amount!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="website"
            label="تاريخ الصلاحية"
            rules={[{ required: true, message: 'Please input website!' }]}
          >
            <Input />
          </Form.Item>


        </Col>
      </Row>

      <Form.Item className='grid place-items-center mt-8'>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading} onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000)
          }}>
            حفظ
          </Button>
          <Button htmlType="button" onClick={() => { }}>
            اعادة ملئ المدخلات
          </Button>
        </Space>
      </Form.Item>

    </Form>
  );
};

export default FormComponent;