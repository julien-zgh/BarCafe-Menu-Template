import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import SpecialImage from "../SpecialImage";
import Link from "next/link";

const navLinks = [
  { name: "Menu", href: "/#menu" },
  { name: "Location", href: "/#location" },
  { name: "Gallery", href: "/gallery" },
  { name: "Event Calendar", href: "eventCalendar" },
];

export default function Navbar({
  setOpenCalendar,
}: {
  setOpenCalendar?: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith("/#") || href.startsWith("#")) {
      const targetId = href.replace("/#", "").replace("#", "");

      if (pathname === "/") {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navbarHeight = 180;
          const elementPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: "smooth",
          });
        }
      } else {
        router.push(href);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navbarHeight = 180;
          const elementPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: "smooth",
          });
        }
      }
    } else if (href.startsWith("/")) {
      router.push(href);
    } else {
      setOpenCalendar?.(true);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 z-50 bg-white/20 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="relative w-20 h-20">
          <Link href="/">
            {/* <SpecialImage
              src="/"
              alt="Logo"
              fill
              className="object-contain rounded-full border-2 border-white-400"
            /> */}
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-black hover:text-gray-900 transition text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1 w-6 h-5 justify-center text-black"
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-[#f2e6d3]/90 backdrop-blur-md md:hidden flex flex-col items-center py-4 space-y-4 shadow-md"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
