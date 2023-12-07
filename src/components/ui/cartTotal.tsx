import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import { Separator } from "./separator";

const CartTotal = () => {
  const { subtotal, total, totalDiscount } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-3">
      <Separator />

      <div className="flex items-center justify-between text-xs lg:text-sm">
        <p>Subtotal</p>
        <p>R$ {subtotal.toFixed(2)}</p>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-xs lg:text-sm">
        <p>Entrega</p>
        <p>GRÁTIS</p>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-xs lg:text-sm">
        <p>Descontos</p>
        <p>R$ {totalDiscount.toFixed(2)}</p>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-sm font-bold lg:text-base">
        <p>Total</p>
        <p>R$ {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartTotal;
