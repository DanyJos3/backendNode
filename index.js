const express = require('express');
const cors = require('cors') ;

const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => {
    res.send('Node JS api')
});

app.post('/api/sendBackend', (req, res) => {
    console.log(req.body)
    console.log(req.header)
    axios
        .post('https://api-uat.kushkipagos.com/card/v1/charges', {
            amount: {
                "subtotalIva": 0,
                "subtotalIva0": req.body.amount,
                "ice": 0,
                "iva": 0,
                "currency": "USD"
            },
            token: req.body.token,
            fullResponse: true
        },{headers:{
            "Private-Merchant-Id":"4c3859fe6033457ea1e9ffb31121bee8"
            }})
        .then(response => {
            console.log(`statusCode: ${response.status}`)
            console.log(response.data)
            res.send(response.data);
        })
        .catch(error => {
            console.error(error)
            res.send(error)
        })
});

const port =  process.env.port || 80;
app.listen(port, () => console.log(`escuchando en el puerto`))


