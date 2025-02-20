"use client";

import { useEffect, useState } from "react";

interface CheckoutModalProps {
  onClose: () => void;
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  total: number;
}

export function CheckoutModal({
  onClose,
  subtotal,
  discountPercentage,
  discountAmount,
  total,
}: CheckoutModalProps) {
  const [timeLeft, setTimeLeft] = useState<number>(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      alert("Time has run out. Your order has been cancelled.");
      onClose();
    }
  }, [timeLeft, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Checkout</h2>
        {/* Account detail */}
        <div className="mb-4">
          <p className="text-gray-300 mb-2">
            Please make your payment to the following account:
          </p>
          <p className="text-gray-200 font-semibold">Bank: Tech Bank</p>
          <p className="text-gray-200 font-semibold">
            Account Number: 123-4-567890
          </p>
          <p className="text-gray-200 font-semibold">
            Account Name: VirtualReality Movie Co., Ltd.
          </p>
        </div>
        <div className="space-y-2 mb-4">
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
            <span>Total Amount:</span>
            <span>฿{total.toFixed(2)}</span>
          </div>
        </div>
        {/* div container for countdown timer */}
        <div className="text-xl font-bold mb-4 text-gray-200">
          Time remaining: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
