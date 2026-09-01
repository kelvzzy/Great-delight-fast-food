'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export interface GiftDetails {
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  message: string;
}

interface GiftDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: GiftDetails) => void;
}

export function GiftDetailsModal({ isOpen, onClose, onSubmit }: GiftDetailsModalProps) {
  const [details, setDetails] = useState<GiftDetails>({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    message: '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>🎁</span> Gift Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Sender Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Your Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={details.senderName}
                onChange={(e) => setDetails({ ...details, senderName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={details.senderPhone}
                onChange={(e) => setDetails({ ...details, senderPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
          </div>
          
          {/* Recipient Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recipient Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recipient Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={details.recipientName}
                onChange={(e) => setDetails({ ...details, recipientName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Jane Smith"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recipient Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={details.recipientPhone}
                onChange={(e) => setDetails({ ...details, recipientPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
          </div>
          
          {/* Gift Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gift Message (Optional)
            </label>
            <textarea
              value={details.message}
              onChange={(e) => setDetails({ ...details, message: e.target.value })}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Happy Birthday! Enjoy this meal..."
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 text-right mt-1">
              {details.message.length}/500
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue to Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
