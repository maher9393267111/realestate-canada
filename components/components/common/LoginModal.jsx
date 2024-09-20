
import React from 'react'

export default function LoginModal() {
  return (
    <div>LoginModal</div>
  )
}



// import React ,{Fragment} from 'react'
// import { Dialog, Transition } from '@headlessui/react'

// export default function LoginModal({isOpen ,closeModal}) {
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//     <Dialog as="div" className="relative z-10" onClose={closeModal}>
//       <Transition.Child
//         as={Fragment}
//         enter="ease-out duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="ease-in duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 bg-black/25" />
//       </Transition.Child>

//       <div className="fixed inset-0 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4 text-center">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >

//     <div className='modal-body login-modal'>
//     <div className="login-registration-form">
//                 <div className="form-title">
//                   <h2>Sign in to continue</h2>
//                   <p>Enter your email address for Login.</p>
//                 </div>
//                 <form>
//                   <div className="form-inner mb-20">
//                     <input type="text" placeholder="User name or Email *" />
//                   </div>
//                   <a href="#" className="login-btn mb-25">
//                     Sign In
//                   </a>
//                   <div className="divider">
//                     <span>or</span>
//                   </div>
//                   <a href="#" className="google-login-btn">
//                     <div className="icon">
//                       <img src="/assets/img/home1/icon/google-icon.svg" alt="" />
//                     </div>
//                     Sign in with Google
//                   </a>
//                 </form>
//               </div>
//               </div>


// </Transition.Child>
// </div>
// </div>
// </Dialog>
// </Transition>

//   )
// }

