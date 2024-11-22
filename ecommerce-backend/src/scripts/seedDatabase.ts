import { MongoClient } from 'mongodb';
import csv from 'csvtojson';
import path from 'path';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const databaseName = 'ecommerce';

const seedDatabase = async () => {
    try {
        await client.connect();
        console.log('Connexion à MongoDB réussie');

        const db = client.db(databaseName);
        const productsCollection = db.collection('products');
        const salesCollection = db.collection('sales');
        const productsFilePath = path.join(__dirname, '../../data/products.csv');
        const salesFilePath = path.join(__dirname, '../../data/sales.csv');


        const productsData = await csv().fromFile(productsFilePath);
        const salesData = await csv().fromFile(salesFilePath);

        await productsCollection.deleteMany({});
        await salesCollection.deleteMany({});

        const productsResult = await productsCollection.insertMany(productsData);
        const salesResult = await salesCollection.insertMany(salesData);

        console.log(
            `Insertion réussie : ${productsResult.insertedCount} produits, ${salesResult.insertedCount} ventes`
        );
    } catch (error) {
        console.error('Erreur lors du remplissage de la base de données :', error);
    } finally {
        await client.close();
    }
};

seedDatabase();