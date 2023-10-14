import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CategoryBlocks = ({bgColour,catName}) => {
  const navigate=useNavigate()
  const [data,setData]=useState(null)
  const viewProducts=()=>{
    navigate('/list',{state:{heading:catName,products:data.productsInCategory}})
  }
  const getProducts=async()=>{
    const res = await (await fetch(`/api/products/category?category=${catName}`)).json();
    setData(res)
  }
  if(data===null){
  getProducts()}
  return (
    <div style={{display:"flex",width:"300px",height:"100px",cursor:"pointer"}} onClick={()=>viewProducts()}>
        <div style={{backgroundColor:bgColour,width:"100%",height:"100%",borderRadius:"10px"}}>
      <h3 style={{position:"absolute",paddingTop:"30px",paddingLeft:"80px"}}>{catName}</h3>
      </div>
    </div>
  )
}

export default CategoryBlocks
