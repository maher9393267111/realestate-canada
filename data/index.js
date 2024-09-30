
// this is for nav.json
// {
//   "id": "4",
//   "label": "Collaborations",
//   "labelfr": "Collaborations",
//   "link": "/collaborations",
//   "icon": false
// },



import {
  Heart,
  Home2,
  Location,
  LogoutCurve,
  ShoppingCart,
  TickCircle,
  TickSquare,
  TruckFast,
  User,
  Wallet2,
} from "iconsax-react";


  
  export const bannerSliderItems = [
    {
      _id: 1,
      picture: "https://tarkhineh-chi.vercel.app/static/media/Slider.50c82019191856be8df9.png",
      title: "تجربه غذای سالم و گیاهی به سبک ترخینه",
      buttonText: "سفارش غذا",
      href: "/menu",
    },
    {
      _id: 2,
      picture: "https://tarkhineh-chi.vercel.app/static/media/Slider.50c82019191856be8df9.png",
      title: "سرسبزی تریخینه دلیل حس خوب شماست!",
      buttonText: "سفارش غذا",
      href: "/menu",
    },
    {
      _id: 3,
      picture: "https://tarkhineh-chi.vercel.app/static/media/Slider.50c82019191856be8df9.png",
      title: "لذت غذای سالم و گیاهی را با ترخینه تجربه کنید!",
      buttonText: "سفارش غذا",
      href: "/menu",
    },
  ];
  



  export const branchList= [
    {
      _id: 1,
      title: "شعبه اکباتان",
      address: "شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم",
      thumbnail: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png",
      href: "/branch",
      phoneOne: "021-54891254",
      phoneTwo: "021-54891255",
      workTime: "همه روزه از ساعت 12 تا 23 بجز روز های تعطیل",
      slideImages: [
        { _id: 1, picture: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png" },
   
      ],
    },
    {
      _id: 2,
      title: "شعبه چالوس",
      address:
        "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه دکتر میلانی",
      thumbnail: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png",
      href: "/branch",
      phoneOne: "021-54891254",
      phoneTwo: "021-54891255",
      workTime: "همه روزه از ساعت 12 تا 23 بجز روز های تعطیل",
      slideImages: [
        { _id: 1, picture: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png" },

      ],
    },
    {
      _id: 3,
      title: "شعبه اقدسیه",
      address: "خیابان اقدسیه ، نرسیده به میدان خیام، پلاک ۸",
      thumbnail: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png",
      href: "/branch",
      phoneOne: "021-54891254",
      phoneTwo: "021-54891255",
      workTime: "همه روزه از ساعت 12 تا 23 بجز روز های تعطیل",
      slideImages: [
        { _id: 1, picture: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png" },

      ],
    },
    {
      _id: 4,
      title: "شعبه ونک",
      address: "میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶",
      thumbnail: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png",
      href: "/branch",
      phoneOne: "021-54891254",
      phoneTwo: "021-54891255",
      workTime: "همه روزه از ساعت 12 تا 23 بجز روز های تعطیل",
      slideImages: [
        { _id: 1, picture: "https://tarkhineh-chi.vercel.app/static/media/vanak.95984dbe3867b2b26204.png" },
      
      ],
    },
  ];
  
  


  export const helpLinksItems = [
    { _id: 1, title: "الرئيسية", href: "/" },
    { _id: 2, title: "من نحن", href: "/about" },
    { _id: 3, title: "تواصل معنا", href: "/contact" },
  ]

  export const helpLinksItemsen = [
    { _id: 1, title: "Home", href: "/" },
    { _id: 2, title: "About us", href: "/about" },
    { _id: 3, title: "Contact", href: "/contact" },
  ]


  export const aboutItems = [
    { _id: 1, text: "الموظفين ذوي الخبرة والمهنية", texttr:"Experienced and professional staff" ,icon: "user" },
    { _id: 2, text: "جودة عالية من الطعام",texttr:"High quality of food" ,icon: "chart" },
    { _id: 3, text: "بيئة ممتعة وسلمية",texttr:"Fun and peaceful environment", icon: "home" },
    { _id: 4, text: "قوائم متنوعة",texttr:"Various menus", icon: "menu" },
  ];



  
export const HeaderLinks  = [
  { _id: 1, type: "link", href: "/", title: "الرئيسية"  ,     titletr: "Home",},
  // {
  //   _id: 2,
  //   title: "شعبه",
  //   dropDownItems: [
  //     { _id: 1, type: "link", href: "/branch", title: "اکباتان" },
  //     { _id: 2, type: "link", href: "/branch", title: "چالوس" },
  //     { _id: 3, type: "link", href: "/branch", title: "اقدسیه" },
  //     { _id: 4, type: "link", href: "/branch", title: "ونک" },
  //   ],
  // },
  // {
  //   _id: 3,
  //   title: "منو",
  //   dropDownItems: [
  //     {
  //       _id: 1,
  //       type: "link",
  //       href: "/menu?mainCategory=غذای اصلی",
  //       title: "غذای اصلی",
  //     },
  //     {
  //       _id: 2,
  //       type: "link",
  //       href: "/menu?mainCategory=پیش غذا",
  //       title: "پیش غذا",
  //     },
  //     { _id: 3, type: "link", href: "/menu?mainCategory=دسر", title: "دسر" },
  //     {
  //       _id: 4,
  //       type: "link",
  //       href: "/menu?mainCategory=نوشیدنی",
  //       title: "نوشیدنی",
  //     },
  //   ],
  // },



  { _id: 4, type: "link", href: "/about", title: "من نحن"  ,     titletr: "About us",},
  { _id: 5, type: "link", href: "/contact", title: "تواصل معنا"  ,    titletr: "Contact",},
  // { _id: 5, type: "link", href: "/contact", title: "تماس با ما" },
];





export const mobileLinks= [
  {
    _id: 1,
    title: "الرئيسية",
    value: "home page",
    titletr: "Home",
    icon: true,
    type: "link",
    href: "/",
  },

  // {
  //   _id: 2,
  //   title: "منو",
  //   value: "menu",
  //   icon: true,
  //   type: "filter",
  //   accordionItems: [
  //     {
  //       _id: 1,
  //       type: "link",
  //       href: "/menu?mainCategory=غذای اصلی",
  //       title: "غذای اصلی",
  //     },
  //     {
  //       _id: 2,
  //       type: "link",
  //       href: "/menu?mainCategory=پیش غذا",
  //       title: "پیش غذا",
  //     },
  //     { _id: 3, type: "link", href: "/menu?mainCategory=دسر", title: "دسر" },
  //     {
  //       _id: 4,
  //       type: "link",
  //       href: "/menu?filter=نوشیدنی",
  //       title: "نوشیدنی",
  //     },
  //   ],
  // },
  // {
  //   _id: 3,
  //   title: "شعبه",
  //   value: "branch",
  //   icon: true,
  //   type: "filter",
  //   accordionItems: [
  //     { _id: 1, title: "اکباتان", type: "link", href: "/branch" },
  //     { _id: 2, title: "چالوس", type: "link", href: "/branch" },
  //     { _id: 3, title: "اقدسیه", type: "link", href: "/branch" },
  //     { _id: 4, title: "ونک", type: "link", href: "/branch" },
  //   ],
  // },


  {
    _id: 4,
    title: "من نحن",
    titletr: "About us",
    icon: true,
    type: "link",
    href: "/about",
    value: "about",
  },
  {
    _id: 5,
    title: "تواصل معنا",
    titletr: "Contact",
    icon: true,
    type: "link",
    href: "/contact",
    value: "contact",
  },
];


export const profileLinks = [
  {
    _id: 1,
    title: "پروفایل",
    titletr: "Profile",
    href: "/profile/info",
    type: "link",
    value: "profile",
    Icon: User,
  },
  {
    _id: 2,
    title: "پیگیری سفارش",
    href: "/profile/orders",
    type: "link",
    value: "orders",
    Icon: LogoutCurve,
  },
  {
    _id: 3,
    title: "علاقه مندی ها",
    href: "/profile/favorite",
    type: "link",
    value: "favorite",
    Icon: Heart,
  },
  {
    _id: 4,
    title: "آدرس های من",
    href: "/profile/addresses",
    type: "link",
    value: "addresses",
    Icon: Location,
  },
];