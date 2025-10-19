import { useState, useReducer } from 'react';
import type { ChangeEvent } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, Wallet, Edit2, Trash2, Download, X, PieChart, BarChart3 } from 'lucide-react';

// Define the category interface
interface Category {
  name: string;
  color: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { name: 'Food & Dining', color: '#ef4444', icon: '🍔' },
  { name: 'Transportation', color: '#3b82f6', icon: '🚗' },
  { name: 'Shopping', color: '#8b5cf6', icon: '🛍️' },
  { name: 'Entertainment', color: '#ec4899', icon: '🎬' },
  { name: 'Bills & Utilities', color: '#f59e0b', icon: '💡' },
  { name: 'Healthcare', color: '#10b981', icon: '⚕️' },
  { name: 'Education', color: '#06b6d4', icon: '📚' },
  { name: 'Other', color: '#6b7280', icon: '📦' }
];

// Define the transaction interface
interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

// Define the form data interface
interface FormData {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  description: string;
  date: string;
}

// Define the action type for the reducer
type TransactionAction =
  | { type: 'ADD'; payload: Omit<Transaction, 'id'> }
  | { type: 'DELETE'; payload: number }
  | { type: 'UPDATE'; payload: Transaction };

const transactionReducer = (state: Transaction[], action: TransactionAction): Transaction[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, { ...action.payload, id: Date.now() }];
    case 'DELETE':
      return state.filter(t => t.id !== action.payload);
    case 'UPDATE':
      return state.map(t => (t.id === action.payload.id ? action.payload : t));
    default:
      return state;
  }
};

const PieChartComponent = ({ data }: { data: { category: string; amount: number; color: string }[] }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  let currentAngle = 0;

  return (
    <div className="flex items-center justify-center gap-8">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {data.map((item, index) => {
          const percentage = (item.amount / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;

          const startX = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
          const startY = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
          const endX = 100 + 80 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
          const endY = 100 + 80 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
          const largeArc = angle > 180 ? 1 : 0;

          return (
            <path
              key={index}
              d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z`}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="100" cy="100" r="40" fill="white" />
        <text x="100" y="105" textAnchor="middle" className="text-lg font-bold" fill="#374151">
          ${total.toFixed(0)}
        </text>
      </svg>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-700">{item.category}: ${item.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarChartComponent = ({ data }: { data: { labels: string[]; income: number[]; expenses: number[] } }) => {
  const maxValue = Math.max(...data.income, ...data.expenses);

  return (
    <div className="h-64 flex items-end justify-around gap-2 p-4">
      {data.labels.map((label, index) => {
        const incomeHeight = (data.income[index] / maxValue) * 100;
        const expenseHeight = (data.expenses[index] / maxValue) * 100;

        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex gap-1 items-end" style={{ height: '200px' }}>
              <div
                className="flex-1 bg-green-500 rounded-t transition-all duration-300 relative group"
                style={{ height: `${incomeHeight}%` }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  ${data.income[index].toFixed(0)}
                </span>
              </div>
              <div
                className="flex-1 bg-red-500 rounded-t transition-all duration-300 relative group"
                style={{ height: `${expenseHeight}%` }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  ${data.expenses[index].toFixed(0)}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-600 font-medium">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default function ExpenseTrackr() {
  const [transactions, dispatch] = useReducer(transactionReducer, [
    { id: 1, type: 'expense', amount: 45.5, category: 'Food & Dining', description: 'Lunch at cafe', date: '2025-10-18' },
    { id: 2, type: 'income', amount: 3000, category: 'Salary', description: 'Monthly salary', date: '2025-10-01' },
    { id: 3, type: 'expense', amount: 120, category: 'Transportation', description: 'Gas refill', date: '2025-10-17' },
    { id: 4, type: 'expense', amount: 85, category: 'Shopping', description: 'Groceries', date: '2025-10-16' },
    { id: 5, type: 'expense', amount: 200, category: 'Bills & Utilities', description: 'Electricity bill', date: '2025-10-15' }
  ] as Transaction[]);

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: 'expense',
    amount: '',
    category: 'Food & Dining',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [budget, setBudget] = useState(2000);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const expensesByCategory = CATEGORIES.map(cat => ({
    category: cat.name,
    amount: transactions.filter(t => t.type === 'expense' && t.category === cat.name).reduce((sum, t) => sum + t.amount, 0),
    color: cat.color
  })).filter(c => c.amount > 0);

  const handleSubmit = () => {
    if (!formData.amount || !formData.description) return;

    const transactionPayload: Omit<Transaction, 'id'> = {
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date
    };

    if (editingTransaction) {
      dispatch({ type: 'UPDATE', payload: { ...transactionPayload, id: editingTransaction.id } as Transaction });
    } else {
      dispatch({ type: 'ADD', payload: transactionPayload });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: 'Food & Dining',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingTransaction(null);
    setShowModal(false);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    // Convert Transaction -> FormData (amount must be a string)
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      category: transaction.category,
      description: transaction.description,
      date: transaction.date
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value } as FormData));
  };

  const filteredTransactions = transactions.filter(t => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    if (filterType !== 'all' && t.type !== filterType) return false;
    return true;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const monthlyData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    income: [3200, 3000, 3500, 3100, 2900, 3000],
    expenses: [1800, 2100, 1900, 2300, 1700, 450.5]
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
    const rows = transactions.map(t => [t.date, t.type, t.category, t.description, t.amount]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
  };

  const budgetPercentage = (totalExpenses / budget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">ExpenseTrackr</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-lg hover:shadow-xl"
            >
              <PlusCircle size={20} />
              Add Transaction
            </button>
          </div>
          <p className="text-gray-600">Track your income and expenses with ease</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Balance</span>
              <Wallet className="text-indigo-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800">${balance.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Income</span>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Expenses</span>
              <TrendingDown className="text-red-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Budget</span>
              <button onClick={() => setShowBudgetModal(true)} className="text-orange-500 hover:text-orange-600">
                <Edit2 size={18} />
              </button>
            </div>
            <p className="text-3xl font-bold text-orange-600">${budget.toFixed(2)}</p>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${budgetPercentage > 90 ? 'bg-red-500' : budgetPercentage > 70 ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{budgetPercentage.toFixed(1)}% used</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Expenses by Category</h2>
            </div>
            {expensesByCategory.length > 0 ? (
              <PieChartComponent data={expensesByCategory} />
            ) : (
              <p className="text-gray-500 text-center py-12">No expense data available</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Monthly Trends</h2>
            </div>
            <BarChartComponent data={monthlyData} />
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
            <div className="flex flex-wrap gap-2">
              <select
                value={filterType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {CATEGORIES.find(c => c.name === transaction.category)?.icon || '💰'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(transaction)} className="text-blue-600 hover:text-blue-700 p-2">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(transaction.id)} className="text-red-600 hover:text-red-700 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-12">No transactions found</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${formData.type === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Expense
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${formData.type === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Coffee at Starbucks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                >
                  {editingTransaction ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Set Monthly Budget</h3>
              <button onClick={() => setShowBudgetModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <input
              type="number"
              value={budget}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBudget(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              placeholder="Enter monthly budget"
            />
            <button
              onClick={() => setShowBudgetModal(false)}
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
            >
              Save Budget
            </button>
          </div>
        </div>
      )}
    </div>
  );
}