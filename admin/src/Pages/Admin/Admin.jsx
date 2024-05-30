import React from 'react'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import '../CSS/Admin.css'
import { AddProduct } from '../../Components/AddProduct/AddProduct'
import { ListProduct } from '../../Components/LisProduct/ListProduct'

export const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>} />
            <Route path='/listproduct' element={<ListProduct/>} />
        </Routes>
    </div>
  )
}
