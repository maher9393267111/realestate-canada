import React from 'react'



export default function ProductsHero({ title, text, background }) {
  const rootStyle = ` flex flex-col pb-4 gap-10 sm:gap-0 sm:flex-row items-center sm:items-en justify-cente sm:justify-cente mx-0 sm:mx-[5%] text-NormalWhite    md:h-auto pb-[2vh] px-[3%] sm:px-[1.5%] mt- ssm:mt-16 sm:mt-0 md:mt-0 lg:mt-0 ${background} `

  return (
    <div className={rootStyle}>
    <section className=" text-center sm:text-left w-full sm:w-[68%] xl:w-[100%]">

<div className=' flex justify-center  mb-12 mt-6 '>
<img className='' src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/blue-values.png" alt="" />

</div>


<div>


    <div className='flex gap-4 flex-col md:flex-row justify-betwee px-6 md:px-12 container flex-wrap'>

<p className='m-t flex gap-1 md:w-1/4'><span><img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png" alt="" /></span> Be Honest</p>

<p className='m-t flex gap-1 md:w-1/4 '><span><img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png" alt="" /></span>Be Humble</p>

<p className='m-t flex gap-1 md:w-1/4'><span><img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png" alt="" /></span>Be Blue Caribbean</p>
<p className='m-t flex gap-1 md:w-1/4'><span><img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png" alt="" /></span>Be Yourself</p>
<p className='m-t flex gap-1 md:w-1/4'><span><img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png" alt="" /></span> Be Honest</p>
<p className='m-t flex gap-1 md:w-1/4'><span><img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png" alt="" /></span> Be Honest</p>
<p className='m-t flex gap-1 md:w-1/4'><span><img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png" alt="" /></span> Be Honest</p>





    </div>


<div className=' mt-6 !w-full'>
    <p className=' !text-[#16426F] text-xl !font-[font-weight]  !font-rubik  md:!text-[36px]  '>We’ll exceed your expectations</p>
    <p className='!text-[#16426F] text-xl md:!mt-3 md:pt-3 !font-rubik md:!text-[36px]'>GUARANTEED</p>

    <div className=' flex pb-5  justify-center m-6'>
        <img src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/separator-1.png" alt="" />
    </div>
</div>



</div>


      {/* <h1 className=" px-[5%] sm:px-0 text-[1.3rem] ssm:text-[1.4rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.5rem] xl:text-[1.7rem] leading-[171%] font-bold ">
        {title}
      </h1>

      <p className="px-[3%] text-justify sm:px-0 text-[0.9rem] sm:text-[0.75rem] md:text-[0.8rem] lg:text-[0.85rem] xl:text-[0.9rem] font-semibold leading-[200%] mt-6 ssm:mt-8   sm:mt-2 md:mt-4 ">
        {text}
      </p> */}


    </section>
  
  </div>
  )
}