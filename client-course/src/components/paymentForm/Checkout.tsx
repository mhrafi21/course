import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CheckoutPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement the logic to handle form submission and payment
    setPaymentStatus("Processing...");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-8 text-center">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Order Summary */}
        <div className="space-y-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <ul className="space-y-4">
              <li>
                <p className="text-gray-600">
                  Course Name: Web Development Bootcamp
                </p>
                <p className="text-gray-500">Price: $49.99</p>
              </li>
              <li>
                <p className="text-gray-600">Promo Code: WINTERSALE</p>
                <p className="text-gray-500">Discount: -$10.00</p>
              </li>
            </ul>
            <div className="mt-6 flex justify-between">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-xl font-semibold text-gray-800">
                $39.99
              </span>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                placeholder="Address"
                value={userDetails.address}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={userDetails.city}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, city: e.target.value })
                  }
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={userDetails.postalCode}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-md"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Payment Section */}
        <div className="space-y-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>

            {/* Stripe payment form */}
            <div className="mt-4">
              <CardElement className="border p-4 rounded-md" />
            </div>
          </div>
          {/* Final Review & Confirm */}
          <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Review & Confirm</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Summary</span>
                <span className="text-gray-800">$39.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">Free</span>
              </div>
              <div className="flex justify-between text-xl font-semibold mt-4">
                <span>Total</span>
                <span>$39.99</span>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-4"
              onClick={handleSubmit}
            >
              Confirm and Pay
            </button>
            {paymentStatus && (
              <div className="mt-4 text-green-500">{paymentStatus}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
