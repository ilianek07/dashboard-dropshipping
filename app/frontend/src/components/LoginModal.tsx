import { X, Mail, Lock, User, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { signIn, signUp, signOut, getCurrentUser, upgradeToPremium, User as AuthUser } from "@/lib/auth";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  CONFIGURATION STRIPE                                                       ║
// ║  Proprietaire du compte Stripe : iliane.kaci@outlook.com                    ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const STRIPE_PUBLIC_KEY = "pk_live_51Ta0j5Rpb9AGj1OqC1fPJejOviDMm6A68pcrH7vlELSmgsFqiu1idFZ5js0bSibQEoeujEitbsAuTY1vA0eoXNgH00wCSAn27Z";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthChange?: (user: AuthUser | null) => void;
}

export function LoginModal({ isOpen, onClose, onAuthChange }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        setCurrentUser(result.user);
        onAuthChange?.(result.user);
        setEmail("");
        setPassword("");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut();
    setCurrentUser(null);
    onAuthChange?.(null);
    onClose();
  };

  const handleStripePayment = () => {
    // In production, this would redirect to Stripe Checkout
    // For now, simulate premium upgrade
    upgradeToPremium();
    const updatedUser = getCurrentUser();
    setCurrentUser(updatedUser);
    onAuthChange?.(updatedUser);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-sm rounded-2xl border border-[#1e1e2e] bg-[#0f0f17] p-6 shadow-2xl animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e1e2e] text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {currentUser ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500">
                <User className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                {currentUser.isPremium ? "Membre VIP" : "Connecte !"}
              </h2>
              <p className="text-sm text-gray-400 mb-4">{currentUser.email}</p>

              {currentUser.isPremium ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 mb-4">
                  <p className="text-xs font-medium text-emerald-400 mb-1">Statut Premium Actif</p>
                  <p className="text-[10px] text-gray-400">
                    Acces illimite a l'Analyse Avancee et aux outils VIP
                  </p>
                </div>
              ) : (
                <StripePaymentModule onPayment={handleStripePayment} />
              )}

              <button
                onClick={handleLogout}
                className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Se deconnecter
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {isSignUp ? "Creer un compte" : "Se connecter"}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Accedez a l'Analyse Avancee et aux fonctionnalites VIP
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="h-11 w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe (min. 6 caracteres)"
                    required
                    minLength={6}
                    className="h-11 w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400 text-center bg-red-500/5 border border-red-500/10 rounded-lg p-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-sm font-semibold text-white hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {loading ? "Chargement..." : isSignUp ? "Creer mon compte" : "Se connecter"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  {isSignUp ? "Deja un compte ?" : "Pas encore de compte ?"}{" "}
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    {isSignUp ? "Se connecter" : "Creer un compte"}
                  </button>
                </p>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1e1e2e]" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-[#0f0f17] px-2 text-gray-500">ou</span>
                  </div>
                </div>

                <StripePaymentModule onPayment={handleStripePayment} />
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function StripePaymentModule({ onPayment }: { onPayment: () => void }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: create Stripe PaymentIntent and confirm payment
    // stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } })
    onPayment();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4);
    return v;
  };

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-white">Analyse VIP - 5&#8364;/mois</p>
        <span className="rounded-full bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 text-[9px] font-bold text-yellow-400">VIP</span>
      </div>

      {/* Apple Pay / Google Pay Button */}
      <button
        onClick={onPayment}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black border border-[#333] text-sm font-semibold text-white hover:bg-[#111] transition-colors mb-3"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        Pay
      </button>

      {/* Card Payment Toggle */}
      {!showCardForm ? (
        <button
          onClick={() => setShowCardForm(true)}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] text-xs font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          <CreditCard className="h-3.5 w-3.5" />
          Payer par carte bancaire
        </button>
      ) : (
        <form onSubmit={handleCardSubmit} className="space-y-2.5">
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              className="h-9 w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] pl-9 pr-3 text-xs text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="h-9 w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 text-xs text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none transition-colors"
            />
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
              placeholder="CVC"
              maxLength={4}
              className="h-9 w-24 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-3 text-xs text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-semibold text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Payer 5&#8364;/mois
          </button>
          <div className="flex items-center justify-center gap-1 pt-1">
            <svg className="h-3 w-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="text-[9px] text-gray-500">Paiement securise par Stripe</span>
          </div>
        </form>
      )}
    </div>
  );
}

export { StripePaymentModule };