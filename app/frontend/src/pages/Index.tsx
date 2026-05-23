import { useState, useCallback, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Leaderboard } from "@/components/Leaderboard";
import { ProductAnalysisPanel } from "@/components/ProductAnalysisPanel";
import { LoginModal } from "@/components/LoginModal";
import { WelcomeVipModal } from "@/components/WelcomeVipModal";
import { productsByCategory, CategoryKey, Product } from "@/data/products";
import { getCurrentUser, upgradeToPremium, User as AuthUser } from "@/lib/auth";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("global");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWelcomeVipOpen, setIsWelcomeVipOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const currentProducts = productsByCategory[activeCategory] || [];

  const handleAnalyse = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginOpen(true);
  }, []);

  const handleCloseLogin = useCallback(() => {
    setIsLoginOpen(false);
  }, []);

  const handleAuthChange = useCallback((user: AuthUser | null) => {
    setCurrentUser(user);
    // Show welcome VIP modal after successful login (only for non-premium users)
    if (user && !user.isPremium) {
      // Small delay for smooth transition
      setTimeout(() => {
        setIsLoginOpen(false);
        setIsWelcomeVipOpen(true);
      }, 300);
    }
  }, []);

  const handleVipPayment = useCallback(() => {
    upgradeToPremium();
    const updatedUser = getCurrentUser();
    setCurrentUser(updatedUser);
    setIsWelcomeVipOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Header onLoginClick={handleOpenLogin} user={currentUser} />

      <main className="flex gap-0 lg:gap-6 px-4 lg:px-6 pb-8 pt-4 max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Leaderboard products={currentProducts} onAnalyse={handleAnalyse} />
        </div>
      </main>

      {/* Analysis Slide-over Panel (VIP locked for non-premium) */}
      <ProductAnalysisPanel
        product={selectedProduct}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        isPremium={currentUser?.isPremium}
        onPayment={handleVipPayment}
      />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} onAuthChange={handleAuthChange} />

      {/* Welcome VIP Upsell Modal (shows after login) */}
      <WelcomeVipModal
        isOpen={isWelcomeVipOpen}
        onClose={() => setIsWelcomeVipOpen(false)}
        onPayment={handleVipPayment}
      />
    </div>
  );
};

export default Index;