function Message({ variant = 'info', children }) {
  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-100',
    error: 'bg-red-50 text-red-800 border-red-100',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-100'
  };

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${styles[variant]}`}>{children}</div>;
}

export default Message;
