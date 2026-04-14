function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="animate-spin rounded-full border-4 border-slate-200 border-t-brand-600 p-6" />
      <span className="ml-4 text-sm font-medium text-slate-600">{text}</span>
    </div>
  );
}

export default Loader;
