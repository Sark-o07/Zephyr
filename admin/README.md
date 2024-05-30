# Admin Panel for Zephyr Application

This is the admin panel for an e-commerce application built with React and Vite. It includes functionality for adding and listing products. The admin panel uses React Router for routing within the application.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies using npm or yarn:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the Application

Start the development server using the following command:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will run on `http://localhost:5173` by default.

## Folder Structure

- `src/App.jsx`: Main application file.
- `src/App.css`: Global styles for the application.
- `src/Pages/Admin/Admin.jsx`: Admin panel main component.
- `src/Pages/Admin/Admin.css`: Styles for the admin panel.
- `src/Components/Sidebar/Sidebar.jsx`: Sidebar component.
- `src/Components/AddProduct/AddProduct.jsx`: Component for adding products.
- `src/Components/ListProduct/ListProduct.jsx`: Component for listing products.
- `src/index.css`: Global styles for the application.
- `src/main.jsx`: Entry point for the React application.

## Components and Pages

### Admin Panel

- **Admin**: Main component for the admin panel.

  ```javascript
  import React from 'react'
  import { Sidebar } from '../../Components/Sidebar/Sidebar'
  import { Routes, Route } from 'react-router-dom'
  import '../CSS/Admin.css'
  import { AddProduct } from '../../Components/AddProduct/AddProduct'
  import { ListProduct } from '../../Components/ListProduct/ListProduct'

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
  ```

### Main Application

- **App**: Main application component.

  ```javascript
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
  ```

### Entry Point

- **main.jsx**: Entry point for the React application.

  ```javascript
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import './index.css'
  import { BrowserRouter } from 'react-router-dom'

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
  ```

## Running the Admin Panel

To access the admin panel, navigate to the appropriate routes defined in the `Admin` component, such as `/addproduct` and `/listproduct`.

## License

This project is licensed under the MIT License.
