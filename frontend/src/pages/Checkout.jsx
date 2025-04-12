import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2);

  const handlePayment = () => {
    // Example: Navigate to payment or integrate Stripe
    alert('Proceeding to payment...');
    // navigate('/payment'); // If you have a separate payment route
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-dashed border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4">🧾 Receipt</h2>
        <div className="border-b border-gray-200 pb-2 mb-2">
          <p className="text-sm text-gray-500 text-center">Thank you for shopping with us!</p>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-4">
              {cart.map((item) => (
                <li key={item._id} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            <div className="border-t pt-2 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            >
              Pay Now
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full mt-2 text-blue-600 hover:underline text-sm"
            >
              ← Back to shop
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;






