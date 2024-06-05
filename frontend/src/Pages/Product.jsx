import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../Components/Breadcrumbs/Breadcrumbs';
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';
import { ShopContext } from '../Context/ShopContext';
import './CSS/Product.css'
export const Product = () => {
  const { allProducts } = useContext(ShopContext);
  console.log("allproducts", allProducts);
  const { productId } = useParams();
  console.log("productId", productId);
  const product = allProducts.find((e)=> e.id === Number(productId));
  console.log(product)
  return (
    <div>
        <Breadcrumbs product={product} />
        <ProductDisplay product={product}/>
        <DescriptionBox/>
        <RelatedProducts category={product.category}/>
    </div>
  )
}
