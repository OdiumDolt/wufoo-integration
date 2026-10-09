const express = require("express")
var cors = require('cors')
const request = require("request-promise")
const port = 5532
const app = express()
const path = __dirname + '/dist/'

app.use(express.static(path))

app.use(cors({
    origin: '*'
}))

app.get("/get-form-data", async (req, res) => {
    reqJson = JSON.parse(req.headers.data)
    uri = `https://${reqJson.subdomain}.wufoo.com/api/v3/forms/${reqJson.form_id}/${reqJson.data_type}?pageSize=100`
    test = await request({
        uri: uri, 
        method: "GET", 
        auth:{
            username: reqJson.api_key,
            password:"footastic",
            sendImmediately: false,
        },
    })
    .then(response => {
        return response
    })
    .catch(error => {
        x = 0
        console.log(error)
    })
    res.json(test)
})


app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
  });

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
