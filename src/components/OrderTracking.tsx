import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { useOrders, Order } from "@/contexts/OrderContext";
import { useToast } from "@/hooks/use-toast";
import { Clock, MapPin, Phone, User, ShoppingBag, Truck, CheckCircle, Package, AlertCircle } from "lucide-react";

export const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all customer details.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    const order = placeOrder(items, customerInfo);
    clearCart();
    setCustomerInfo({ name: "", phone: "", address: "" });
    setIsOpen(false);

    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${order.id} has been placed and will be delivered in 45 minutes.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg" disabled={items.length === 0}>
          Proceed to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              id="address"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your delivery address"
            />
          </div>

          <Separator />
          
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span>₹{getTotalPrice().toFixed(0)}</span>
          </div>
          
          <Button onClick={handlePlaceOrder} className="w-full" size="lg">
            Place Order - ₹{getTotalPrice().toFixed(0)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'preparing':
        return <Package className="h-4 w-4" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'preparing':
        return 'bg-orange-500';
      case 'out_for_delivery':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatStatus = (status: Order['status']) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {order.orderTime.toLocaleDateString()} at {order.orderTime.toLocaleTimeString()}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {formatStatus(order.status)}
            </div>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Items Ordered
          </h4>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(0)}</span>
            </div>
          ))}
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-semibold">
          <span>Total Amount:</span>
          <span>₹{order.total.toFixed(0)}</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{order.customerInfo.name}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{order.customerInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{order.customerInfo.address}</span>
          </div>
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated delivery: {order.estimatedDelivery.toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const { getUserOrders, getOrderById } = useOrders();
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  
  const userOrders = getUserOrders();

  const handleTrackOrder = () => {
    if (!trackingId.trim()) return;
    
    const order = getOrderById(trackingId.trim());
    setSearchedOrder(order || null);
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold">Order Tracking</h2>
          <p className="text-xl text-muted-foreground">
            Track your orders and view order history
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Track Order by ID */}
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your order ID (e.g., ORD12345678)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
                <Button onClick={handleTrackOrder}>Track Order</Button>
              </div>
              
              {searchedOrder && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Order Found:</h3>
                  <OrderCard order={searchedOrder} />
                </div>
              )}
              
              {trackingId && !searchedOrder && trackingId.length > 0 && (
                <p className="text-destructive">Order not found. Please check your order ID.</p>
              )}
            </CardContent>
          </Card>

          {/* Your Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Orders ({userOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {userOrders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders found</p>
                  <p className="text-sm text-muted-foreground">Place your first order to see it here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;