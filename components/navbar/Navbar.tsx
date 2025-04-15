"use client";

import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiChat,
  HiCog,
  HiHome,
  HiInformationCircle,
  HiLogout,
  HiOutlineBell,
  HiTemplate,
  HiUser,
  HiChevronDown,
} from "react-icons/hi";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
  children?: { href: string; label: string }[];
}

const baseNavLinks: NavLink[] = [
  { href: "/", label: "Home", icon: HiHome },
  { href: "/chat", label: "Chat", icon: HiChat },
  {
    href: "#",
    label: "Agents",
    icon: HiTemplate,
    children: [
      { href: "/agents/chat-agent", label: "Chat Agents" },
      { href: "/agents/about", label: "About Agents" },
    ],
  },
  { href: "/about", label: "About", icon: HiInformationCircle },
];

const dashboardLink: NavLink = {
  href: "/dashboard",
  label: "Dashboard",
  icon: HiTemplate,
};

export const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  const navLinks = user ? [...baseNavLinks, dashboardLink] : baseNavLinks;

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <nav className=" top-0 z-50 w-full border-b border-gray-800 bg-[#061331]">
      <div className="px-6 py-3 lg:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-shrink-0 pl-4">
            <Link href="/" className="text-white font-bold text-xl">
              Logo
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                if (link.children) {
                  return (
                    <div key={link.label} className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.label ? null : link.label
                          )
                        }
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 ${
                          openDropdown === link.label
                            ? "text-white bg-white/10"
                            : "text-white/60"
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-2" />
                        {link.label}
                        <HiChevronDown
                          className={`ml-1 w-4 h-4 transition-transform ${
                            openDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="absolute left-0 mt-2 w-48 rounded-lg bg-[#0a1f4d] border border-white/10 shadow-lg py-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 ${
                      pathname === link.href
                        ? "text-white bg-white/10"
                        : "text-white/60"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4 pr-4">
            {!loading && !user ? (
              <>
                <Link
                  href="/auth"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth?mode=signin"
                  className="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-700 rounded-lg hover:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <button className="relative p-2 text-white/60 hover:text-white transition-colors">
                  <HiOutlineBell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <HiUser className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#0a1f4d] border border-white/10 shadow-lg py-1">
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-sm font-medium text-white truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-white/60 truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          router.push("/profile");
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <HiUser className="w-5 h-5 mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          router.push("/settings");
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <HiCog className="w-5 h-5 mr-2" />
                        Settings
                      </button>
                      <div className="border-t border-white/10 my-1" />
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-white/10 transition-colors"
                      >
                        <HiLogout className="w-5 h-5 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
