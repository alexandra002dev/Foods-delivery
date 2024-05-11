"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useSession();
  console.log(data?.user.email);

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href={"/"}>
        <Image src="/Logo.png" alt="FSW Foods" height={30} width={100} />
      </Link>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="w-[90vw] space-y-3">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex items-center">
                {/* IMAGEM */}
                <div className="relative h-12 w-12 rounded-full">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>FD</AvatarFallback>
                  </Avatar>
                </div>
                {/* INFO */}
                <div>
                  <h2 className="text-lg font-semibold">{data?.user.name}</h2>
                  <span className="text-sm">{data?.user.email}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-lg font-semibold">
                <h2>Olá. Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}
          <div className=" py-6 ">
            <Separator />
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-full "
          >
            <HomeIcon size={16} /> Início
          </Button>
          {data?.user && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full "
              >
                <ScrollTextIcon size={16} /> Meus Pedidos
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full "
              >
                <HeartIcon size={16} /> Restaurantes Favoritos
              </Button>
            </>
          )}

          <div className=" py-6 ">
            <Separator />
          </div>
          <Button variant="ghost" className="w-full justify-start gap-3 ">
            <HeartIcon size={16} /> Pratos
          </Button>
          <div className=" py-6 ">
            <Separator />
          </div>
          {data?.user && (
            <Button
              className="w-full justify-start gap-3 rounded-full"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              Sair da conta
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
