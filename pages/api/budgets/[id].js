import { getDb } from '../../../lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = await getDb();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const budget = await db
        .collection('budgets')
        .findOne({ _id: new ObjectId(id) });

      if (!budget) {
        return res.status(404).json({ error: 'Budget not found' });
      }
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch budget' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const result = await db
        .collection('budgets')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...req.body, updatedAt: new Date() } }
        );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Budget not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update budget' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const result = await db
        .collection('budgets')
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Budget not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete budget' });
    }
  }
}