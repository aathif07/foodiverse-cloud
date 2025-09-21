import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Truck, UtensilsCrossed, MapPin } from "lucide-react";

const orderSteps = [
  { id: 1, title: "Order Placed", icon: CheckCircle, description: "Your order has been confirmed" },
  { id: 2, title: "Preparing", icon: UtensilsCrossed, description: "Restaurant is preparing your food" },
  { id: 3, title: "On the Way", icon: Truck, description: "Driver is on the way to deliver" },
  { id: 4, title: "Delivered", icon: MapPin, description: "Order delivered successfully" }
];

const OrderTracking = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [estimatedTime, setEstimatedTime] = useState(25);

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev <= 1) {
          if (currentStep < 4) {
            setCurrentStep(curr => curr + 1);
            return currentStep === 3 ? 0 : 15; // Reset time for next step
          }
          return 0;
        }
        return prev - 1;
      });
    }, 3000); // Speed up for demo

    return () => clearInterval(timer);
  }, [currentStep]);

  const getCurrentStatus = () => {
    switch (currentStep) {
      case 1: return "confirmed";
      case 2: return "preparing";
      case 3: return "on-the-way";
      case 4: return "delivered";
      default: return "confirmed";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">Track Your Order</h2>
            <p className="text-xl text-muted-foreground">
              Real-time updates on your food delivery
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order #12345
                  <Badge variant={currentStep === 4 ? "default" : "secondary"} className={
                    currentStep === 4 ? "bg-success text-white" : "bg-primary text-white"
                  }>
                    {getCurrentStatus().replace('-', ' ').toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Steps */}
                <div className="space-y-4">
                  {orderSteps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const Icon = step.icon;

                    return (
                      <div key={step.id} className="flex items-start gap-4">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center
                          ${isCompleted 
                            ? 'bg-success text-white' 
                            : isCurrent 
                              ? 'bg-primary text-white' 
                              : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 pb-4">
                          <h3 className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {isCurrent && estimatedTime > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-primary">
                                {estimatedTime} min remaining
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimated Delivery */}
                {currentStep < 4 && (
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Estimated Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(Date.now() + estimatedTime * 60000).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary">
                        {estimatedTime} min
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Margherita Pizza</h4>
                      <p className="text-sm text-muted-foreground">Large, extra cheese</p>
                    </div>
                    <span className="font-medium">$18.99</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Chicken Burger</h4>
                      <p className="text-sm text-muted-foreground">No onions</p>
                    </div>
                    <span className="font-medium">$14.99</span>
                  </div>
                </div>

                <hr />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$33.98</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$3.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$2.84</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">$40.81</span>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Delivery Address</h4>
                  <p className="text-sm">123 Main Street, Apt 4B</p>
                  <p className="text-sm">Chennai, Tamil Nadu 600001</p>
                </div>

                {currentStep < 4 && (
                  <Button variant="outline" className="w-full">
                    Contact Driver
                  </Button>
                )}

                {currentStep === 4 && (
                  <Button className="w-full bg-success hover:bg-success/90 text-white">
                    Order Again
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;