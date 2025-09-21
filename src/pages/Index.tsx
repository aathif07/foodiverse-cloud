import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FoodMenu from "@/components/FoodMenu";
import OrderTracking from "@/components/OrderTracking";
import RestaurantDashboard from "@/components/RestaurantDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="menu">
          <FoodMenu />
        </section>
        <section id="tracking">
          <OrderTracking />
        </section>
        <section id="dashboard">
          <RestaurantDashboard />
        </section>
      </main>
    </div>
  );
};

export default Index;
