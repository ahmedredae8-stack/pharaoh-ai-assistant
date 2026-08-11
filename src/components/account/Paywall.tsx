import { useState } from "react";
import { toast } from "sonner";

import { verifyPlayPurchase, restorePurchases } from "@/lib/billing.functions";
import { BillingUnavailableError, launchNativePurchase } from "@/lib/native-billing";
import { PATH_LABELS, PRODUCTS, type PathId } from "@/lib/products";

import { useAccount } from "./AccountProvider";

type Props = {
  pathId: PathId | null;
  onClose: () => void;
  onRequireAuth: () => void;
};

export function Paywall({ pathId, onClose, onRequireAuth }: Props) {
  const { session, refresh } = useAccount();
  const [busy, setBusy] = useState<string | null>(null);

  if (!pathId) return null;

  async function buy(productId: string, kind: "subscription" | "one_time") {
    if (!session) {
      onRequireAuth();
      return;
    }
    setBusy(productId);
    try {
      const result = await launchNativePurchase(productId, kind);
      await verifyPlayPurchase({
        data: { productId: result.productId || productId, purchaseToken: result.purchaseToken, kind },
      });
      await refresh();
      toast.success("تم تفعيل اشتراكك بنجاح");
      onClose();
    } catch (error) {
      if (error instanceof BillingUnavailableError) {
        toast.info("الشراء متاح داخل تطبيق أندرويد من متجر Google Play");
      } else {
        console.error(error);
        toast.error("تعذّر إتمام العملية، حاول مرة أخرى");
      }
    } finally {
      setBusy(null);
    }
  }

  async function restore() {
    if (!session) {
      onRequireAuth();
      return;
    }
    setBusy("restore");
    try {
      const { restored } = await restorePurchases();
      await refresh();
      toast.success(restored ? `تم استرجاع ${restored} عملية شراء` : "لا توجد مشتريات لاسترجاعها");
    } catch {
      toast.error("تعذّر الاسترجاع الآن");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
    >
      <div className="w-full max-w-md rounded-2xl border border-cyber-gold/30 bg-cyber-dark p-6 shadow-[0_0_40px_rgba(255,215,0,0.15)]">
        <h2 className="text-xl font-bold text-cyber-gold">افتح {PATH_LABELS[pathId]}</h2>
        <p className="mt-2 text-sm text-slate-300">
          اشترك للوصول لكل المسارات والمعامل بلا حدود، بدون إعلانات، مع شهادة إتمام.
        </p>

        <div className="mt-5 space-y-3">
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              disabled={busy !== null}
              onClick={() => void buy(product.id, product.kind)}
              className={`w-full rounded-xl border p-4 text-right transition disabled:opacity-50 ${
                product.highlight
                  ? "border-cyber-gold bg-cyber-gold/10"
                  : "border-cyber-gold/20 hover:border-cyber-gold/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyber-gold">{product.title}</span>
                <span className="text-sm text-cyber-blue">{product.price}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{product.subtitle}</p>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <button onClick={() => void restore()} className="text-cyber-blue underline">
            استرجاع المشتريات
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            لاحقًا
          </button>
        </div>
      </div>
    </div>
  );
}