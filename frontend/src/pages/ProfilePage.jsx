import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../features/order/orderSlice';
import { fetchProfile, updateProfile } from '../features/auth/authSlice';
import Message from '../components/Message';
import { currency, shortDate } from '../utils/format';

function ProfilePage() {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        name: userInfo.name,
        email: userInfo.email
      }));
    }
  }, [userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(result)) {
      setSuccessMessage('Profile updated successfully');
      setFormData((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="card space-y-5 p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Your profile</p>
          <h1 className="text-3xl font-black text-slate-900">Manage account details</h1>
        </div>
        {error ? <Message variant="error">{error}</Message> : null}
        {successMessage ? <Message variant="success">{successMessage}</Message> : null}
        <form className="space-y-4" onSubmit={submitHandler}>
          <input className="input" placeholder="Name" value={formData.name} onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))} />
          <input className="input" type="email" placeholder="Email" value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} />
          <input className="input" type="password" placeholder="New password (optional)" value={formData.password} onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))} />
          <button type="submit" className="btn-primary w-full">
            {loading ? 'Saving...' : 'Update profile'}
          </button>
        </form>
      </section>

      <section className="card space-y-5 p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Orders</p>
          <h2 className="text-3xl font-black text-slate-900">Order history</h2>
        </div>
        {orders.length === 0 ? (
          <Message>No orders placed yet.</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3">Order ID</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Total</th>
                  <th className="py-3">Paid</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-slate-100">
                    <td className="py-3">{order._id.slice(-8)}</td>
                    <td className="py-3">{shortDate(order.createdAt)}</td>
                    <td className="py-3">{currency(order.totalPrice)}</td>
                    <td className="py-3">{order.isPaid ? 'Yes' : 'No'}</td>
                    <td className="py-3">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
