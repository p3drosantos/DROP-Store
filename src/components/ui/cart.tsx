import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div className=" flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full flex-col gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={computeProductTotalPrice(product as any) as any}
            />
          ))
        ) : (
          <p className="text-center font-semibold opacity-40">
            Carrinho vazio.
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
