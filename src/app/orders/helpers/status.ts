import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (orderStatus: OrderStatus) => {
  switch (orderStatus) {
    case OrderStatus.WAITING_FOR_PAYMENT:
      return "Pendente ";
    case OrderStatus.PAYMENT_CONFIRMED:
      return "Pago";
  }
};
