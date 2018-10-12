import React, { Component, PropTypes } from "react";
import { Form, Input, Button } from "antd";
import http from "../server/http";

const FormItem = Form.Item;

class ShopFromComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleAddShop(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      } else {
        this.submitShopData(values);
      }
    });
  }
  submitShopData(data) {
    const { name, address, description, phone, category } = data;
    http
      .post("/api/shop/addShop", {
        name,
        address,
        description,
        phone,
        category
      })
      .then(res => {
        this.props.handleModalHide();
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleAddShop.bind(this)}>
        <FormItem label="Name">
          {getFieldDecorator("name", {})(<Input placeholder="name" />)}
        </FormItem>
        <FormItem label="Address">
          {getFieldDecorator("address", {})(<Input placeholder="address" />)}
        </FormItem>
        <FormItem label="Description">
          {getFieldDecorator("description", {})(
            <Input placeholder="description" />
          )}
        </FormItem>
        <FormItem label="Phone">
          {getFieldDecorator("phone", {})(<Input placeholder="phone" />)}
        </FormItem>
        <FormItem label="Category">
          {getFieldDecorator("category", {})(<Input placeholder="category" />)}
        </FormItem>
        <Button type="primary" htmlType="submit">
          add Shop
        </Button>
      </Form>
    );
  }
}

const ShopForm = Form.create()(ShopFromComponent);

export default ShopForm;
