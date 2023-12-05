import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Image from "next/image";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <>
      <div className="mx-auto max-w-[1920px]">
        <Image
          src="/banner-ofertas.png"
          alt="Até 55% de desconto esse mês"
          width={0}
          height={0}
          sizes="100vw"
          className="hidden h-auto w-full lg:block"
        />
      </div>

      <div className="container mx-auto flex flex-col gap-8 py-8">
        <PromoBanner
          src="/banner-home-01.png"
          alt="Até 55% de desconto esse mês"
          className="lg:hidden"
        />

        <div className=" px-5">
          <Categories />
        </div>
        <div>
          <SectionTitle className="mb-2 pl-5 font-bold uppercase">
            Ofertas
          </SectionTitle>
          <ProductList products={deals} />
        </div>

        <PromoBanner
          src="/banner-home-02.png"
          alt="Até 55% de desconto em mouses"
        />

        <div>
          <SectionTitle className="mb-2 pl-5 font-bold uppercase">
            Teclados
          </SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <div>
          <PromoBanner
            src="/banner-home-03.png"
            alt="Até 55% de desconto em mouses"
          />
        </div>

        <div>
          <SectionTitle className="mb-2 pl-5 font-bold uppercase">
            Mouses
          </SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  );
}
