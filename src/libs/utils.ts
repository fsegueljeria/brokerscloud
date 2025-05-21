import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | undefined, currency: string | undefined) {
  if (amount === undefined || currency === undefined) return "-"

  if (currency === "UF") {
    return `${amount.toLocaleString("es-CL")} UF`
  }

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "CLP" ? 0 : 2,
  }).format(amount)
}
