// 模拟数据 生成随机数据，拦截 Ajax 请求
// 使用 Mock
import Mock from "mockjs";
//Mock.mock(请求地址，请求方式，响应的数据)
// 请求方式必须是小写

// 拦截 /mock/banners 请求，并返回响应的数据
Mock.mock("/mock/banners", "get", {
  code: 200,
  data: [
    {
      id: 1,
      imgUrl: "/images/banner1.jpg",
    },
    {
      id: 2,
      imgUrl: "/images/banner2.jpg",
    },
    {
      id: 3,
      imgUrl: "/images/banner3.jpg",
    },
    {
      id: 4,
      imgUrl: "/images/banner4.jpg",
    },
  ],
});
Mock.mock("/mock/floors", "get", {
  code: 200,
  data: [
    {
      id: "001",
      name: "家用电器",
      keywords: [
        "节能补贴",
        "4K电视",
        "空气净化器",
        "IH电饭煲",
        "滚筒洗衣机",
        "电热水器",
      ],
      imgUrl: "/images/floor-1-1.png",
      navList: [
        {
          url: "#",
          text: "热门",
        },
        {
          url: "#",
          text: "大家电",
        },
        {
          url: "#",
          text: "生活电器",
        },
        {
          url: "#",
          text: "厨房电器",
        },
        {
          url: "#",
          text: "应季电器",
        },
        {
          url: "#",
          text: "空气/净水",
        },
        {
          url: "#",
          text: "高端电器",
        },
      ],
      carouselList: [
        {
          id: "0011",
          imgUrl: "/images/floor-1-b01.png",
        },
        {
          id: "0012",
          imgUrl: "/images/floor-1-b02.png",
        },
        {
          id: "0013",
          imgUrl: "/images/floor-1-b03.png",
        },
      ],
      recommendList: [
        "/images/floor-1-2.png",
        "/images/floor-1-3.png",
        "/images/floor-1-5.png",
        "/images/floor-1-6.png",
      ],
      bigImg: "/images/floor-1-4.png",
    },
    {
      id: "002",
      name: "手机通讯",
      keywords: [
        "节能补贴2",
        "4K电视2",
        "空气净化器2",
        "IH电饭煲2",
        "滚筒洗衣机2",
        "电热水器2",
      ],
      imgUrl: "/images/floor-1-1.png",
      navList: [
        {
          url: "#",
          text: "热门2",
        },
        {
          url: "#",
          text: "大家电2",
        },
        {
          url: "#",
          text: "生活电器2",
        },
        {
          url: "#",
          text: "厨房电器2",
        },
        {
          url: "#",
          text: "应季电器2",
        },
        {
          url: "#",
          text: "空气/净水2",
        },
        {
          url: "#",
          text: "高端电器2",
        },
      ],
      carouselList: [
        {
          id: "0011",
          imgUrl: "/images/floor-1-b01.png",
        },
        {
          id: "0012",
          imgUrl: "/images/floor-1-b02.png",
        },
        {
          id: "0013",
          imgUrl: "/images/floor-1-b03.png",
        },
      ],
      recommendList: [
        "/images/floor-1-2.png",
        "/images/floor-1-3.png",
        "/images/floor-1-5.png",
        "/images/floor-1-6.png",
      ],
      bigImg: "/images/floor-1-4.png",
    },
  ],
});
