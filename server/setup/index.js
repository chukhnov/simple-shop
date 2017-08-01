import config from '../config'
import mongoose from 'mongoose'


export function initDB (){
  const databaseUri = config.db.str;
  mongoose.Promise = global.Promise;
  mongoose.connect(databaseUri, { useMongoClient: true })
        .then(() => {
          console.log(`Database connected at ${databaseUri}`)
        })
        .catch(err => console.log(`Database connection error: ${err.message}`));
}