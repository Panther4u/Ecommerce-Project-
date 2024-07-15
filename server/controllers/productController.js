const Product = require('../model/Product');
const { v4: uuid } = require('uuid');
const productsData = require('../scripts/productsData');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log('Products retrieved:', products); // Log retrieved products
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error); // Log error
    res.status(500).json({ message: error.message });
  }
};

const importProducts = async (req, res) => {
  try {
    console.log('Importing products...'); // Log importing process

    // Delete existing products to avoid duplicates
    await Product.deleteMany();

    // Map productsData to include UUID and insert into database
    const sampleProducts = productsData.map((product) => ({
      ...product,
      id: uuid(),
    }));

    console.log('Sample products to insert:', sampleProducts); // Log sample products before insertion

    await Product.insertMany(sampleProducts);

    console.log('Data imported successfully'); // Log success message
    res.status(201).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing products:', error); // Log error
    res.status(500).json({ message: error.message });
  }
};

const getFlashSalesProducts = async (req, res) => {
  try {
    // Example query: find all products
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching flash sales products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  getProducts,
  importProducts,
  getFlashSalesProducts,
};
