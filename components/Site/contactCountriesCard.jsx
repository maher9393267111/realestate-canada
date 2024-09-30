import React from "react";



export default function OurCoreItem({ item }) {
  return (
    <div className="flex flex-col items-center ">

 {item?.svg}



      {/* <item.icon className="text-8xl text-primary mb-3" /> */}

      <div className="text-center text-xl mb-1  ">
        <span className=" font-semibold">{item.title}</span>
      </div>

      <p className="text-center text-md text-secondary font-semibold">{item.description}</p>
    </div>
  );
}