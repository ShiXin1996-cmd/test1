import React from 'react';
import { Customer } from '../types/customer';
import { CustomerTableHeader } from './CustomerTableHeader';
import { CustomerTableRow } from './CustomerTableRow';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <CustomerTableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <CustomerTableRow
              key={customer.id}
              customer={customer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};