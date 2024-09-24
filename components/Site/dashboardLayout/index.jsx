import React from 'react'
import SidebarAdmin from './sidebar'
import FooterAdmin from './footer'
import Header from "../../components/header/Header";
export default function AdminMainLayout({children}) {
  return (
    <div className='dashboard-wrapper'>

<Header/>
<SidebarAdmin/>

<div className="main-content">
{children}

</div>

<FooterAdmin/>


    </div>
  )
}





// import Link from 'next/link'
// import  Sidebar from './sidebar'
// export default function MAINLAYOUT({children}) {
//   return (
//     <>
//       <header className=" !h-auto min-h-[100vh] overflow-scroll px-4 bg-white lg:shadow xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0">
//         <div className="container lg:flex lg:py-2">
//           <div className="inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:mr-8">
        
//             <Sidebar />
//           </div>
//           <div className="inline-flex items-center justify-between w-full py-2 border-b lg:border-b-0 space-x-10">
// {/*        
//             <div className="inline-flex items-center space-x-4 pr-4">
             
//             </div> */}
//           </div>
//         </div>
//         <div className="container py-2 flex justify-between mx-auto relative">
//         {children}
//         </div>
//       </header>
//     </>
//   )
// }