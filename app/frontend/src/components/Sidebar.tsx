import { categories, CategoryKey, productsByCategory } from "@/data/products";

interface SidebarProps {
  activeCategory: CategoryKey;
  onCategoryChange: (category: CategoryKey) => void;
}

export function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  const weeklyProduct = productsByCategory["global"][0];

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4">
      {/* Category Filters */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Catégories
        </h3>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "border border-transparent text-gray-400 hover:bg-[#1e1e2e] hover:text-white"
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Product */}
      <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          ⭐ Produit de la semaine
        </h3>
        <div className="overflow-hidden rounded-lg border border-[#1e1e2e]">
          <img
            src={weeklyProduct.image}
            alt={weeklyProduct.name}
            className="h-32 w-full object-cover"
          />
        </div>
        <h4 className="mt-3 text-sm font-semibold text-white">{weeklyProduct.name}</h4>
        <p className="mt-1 text-xs text-gray-400">{weeklyProduct.niche}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            +{weeklyProduct.trend}%
          </span>
          <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
            {weeklyProduct.margin}% marge
          </span>
        </div>
      </div>
    </aside>
  );
}