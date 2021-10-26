import {
  HomeOutlined,
  AppstoreAddOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  PieChartFilled,
  LineChartOutlined
} from '@ant-design/icons';


const menuList = [
  {
    title: '首页',          // 菜单标题名称
    key: "/admin/home",    // 对应的path
    isPublic: true,        // 公开的
    icon: <HomeOutlined />, // 图标名称
  },
  {
    title: '商品',
    key: '/products',
    icon: <AppstoreAddOutlined />,
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: "/admin/category",
        icon: <BarsOutlined />,
      },
      {
        title: '商品管理',
        key: "/admin/product",
        icon: <ToolOutlined />,
      },
    ]
  },

  {
    title: '用户管理',
    key: "/admin/user",
    icon: <UserOutlined />,
  },
  {
    title: '角色管理',
    key: "/admin/role",
    icon: <SafetyOutlined />,
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        key: "/admin/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: '折线图',
        key: "/admin/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: '饼图',
        key: "/admin/charts/pie",
        icon: <PieChartFilled />,
      },
    ]
  },
  {
    title: '订单管理',
    key: '/order',
  },
]

export default menuList;