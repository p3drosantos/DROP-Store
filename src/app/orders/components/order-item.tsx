import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Order, Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";

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
  return (
    <>
      <Card className="rounded-xl px-5">
        <Accordion type="single" className="w-full" collapsible>
          <AccordionItem value={order.id}>
            <AccordionTrigger>
              <div className="flex flex-col gap-1  text-left text-sm font-bold uppercase">
                Número do Pedido
                <p className=" text-xs font-light opacity-70">
                  #{number.toString().padStart(3, "0")}
                </p>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold">
                    <p className="uppercase">Status</p>
                    <p className="text-[#8162ff]">{order.status}</p>
                  </div>

                  <div>
                    <p className="font-bold uppercase">Data</p>
                    <p className="opacity-60">
                      {format(order.createdAt, "d/MM/y")}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold uppercase">Pagamento</p>
                    <p className="opacity-60">Cartão</p>
                  </div>
                </div>
                {order.orderProducts.map((orderProduct) => (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};

export default OrderItem;