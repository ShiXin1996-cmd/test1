import React from 'react';
import { Customer } from '../types/customer';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatPhoneNumber } from '../utils/formatters';

interface CustomerTableRowProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export const CustomerTableRow: React.FC<CustomerTableRowProps> = ({ customer, onEdit, onDelete }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
    <td className="px-6 py-4 whitespace-nowrap">{formatPhoneNumber(customer.phone)}</td>
    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(customer.paidAmount)}</td>
    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(customer.unpaidAmount)}</td>
    <td className="px-6 py-4 whitespace-nowrap">{customer.discount}%</td>
    <td className="px-6 py-4 whitespace-nowrap">{customer.visitCount}</td>
    <td className="px-6 py-4 whitespace-nowrap">{customer.notes}</td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        onClick={() => onEdit(customer)}
        className="text-indigo-600 hover:text-indigo-900 mr-4"
      >
        <PencilIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => onDelete(customer.id)}
        className="text-red-600 hover:text-red-900"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </td>
  </tr>
);