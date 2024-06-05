const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const https = require('https')

const port = 4000;

const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://sarkshot:fm96HevR1u8GMEeu@cluster0.igmm1oz.mongodb.net/shopper");

// API Creation

app.get('/', (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage: storage});

// Creating upload endpoint for images

app.use('/images', express.static('upload/images'));

app.post ('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
} );

// Schema for Creating Products

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

// Creating API for adding Products

app.post('/addproduct', async (req, res) => {
    const products = await Product.find({});
    let id;
    if(products.length > 0){
        const last_product_array = products.slice(-1);
        const last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log('Saved');
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for Deleting Products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log('Removed');
    res.json({
        success: true,
        name: req.body.name
    });
});

// Creating API for getting all Products

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("ALL Products Fetched");
    res.send(products);
})

// Schema for creating Products

const Users = mongoose.model('User', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// Creating Endpoint for registering the user

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email: req.body.email})
    if (check) {
        return res.status(400).json({
            success: false, error: 'User email exists already!'
        });
    }
 
    let cart = {};
    for (let i = 0; i < 300; i++){
        cart[i] = 0;
    }

    const user =  new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token});
});

// Creating the Login endpoint for user

app.post('/login', async (req, res)=> {
    const user = await Users.findOne({email: req.body.email});
    if(user) {
        if (req.body.password === user.password) {
            const data = {
                user: {
                    id: user.id,
                }
            };
            const token = jwt.sign(data, "secret_ecom");
            res.json({
                success: true,
                token,
            });
        } else {
            res.json({
                success: false,
                error: 'Password Incorrect',
            });
        }
    } else {
        res.json({
            success: false,
            error: 'User email not found',
        })
    }
})

// creating endpoint for new-collection data

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection  Fetched");
    res.send(newcollection);
})

// creating endpoint for popular in women section

app.get('/womenproducts', async (req, res) => {
    let products = await Product.find({category: 'women'});
    let popular_in_women = products.slice(0, 4);
    console.log("Popoular in women fetched");
    console.log(popular_in_women);
    res.send(popular_in_women);
})

// creating endpoint for related-products for product display page

app.post('/relatedproducts', async (req, res) => {
    let category = req.body.category;
    let products_of_category = await Product.find({category: category});
    let related_products = products_of_category.slice(0, 4);
    console.log(related_products);
    res.send(related_products);
})


// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({
            error: "Please authenticate using valid token",
        })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({
                err: "error occured",
            })
        }
    }
}

// creating endpoint for adding products in cartData

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log(req.body)
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send({ info: "Added" })
})

// creating endpoint removing products in cartData

app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log(req.body)
    let userData = await Users.findOne({_id: req.user.id});
    if (userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send({ info: "Removed" })
})

// creating endpoint to get cartData

app.post('/getcart', fetchUser, async (req, res) => {
    console.log('Getting Cart');
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
});

// creating endpoint to integrate paystack
app.post('/checkout', fetchUser, async (req, res) => {
    console.log(req.user)
    let userData = await Users.findOne({_id: req.user.id})
    console.log("amount_type", req.body.total_amount)
    const params = JSON.stringify({
        "email": userData.email,
        "amount": req.body.total_amount * 100
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: 'Bearer sk_test_906678dbc66abb1fb6ad97bb6830a7cb59f762e3',
            'Content-Type': 'application/json'
        }
    }

    const reqPaystack = https.request(options, resPaystack => {
        let data = ''

        resPaystack.on('data', (chunk) => {
            data += chunk
        });

        resPaystack.on('end', () => {
            console.log(JSON.parse(data))
            data_obj = JSON.parse(data)
            console.log(data_obj.data.authorization_url)
            res.send(data_obj)
        })
    })

    reqPaystack.on('error', error => {
        console.error(error)
        res.status(500).send({ error: 'Failed to initialize transaction' })
    })

    reqPaystack.write(params)
    reqPaystack.end()
});


app.listen(port, (error) => {
    if(!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log("Error: "+error);
    }
});