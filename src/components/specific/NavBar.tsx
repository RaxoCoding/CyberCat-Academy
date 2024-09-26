"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthedUser } from "@/hooks/useAuthedUser";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Trophy, Flag, User, Menu, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBar() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuthedUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    logout({
			onSettled: () => router.push("/")
		});
  };

  return (
    <nav className="bg-card text-card-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold mr-4">
            CyberCat Academy
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div
          className={`md:flex items-center gap-4 ${
            isMenuOpen
              ? "flex flex-col absolute top-16 left-0 right-0 bg-card p-4 z-50"
              : "hidden"
          }`}
        >
          <Button
            asChild
            variant="link"
            className="w-full md:w-auto justify-start"
          >
            <Link href="/challenges">
              <Flag className="mr-2 h-4 w-4" />
              Challenges
            </Link>
          </Button>
          <Button
            asChild
            variant="link"
            className="w-full md:w-auto justify-start"
          >
            <Link href="/scoreboard">
              <Trophy className="mr-2 h-4 w-4" />
              Scoreboard
            </Link>
          </Button>
          {isLoading ? (
            <Button asChild className="w-full md:w-auto" disabled>
              <Link href="/auth/sign-in">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Login / Sign Up
              </Link>
            </Button>
          ) : user ? (
            <div className="flex gap-2 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <User className="mr-2 h-4 w-4" />
                    {user.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href={`/user/${user.username}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/user/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild className="w-full md:w-auto">
              <Link href="/auth/sign-in">
                <LogIn className="mr-2 h-4 w-4" />
                Login / Sign Up
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
