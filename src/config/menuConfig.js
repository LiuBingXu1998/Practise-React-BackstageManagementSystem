const menuList = [
    {
      title: '首页', // 菜单标题名称
      key: "/admin/home", // 对应的path
      isPublic: true, // 公开的
    },
    {
      title: '商品',
      key: '/products',
      children: [ // 子菜单列表
        {
          title: '品类管理',
          key: "/admin/category",
        },
        {
          title: '商品管理',
          key: "/admin/product",
        },
      ]
    },
  
    {
      title: '用户管理',
      key: "/admin/user",
    },
    {
      title: '角色管理',
      key: "/admin/role",
    },
  
    {
      title: '图形图表',
      key: '/charts',
      children: [
        {
          title: '柱形图',
          key: "/admin/charts/bar",
        },
        {
          title: '折线图',
          key: "/admin/charts/line",
        },
        {
          title: '饼图',
          key: "/admin/charts/pie",
        },
      ]
    },
    {
      title: '订单管理',
      key: '/order',
    },
  ]
  
  export default menuList;