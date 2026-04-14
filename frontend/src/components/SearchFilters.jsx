function SearchFilters({ filters, categories, onChange, onReset }) {
  return (
    <div className="card grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
      <input
        className="input xl:col-span-2"
        placeholder="Search products"
        name="keyword"
        value={filters.keyword}
        onChange={onChange}
      />
      <select className="input" name="category" value={filters.category} onChange={onChange}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select className="input" name="sort" value={filters.sort} onChange={onChange}>
        <option value="latest">Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
      <button type="button" className="btn-secondary" onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}

export default SearchFilters;
