"use client";
import Link from "next/link";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  Percent,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Cart from "./cart";
const Header = () => {
  const { status, data } = useSession();

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div className="flex flex-col">
                  <p className="text-sm font-medium">{data.user.name}</p>
                  <p className=" text-xs opacity-75">Boas Compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => signIn()}
              >
                <LogInIcon size={16} />
                Entrar
              </Button>
            )}

            {status === "authenticated" && (
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => signOut()}
              >
                <LogInIcon size={16} />
                Sair
              </Button>
            )}

            <Button variant="outline" className="w-full justify-start gap-2">
              <HomeIcon size={16} />
              InÍcio
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Percent size={16} />
              Ofertas
            </Button>
            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">DROP</span> Store
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
