
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./db.config');
const fs = require('fs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , 'view'))

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const userRoute = require('./routes/user_routes');
const categoryRoute = require('./routes/category_route');
const suppliersRoute = require('./routes/suppliers_route');
const productRoute = require('./routes/products_routes');
const transactionRoute = require('./routes/transactions_route');
app.use('/api/category', categoryRoute);
app.use('/api/users', userRoute);  
app.use('/api/supplier', suppliersRoute);  
app.use('/api/product', productRoute);  
app.use('/api/transaction', transactionRoute);  
db.sequelize.sync();
fs.writeFileSync('./test.txt','This is dummy data')
app.get('/', (req, res) => {
    res.render("views");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});