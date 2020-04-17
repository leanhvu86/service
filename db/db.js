const mongoose = require('mongoose');
const dbConfig = require('../db/database.config');

 mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
    // useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to the database')
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit()
});

mongoose.set('debug', true);
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// db.once('open', () => {
//     console.log(
//         chalk.green('Open connect')
//     );
// })

// db.on('error', function (error) {
//     console.error(
//         chalk.red('Error in MongoDb connection: ' + error)
//     );
//     mongoose.disconnect();
// });

// db.on('close', function () {
//     console.log(
//         chalk.red('close connection')
//     );
//     mongoose.connect(config.url, { server: { auto_reconnect: true } });
// });

//export default db;
