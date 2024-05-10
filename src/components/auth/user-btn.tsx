import { buttonVariants } from "@/ui/button";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import Avatar from "boring-avatars";
import UserMenu from "./user-menu";
import { SignOut } from "./sign-out";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function UserButton() {
  const session = await auth();

  if (!session?.user)
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "outline",
          className: "group",
        })}
      >
        <span>Get Started</span>
        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-[2px]" />
      </Link>
    );

  if (session?.user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          name={session.user.name ?? "User Menu"}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          {session.user.name && (
            <Image
              src={session.user.image ?? "/avatar.png"}
              alt={session.user.name}
              width={28}
              height={28}
              className="rounded-full"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-neutral-400">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <UserMenu />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
