export const fetchProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const fetchFeaturedProducts = async () => {
  const products = await fetchProducts();
  return products.filter((p) => p.featured);
};

export const fetchRelatedProducts = async (currentId, limit = 4) => {
  const products = await fetchProducts();
  return products.filter((p) => p.id !== currentId).slice(0, limit);
};
