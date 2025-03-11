import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
  onSearchSubmit?: (searchTerm: string) => void;
  onMenuToggle?: () => void;
}

const Header = ({
  isLoggedIn: propIsLoggedIn,
  username: propUsername = "Guest",
  avatarUrl:
    propAvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  onSearchSubmit = () => console.log("Search submitted"),
  onMenuToggle = () => console.log("Menu toggled"),
}: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Use props if provided, otherwise use auth context
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : !!user;
  const username =
    propUsername !== "Guest"
      ? propUsername
      : user?.email?.split("@")[0] || "Guest";
  const avatarUrl =
    propAvatarUrl !== "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
      ? propAvatarUrl
      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "default"}`;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle();
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">RafflePro</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/raffles"
            className="font-medium hover:text-primary transition-colors"
          >
            Raffles
          </Link>
          <Link
            to="/rewards"
            className="font-medium hover:text-primary transition-colors"
          >
            Rewards
          </Link>
          <Link
            to="/how-it-works"
            className="font-medium hover:text-primary transition-colors"
          >
            How It Works
          </Link>
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative w-64 lg:w-80"
        >
          <Input
            type="text"
            placeholder="Search raffles..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={avatarUrl}
                    alt={username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium hidden lg:block">{username}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="hidden md:block"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link to="/login">
                <Button variant="outline" size="sm" className="mr-2">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-20 bg-white border-b border-gray-200 shadow-md transition-all duration-300 ease-in-out z-40",
          isMobileMenuOpen
            ? "max-h-screen py-4"
            : "max-h-0 py-0 overflow-hidden",
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search raffles..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/raffles"
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Raffles
            </Link>
            <Link
              to="/rewards"
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rewards
            </Link>
            <Link
              to="/how-it-works"
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
          </nav>

          {isLoggedIn ? (
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOut();
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
