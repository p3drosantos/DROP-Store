"use client";

import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ChevronLeft, ChevronRight, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleAddProductToCart = () => {
    addProductToCart({ ...product, quantity });
    toast.success("Produto adicionado ao carrinho!  ", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity === 1 ? 1 : prevQuantity - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <div className="flex flex-col px-5 lg:w-[40%] lg:rounded-lg lg:bg-accent lg:p-10">
      <h2 className="text-lg lg:text-2xl">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold lg:text-3xl">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <div className="rounded-lg bg-primary px-2 py-1 text-sm font-semibold text-white lg:text-base">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <div className=" flex gap-2 text-sm lg:text-base">
          <span className=" opacity-75">De:</span>
          <p className=" line-through opacity-75">
            R$ {Number(product.basePrice).toFixed(2)}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={handleDecreaseQuantity}>
          <ChevronLeft size={16} />
        </Button>

        <span>{quantity}</span>

        <Button size="icon" variant="outline" onClick={handleIncreaseQuantity}>
          <ChevronRight size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-12">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddProductToCart}
      >
        <ToastContainer />
        Adicionar ao Carrinho
      </Button>

      <div className=" mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2 lg:bg-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <TruckIcon size={24} />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
