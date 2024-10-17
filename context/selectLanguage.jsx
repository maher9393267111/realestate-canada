

// import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
  } from "@material-ui/core";
import Image from 'next/image'

export default function LanguageToggle({
  languages,
  selectedLanguage,
  selectLanguage,
}) {


    const [menu, setMenu] = useState(null);
    
    const handleMenu = (event) => setMenu(event.currentTarget);
    const handleClose = () => setMenu(null);

  return (
    selectedLanguage && (
      <div>

<div  className="left !mt-4 lang-btn">
      <button   
      className='!block !mt-5' id="menu_btn" onClick={handleMenu}>
        
      <Image
      className='!mt-2'
                src={languages.find((l) => l.value === selectedLanguage).img}
                alt="selected language"
                width={35}
              />
      </button>
      <Menu
      className=' !block'
        id="menu-appbar"
        anchorEl={menu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
          
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        open={Boolean(menu)}
        onClose={handleClose}
      >
      
        
     {     languages.map((language, index) => {
              return (
                
                  <MenuItem     sx={{
                display:"block !important"
                  }}
                  
                  onClick={() => selectLanguage(language.value)} style={{ color: "black" }}>
                   <Image
                   className=''
                          src={language.img}
                          alt={language.label}
                          width={27}
                        />
                        <span className="ml-2">{language.label}</span>
                  </MenuItem>
                
              );
            })}
    

        
      </Menu>
    </div>





        {/* <Menu as="div" className="relative arabic inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full items-center justify-center  rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              <span className="text-bold mr-1 text-lg text-slate-500 sm:text-lg">
                {selectedLanguage === 'en' ? 'EN' : 'عربي'}
              </span>
              <Image
                src={languages.find((l) => l.value === selectedLanguage).img}
                alt="selected language"
                width={25}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1">
                {languages.map((language) => (
                  <Menu.Item key={language}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-purple-200' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => selectLanguage(language.value)}
                      >
                        <Image
                          src={language.img}
                          alt={language.label}
                          width={20}
                        />
                        <span className="ml-2">{language.label}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu> */}



      </div>
    )
  )
}
