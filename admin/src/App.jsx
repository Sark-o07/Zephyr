import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AddProduct } from './Components/AddProduct/AddProduct'
import { Navbar } from './Components/Navbar/Navbar'
import { Admin } from './Pages/Admin/Admin'

function App() {

  return (
    <>
    <Navbar/>
    <Admin/>
    </>
  )
}

export default App
