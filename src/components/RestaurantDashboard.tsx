import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Eye,
  BarChart3,
  UtensilsCrossed
} from "lucide-react";

const mockOrders = [
  { id: "#12345", customer: "John Doe", items: "2x Margherita Pizza", amount: 37.98, status: "preparing", time: "15 min ago" },
  { id: "#12344", customer: "Jane Smith", items: "1x Chicken Burger, 1x Fries", amount: 19.98, status: "ready", time: "20 min ago" },
  { id: "#12343", customer: "Mike Johnson", items: "1x Caesar Salad", amount: 12.99, status: "delivered", time: "45 min ago" },
  { id: "#12342", customer: "Sarah Wilson", items: "3x Beef Tacos", amount: 50.97, status: "confirmed", time: "1 hour ago" },
];

const stats = [
  { title: "Today's Revenue", value: "$1,247", icon: DollarSign, change: "+12%" },
  { title: "Active Orders", value: "23", icon: ShoppingBag, change: "+5%" },
  { title: "Avg. Prep Time", value: "18 min", icon: Clock, change: "-3 min" },
  { title: "Customer Rating", value: "4.8", icon: TrendingUp, change: "+0.2" },
];

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'preparing': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusActions = (orderId: string, status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Button 
            size="sm" 
            onClick={() => updateOrderStatus(orderId, 'preparing')}
            className="bg-primary hover:bg-primary-hover"
          >
            Start Preparing
          </Button>
        );
      case 'preparing':
        return (
          <Button 
            size="sm" 
            onClick={() => updateOrderStatus(orderId, 'ready')}
            className="bg-green-600 hover:bg-green-700"
          >
            Mark Ready
          </Button>
        );
      case 'ready':
        return (
          <Button 
            size="sm" 
            variant="outline"
            className="text-green-600 border-green-600"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Ready for Pickup
          </Button>
        );
      case 'delivered':
        return (
          <Badge variant="secondary" className="bg-gray-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Restaurant Dashboard</h2>
            <p className="text-xl text-muted-foreground">
              Manage your orders and track performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="menu">Menu Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Live Orders
                    <Badge variant="secondary">{orders.filter(o => o.status !== 'delivered').length} Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)} mt-2`}></div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{order.id}</span>
                              <Badge variant="outline" className="text-xs">
                                {order.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                            <p className="text-sm">{order.items}</p>
                            <p className="text-xs text-muted-foreground">{order.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">${order.amount}</span>
                          {getStatusActions(order.id, order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="menu" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Menu Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <UtensilsCrossed className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Menu Management Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Add, edit, and manage your menu items, pricing, and availability.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Track sales, customer preferences, and performance metrics.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default RestaurantDashboard;