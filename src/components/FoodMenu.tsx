import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Star, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil leaves",
    price: 18.99,
    rating: 4.8,
    time: "25-30 min",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    popular: true
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Grilled chicken breast, lettuce, tomato, special sauce",
    price: 14.99,
    rating: 4.6,
    time: "15-20 min",
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons, caesar dressing",
    price: 12.99,
    rating: 4.4,
    time: "10-15 min",
    category: "Salads",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Beef Tacos",
    description: "Seasoned ground beef, lettuce, cheese, salsa",
    price: 16.99,
    rating: 4.7,
    time: "20-25 min",
    category: "Mexican",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    popular: true
  },
  {
    id: 5,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with creamy frosting",
    price: 8.99,
    rating: 4.9,
    time: "5-10 min",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Pad Thai",
    description: "Stir-fried rice noodles with shrimp, tofu, peanuts",
    price: 15.99,
    rating: 4.5,
    time: "20-25 min",
    category: "Asian",
    image: "https://images.unsplash.com/photo-1559314809-0f31657b2321?w=400&h=300&fit=crop"
  }
];

const categories = ["All", "Pizza", "Burgers", "Salads", "Mexican", "Asian", "Desserts"];

const FoodMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart, items } = useCart();
  const { toast } = useToast();

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const getCartQuantity = (itemId: number) => {
    return items.find(item => item.id === itemId)?.quantity || 0;
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold">Our Delicious Menu</h2>
          <p className="text-xl text-muted-foreground">
            Discover amazing dishes from our partner restaurants
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary hover:bg-primary-hover" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.popular && (
                    <Badge className="absolute top-3 left-3 bg-accent text-white">
                      Popular
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{item.name}</CardTitle>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${item.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-primary hover:bg-primary-hover text-white"
                  onClick={() => handleAddToCart(item)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                  {getCartQuantity(item.id) > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {getCartQuantity(item.id)}
                    </Badge>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No items found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodMenu;