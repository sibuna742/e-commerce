import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">🛒 Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cart.map(item => (
                <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <p className="text-lg font-bold text-green-600 mt-3">${item.price}</p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={checkoutHandler}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
