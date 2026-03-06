// VAT & Money utilities
import { BRAND } from '@/config/brand';

export function calcVat(amount: number): number {
  return Math.round(amount * BRAND.vatRate * 100) / 100;
}

export function calcTotal(amount: number): number {
  return Math.round(amount * (1 + BRAND.vatRate) * 100) / 100;
}

export function formatSar(amount: number): string {
  return `${amount.toLocaleString('ar-SA')} ${BRAND.currencyAr}`;
}

export function formatSarEn(amount: number): string {
  return `SAR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function applyDiscount(amount: number, discount: number): number {
  return Math.round(amount * (1 - discount) * 100) / 100;
}

export function generateInvoiceNumber(): string {
  const now = new Date();
  const prefix = 'IM';
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `${prefix}${year}${month}-${rand}`;
}
