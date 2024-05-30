# Frontend Application for Zephyr

This is the frontend application for an e-commerce website built with React. It includes a navigation bar, routes for different shop categories, product details, cart management, and user authentication pages. The application uses React Router for client-side routing.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn

### Installation

1. Clone the repository.
2. Navigate to the `frontend` project directory.
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
npm start
```

or

```bash
yarn start
```

The application will run on `http://localhost:3000` by default.

## Folder Structure

- `src/App.js`: Main application file.
- `src/App.css`: Global styles for the application.
- `src/Components/Navbar/Navbar.js`: Navbar component.
- `src/Components/Footer/Footer.js`: Footer component.
- `src/Components/Assets/`: Directory for images and other assets.
- `src/Pages/Shop.js`: Shop page component.
- `src/Pages/ShopCategory.js`: Shop category page component.
- `src/Pages/Product.js`: Product details page component.
- `src/Pages/Cart.js`: Cart page component.
- `src/Pages/LoginSignup.js`: Login and Signup page component.

## Components and Pages

### Components

- **Navbar**: Navigation bar displayed at the top of the page.

  ```javascript
  import { Navbar } from './Components/Navbar/Navbar';
  ```

- **Footer**: Footer displayed at the bottom of the page.

  ```javascript
  import { Footer } from './Components/Footer/Footer';
  ```

### Pages

- **Shop**: Main shop page displaying all products.

  ```javascript
  import { Shop } from './Pages/Shop';
  ```

- **ShopCategory**: Page displaying products filtered by category. Accepts `banner` and `category` as props.

  ```javascript
  import { ShopCategory } from './Pages/ShopCategory';
  ```

- **Product**: Product details page. Displays detailed information about a specific product.

  ```javascript
  import { Product } from './Pages/Product';
  ```

- **Cart**: Cart page. Displays products added to the user's cart.

  ```javascript
  import { Cart } from './Pages/Cart';
  ```

- **LoginSignup**: Page for user login and signup.

  ```javascript
  import { LoginSignup } from './Pages/LoginSignup';
  ```

## Routing

React Router is used for client-side routing. The routes are defined in `src/App.js` as follows:

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/men' element={<ShopCategory banner={men_banner} category='men'/>}/>
        <Route path='/women' element={<ShopCategory banner={women_banner} category='women'/>}/>
        <Route path='/kid' element={<ShopCategory banner={kids_banner} category='kid'/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}
```

## Assets

Banner images for different categories are stored in the `src/Components/Assets/` directory:

- `banner_mens.png`
- `banner_women.png`
- `banner_kids.png`

These images are imported and used in the `ShopCategory` component:

```javascript
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
```

## License

This project is licensed under the MIT License.
