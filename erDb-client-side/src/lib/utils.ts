import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line
// @ts-ignore
export function debounce(func, wait?: number, immediate?: boolean) {
  // eslint-disable-next-line
  // @ts-ignore
  let timeout;

  // eslint-disable-next-line
  // @ts-ignore
  return (...args) => {
    // eslint-disable-next-line
    // @ts-ignore
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}