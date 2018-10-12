import AdminModel from "../models/admin";
import formidable from "formidable";
import BaseComponent from "../../prototype/baseComponent";
import crypto from "crypto";

class Admin extends BaseComponent {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  async login(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          type: "form_data_error"
        });
      }
      const { user_name, password } = fields;
      try {
        const admin = await AdminModel.findOne({ user_name });
        if (!admin) {
          res.send({
            status: 1,
            message: "该管理员不存在"
          });
        } else {
          const newpassword = this.encryption(password);
          if (newpassword.toString() === admin.password.toString()) {
            res.send({
              status: 1,
              message: "登录成功"
            });
          } else {
            res.send({
              status: 2,
              message: "管理员密码错误"
            });
          }
        }
      } catch (err) {
        res.send({
          status: 0,
          message: "登录失败"
        });
      }
    });
  }
  async register(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          message: "表单信息错误"
        });
      }
      const { user_name, password, status = 1 } = fields;
      try {
        const admin = await AdminModel.findOne({ user_name });
        if (admin) {
          res.send({
            status: 2,
            message: "该用户已经存在"
          });
        } else {
          const adminTip = status == 1 ? "管理员" : "超级管理员";
          const admin_id = await this.getId("admin_id");
          const newpassword = this.encryption(password);
          const newAddmin = {
            user_name,
            password: newpassword,
            admin: adminTip,
            id: admin_id,
            status
          };
          await AdminModel.create(newAddmin);
          res.send({
            status: 1,
            message: "注册管理员成功"
          });
        }
      } catch (err) {
        res.send({
          status: 0,
          message: "注册管理员失败"
        });
      }
    });
  }
  encryption(password) {
    const newpassword = this.Md5(
      this.Md5(password).substr(2, 7) + this.Md5(password)
    );
    return newpassword;
  }
  Md5(password) {
    const md5 = crypto.createHash("md5");
    return md5.update(password).digest("base64");
  }
  async singout(req, res, next) {
    try {
      delete req.session.admin_id;
      res.send({
        status: 1,
        success: "退出成功"
      });
    } catch (err) {
      res.send({
        status: 0,
        message: "退出失败"
      });
    }
  }

  async getAllAdmin(req, res, next) {
    const { limit = 20, offset = 0 } = req.query;
    try {
      const allAdmin = await AdminModel.find({}, "-_id")
        .sort({ id: -1 })
        .skip(Number(offset))
        .limit(Number(limit));
      res.send({
        status: 1,
        data: allAdmin
      });
    } catch (err) {
      res.send({
        status: 0,
        message: "服务器繁忙"
      });
    }
  }
}

export default new Admin();
