import React, { useEffect, useState } from "react"
import Header from "../Components/Layout/Header"
import ProductDetails from "../Components/Products/ProductDetails"
import { productData } from "../static/data"
import { useParams } from "react-router-dom"

const ProductsDetailsPage = () => {
  const [data,setData] =useState(null)
  const { name } = useParams()
  const productName = name.replace(/-/g," ")
  useEffect(() => {
    const data = productData.find((i) => i.name === productName)
    setData(data)
  }, [])

  return (
    <div>
      <Header />
      <ProductDetails data={ data } />
    </div>
  )
}

export default ProductsDetailsPage
