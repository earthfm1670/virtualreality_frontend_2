"use client";

import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  onClearCart: () => void;
}

export function CartSummary({ cart, onClearCart }: CartSummaryProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // to calculate total price and discount
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // quantity to use as condition for discounts
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let discountPercentage = 0;
  if (totalItems >= 5) {
    discountPercentage = 20;
  } else if (totalItems >= 3) {
    discountPercentage = 10;
  }

  const discountAmount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 sticky top-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">Your Cart</h2>
      <ul className="space-y-3 mb-4">
        {/* Map each item in CartSummary */}
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <div>
              <span className="font-medium">{item.title}</span>
              <span className="text-sm text-gray-400 ml-2">
                x{item.quantity}
              </span>
            </div>
            <span className="text-gray-300">
              ฿{(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      {/* div container for discounts and subtotal */}
      <div className="space-y-2 border-t border-gray-700 pt-3">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal:</span>
          <span>฿{subtotal.toFixed(2)}</span>
        </div>
        {discountPercentage > 0 && (
          <div className="flex justify-between text-green-400">
            <span>Discount ({discountPercentage}%):</span>
            <span>-฿{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold text-gray-200">
          <span>Total:</span>
          <span>฿{total.toFixed(2)}</span>
        </div>
      </div>
      {/* div container for clearCart and checkout button */}
      <div className="space-y-2 mt-4">
        <button
          onClick={onClearCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Clear Cart
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Checkout
        </button>
      </div>
      {isModalOpen && (
        <CheckoutModal
          onClose={() => setIsModalOpen(false)}
          subtotal={subtotal}
          discountPercentage={discountPercentage}
          discountAmount={discountAmount}
          total={total}
        />
      )}
    </div>
  );
}
