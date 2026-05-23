import { Product } from "@/data/products";
import { X, ExternalLink, TrendingUp, Play, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnalysisPaywall } from "./AnalysisPaywall";

interface ProductAnalysisPanelProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isPremium?: boolean;
  onPayment?: () => void;
}

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 280;
  const height = 80;
  const padding = 4;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg width={width} height={height} className="w-full h-20">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#chartGradient)" />
      <polyline
        points={points}
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaturationGauge({ value, label }: { value: number; label: string }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = (val: number) => {
    if (val <= 25) return "#10b981";
    if (val <= 45) return "#22d3ee";
    if (val <= 65) return "#f59e0b";
    if (val <= 80) return "#f97316";
    return "#ef4444";
  };

  const getGradientColors = () => {
    return "from-emerald-500 via-yellow-500 to-red-500";
  };

  const color = getColor(animatedValue);
  const rotation = (animatedValue / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center">
      {/* Semi-circle gauge */}
      <div className="relative w-48 h-24 overflow-hidden">
        {/* Background arc */}
        <div className={`absolute inset-0 rounded-t-full bg-gradient-to-r ${getGradientColors()} opacity-20`} />
        <div className="absolute inset-[6px] rounded-t-full bg-[#12121a]" />
        
        {/* Gauge track */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="#1e1e2e"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(animatedValue / 100) * 251.2} 251.2`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Needle */}
        <div
          className="absolute bottom-0 left-1/2 origin-bottom transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <div className="w-0.5 h-16 bg-white rounded-full shadow-lg" />
        </div>

        {/* Center dot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" />
      </div>

      {/* Value */}
      <div className="mt-3 text-center">
        <span className="text-2xl font-bold" style={{ color }}>{animatedValue}%</span>
        <p className="text-xs text-gray-400 mt-1 max-w-[200px]">{label}</p>
      </div>
    </div>
  );
}

interface FakeAd {
  thumbnail: string;
  views: string;
  platform: string;
  duration: string;
}

function getAdsForProduct(product: Product): FakeAd[] {
  // Real product-related thumbnails from Unsplash (physical products, not social media logos)
  const adSets: FakeAd[][] = [
    [
      { thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", views: "2.4M vues", platform: "TikTok", duration: "0:15" },
      { thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", views: "890K vues", platform: "Facebook", duration: "0:30" },
      { thumbnail: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80", views: "1.1M vues", platform: "TikTok", duration: "0:22" },
    ],
    [
      { thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80", views: "1.8M vues", platform: "TikTok", duration: "0:18" },
      { thumbnail: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80", views: "650K vues", platform: "Instagram", duration: "0:25" },
      { thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", views: "3.2M vues", platform: "TikTok", duration: "0:12" },
    ],
    [
      { thumbnail: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80", views: "1.5M vues", platform: "Facebook", duration: "0:45" },
      { thumbnail: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&q=80", views: "2.1M vues", platform: "TikTok", duration: "0:20" },
      { thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", views: "780K vues", platform: "Instagram", duration: "0:30" },
    ],
  ];
  return adSets[product.id % 3];
}

export function ProductAnalysisPanel({ product, isOpen, onClose, isPremium = false, onPayment }: ProductAnalysisPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const profitPerSale = product.sellPrice - product.buyPrice - product.cpa;
  const ads = getAdsForProduct(product);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0f0f17] border-l border-[#1e1e2e] shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1e1e2e] bg-[#0f0f17]/95 backdrop-blur-sm px-6 py-4">
          <h2 className="text-lg font-bold text-white">Analyse Produit</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e1e2e] text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* VIP Paywall for non-premium users */}
          {!isPremium && onPayment && (
            <AnalysisPaywall onPayment={onPayment} />
          )}

          {/* Product content - only visible for premium users */}
          {!isPremium && onPayment ? null : (
          <>
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-xl border border-[#1e1e2e] bg-[#12121a]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">+{product.trend}%</span>
            </div>
          </div>

          {/* Product Name & Niche */}
          <div>
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
            <span className="inline-block mt-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
              {product.niche}
            </span>
          </div>

          {/* Trend Chart */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-300">Tendance (30 jours)</h4>
              <span className="text-xs text-emerald-400 font-medium">En hausse</span>
            </div>
            <MiniChart data={product.trendData} />
            <p className="text-[10px] text-gray-500 mt-2">Evolution de la demande estimee</p>
          </div>

          {/* Market Saturation Gauge */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Score de Saturation du Marche</h4>
            <SaturationGauge value={product.saturation} label={product.saturationLabel} />
            <div className="flex items-center justify-between mt-4 px-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-gray-500">Ocean Bleu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-[10px] text-gray-500">Modere</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] text-gray-500">Sature</span>
              </div>
            </div>
          </div>

          {/* Financial Analysis */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Analyse Financiere</h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-2 border-b border-[#1e1e2e]">
                <span className="text-xs text-gray-400">Cout produit</span>
                <span className="text-sm font-semibold text-white">{product.buyPrice.toFixed(2)}&#8364;</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#1e1e2e]">
                <span className="text-xs text-gray-400">Prix de vente</span>
                <span className="text-sm font-semibold text-emerald-400">{product.sellPrice.toFixed(2)}&#8364;</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#1e1e2e]">
                <span className="text-xs text-gray-400">CPA estime (pub)</span>
                <span className="text-sm font-semibold text-orange-400">{product.cpa.toFixed(2)}&#8364;</span>
              </div>
              <div className="flex items-center justify-between py-2 bg-emerald-500/5 rounded-lg px-3 -mx-1">
                <span className="text-xs font-medium text-emerald-300">Profit net / vente</span>
                <span className="text-base font-bold text-emerald-400">{profitPerSale.toFixed(2)}&#8364;</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-gray-400">Marge beneficiaire</span>
                <span className="text-sm font-bold text-emerald-400">{product.margin}%</span>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Ciblage Conseille</h4>
            <div className="flex flex-wrap gap-2">
              {product.targetAudience.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 text-xs font-medium text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Spy Tool - Ad Examples */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Exemples de Publicites</h4>
            <p className="text-[10px] text-gray-500 mb-3">Publicites detectees pour ce type de produit</p>
            <div className="space-y-3">
              {ads.map((ad, index) => (
                <div
                  key={index}
                  className="group/ad flex items-center gap-3 rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] p-2.5 hover:border-blue-500/30 transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={ad.thumbnail}
                      alt={`Ad ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/ad:bg-black/20 transition-colors">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                        <Play className="h-3 w-3 text-black ml-0.5" fill="black" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-[9px] text-white">
                      {ad.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-medium text-blue-400">
                        {ad.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Eye className="h-3 w-3" />
                      <span className="text-xs font-medium">{ad.views}</span>
                    </div>
                  </div>

                  {/* CTA - Opens TikTok/YouTube search with product name */}
                  <a
                    href={
                      ad.platform === "TikTok"
                        ? `https://www.tiktok.com/search?q=${encodeURIComponent(product.name + " dropshipping")}`
                        : ad.platform === "Instagram"
                          ? `https://www.youtube.com/results?search_query=${encodeURIComponent(product.name + " ad dropshipping")}`
                          : `https://www.youtube.com/results?search_query=${encodeURIComponent(product.name + " ad dropshipping")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg bg-blue-500/10 border border-blue-500/20 px-2.5 py-1.5 text-[10px] font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    Voir la pub
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <a
              href={`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Rechercher sur AliExpress
            </a>
            <a
              href={`https://www.tiktok.com/search?q=${encodeURIComponent(product.name + " dropshipping")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#12121a] border border-[#1e1e2e] px-4 py-3 text-sm font-semibold text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Voir les pubs TikTok
            </a>
          </div>
          </>
          )}
        </div>
      </div>
    </>
  );
}