// Updates entries and increases the count.
const Clarifai = require('clarifai');

const appClarifai = new Clarifai.App({
    apiKey: '448b34108c1a49cdb1e480fc3c77be9b'
   });


const handleAPICall = (req, res) => {
    appClarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then (data => { res.json(data);})
    .catch( err => res.status(400).json("Unable to connect to Clarifai."))   
}


const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users')
        .where('id', '=', id)
        .increment('entries', 1) //get the value in column entries and +1
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err=> res.status(400).json('Unable to get entries'))

}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall,
}