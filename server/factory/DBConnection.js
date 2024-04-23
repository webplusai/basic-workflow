const mongoose = require('mongoose');

export default class DBConnection {
    constructor() {
        this.dbConn = null;
        this.connect();
    }

    async connect() {
        try {
            this.dbConn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: this.dbName
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    async close() {
        try {
            await mongoose.disconnect();
            console.log('Connection to MongoDB closed');
        } catch (error) {
            console.error('Error closing connection to MongoDB:', error);
        }
    }
}
