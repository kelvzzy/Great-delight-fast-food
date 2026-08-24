import { notFound } from 'next/navigation';
import { OrderConfirmationClient } from './OrderConfirmationClient';

async function getOrder(orderId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/orders/${orderId}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const data = await getOrder(params.orderId);

  if (!data || !data.order) {
    notFound();
  }

  return <OrderConfirmationClient order={data.order} />;
}
