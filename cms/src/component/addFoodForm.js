import React, { Component, PropTypes } from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import http from "../server/http";

const FormItem = Form.Item;
const Option = Select.Option;

class FoodFromComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopList: []
    };
  }
  componentDidMount() {
    this.getShopList();
  }
  getShopList() {
    http
      .get("/api/shop/getShopList", {})
      .then(res => {
        this.setState({ shopList: res.data.data });
      })
      .catch(err => {
        console.log(err.message);
      });
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
    const { name, restaurant_id, description, rating, category_id } = data;
    const { shopList } = this.state;
    let rest_id = shopList[restaurant_id].id;
    http
      .post("/api/shop/addFood", {
        name,
        description,
        restaurant_id: rest_id,
        rating,
        category_id
      })
      .then(res => {
        this.props.handleModalHide();
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  handleChange(type, index) {}
  render() {
    const { getFieldDecorator } = this.props.form;
    const { shopList } = this.state;
    return (
      <Form onSubmit={this.handleAddShop.bind(this)}>
        <FormItem label="Name">
          {getFieldDecorator("name", {})(<Input placeholder="name" />)}
        </FormItem>
        <FormItem label="店铺ID">
          {getFieldDecorator("restaurant_id", {})(
            <Select
              style={{ width: 120 }}
              onChange={this.handleChange.bind(this, "shop")}
            >
              {shopList.map((m, i) => {
                return <Option key={i}>{m.name}</Option>;
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label="Description">
          {getFieldDecorator("description", {})(
            <Input placeholder="description" />
          )}
        </FormItem>
        <FormItem label="价格(元)">
          {getFieldDecorator("rating", {})(
            <InputNumber placeholder="rating" />
          )}
        </FormItem>
        <FormItem label="商品类型">
          {getFieldDecorator("category_id", {})(
            <Select
              style={{ width: 120 }}
              onChange={this.handleChange.bind(this, "food")}
            >
              <Option value="1">固体食物</Option>
              <Option value="2">面食</Option>
              <Option value="3">西式</Option>
              <Option value="4">液体</Option>
            </Select>
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">
          add Shop
        </Button>
      </Form>
    );
  }
}

const FoodForm = Form.create()(FoodFromComponent);

export default FoodForm;
