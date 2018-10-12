import React, { Component, PropTypes } from "react";
import http from "../server/http";
import { Table, Button, Modal, Select } from "antd";
import FoodForm from "../component/addFoodForm";

const Option = Select.Option;

export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      shopList: [],
      show: false
    };
  }
  componentDidMount() {
    this.getFoodList();
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
  getFoodList() {
    http
      .get("/api/shop/getFoodList", {})
      .then(res => {
        this.setState({ data: res.data.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  getFoods(id) {
    http
      .get("/api/shop/getFoods", {
        restaurant_id: id
      })
      .then(res => {
        this.setState({ data: res.data.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  toggleModal(type) {
    if (type === "ok" || type === "cancel") {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  }
  handleModalHide() {
    console.log("false");
    this.setState({ show: false });
  }
  handleChange(value) {
    const { shopList } = this.state;
    const id = shopList[value].id;
    this.getFoods(id);
  }
  render() {
    const columns = [
      { title: "ID", dataIndex: "item_id" },
      { title: "Name", dataIndex: "name" },
      { title: "Rating", dataIndex: "rating" },
      { title: "Category", dataIndex: "category_id" },
      { title: "Description", dataIndex: "description" }
    ];

    const { data, shopList } = this.state;
    return (
      <div>
        <div style={{ padding: 20 }}>
          <Button type="primary" onClick={this.toggleModal.bind(this)}>
            add Food
          </Button>
        </div>
        <div style={{ padding: 20 }}>
          <label>请选择店铺</label>
          <Select
            style={{ width: 120 }}
            onChange={this.handleChange.bind(this)}
          >
            {shopList.map((m, i) => {
              return <Option key={i}>{m.name}</Option>;
            })}
          </Select>
        </div>
        <Table columns={columns} dataSource={data} />
        <Modal
          title="Basic Modal"
          visible={this.state.show}
          onOk={this.toggleModal.bind(this, "ok")}
          onCancel={this.toggleModal.bind(this, "cancel")}
        >
          <FoodForm handleModalHide={this.handleModalHide.bind(this)} />
        </Modal>
      </div>
    );
  }
}
