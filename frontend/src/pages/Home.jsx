import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; // For the Add to Cart icon

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Electronics', 'Fashion', 'Kichen', 'Toys', 'Sports']);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


// Add product to cart
const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Optional: Prevent duplicate entries
  const alreadyInCart = existingCart.find(item => item._id === product._id);
  if (alreadyInCart) {
    alert('Item already in cart');
    return;
  }

  const updatedCart = [...existingCart, product];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  alert(`${product.name} added to cart`);
};


  return (
    <div className="flex">
      {/* Sidebar for Categories */}
      <div className="w-64 bg-green-200 p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Product Cards */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to Our E-Commerce Store</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products
            .filter((product) => selectedCategory ? product.category === selectedCategory : true) // Filter by category if selected
            .map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-4">${product.price}</p>
                </div>
                <div className="p-4 bg-gray-100">
                  <button onClick={() => addToCart(product)} className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600">
                 
                    <FaShoppingCart className="inline-block mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
