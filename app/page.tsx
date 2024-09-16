"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

export default function Home() {
const [data,setData]=useState([])
  const fectchData=async()=>{
    try {
      
      const response=await fetch('http://localhost:3000/api/user')
      const res=await response.json()
      setData(res)
      console.log(data)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fectchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      Welcome
      <Button>bienvenu</Button>
         
         <div className="grid grid-cols-3 w-screen h-screen items-center justify-center" >
          {data && data.map((item:any)=>(
            <div key={item.id} className='border p-5 h-[150px] rounded-lg gap-3 w-[200px]'>
              <h1>{item?.email}</h1>
              <p>{item?.name}</p>
              <span>{item?.gender}</span>
            
            </div>
          ))}
         </div>

    </div>
  )
}
