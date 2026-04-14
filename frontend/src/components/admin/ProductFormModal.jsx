import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadProductImage } from '../../features/product/productSlice';

const emptyProduct = {
  name: '',
  slug: '',
  brand: '',
  category: '',
  description: '',
  image: '',
  price: '',
  countInStock: '',
  featured: false
};

function ProductFormModal({ open, onClose, onSubmit, product }) {
  const [formData, setFormData] = useState(emptyProduct);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(
      product
        ? {
            ...product,
            price: product.price ?? '',
            countInStock: product.countInStock ?? ''
          }
        : emptyProduct
    );
  }, [product]);

  if (!open) return null;

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const uploadHandler = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const result = await dispatch(uploadProductImage(file));
    if (uploadProductImage.fulfilled.match(result)) {
      setFormData((prev) => ({ ...prev, image: result.payload }));
    }
    setUploading(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      countInStock: Number(formData.countInStock),
      images: formData.image ? [formData.image] : []
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">
            {product ? 'Edit product' : 'Create product'}
          </h3>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={submitHandler}>
          <input className="input" name="name" placeholder="Name" value={formData.name} onChange={changeHandler} required />
          <input className="input" name="slug" placeholder="Slug" value={formData.slug} onChange={changeHandler} required />
          <input className="input" name="brand" placeholder="Brand" value={formData.brand} onChange={changeHandler} required />
          <input className="input" name="category" placeholder="Category" value={formData.category} onChange={changeHandler} required />
          <input className="input" name="price" placeholder="Price" type="number" value={formData.price} onChange={changeHandler} required />
          <input className="input" name="countInStock" placeholder="Stock" type="number" value={formData.countInStock} onChange={changeHandler} required />
          <div className="md:col-span-2">
            <textarea
              className="input min-h-32"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="md:col-span-2">
            <input className="input" name="image" placeholder="Image URL" value={formData.image} onChange={changeHandler} required />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 p-4">
            <input type="file" accept="image/*" onChange={uploadHandler} />
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={changeHandler} />
              Mark as featured
            </label>
            {uploading && <p className="text-sm text-slate-500">Uploading image...</p>}
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-primary w-full">
              {product ? 'Save changes' : 'Create product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
