import { Lock, BarChart3, TrendingUp, Eye } from "lucide-react";
import { StripePaymentModule } from "./LoginModal";

interface AnalysisPaywallProps {
  onPayment: () => void;
}

export function AnalysisPaywall({ onPayment }: AnalysisPaywallProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-12 px-6">
      {/* Blurred fake content behind */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="blur-lg opacity-30 p-6 space-y-4">
          <div className="h-8 w-48 bg-emerald-500/20 rounded-lg" />
          <div className="h-32 w-full bg-blue-500/10 rounded-lg" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-20 bg-emerald-500/10 rounded-lg" />
            <div className="h-20 bg-blue-500/10 rounded-lg" />
            <div className="h-20 bg-purple-500/10 rounded-lg" />
          </div>
          <div className="h-24 w-full bg-yellow-500/10 rounded-lg" />
          <div className="h-16 w-full bg-red-500/10 rounded-lg" />
        </div>
      </div>

      {/* Lock overlay */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-600/20 border border-yellow-500/30">
          <Lock className="h-8 w-8 text-yellow-400" />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          Analyse Avancee VIP
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Cette fonctionnalite est reservee aux membres VIP. Debloquez l'acces pour voir les donnees completes.
        </p>

        {/* Features list */}
        <div className="w-full space-y-2 mb-6">
          {[
            { icon: BarChart3, text: "Graphiques de tendance en temps reel" },
            { icon: TrendingUp, text: "Analyse financiere complete (CPA, marge, ROI)" },
            { icon: Eye, text: "Pubs TikTok concurrentes + Saturation marche" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg border border-[#1e1e2e] bg-[#12121a] p-2.5">
              <item.icon className="h-4 w-4 text-yellow-400 shrink-0" />
              <span className="text-xs text-gray-300">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Payment Module */}
        <div className="w-full">
          <StripePaymentModule onPayment={onPayment} />
        </div>
      </div>
    </div>
  );
}