import { MongoClient } from 'mongodb';

// Improved connection handling with better error messages
const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
};

// Validate MongoDB URI format before attempting connection
function validateMongoURI(uri) {
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  if (!uri.startsWith('mongodb+srv://') && !uri.startsWith('mongodb://')) {
    throw new Error('Invalid MongoDB URI format. Must start with mongodb+srv:// or mongodb://');
  }
}

let client;
let clientPromise;

// Initialize the connection
try {
  validateMongoURI(uri);
  
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the connection
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch(err => {
        console.error('MongoDB connection failed:', err);
        throw err;
      });
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, create a new connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch(err => {
      console.error('MongoDB connection failed:', err);
      throw err;
    });
  }
} catch (err) {
  console.error('MongoDB initialization error:', err);
  throw new Error('Failed to initialize MongoDB connection');
}

export async function getDb() {
  try {
    const client = await clientPromise;
    return client.db('finance_tracker');
  } catch (err) {
    console.error('Failed to get database instance:', err);
    throw new Error('Database connection not available');
  }
}

// Test the connection immediately when this module loads
(async () => {
  try {
    const testClient = await clientPromise;
    await testClient.db('admin').command({ ping: 1 });
    console.log('MongoDB connection established successfully');
  } catch (err) {
    console.error('MongoDB connection test failed:', err);
  }
})();