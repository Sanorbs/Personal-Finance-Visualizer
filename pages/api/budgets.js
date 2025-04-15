import { getDb } from '../../lib/db';

export default async function handler(req, res) {
  const db = await getDb();

  if (req.method === 'GET') {
    try {
      const budgets = await db
        .collection('budgets')
        .find()
        .sort({ month: -1, category: 1 })
        .toArray();
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch budgets' });
    }
  }

  if (req.method === 'POST') {
    try {
      const existingBudget = await db.collection('budgets').findOne({
        category: req.body.category,
        month: req.body.month
      });

      if (existingBudget) {
        return res.status(400).json({
          error: 'Budget already exists for this category and month'
        });
      }

      const result = await db.collection('budgets').insertOne({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create budget' });
    }
  }
}