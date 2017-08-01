import express from 'express'
import crypto from 'crypto'
import {generateToken, verifyToken} from './utils/'
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js'
import UsersCollection from '../models/userSchema'
import config from '../config'


export async function addSuperUser(){
  const existUser = await UsersCollection.findOne({name: 'SuperUser'}).exec()
  if(!existUser) {
    const password = 'password'
    const currentPasswordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(currentPasswordHash, saltRounds);

    const userTemplate = {
      _id: crypto.randomBytes(10).toString('hex'),
      name: 'SuperUser',
      password: hashedPassword,
      isAdmin: true
    }

    const newUser = new UsersCollection(userTemplate);
    newUser.save()
  }
}

export async function registerUser(req, res) {
  const {name, password} = req.body;
  const existUser = await UsersCollection.findOne({name}).exec();
  if(existUser) return res.status(401).send({error: 'User already exists!'});
  const currentPasswordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(currentPasswordHash, saltRounds);

  const userTemplate = {
    _id: crypto.randomBytes(10).toString('hex'),
    name,
    password: hashedPassword,
  }


  const newUser = new UsersCollection(userTemplate);
  newUser.save((error, result) => {
    if(error){
      return res.status(401).send({error})
    }
    res.status(200).send({message: 'Registration successful!'})
  })

}

export async function login(req, res) {
  const {name, password} = req.body
  const user = await UsersCollection.findOne({name}).exec()
  if(!user) {
    return res.status(401).send({error: 'User not found!'})
  }

  const {isActive, password: databasePasswordHash, _id: uId} = user
  if(!isActive) {
    return res.status(401).send({error: 'User is not active!'});
  }

  const currentPasswordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  const isCompare = bcrypt.compareSync(currentPasswordHash, databasePasswordHash);
  if(!isCompare) {
    return res.status(401).send({error: 'Wrong password!'});
  }

  const someData = {}
  const token = generateToken(someData);
  res.status(200).send({uId, name, token})

}



export async function checkToken(req, res) {
  const {token} = req.params;
  if (!token) {
    return res.status(401).send({error: 'Must pass token'});
  }

  verifyToken(token)
    .then(async function (data){
      const user = await UsersCollection.findOne({name: data.name}).exec();
      if(!user) {
        return res.status(401).send({error: 'User not found!'});
      }

      const {name, _id: uId} = user;
      res.status(200).send({name, uId});
    }, error => {
      res.status(401).send({error});
    })
}




export const routes = express();
routes.post('/registration', registerUser);
routes.post('/', login);
routes.get('/check/:token', checkToken);
