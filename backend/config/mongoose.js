const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

connection_string='mongodb+srv://expclusteruser:expclusteruser@exp-cluster.q9owu.mongodb.net/wolfjobs_development?retryWrites=true&w=majority&appName=exp-cluster'
//mongoose.connect('mongodb://localhost/wolfjobs_development');
mongoose.connect(connection_string)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open',function(){
    console.log('Connected to database :: MongoDB')
})


module.exports = db;