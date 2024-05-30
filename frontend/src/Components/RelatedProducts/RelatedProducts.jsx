import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import { Item } from '../Item/Item'

export const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item, i) => {
          return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
        })}
      </div>
    </div>
  )
}
