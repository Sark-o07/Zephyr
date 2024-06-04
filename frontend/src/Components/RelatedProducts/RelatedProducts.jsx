import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import { Item } from '../Item/Item'

export const RelatedProducts = (props) => {
  const { category } = props;
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/relatedproducts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({category: category})
    })
    .then((res) => res.json())
    .then((data) => {
      setRelatedProduct(data);
    });
  }, []);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProduct.map((item, i) => {
          return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
        })}
      </div>
    </div>
  )
}
