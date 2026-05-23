import { X, Crown, Lock, BarChart3, Eye, TrendingUp, Zap } from "lucide-react";
import { StripePaymentModule } from "./LoginModal";

interface WelcomeVipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayment: () => void;
}

export function WelcomeVipModal({ isOpen, onClose, onPayment }: WelcomeVipModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-2xl border border-[#1e1e2e] bg-[#0f0f17] p-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e1e2e] text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 shadow-lg shadow-yellow-500/20">
              <Crown className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Bienvenue ! Passez au VIP
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Debloquez l'Analyse Avancee pour trouver vos winners
            </p>
          </div>

          {/* Comparison Table */}
          <div className="rounded-xl border border-[#1e1e2e] overflow-hidden mb-5">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-[#12121a]">
              <div className="p-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Fonctionnalite
              </div>
              <div className="p-3 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-500 border-l border-[#1e1e2e]">
                Gratuit
              </div>
              <div className="p-3 text-center text-[10px] font-semibold uppercase tracking-wider text-yellow-400 border-l border-[#1e1e2e] bg-yellow-500/5">
                VIP
              </div>
            </div>

            {/* Rows */}
            {[
              { feature: "Classement Top 20", free: true, vip: true, icon: TrendingUp },
              { feature: "Filtres par categorie", free: true, vip: true, icon: Eye },
              { feature: "Analyse Avancee", free: false, vip: true, icon: BarChart3 },
              { feature: "Tendances & Pubs TikTok", free: false, vip: true, icon: Zap },
              { feature: "Saturation & Ciblage", free: false, vip: true, icon: Lock },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-t border-[#1e1e2e]">
                <div className="flex items-center gap-2 p-3">
                  <row.icon className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                  <span className="text-xs text-gray-300">{row.feature}</span>
                </div>
                <div className="flex items-center justify-center p-3 border-l border-[#1e1e2e]">
                  {row.free ? (
                    <span className="text-emerald-400 text-sm">✓</span>
                  ) : (
                    <span className="text-red-400 text-sm">✗</span>
                  )}
                </div>
                <div className="flex items-center justify-center p-3 border-l border-[#1e1e2e] bg-yellow-500/5">
                  <span className="text-emerald-400 text-sm">✓</span>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight Box */}
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 mb-5">
            <div className="flex items-start gap-2">
              <BarChart3 className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-yellow-300">Avantage principal VIP</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Acces exclusif a l'outil d'Analyse Avancee : tendances en temps reel, pubs TikTok concurrentes, taux de saturation et ciblage audience.
                </p>
              </div>
            </div>
          </div>

          {/* Payment CTA */}
          <StripePaymentModule onPayment={onPayment} />

          {/* Later Button */}
          <button
            onClick={onClose}
            className="mt-4 flex w-full items-center justify-center text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Plus tard
          </button>
        </div>
      </div>
    </>
  );
}