const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

connection_string='mongodb+srv://mulesiddhi:mulesiddhi27@cluster0.et5q4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//mongoose.connect('mongodb://localhost/wolfjobs_development');
mongoose.connect(connection_string)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open',function(){
    console.log('Connected to database :: MongoDB')
})


module.exports = db;