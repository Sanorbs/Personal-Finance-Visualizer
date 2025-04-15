export function TransactionList({ transactions }) {
    const [data, setData] = useState(transactions || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const refreshData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
  
    if (error) return <div>Error: {error}</div>;
    if (loading) return <div>Loading...</div>;
  
    return (
      // ... your existing JSX
      // Add a refresh button:
      <button onClick={refreshData} className="refresh-button">
        Refresh Data
      </button>
      // ... rest of your component
    );
  }