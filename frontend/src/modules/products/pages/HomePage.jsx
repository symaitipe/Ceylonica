import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../../../core/components/common/Loader";
import { getAllProducts } from "../services/product.service";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-body">
        {error}
      </div>
    );

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="relative bg-[#1A1209] text-[#FAF6EE] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6B4423 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center gap-6">
          <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] border border-[#C9A84C]/40 px-4 py-1.5 rounded-full">
            Est. Sri Lanka
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
            The Finest of <span className="text-[#C9A84C]">Ceylon</span>
          </h1>
          <p className="text-[#FAF6EE]/70 text-lg max-w-xl leading-relaxed">
            Handpicked treasures from the heart of Sri Lanka — spices, crafts,
            and artisan goods delivered to your door.
          </p>
          <a
            href="#products"
            className="mt-4 bg-[#C9A84C] text-[#1A1209] font-semibold px-8 py-3.5 rounded-full hover:bg-[#e0bc5a] transition-colors duration-200"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="h-1 bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C] to-[#C9A84C]/0" />

      {/* Products Section */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center gap-3 mb-14">
          <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em]">
            Our Collection
          </span>
          <h2 className="font-display text-4xl font-bold text-[#1A1209]">
            Featured Products
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A84C] mt-1" />
        </div>

        {products.length === 0 ? (
          <p className="text-center text-[#6B4423]/60 py-20">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
