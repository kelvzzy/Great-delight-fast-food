'use client';

import { Toast, ToastContainer } from '@/components/ui/Toast';
import { useToastStore } from '@/hooks/useToast';

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore();

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </ToastContainer>
  );
}
