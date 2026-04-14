import { currency } from '../utils/format';

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 md:grid-cols-[120px_1fr_auto_auto] md:items-center">
      <img src={item.image} alt={item.name} className="h-24 w-full rounded-2xl object-cover" />
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
        <p className="text-sm text-slate-500">{currency(item.price)}</p>
      </div>
      <select
        className="input max-w-[110px]"
        value={item.qty}
        onChange={(event) => onQtyChange(item, Number(event.target.value))}
      >
        {Array.from({ length: item.countInStock }, (_, index) => index + 1).map((qty) => (
          <option key={qty} value={qty}>
            Qty: {qty}
          </option>
        ))}
      </select>
      <button type="button" className="btn-secondary" onClick={() => onRemove(item._id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
