import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, Minus } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseQuantity = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProduct = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent lg:h-[120px] lg:w-[120px]">
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
        <div className="flex flex-col gap-1 lg:gap-2">
          <p className="text-xs lg:text-sm">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold lg:text-base">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75 lg:text-sm">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1 lg:gap-3">
            <Button
              onClick={handleDecreaseQuantity}
              size="icon"
              variant="outline"
              className="h-8 w-8 lg:h-9 lg:w-9"
            >
              <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>

            <span className=" text-xs">{product.quantity}</span>

            <Button
              onClick={handleIncreaseQuantity}
              size="icon"
              variant="outline"
              className="h-8 w-8 lg:h-9 lg:w-9"
            >
              <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size={"sm"}
        className=" hover:bg-opacity-75"
      >
        <Minus className="h-4 w-4 lg:h-5 lg:w-5" color="red" />
      </Button>
    </div>
  );
};
export default CartItem;
