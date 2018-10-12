import React, { Component, PropTypes } from "react";
import http from "../server/http";
import { Table } from "antd";

export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.getUserList();
  }
  getUserList() {
    http
      .get("/api/admin/all", {})
      .then(res => {
        this.setState({ data: res.data.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  render() {
    const columns = [
      { title: "ID", dataIndex: "id" },
      { title: "Name", dataIndex: "user_name" },
      { title: "Password", dataIndex: "password" },
      { title: "Status", dataIndex: "status" }
    ];

    const { data } = this.state;
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
