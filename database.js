const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017')

const getDb = () => client.connect().then(() => {
  const db = client.db('testdb')
  return db
})

const getTracks = () => 
  getDb()
  .then(db => db.collection('tracks'))
  .then(collection => collection.find())
  .then(cursor => cursor.toArray())


const insertTrack = (track) =>
  getDb()
  .then(db => db.collection('tracks'))
  .then(collection =>{ 
      console.log(track)
    return collection.insertOne(track)})


  const delTracks = () => 
  getDb()
  .then(db => db.collection('tracks'))
  .then(collection => collection.remove())
  
getTracks()//.then(tracks =>/* console.log(tracks)*/)

module.exports = {
  getTracks,
  insertTrack,
  delTracks
}
