import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";

type Transaction = {
  id: number;
  transaction_no: string;
  total_amount: number;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

const MasterTransaction: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions");
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <header className='bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Transactions
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
              <h2 className='text-lg font-medium leading-6 text-gray-900'>
                Transaction List
              </h2>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Transaction No</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Total Amount</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Active</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Created User</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Created Date</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Updated User</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Updated Date</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className='px-6 py-4 text-sm font-medium text-gray-900'>{transaction.transaction_no}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{transaction.total_amount}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{transaction.active ? 'Yes' : 'No'}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{transaction.created_user}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{transaction.created_date}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{transaction.updated_user}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{transaction.updated_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MasterTransaction;
