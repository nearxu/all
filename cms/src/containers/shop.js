import React, { Component, PropTypes } from "react";
import http from "../server/http";
import { Table, Button, Modal } from "antd";
import ShopForm from "../component/addShopForm";

export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false
    };
  }
  componentDidMount() {
    this.getShopList();
  }
  getShopList() {
    http
      .get("/api/shop/getShopList", {})
      .then(res => {
        console.log(res.data, "data");
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
  render() {
    const columns = [
      { title: "ID", dataIndex: "id" },
      { title: "Name", dataIndex: "name" },
      { title: "Address", dataIndex: "address" },
      { title: "Category", dataIndex: "category" },
      { title: "Description", dataIndex: "description" },
      { title: "Phone", dataIndex: "phone" }
    ];

    const { data } = this.state;
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.toggleModal.bind(this)}>
            add Shop
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
        <Modal
          title="Basic Modal"
          visible={this.state.show}
          onOk={this.toggleModal.bind(this, "ok")}
          onCancel={this.toggleModal.bind(this, "cancel")}
        >
          <ShopForm handleModalHide={this.handleModalHide.bind(this)} />
        </Modal>
      </div>
    );
  }
}
