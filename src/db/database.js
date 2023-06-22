import mongoose from "mongoose";

const connectionString = 'mongodb+srv://admin:6sV95ut00BcLdSB2@cluster0.vcskbbl.mongodb.net/coderhouse';

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
    console.log(`ERROR => ${error}`);
}
