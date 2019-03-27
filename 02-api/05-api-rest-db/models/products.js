const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://localhost:27017/practiceshop', {useNewUrlParser: true});

const productSchema = new mongoose.Schema({
	title: String,
	image: String
});

const Product = connection.model('Product', productSchema);

module.exports = Product;