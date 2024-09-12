const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');


const uri = 'mongodb+srv://ankitsarangi21:qSlJkWnpVB5GIvGP@cluster0.b2ofb20.mongodb.net/'; 
const dbName = 'testData'; 
const collectionName = 'users'; 

async function insertCsvDataToMongoDB(csvFilePath) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        
        const dataToInsert = [];

        
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                dataToInsert.push({
                    name: row.name,
                    age: parseInt(row.age), 
                    email: row.email,
                });
            })
            .on('end', async () => {
                try {
                    
                    if (dataToInsert.length > 0) {
                        const result = await collection.insertMany(dataToInsert);
                        console.log(`Inserted ${result.insertedCount} records into the database.`);
                    } else {
                        console.log('No data to insert.');
                    }
                } catch (error) {
                    console.error('Error inserting data into MongoDB:', error);
                } finally {
                    
                    await client.close();
                }
            });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
const csvFilePath = './data.csv';
insertCsvDataToMongoDB(csvFilePath);
