const menuList = [
  {
    title: '首页',
    key: '/home'
  },
  {
    title: '店铺详情',
    key: '/shop',
    children: [
      {
        title: '店铺列表',
        key: '/shop/shopList'
      },
      {
        title: '商品列表',
        key: '/shop/foodList'
      }
    ]
  },
  {
    title: '管理员信息',
    key: '/admin',
    children: [
      {
        title: '登录',
        key: '/admin/login'
      },
      {
        title: '注册',
        key: '/admin/register'
      },
      {
        title: '管理员列表',
        key: '/admin/userlist'
      }
    ]
  },
  {
    title: '文章',
    key: '/article',
    children: [
      {
        title: '文章文章',
        key: '/article/index'
      }
    ]
  },
  {
    title: '富文本',
    key: '/rich'
  },
  {
    title: '城市管理',
    key: '/city'
  },
  {
    title: '订单管理',
    key: '/order',
    btnList: [
      {
        title: '订单详情',
        key: 'detail'
      },
      {
        title: '结束订单',
        key: 'finish'
      }
    ]
  },
  {
    title: '员工管理',
    key: '/user'
  },
  {
    title: '车辆地图',
    key: '/bikeMap'
  },
  {
    title: '图标',
    key: '/charts',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar'
      },
      {
        title: '饼图',
        key: '/charts/pie'
      },
      {
        title: '折线图',
        key: '/charts/line'
      }
    ]
  },
  {
    title: '权限设置',
    key: '/permission'
  }
]
export default menuList
