import { Product } from "@/data/products";
import { LeaderboardRow } from "./LeaderboardRow";

interface LeaderboardProps {
  products: Product[];
  onAnalyse: (product: Product) => void;
}

export function Leaderboard({ products, onAnalyse }: LeaderboardProps) {
  return (
    <div className="flex-1 space-y-2">
      {/* Column Headers */}
      <div className="flex items-center gap-4 px-4 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-medium">
        <div className="w-10 text-center">Rang</div>
        <div className="w-12"></div>
        <div className="flex-1">Produit</div>
        <div className="hidden sm:block w-20 text-center">Tendance</div>
        <div className="hidden md:block w-24 text-center">Achat</div>
        <div className="hidden md:block w-24 text-center">Vente</div>
        <div className="hidden lg:block w-16 text-center">Marge</div>
        <div className="w-24"></div>
      </div>

      {/* Product Rows */}
      <div className="space-y-2">
        {products.map((product) => (
          <LeaderboardRow key={product.id} product={product} onAnalyse={onAnalyse} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="flex items-center justify-center py-16 text-gray-500">
          <p>Aucun produit ne correspond à ce filtre.</p>
        </div>
      )}
    </div>
  );
}