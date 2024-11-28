export interface Customer {
  id: string;
  name: string;
  phone: string;
  paidAmount: number;
  unpaidAmount: number;
  discount: number;
  visitCount: number;
  notes: string;
}