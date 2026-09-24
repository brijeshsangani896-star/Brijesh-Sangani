import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
}) => {
  const [submitted, setSubmitted] = React.useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleCheckout = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClearCart();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs select-none font-ui">
      <div className="w-full max-w-md h-full bg-[var(--surface-card)] border-l border-[var(--border-subtle)] flex flex-col shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="h-14 border-b border-[var(--border-subtle)] px-5 flex items-center justify-between bg-[var(--surface-elevated)]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[var(--color-cyan)]" />
            <span className="font-headline text-sm font-bold tracking-wider uppercase text-[var(--text-main)]">
              Shopping Cart
            </span>
            <span className="font-accent text-[11px] text-[var(--color-gray)] bg-[var(--surface-card)] px-2 py-0.5 rounded border border-[var(--border-subtle)] uppercase tracking-wider">
              {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[var(--surface-card-hover)] text-[var(--color-gray)] hover:text-[var(--text-main)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3 text-xs">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[var(--color-gray)] p-6">
              <ShoppingBag className="w-10 h-10 text-[var(--color-gray)] mb-3 opacity-40" />
              <p className="font-headline text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">Your cart is empty</p>
              <p className="font-ui text-xs mt-1 text-[var(--color-gray)] max-w-xs leading-relaxed">
                Choose package size and dilution options from the specimen card on the left to add raw materials.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.materialId}-${idx}`}
                className="p-3.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="font-headline text-xs font-bold text-[var(--text-main)] tracking-wide uppercase">
                    {item.materialName}
                  </div>
                  <div className="text-xs text-[var(--color-cyan)] font-medium">
                    {item.size} · {item.dilution}
                  </div>
                  <div className="font-ui text-xs text-[var(--color-gray)] truncate">
                    Origin: {item.origin}
                  </div>
                  <div className="font-headline text-xs text-[var(--color-gray)] tabular-nums">
                    Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(idx)}
                    className="text-[var(--color-gray)] hover:text-[var(--color-magenta)] p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="font-headline font-bold text-[var(--text-main)] text-sm tabular-nums">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[var(--border-subtle)] bg-[var(--surface-elevated)] space-y-3.5 text-xs">
            <div className="flex justify-between items-baseline">
              <span className="font-ui text-xs text-[var(--color-gray)] font-medium">Estimated Total</span>
              <span className="font-headline text-xl font-bold text-[var(--text-main)] tabular-nums">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="font-accent text-[11px] text-[var(--color-gray)] uppercase tracking-wider leading-tight">
              Includes analytical Certificate of Analysis (CoA) & GC-MS trace reports.
            </div>

            {submitted ? (
              <div className="w-full py-2.5 px-4 bg-[var(--color-cyan)]/15 text-[var(--color-cyan)] border border-[var(--color-cyan)]/30 rounded flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Order Submitted Successfully</span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="py-2.5 px-3 border border-[var(--border-subtle)] hover:bg-[var(--surface-card-hover)] text-[var(--color-gray)] rounded text-xs font-medium transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="flex-1 py-2.5 px-4 bg-[var(--color-cyan)] text-[#091335] font-bold tracking-wider uppercase rounded hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
