import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/auth/authSlice';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from '../features/product/productSlice';
import { fetchAllOrders, updateOrderStatus } from '../features/order/orderSlice';
import ProductFormModal from '../components/admin/ProductFormModal';
import Message from '../components/Message';
import { currency, shortDate } from '../utils/format';

function AdminDashboardPage() {
  const dispatch = useDispatch();
  const { products, error: productError } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.auth);
  const { allOrders } = useSelector((state) => state.orders);
  const [activeTab, setActiveTab] = useState('products');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 50 }));
    dispatch(fetchUsers());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const productSubmitHandler = async (payload) => {
    if (editingProduct) {
      await dispatch(updateProduct({ id: editingProduct._id, payload }));
    } else {
      await dispatch(createProduct(payload));
    }

    setModalOpen(false);
    setEditingProduct(null);
    dispatch(fetchProducts({ page: 1, limit: 50 }));
  };

  return (
    <div className="container-page page-section space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Admin</p>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Store management dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {['products', 'users', 'orders'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {productError ? <Message variant="error">{productError}</Message> : null}

      {activeTab === 'products' ? (
        <section className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Products</h2>
            <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
              Add product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3">Name</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Stock</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-slate-100">
                    <td className="py-3 font-medium text-slate-900">{product.name}</td>
                    <td className="py-3">{product.category}</td>
                    <td className="py-3">{currency(product.price)}</td>
                    <td className="py-3">{product.countInStock}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            setEditingProduct(product);
                            setModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={async () => {
                            await dispatch(deleteProduct(product._id));
                            dispatch(fetchProducts({ page: 1, limit: 50 }));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'users' ? (
        <section className="card p-6">
          <h2 className="mb-5 text-2xl font-black text-slate-900">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3">Name</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-slate-100">
                    <td className="py-3 font-medium text-slate-900">{user.name}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3 capitalize">{user.role}</td>
                    <td className="py-3">{shortDate(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'orders' ? (
        <section className="card p-6">
          <h2 className="mb-5 text-2xl font-black text-slate-900">Orders</h2>
          <div className="space-y-4">
            {allOrders.map((order) => (
              <div key={order._id} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">Order #{order._id.slice(-8)}</h3>
                    <p className="text-sm text-slate-500">
                      {order.user?.name} | {order.user?.email} | {shortDate(order.createdAt)}
                    </p>
                    <p className="text-sm text-slate-500">Total: {currency(order.totalPrice)}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Processing', 'Paid', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={order.status === status ? 'btn-primary' : 'btn-secondary'}
                        onClick={async () => {
                          await dispatch(
                            updateOrderStatus({
                              id: order._id,
                              payload: {
                                status,
                                isPaid: status === 'Paid' || status === 'Shipped' || status === 'Delivered',
                                isDelivered: status === 'Delivered'
                              }
                            })
                          );
                          dispatch(fetchAllOrders());
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ProductFormModal
        open={modalOpen}
        product={editingProduct}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={productSubmitHandler}
      />
    </div>
  );
}

export default AdminDashboardPage;
