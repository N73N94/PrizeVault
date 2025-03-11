import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full bg-slate-900 text-white py-12 px-4 md:px-8 lg:px-12",
        className,
      )}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Premium Raffles</h3>
            <p className="text-slate-300 mb-4">
              Experience the thrill of winning high-value prizes through our
              transparent and secure raffle platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Active Raffles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Winners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Vehicles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Real Estate
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Luxury Items
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Experiences
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  123 Raffle Street, Prizeville, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-300">
                  support@premiumraffles.com
                </span>
              </li>
            </ul>
            <Button
              variant="outline"
              className="mt-4 bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
            >
              Contact Support
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} Premium Raffles. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-slate-400 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-400 text-sm hover:text-white transition-colors"
            >
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
