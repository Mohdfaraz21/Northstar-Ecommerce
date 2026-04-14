import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../features/auth/authSlice';
import Message from '../components/Message';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);
  const redirect = location.state?.from || '/profile';

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      navigate(redirect);
    }
  };

  return (
    <div className="container-page flex justify-center">
      <div className="card w-full max-w-lg space-y-5 p-8">
        <div className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Welcome back</p>
          <h1 className="text-3xl font-black text-slate-900">Login to your account</h1>
        </div>
        {error ? <Message variant="error">{error}</Message> : null}
        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            className="input"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(event) => {
              dispatch(clearAuthError());
              setFormData((prev) => ({ ...prev, email: event.target.value }));
            }}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(event) => {
              dispatch(clearAuthError());
              setFormData((prev) => ({ ...prev, password: event.target.value }));
            }}
            required
          />
          <button type="submit" className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">
          New here?{' '}
          <Link to="/register" className="font-semibold text-brand-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
