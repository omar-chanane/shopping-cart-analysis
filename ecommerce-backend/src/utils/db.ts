import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connexion à MongoDB réussie');
        return client.db('ecommerce');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        throw error;
    }
};