import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Cart from "@/components/Cart";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Track Order", href: "#tracking" },
    { name: "For Restaurants", href: "#dashboard" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FoodCloud
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Cart />
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    FoodCloud
                  </h2>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="text-foreground hover:text-primary transition-colors font-medium py-2 text-left w-full"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col space-y-4 pt-4 border-t">
                  <div className="flex justify-start">
                    <Cart />
                  </div>
                  <Button variant="ghost" className="justify-start">
                    <User className="h-5 w-5 mr-2" />
                    Account
                  </Button>
                  <Button className="bg-primary hover:bg-primary-hover text-white">
                    Sign In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;