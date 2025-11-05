import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSize(bytes: number, fractionDigits = 2): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B"
  }

  const units = [
    { suffix: "GB", size: 1024 ** 3 },
    { suffix: "MB", size: 1024 ** 2 },
    { suffix: "KB", size: 1024 },
  ] as const

  for (const { suffix, size } of units) {
    if (bytes >= size) {
      const value = bytes / size
      const formatted = value.toFixed(value >= 10 ? 0 : fractionDigits)
      return `${formatted} ${suffix}`
    }
  }

  return `${Math.round(bytes)} B`
}
