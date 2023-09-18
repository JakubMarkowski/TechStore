const express = require("express");
const db = require("./db.js");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path')

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;
const LINK = `http://localhost:${port}`;
// const db = new sqlite3.Database("/db/products.db");


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))
let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))
const stripe = require("stripe")("sk_test_51NTPikKf4X5RdzeYpnYjzyH46j2Kxsg6Y9VP6X5V6I3AqpA7v9an2KOGLwHVIWTKAIMlypK5cOVpo3BjEJqODBXA00UbaO3hgD");
app.get("/", (req, res, next) => {
    console.log("Connection established");
});
app.post('/checkout', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
            allowed_countries: ['PL'],
        },
            shipping_options: [
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 0,
                    currency: 'PLN',
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 5,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 7,
                    },
                }
                }
            },
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 1500,
                    currency: 'PLN',
                },
                display_name: 'Next day air',
                // Delivers in exactly 1 business day
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 1,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 1,
                    },
                }
                }
            },
            ],
            line_items: req.body.items.map((item) => ({
                price_data: {
                  currency: 'PLN',
                  product_data: {
                    name: item.name,
                    images: [item.product]
                  },
                  unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${LINK}/success.html`,
            cancel_url: `${LINK}/cancel.html`,
        });
        res.status(200).json(session);
    } catch (error) { 
        next(error);
    }
  });
app.get("/data/all", (req, res) => {
    db.all("SELECT * FROM products", (errors, rows) => {
        if (errors) {
            console.error(errors);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(rows);
            console.log(rows);
        }
    });
 });
app.get("/data", (req, res) => {
    console.log(req.query.category);
    db.all(`SELECT * FROM products ${ req.query.category ? `WHERE category = '${req.query.category}'` : ""} ORDER BY price ${req.query.sort} LIMIT ${req.query.limit}`, (errors, rows) => {
        if (errors) {
            console.error(errors);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(rows);
            //console.log(rows);
        }
    });
});
// app.get("/data/:cat", (req, res) => {
//     let sql = `SELECT * FROM products WHERE category = ? ORDER BY price ${req.query.sort} LIMIT ${req.query.limit}`
//     let param = [req.params.cat];
//     db.get(sql, param, (errors, rows) => {
//         if (errors) {
//             console.error(errors);
//             res.status(500).send("Internal Server Error");
//         } else {
//             res.json(rows);
//         }
//     });
// });
app.get("/api/categories", (req, res) => { 
    db.all("SELECT type FROM categories", (errors, rows) => {
        if (errors) {
            console.error(errors);
            res.status(500).send("Internal Server Error");
        } else {
            let temp = rows.map(el => el.type);
            res.send(temp);
        }
    });
});

app.get("/api/category/:type", (req, res) => { 
    let sql = `SELECT * FROM products WHERE type = ?`;
    let param = [req.params.type];
    db.get(sql, param, (errors, rows) => {
        if (errors) {
            console.error(errors);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(rows);
        }
    });
});
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
  })
app.use(function(req, res){
    res.status(404);
});