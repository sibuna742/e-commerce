import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      setError(error.message);
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 5000 }), // example amount (5 dollars)
        });
        const data = await response.json();
        const { clientSecret } = data;

        const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: elements.getElement(CardElement) },
        });

        if (stripeError) {
          setError(stripeError.message);
        } else {
          setPaymentSuccess(true);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {paymentSuccess ? (
        <p>Payment Successful!</p>
      ) : (
        <>
          <form onSubmit={handlePayment}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
          </form>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
}

export default Checkout;
