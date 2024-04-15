const mongoose=require('mongoose')
var clothes=null
const connectToMongo=async ()=>{
    try {
        mongoose.set("strictQuery", false);
        const mongoURI="mongodb://jaindhairyashj:nfLZKSD3cQ6ot4Fj@ac-ighs7k6-shard-00-00.ulpwfvi.mongodb.net:27017,ac-ighs7k6-shard-00-01.ulpwfvi.mongodb.net:27017,ac-ighs7k6-shard-00-02.ulpwfvi.mongodb.net:27017/clothes?ssl=true&replicaSet=atlas-7n784l-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
        console.log("Connecting")
        mongoose.connection.on('connected', () => console.log('connected'));
        mongoose.connection.on('open', () => console.log('open'));
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
        mongoose.connection.on('close', () => console.log('close'));
        var connection=mongoose.connection
        connection.once('open', async()=>{
          
        })
        await mongoose.connect(mongoURI)
      } catch (error) {
        console.log(error);
      }
}
module.exports={connectToMongo, clothes}