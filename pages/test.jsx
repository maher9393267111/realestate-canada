import React from 'react'
import { useLanguageContext } from "@/context/languageContext";
import Header from "../components/components/header/Header44";
import AppLayout from '../components/Site/dash';







export default function Test() {
  const { isOpen } = useLanguageContext();
  return (
    <div dir='ltr'>

<AppLayout>
  HEREEE
</AppLayout>



    </div>
  )
}
