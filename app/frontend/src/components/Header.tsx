import { Search, Bell, TrendingUp, User } from "lucide-react";
import { User as AuthUser } from "@/lib/auth";

interface HeaderProps {
  onLoginClick: () => void;
  user?: AuthUser | null;
}

export function Header({ onLoginClick, user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1e1e2e] bg-[#0a0a0f]/95 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 max-w-[1600px] mx-auto">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">WinProd</h1>
            <p className="text-[10px] text-gray-500 leading-tight">Leaderboard Produits Winners</p>
          </div>
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5 ml-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-400">Live</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 py-2">
            <Search className="h-3.5 w-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-40 bg-transparent text-xs text-white placeholder:text-gray-600 focus:outline-none"
            />
          </div>

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e1e2e] text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
            <Bell className="h-4 w-4" />
            <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          {/* Profile */}
          <button
            onClick={onLoginClick}
            className="flex h-9 items-center gap-2 rounded-lg border border-[#1e1e2e] px-3 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <User className="h-4 w-4" />
            {user ? (
              <span className="hidden sm:inline text-xs font-medium text-emerald-400">
                {user.isPremium ? "VIP" : user.email.split("@")[0]}
              </span>
            ) : (
              <span className="hidden sm:inline text-xs">Connexion</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}