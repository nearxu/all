import React, { Component, PropTypes } from "react";
import { Form, Input, Button, message } from "antd";
import http from "../server/http";
const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props);
  }
  handleRegister(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      } else {
        this.submitRegister(values);
      }
    });
  }
  submitRegister(data) {
    const { name, password } = data;
    http
      .post("/api/admin/register", {
        user_name: name,
        password
      })
      .then(res => {
        if (res.data.status === 2) {
          message.info("该用户已经存在");
        } else {
          message.info("注册成功");
          this.props.history.push("/admin/login");
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <Form onSubmit={this.handleRegister.bind(this)}>
        <FormItem label="Name" {...formItemLayout}>
          {getFieldDecorator("name", {})(<Input placeholder="name" />)}
        </FormItem>
        <FormItem label="Password" {...formItemLayout}>
          {getFieldDecorator("password", {})(<Input placeholder="password" />)}
        </FormItem>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            REGISTER
          </Button>
        </div>
      </Form>
    );
  }
}

const RegisterComponent = Form.create()(Register);

export default RegisterComponent;
