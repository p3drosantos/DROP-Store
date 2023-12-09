"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";

interface OrderItemProps {
  number: any;
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order, number }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productTotalPrice = computeProductTotalPrice(product.product);

      return acc + productTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscounts = subtotal - total;

  return (
    <>
      <Card className="rounded-xl px-5">
        <Accordion type="single" className="w-full" collapsible>
          <AccordionItem value={order.id}>
            <AccordionTrigger>
              <div className="flex text-left lg:w-full ">
                <div className="flex flex-1 flex-col gap-1 text-sm font-bold uppercase   lg:text-base">
                  Número do Pedido
                  <p className=" text-xs font-light opacity-70 lg:text-sm">
                    #{number.toString().padStart(3, "0")}
                  </p>
                </div>
                <div className="hidden flex-1 font-bold lg:block">
                  <p className="text-xs uppercase lg:text-sm">Status</p>
                  <p className="text-xs text-[#8162ff] lg:text-sm">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div className="hidden flex-1 lg:block">
                  <p className="text-xs font-bold uppercase lg:text-sm">Data</p>
                  <p className="text-xs opacity-60 lg:text-sm ">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>

                <div className="hidden flex-1 lg:block">
                  <p className="text-sx font-bold uppercase lg:text-sm">
                    Pagamento
                  </p>
                  <p className="text-sx opacity-60 lg:text-sm">Cartão</p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-4 ">
                <div className="flex items-center justify-between lg:hidden">
                  <div className="font-bold">
                    <p className="text-xs uppercase lg:text-sm">Status</p>
                    <p className="text-xs text-[#8162ff] lg:text-sm">
                      {getOrderStatus(order.status)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase lg:text-sm">
                      Data
                    </p>
                    <p className="text-xs opacity-60 lg:text-sm ">
                      {format(order.createdAt, "d/MM/y")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sx font-bold uppercase lg:text-sm">
                      Pagamento
                    </p>
                    <p className="text-sx opacity-60 lg:text-sm">Cartão</p>
                  </div>
                </div>
                {order.orderProducts.map((orderProduct) => (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                ))}

                <div className="flex w-full flex-col gap-1 text-xs ">
                  <Separator />

                  <div className="flex w-full justify-between py-3 lg:text-sm">
                    <p>Subtotal</p>
                    <p>R$ {subtotal.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex w-full justify-between py-3 lg:text-sm">
                    <p>Entrega</p>
                    <p>GRÀTIS</p>
                  </div>
                  <Separator />
                  <div className="flex w-full justify-between py-3 lg:text-sm">
                    <p>Descontos</p>
                    <p>R$ {totalDiscounts.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex w-full justify-between py-3 text-sm font-bold uppercase lg:text-base">
                    <p>Total</p>
                    <p>R$ {total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};

export default OrderItem;
