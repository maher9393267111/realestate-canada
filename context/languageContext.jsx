import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState()
  const [mounted, setMounted] = useState(false)
  const [reference, setReference] = useState("")

  const [isMobile, setIsMobile] = useState(true);
    const [isOpen, setIsOpen] = useState(isMobile ? false : true);

    const resize = () => {
        let currentHideNav = window.innerWidth <= 1280;
        setIsMobile(currentHideNav);
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        resize();
        setIsOpen(!isMobile);
    }, [isMobile])




  useEffect(() => {
    setMounted(true)
    // Load language from localStorage (or use default if not found)
    const savedLanguage =
      typeof window !== 'undefined' ? localStorage.getItem('language') : 'en'
    setLanguage(savedLanguage || 'en')
  }, [])

  useEffect(() => {
    if (!mounted) return
    // Save language to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
    // 
  }, [language, mounted])

  let sharedState = {
    reference,
    setReference,
    language,
    isMobile,
    setIsMobile,
    isOpen,
    setIsOpen,
    changeLanguage: (newLanguage) =>{ 
      setLanguage(newLanguage)
    //  window.location.reload()

    },
  }






  return (
    <LanguageContext.Provider value={sharedState}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  return useContext(LanguageContext)
}