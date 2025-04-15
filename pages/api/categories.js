import { getDb } from '../../lib/db';

const DEFAULT_CATEGORIES = [
  { name: 'Food', color: '#FF6384', icon: 'utensils' },
  { name: 'Transportation', color: '#36A2EB', icon: 'car' },
  { name: 'Housing', color: '#FFCE56', icon: 'home' },
  { name: 'Entertainment', color: '#4BC0C0', icon: 'film' },
  { name: 'Healthcare', color: '#9966FF', icon: 'heartbeat' },
  { name: 'Other', color: '#FF9F40', icon: 'shapes' }
];

export default async function handler(req, res) {
  const db = await getDb();

  if (req.method === 'GET') {
    try {
      let categories = await db
        .collection('categories')
        .find()
        .toArray();

      if (categories.length === 0) {
        const result = await db
          .collection('categories')
          .insertMany(DEFAULT_CATEGORIES.map(cat => ({
            ...cat,
            createdAt: new Date(),
            updatedAt: new Date()
          })));

        if (result.insertedCount > 0) {
          categories = await db
            .collection('categories')
            .find()
            .toArray();
        }
      }

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  if (req.method === 'POST') {
    try {
      const existingCategory = await db
        .collection('categories')
        .findOne({ name: req.body.name });

      if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
      }

      const result = await db.collection('categories').insertOne({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create category' });
    }
  }
}