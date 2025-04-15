import { getDb } from '../../lib/db';

export default async function handler(req, res) {
  // Set JSON header
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const db = await getDb();
    
    if (req.method === 'GET') {
      const transactions = await db
        .collection('transactions')
        .find()
        .sort({ date: -1 })
        .toArray();
      return res.status(200).json(transactions);
    }
    
    if (req.method === 'POST') {
      const result = await db.collection('transactions').insertOne({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.status(201).json(result);
    }

    // Handle unsupported methods
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
}