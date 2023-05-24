// // const functions = require('firebase-functions')
import { https } from 'firebase-functions';
import express from 'express'
import setupMiddlewares from '../../config/web/config/middlewares'
import setupRoutes from '../../src/main/web/routes'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
exports.hipet = https.onRequest(app);


// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;

// const app = express();
// const port = process.env.PORT || 8080;

// app.use(express.json());

// app.post('/livros', async (req, res) => {
//   const url = 'mongodb://localhost:27017';
//   const dbName = 'minha-biblioteca';

//   const novoLivro = req.body;

//   const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     const db = client.db(dbName);
//     const result = await db.collection('livros').insertOne(novoLivro);
//     res.status(200).send(`Livro inserido com sucesso. ID: ${result.insertedId}`);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Erro ao inserir o livro');
//   } finally {
//     client.close();
//   }
// });

// exports.hipet = https.onRequest(app);

