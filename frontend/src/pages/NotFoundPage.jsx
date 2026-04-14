import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[50vh] items-center justify-center">
      <div className="card max-w-xl space-y-4 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-600">404</p>
        <h1 className="text-4xl font-black text-slate-900">Page not found</h1>
        <p className="text-slate-500">The page you’re looking for does not exist or may have moved.</p>
        <Link to="/" className="btn-primary">
          Go home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
