import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, Minus } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            alt={product.name}
            sizes="100vw"
            style={{ objectFit: "contain" }}
            className="h-auto max-h-[80%] w-auto max-w-[70%]"
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-sm">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className=" text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1">
            <Button
              onClick={handleDecreaseQuantity}
              size="icon"
              variant="outline"
              className="h-6 w-6"
            >
              <ChevronLeft size={16} />
            </Button>

            <span className=" text-xs">{product.quantity}</span>

            <Button size="icon" variant="outline" className="h-6 w-6">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button variant="outline" size={"sm"} className=" hover:bg-opacity-75">
        <Minus size={12} color="red" />
      </Button>
    </div>
  );
};
export default CartItem;
