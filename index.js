const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000
require('dotenv').config()

app.use(cors());
app.use(express.json())
// pass: 5yDSG7p53okawmsd
// user: deskala


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d7hti.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const UserCollection = client.db("users").collection("user");
        const candidateCollection = client.db("addCandidate").collection("candidates");


        app.get('/allCandidates', async (req, res) => {
            const allCandidates = await candidateCollection.find().toArray();
            res.send(allCandidates)
        })


        app.post('/createCandidate', async (req, res) => {
            const candidateDetail = req.body.data;
            console.log(candidateDetail)
            const result = await candidateCollection.insertOne(candidateDetail);
            res.send(result)
        })

        app.put('/userCreate', async (req, res) => {
            const userDetail = req.body.userDetail;
            const filter = { userDetail };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    userEmail: userDetail.email,
                    userPassword: userDetail.password,
                    userPhoneNumber: userDetail.phoneNumber
                },
            };
            const result = await UserCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })
        app.put('/updateCandidate/:id', async (req, res) => {
            const id = req.params.id;
            const candidateDetail = req.body.data;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            // console.log(candidateDetail)
            const updateDoc = {
                $set: {
                    name: candidateDetail.name,
                    birthDate: candidateDetail.birthDate,
                },
            };
            const result = await candidateCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })
        app.delete('/deleteCandidate/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await candidateCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally { }
}
run().catch(console.dir())


app.get('/', (req, res) => {
    res.send('Practice Deskala ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})