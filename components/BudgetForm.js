import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BudgetForm({ initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      category: '',
      amount: 0,
      month: new Date().toISOString().slice(0, 7)
    }
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const method = initialData ? 'PUT' : 'POST';
      const url = initialData 
        ? `/api/budgets/${initialData._id}`
        : '/api/budgets';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save budget');
      
      router.push('/budgets');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Housing">Housing</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">Category is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { required: true, valueAsNumber: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">Amount is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Month</label>
        <input
          type="month"
          {...register('month', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.month && <p className="mt-1 text-sm text-red-600">Month is required</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Saving...' : 'Save Budget'}
      </button>
    </form>
  );
}