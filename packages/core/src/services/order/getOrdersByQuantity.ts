import { Order } from '../../queries/order/types';
import { BulkBuyOrderData } from '../../types/order';

export const getOrdersByQuantity = (orders: Order[], quantity: number) => {
  let total = 0;
  const ordersByQuantity: BulkBuyOrderData[] = [];

  for (const order of orders) {
    const { orderQuantity } = order;
    const availableQuantity = Number(orderQuantity?.availableQuantity || 0);
    if (availableQuantity === 0) {
      continue;
    }

    const newTotal = total + availableQuantity;
    const newQuantity = Math.min(availableQuantity, quantity - total);
    total = newTotal;
    ordersByQuantity.push({ quantity: newQuantity, order });

    if (newTotal >= quantity) {
      break;
    }
  }

  return ordersByQuantity;
};
