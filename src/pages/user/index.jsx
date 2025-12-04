import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Modal,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import "./user.css";
import { getUser, addUser, editUser, delUser } from "../../api";
import dayjs from "dayjs";

const User = () => {
  const [listData, setListData] = useState({ name: "" });
  const [tableData, setTableData] = useState([]);
  const [modelType, setModelType] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [form] = Form.useForm();
  //新增
  const handclick = (type, rowData) => {
    setIsModelOpen(!isModelOpen);
    if (type === "add") {
      setModelType(0);
    } else {
      setModelType(1);
      const cloneData = JSON.parse(JSON.stringify(rowData));
      cloneData.birth = dayjs(cloneData.birth);
      form.setFieldsValue(cloneData);
    }
  };

  const getTableData = useCallback(() => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list);
    });
  }, [listData]);

  //提交
  const handleFinish = (e) => {
    setListData({
      name: e.keyword,
    });
  };

  useEffect(() => {
    getTableData();
  }, [getTableData]);
  const handleCancel = () => {
    setIsModelOpen(false);
    form.resetFields();
  };

  //删除
  const handleDelete = ({ id }) => {
    delUser({ id }).then(() => {
      getTableData();
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((val) => {
        val.birth = dayjs(val.birth).format("YYYY-MM-DD");
        console.log(val);
        // 调用后端接口
        if (modelType) {
          //编辑
          editUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        } else {
          //新增
          addUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val) => {
        return val ? "女" : "男";
      },
    },
    {
      title: "出生日期",
      dataIndex: "birth",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      render: (rowData) => {
        return (
          <div className="flex-box">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handclick("edit", rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="确认删除吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handclick("add")}>
          +新增
        </Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        style={{ marginTop: "10px" }}
        columns={columns}
        dataSource={tableData}
        rowKey={"id"}
      ></Table>
      <Modal
        open={isModelOpen}
        title={modelType ? "编辑用户" : "新增用户"}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          {modelType === 1 && <Form.Item name="id" hidden></Form.Item>}
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入姓名",
              },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                required: true,
                message: "请输入年龄",
              },
              {
                type: "number",
                message: "请输入数字",
              },
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>

          <Form.Item
            label="性别"
            name="sex"
            rules={[
              {
                required: true,
                message: "性别是必选",
              },
            ]}
          >
            <Select
              options={[
                { value: 0, label: "男" },
                { value: 1, label: "女" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="出生日期"
            name="birth"
            rules={[
              {
                required: true,
                message: "请选择出生日期",
              },
            ]}
          >
            <DatePicker placeholder="请选择" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="地址"
            name="addr"
            rules={[
              {
                required: true,
                message: "请填写地址",
              },
            ]}
          >
            <Input placeholder="请填写地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
