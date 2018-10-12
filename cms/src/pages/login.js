import React, { Component, PropTypes } from "react";
import { Form, Input, Button, message } from "antd";
import http from "../server/http";
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      } else {
        this.submitLogin(values);
      }
    });
  }
  submitLogin(data) {
    const { name, password } = data;
    http
      .post("/api/admin/login", {
        user_name: name,
        password
      })
      .then(res => {
        if (res.data.status === 2) {
          message.info("管理员密码错误");
        } else {
          message.info("登录成功！");
          this.props.history.push("/admin/userList");
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
      <Form onSubmit={this.handleLogin.bind(this)}>
        <FormItem label="Name" {...formItemLayout}>
          {getFieldDecorator("name", {})(<Input placeholder="name" />)}
        </FormItem>
        <FormItem label="Password" {...formItemLayout}>
          {getFieldDecorator("password", {})(<Input placeholder="password" />)}
        </FormItem>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
        </div>
      </Form>
    );
  }
}

const LoginComponent = Form.create()(Login);

export default LoginComponent;
