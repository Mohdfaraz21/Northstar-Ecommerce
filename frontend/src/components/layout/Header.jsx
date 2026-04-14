import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import brandMark from '../../assets/brand-mark.svg';

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);
  const linkBase =
    'rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition duration-300 hover:bg-slate-100 hover:text-brand-700';

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="container-page py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-black tracking-tight text-brand-900"
            onClick={closeMenu}
          >
            <img src={brandMark} alt="Northstar Commerce" className="h-11 w-11 rounded-2xl shadow-sm" />
            <div className="leading-none">
              <span className="block">Northstar</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Commerce
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <div className="glass-panel flex items-center gap-1 rounded-full px-2 py-2 shadow-sm">
              <NavLink to="/products" className={linkBase}>
                Shop
              </NavLink>
              <NavLink to="/cart" className={linkBase}>
                Cart ({cartItems.reduce((sum, item) => sum + item.qty, 0)})
              </NavLink>
              {userInfo ? (
                <>
                  <NavLink to="/profile" className={linkBase}>
                    {userInfo.name}
                  </NavLink>
                  {userInfo.role === 'admin' && (
                    <NavLink to="/admin" className={linkBase}>
                      Admin
                    </NavLink>
                  )}
                  <button type="button" onClick={logoutHandler} className={linkBase}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={linkBase}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className="btn-primary px-4 py-2">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn-secondary px-4 py-2 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {menuOpen ? (
          <nav className="glass-panel mt-4 grid gap-2 rounded-3xl p-3 md:hidden">
            <NavLink to="/products" className={linkBase} onClick={closeMenu}>
              Shop
            </NavLink>
            <NavLink to="/cart" className={linkBase} onClick={closeMenu}>
              Cart ({cartItems.reduce((sum, item) => sum + item.qty, 0)})
            </NavLink>
            {userInfo ? (
              <>
                <NavLink to="/profile" className={linkBase} onClick={closeMenu}>
                  {userInfo.name}
                </NavLink>
                {userInfo.role === 'admin' && (
                  <NavLink to="/admin" className={linkBase} onClick={closeMenu}>
                    Admin
                  </NavLink>
                )}
                <button type="button" onClick={logoutHandler} className={`${linkBase} text-left`}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkBase} onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary" onClick={closeMenu}>
                  Register
                </NavLink>
              </>
            )}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
