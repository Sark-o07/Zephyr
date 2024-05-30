# Backend Service for Zephyr (E-commerce) Application

This backend service is built with Node.js and Express.js, providing APIs for managing products, user authentication, and cart functionalities for an e-commerce application. It also includes image uploading and storage using Multer.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies using npm:

   ```bash
   npm install
   ```

### Configuration

Update the MongoDB connection string in the `mongoose.connect` method if necessary:

```javascript
mongoose.connect("your-mongodb-connection-string");
```

### Running the Server

Start the server using the following command:

```bash
node app.js
```

The server will run on port 4000 by default.

## API Endpoints

### General Endpoints

- **GET /**: Check if the server is running.

  ```http
  GET /
  ```

### Image Upload

- **POST /upload**: Upload an image file.

  ```http
  POST /upload
  ```

  Request Body:
  - `product`: Image file to upload.

  Response:
  - `image_url`: URL of the uploaded image.

### Product Management

- **POST /addproduct**: Add a new product.

  ```http
  POST /addproduct
  ```

  Request Body:
  - `name`: Product name.
  - `image`: Image URL.
  - `category`: Product category.
  - `new_price`: New price.
  - `old_price`: Old price.

  Response:
  - `success`: Boolean indicating success.
  - `name`: Name of the added product.

- **POST /removeproduct**: Remove a product.

  ```http
  POST /removeproduct
  ```

  Request Body:
  - `id`: Product ID.

  Response:
  - `success`: Boolean indicating success.
  - `name`: Name of the removed product.

- **GET /allproducts**: Get all products.

  ```http
  GET /allproducts
  ```

  Response:
  - List of all products.

### User Management

- **POST /signup**: Register a new user.

  ```http
  POST /signup
  ```

  Request Body:
  - `username`: User's name.
  - `email`: User's email.
  - `password`: User's password.

  Response:
  - `success`: Boolean indicating success.
  - `token`: Authentication token.

- **POST /login**: User login.

  ```http
  POST /login
  ```

  Request Body:
  - `email`: User's email.
  - `password`: User's password.

  Response:
  - `success`: Boolean indicating success.
  - `token`: Authentication token.
  - `error`: Error message (if any).

### Cart Management

- **POST /addtocart**: Add a product to the cart.

  ```http
  POST /addtocart
  ```

  Request Body:
  - `itemId`: ID of the product to add.

  Response:
  - `info`: Message indicating the operation result.

- **POST /removefromcart**: Remove a product from the cart.

  ```http
  POST /removefromcart
  ```

  Request Body:
  - `itemId`: ID of the product to remove.

  Response:
  - `info`: Message indicating the operation result.

- **POST /getcart**: Get the user's cart.

  ```http
  POST /getcart
  ```

  Response:
  - User's cart data.

### Collections

- **GET /newcollections**: Get new collection of products.

  ```http
  GET /newcollections
  ```

  Response:
  - List of new collection products.

- **GET /womenproducts**: Get popular products in women's category.

  ```http
  GET /womenproducts
  ```

  Response:
  - List of popular women's products.

## Middleware

### Fetch User

Middleware to authenticate users using JWT.

```javascript
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ err: "error occured" });
        }
    }
};
```

## Folder Structure

- `app.js`: Main application file.
- `upload/images`: Directory to store uploaded images.

## Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `jsonwebtoken`: Library for creating and verifying JWT.
- `multer`: Middleware for handling `multipart/form-data`.
- `path`: Node.js path module.
- `cors`: Middleware to enable CORS.

## License

This project is licensed under the MIT License.
