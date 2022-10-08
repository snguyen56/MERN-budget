export const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const percentFormatter = Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  signDisplay: "exceptZero",
});

export function progressBarColor(current, max) {
  const percent = current / max;
  if (percent <= 0.4) return "success";
  if (percent <= 0.6) return "warning";
  if (percent <= 0.8) return "caution";
  return "danger";
}
