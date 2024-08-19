import express from "express";
import axios from "axios";
import cors from "cors";

const PORT = process.env.PORT ?? 2000;
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.get("/getAllProduct", function (req, res) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://188.68.219.194:9090/rest_nado/hs/REST_NADO/directory/cat_products',
        headers: {
            'Authorization': 'Basic YWRtaW46dHBhZA=='
        }
    };

    axios.request(config)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

});


app.post("/setData", function (req, res) {
    console.log(req.body.params)
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://188.68.219.194:9090/rest_nado/hs/REST_NADO/form/',
        headers: {
            'Authorization': 'Basic YWRtaW46dHBhZA=='
        },
        data: req.body.params
    };

    axios.request(config)
        .then((response) => {
            // console.log(response.data)
            res.json(response.data)
        })
        .catch((error) => {
            // console.log(error);
        });

});


app.get("/getAllCity", function (req, res) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://188.68.219.194:9090/rest_nado/hs/REST_NADO/directory/goroda',
        headers: {
            'Authorization': 'Basic YWRtaW46dHBhZA=='
        }
    };

    axios.request(config)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

});
app.get("/getAllContact", function (req, res) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://188.68.219.194:9090/rest_nado/hs/REST_NADO/directory/types_of_contacts',
        headers: {
            'Authorization': 'Basic YWRtaW46dHBhZA=='
        }
    };

    axios.request(config)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

});


app.listen(PORT, () => {
});
