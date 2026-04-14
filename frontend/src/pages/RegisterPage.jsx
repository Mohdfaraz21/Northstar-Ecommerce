import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, register } from '../features/auth/authSlice';
import Message from '../components/Message';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = async (event) => {
    event.preventDefault();
    setFormError('');

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    const result = await dispatch(
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    );

    if (register.fulfilled.match(result)) {
      navigate('/profile');
    }
  };

  return (
    <div className="container-page flex justify-center">
      <div className="card w-full max-w-xl space-y-5 p-8">
        <div className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Create account</p>
          <h1 className="text-3xl font-black text-slate-900">Start shopping in minutes</h1>
        </div>
        {formError ? <Message variant="error">{formError}</Message> : null}
        {error ? <Message variant="error">{error}</Message> : null}
        <form className="grid gap-4" onSubmit={submitHandler}>
          <input className="input" placeholder="Full name" value={formData.name} onChange={(event) => { dispatch(clearAuthError()); setFormData((prev) => ({ ...prev, name: event.target.value })); }} required />
          <input className="input" type="email" placeholder="Email address" value={formData.email} onChange={(event) => { dispatch(clearAuthError()); setFormData((prev) => ({ ...prev, email: event.target.value })); }} required />
          <input className="input" type="password" placeholder="Password" value={formData.password} onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))} required />
          <input className="input" type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={(event) => setFormData((prev) => ({ ...prev, confirmPassword: event.target.value }))} required />
          <button type="submit" className="btn-primary w-full">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
