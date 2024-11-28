import { useState, useEffect } from 'react';
import { CustomerList } from './components/CustomerList';
import { CustomerModal } from './components/CustomerModal';
import { Forum } from './components/forum/Forum';
import { Customer } from './types/customer';
import { loadCustomers, saveCustomers } from './utils/storage';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [activeTab, setActiveTab] = useState<'customers' | 'forum'>('customers');

  useEffect(() => {
    const savedCustomers = loadCustomers();
    setCustomers(savedCustomers);
  }, []);

  useEffect(() => {
    saveCustomers(customers);
  }, [customers]);

  const handleAddCustomer = () => {
    setModalMode('add');
    setEditingCustomer(undefined);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setModalMode('edit');
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('确定要删除这个客户吗？')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const handleSubmit = (customerData: Omit<Customer, 'id'>) => {
    if (modalMode === 'add') {
      const newCustomer = {
        ...customerData,
        id: Date.now().toString(),
      };
      setCustomers([...customers, newCustomer]);
    } else {
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer?.id 
          ? { ...customerData, id: customer.id }
          : customer
      ));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'customers'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  客户管理
                </button>
                <button
                  onClick={() => setActiveTab('forum')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'forum'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  讨论区
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'customers' ? (
            <>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-2xl font-semibold text-gray-900">客户管理系统</h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    onClick={handleAddCustomer}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    新增客户
                  </button>
                </div>
              </div>
              
              <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
                <CustomerList
                  customers={customers}
                  onEdit={handleEditCustomer}
                  onDelete={handleDeleteCustomer}
                />
              </div>

              <CustomerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingCustomer}
                mode={modalMode}
              />
            </>
          ) : (
            <Forum />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;