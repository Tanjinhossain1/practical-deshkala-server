const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json())
// pass: 5yDSG7p53okawmsd
// user: deskala


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://deskala:5yDSG7p53okawmsd@cluster0.d7hti.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    await client.connect()
    const UserCollection = client.db("users").collection("user");
    
}
finally{}
}
run().catch(console.dir())


app.get('/', (req, res) => {
    res.send('Practice Deskala ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})