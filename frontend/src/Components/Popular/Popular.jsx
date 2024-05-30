import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item'

export const Popular = () => {
  const [popularProducts, setPopular_Products] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/womenproducts')
    .then((res) => res.json())
    .then((data) => {
      setPopular_Products(data);
    });
  }, []);

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item, i)=>{
                return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
            })}
        </div>
    </div>
  )
}
