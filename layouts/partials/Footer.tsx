import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguageContext } from "@/context/languageContext";
import { useMemo } from "react";
import { Instagram, Facebook, Snapchat, Whatsapp } from "iconsax-react";
import { useTranslation } from "@/context/useTranslation";

const Footer = ({  }) => {
  const router = useRouter();


  const { language, changeLanguage } = useLanguageContext();

  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);



  // const isRootOrAdmin = isRoot || isAdmin;
  {t.dir === '' ? '' : ''}
  const isActive = (route:any) => {
    return route == router.pathname;
  };
  return (
    <>
      <footer dir={t.dir === 'rtl' ? 'rtl' : 'ltr'} className="footer-area">
        <div className="ui grid">
          <div className="four wide column">
            <div className="single-footer-widget">
              <h3> {t.dir === 'rtl' ? 'حول المتجر' : 'About The Store'}</h3>

              <div className="about-the-store">
                <p>

<Link className=" !text-white" href={'/about'}>

{t.dir === 'rtl' ? 'حول المتجر' : 'The Store at Shop'}


</Link>

                 
                </p>
              </div>
            </div>
          </div>

          <div className="four wide column">
            <div className="single-footer-widget pl-4">
              <h3>
              {t.dir === 'rtl' ? 'روابط المتجر' : 'Quick Links'}
                
             


              </h3>

              <ul className="quick-links">
                <li>
                  <Link legacyBehavior href="/about">
                    <a>
                    {t.dir === 'rtl' ? 'من نحن' : ' About Us'}
                      
                     

                    </a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/category/all">
                    <a>
                    {t.dir === 'rtl' ? 'تسوق الان' : 'Shop Now!'}
                      
                     </a>
                  </Link>
                </li>
                {/* <li>
                  <Link legacyBehavior href="/products">
                    <a>
                    {t.dir === '' ? '' : ''}
                      
                      Cart
                      
                      
                      </a>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>

          {/* <div className="four wide column">
            <div className="single-footer-widget">
              <h3>Support Links</h3>

              <ul className="customer-support">
                {user ? (
                  <>
                    <li>
                      <Link legacyBehavior href="/profile">
                        <a>My Profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/my-orders-history">
                        <a>My Orders History</a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link legacyBehavior href="/auth/signup">
                        <a>Signup</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/auth/login">
                        <a>Login</a>
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link legacyBehavior href="/">
                    <a>Home</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

          <div className="four wide column">
            <div className="single-footer-widget">
              <h3>
              {t.dir === 'rtl' ? 'وسائل التواصل' : 'Contact info'}
                      
              </h3>

              <ul className="footer-contact-info">
                <li>
                  <a href="#" target="_blank">
                  {t.dir === '' ? '' : ''}
                    Wonder Turkey
                  </a>
                </li>
                <li>
                  <a href="tel:+01321654214">+0111111111</a>
                </li>
                <li>
                  <a href="turkiyeoutlet.net" target="_blank">
                  {t.dir === '' ? '' : ''}
                    
                    
                  turkiyeoutlet.net</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="footer-bottom-area">
          <p>
            Copyright &copy; 2020 <a href="/">Shoponix</a> Designed By{" "}
            <a href="#" target="_blank">
              EnvyTheme
            </a>{" "}
            | All rights reserved.
          </p>
        </div> */}

<div className=" mt-4  pb-4 flex flex-col md:flex-row gap-2  items-center  justify-center gap-y-2">
         <div>
          <p className="caption-md md:caption-lg xl:body-md text-white">Sand n Sea</p>
        </div>      
          <li className="flex items-center justify-center gap-x-2">
           <a href="https://www.instagram.com/Wanlounge">
            <Instagram className="h-5 w-5 !text-white" />
          </a>

           <li className="flex items-center justify-center gap-x-2">
             <a href="https://www.facebook.com/Wanlounge">
               <Facebook className="h-5 w-5 !text-white" />
             </a>
           </li>

          <li className="flex items-center justify-center gap-x-2">            <a href="https://wtspee.com/966597590449">
               <Whatsapp className="h-5 w-5 text-white" />             </a>
          </li>

          <li className="flex items-center justify-center gap-x-2">
             <a href="https://www.snapchat.com/?original_referrer=none">
              <Snapchat className="h-5 w-5 text-white s" />
            </a>
          </li>
        </li>

      </div>




      </footer>
    </>
  );
};

export default Footer;



// "use client";
// import { Instagram, Facebook, Snapchat, Whatsapp } from "iconsax-react";
// import React, { useMemo } from "react";
// import MessageBox from "./Form";
// import { usePathname } from "next/navigation";
// import { helpLinksItems, helpLinksItemsen } from "../../data/index";

// import Link from "next/link";
// import { IoLogoLinkedin } from "react-icons/io";
// import { FaGithubSquare } from "react-icons/fa";
// import { v4 as uuidv4 } from "uuid";

// import { useLanguageContext } from "@/context/languageContext";

// import { useTranslation } from "@/context/useTranslation";

// const Footer = () => {
//   // const pathName = usePathname();
//   // const doNotshowRouteLists = ["/login"];

//   // const isProductPage = pathName.includes("/product");

//   // // do not show component in this routes
//   // if (doNotshowRouteLists.includes(pathName)) {
//   //   return null;
//   // }

//   const { language, changeLanguage } = useLanguageContext();

//   const { translation } = useTranslation();

//   const t = useMemo(() => translation ?? {}, [translation]);

//   const links = t.dir === "rtl" ? helpLinksItems : helpLinksItemsen;

//   return (
//     <div
//       dir={t.dir === "rtl" ? "rtl" : "ltr"}
//       className={` !text-white flex w-full flex-col bg-black/80 bg-[url(https://tarkhineh-chi.vercel.app/static/media/footer.6488a3b05edc963180b0.png)] bg-cover bg-center p-5 text-muted-100 bg-blend-darken  xl:px-10 xl:py-8 2xl:px-28    
//       `}
//     >
//       <div className="flex w-full items-start justify-evenly xl:justify-between">
//         <ul className="flex flex-col items-center gap-y-5">
//           <li className="body-sm xl:h5-bold lg:body-lg mb-1">
//             {t.dir === "rtl" ? "الصفحات" : "Pages"}
//           </li>
//           {links.map((item: any) => (
//             <li
//               key={uuidv4()}
//               className="caption-md !text-white xl:body-md lg:caption-lg"
//             >
//               <Link className="!text-white" href={item.href}>
//                 {item.title}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <MessageBox />
//       </div>
//       <div className=" mt-4 flex flex-col md:flex-row gap-2  items-center  justify-center gap-y-2">
//         <div>
//           <p className="caption-md md:caption-lg xl:body-md">Sand n Sea</p>
//         </div>
//         <li className="flex items-center justify-center gap-x-2">
//           <a href="https://www.instagram.com/Wanlounge">
//             <Instagram className="h-5 w-5 !text-white" />
//           </a>

//           <li className="flex items-center justify-center gap-x-2">
//             <a href="https://www.facebook.com/Wanlounge">
//               <Facebook className="h-5 w-5 !text-white" />
//             </a>
//           </li>

//           <li className="flex items-center justify-center gap-x-2">
//             <a href="https://wtspee.com/966597590449">
//               <Whatsapp className="h-5 w-5 text-white" />
//             </a>
//           </li>

//           <li className="flex items-center justify-center gap-x-2">
//             <a href="https://www.snapchat.com/?original_referrer=none">
//               <Snapchat className="h-5 w-5 text-white s" />
//             </a>
//           </li>
//         </li>

//       </div>
//     </div>
//   );
// };


// export default Footer;


