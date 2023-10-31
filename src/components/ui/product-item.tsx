import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className=" relative flex h-[170px] min-w-[170px] items-center justify-center rounded-lg bg-accent ">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
          alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <div className="absolute left-0 top-0 rounded-bl-lg bg-primary px-2 py-1 text-xs font-semibold text-white">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="txt-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </p>

        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              {" "}
              <p className=" text-sm font-semibold">
                R$ {product.totalPrice.toFixed(2)}
              </p>
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">
              R$ {product.basePrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
