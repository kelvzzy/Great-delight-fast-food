'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppShareButtonProps {
  whatsappLink: string;
  recipientName: string;
}

export function WhatsAppShareButton({ whatsappLink, recipientName }: WhatsAppShareButtonProps) {
  const handleShare = () => {
    // Open WhatsApp link in new window
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <button
      onClick={handleShare}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
    >
      <MessageCircle className="w-6 h-6" />
      <span>Send Gift to {recipientName} via WhatsApp</span>
    </button>
  );
}
