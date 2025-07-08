import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/appContext";

const categories = [
  "All",
  "Fruits & Vegetables",
  "Exotic Fruits & Veggies",
  "Exotic Fruits",
  "Exotic Vegetables",
  "Drinks",
  "Instant",
  "Dairy Products",
  "Bakery",
  "Grains & Cereals",
];

const categoryMap = {
  "Fruits & Vegetables": ["Fruits & Vegetables", "Vegetables", "Fruits"],
  "Exotic Fruits & Veggies": ["Exotic Fruits & Veggies"],
  "Exotic Fruits": ["Exotic Fruits"],
  "Exotic Vegetables": ["Exotic Vegetables"],
  "drink": ["drink"],
  "Instant Food": ["Instant Food"],
  "Dairy Products": ["Dairy Products"],
  "Bakery & Breads": ["Bakery & Breads"],
  "Grains & Cereals": ["Grains", "Cereals", "Grains & Cereals"],
};

const brands = [
  "Farmogo",
  "fresho!",
  "Simply Fresh",
  "Supa Corn",
  "SV Agri Carisma",
  "Tadaa",
  "Trikaya",
];

const priceRanges = [
  { label: "Less than Rs 20", min: 0, max: 20 },
  { label: "Rs 21 to Rs 50", min: 21, max: 50 },
  { label: "Rs 51 to Rs 100", min: 51, max: 100 },
  { label: "Rs 101 to Rs 200", min: 101, max: 200 },
  { label: "Rs 201 to Rs 500", min: 201, max: 500 },
  { label: "More than Rs 500", min: 501, max: Infinity },
];

const Products = () => {
  const { products, searchQuery } = useAppContext();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  // Mobile के लिए accordion open states
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null); // "category" | "brands" | "price" | null

  useEffect(() => {
    let filtered = products;

    if (searchQuery.length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      const validCategories = categoryMap[selectedCategory] || [selectedCategory];
      filtered = filtered.filter((product) =>
        product.category &&
        validCategories.some(
          (cat) =>
            product.category.toLowerCase() === cat.toLowerCase() ||
            product.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (product) =>
          product.brand &&
          product.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (selectedPriceRange) {
      filtered = filtered.filter(
        (product) =>
          product.offerPrice >= selectedPriceRange.min &&
          product.offerPrice <= selectedPriceRange.max
      );
    }

    filtered = filtered.filter((product) => product.inStock);

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedPriceRange]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand(null);
    setSelectedPriceRange(null);
  };

  // Accordion toggle handler
  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <>
      {/* Mobile top filter toggle */}
      <div className="md:hidden fixed top-15 left-0 right-0 bg-white shadow z-30 flex items-center justify-between px-4 h-14">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="font-semibold text-lg"
          aria-expanded={isMobileFiltersOpen}
          aria-controls="mobile-filters"
        >
          {isMobileFiltersOpen ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>
        <h1 className="text-lg font-semibold">Products</h1>
        <div className="w-8" />
      </div>

      <div className="flex mt-16 md:mt-0 min-h-screen px-4 md:px-12 gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden md:block w-72 bg-white p-6 rounded-md shadow-md sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
          <ul className="mb-6 space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer ${
                  selectedCategory === cat
                    ? "font-bold text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-4">Brands</h2>
          <ul className="mb-6 space-y-2">
            {brands.map((brand) => (
              <li
                key={brand}
                className={`cursor-pointer ${
                  selectedBrand === brand
                    ? "font-bold text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
                onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
              >
                {brand}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-4">Price</h2>
          <ul className="mb-6 space-y-2">
            {priceRanges.map((range) => (
              <li
                key={range.label}
                className={`cursor-pointer ${
                  selectedPriceRange === range
                    ? "font-bold text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
                onClick={() =>
                  setSelectedPriceRange(selectedPriceRange === range ? null : range)
                }
              >
                {range.label}
              </li>
            ))}
          </ul>

          <button
            onClick={clearFilters}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Clear Filters
          </button>
        </aside>

        {/* Mobile accordion filters */}
      {isMobileFiltersOpen && (
  <div
    id="mobile-filters"
    className="md:hidden bg-white p-4 shadow-md rounded-md mt-4"
  >
    {/* Category Dropdown */}
    <details className="mb-4">
      <summary className="font-semibold cursor-pointer">Shop by Category</summary>
      <ul className="mt-2 space-y-1">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer text-sm ${
              selectedCategory === cat ? "text-blue-600 font-medium" : "text-gray-600"
            }`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </details>

    {/* Brand Dropdown */}
    <details className="mb-4">
      <summary className="font-semibold cursor-pointer">Brands</summary>
      <ul className="mt-2 space-y-1">
        {brands.map((brand) => (
          <li
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`cursor-pointer text-sm ${
              selectedBrand === brand ? "text-blue-600 font-medium" : "text-gray-600"
            }`}
          >
            {brand}
          </li>
        ))}
      </ul>
    </details>

    {/* Price Dropdown */}
    <details className="mb-4">
      <summary className="font-semibold cursor-pointer">Price</summary>
      <ul className="mt-2 space-y-1">
        {priceRanges.map((range) => (
          <li
            key={range.label}
            onClick={() => setSelectedPriceRange(range)}
            className={`cursor-pointer text-sm {
              selectedPriceRange === range
                ? "text-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            {range.label}
          </li>
        ))}
      </ul>
    </details>

    <button
      onClick={clearFilters}
      className="text-red-600 hover:text-red-800 font-semibold mt-2"
    >
      Clear Filters
    </button>
  </div>
)}

        {/* Products Grid */}
        <main className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-medium mb-6">
            Showing {filteredProducts.length} Products
          </h1>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found matching filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Products;
