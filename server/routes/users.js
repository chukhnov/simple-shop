import express from 'express'
import crypto from 'crypto'
import { generateToken, verifyToken } from './utils/'
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js'
import UsersCollection from '../models/userSchema'
import config from '../config'


export async function addSuperUser() {
  const existUser = await UsersCollection.findOne({ name: 'SuperUser' })
  if (!existUser) {
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
  const { name, password } = req.body;
  const existUser = await UsersCollection.findOne({ name })
  if (existUser) return res.status(401).send({ message: 'User already exists!' });
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
    if (error) {
      return res.status(401).send({ message: error })
    }
    res.status(200).send({ message: 'Registration successful!' })
  })

}

export async function login(req, res) {
  const { name, password } = req.body
  const user = await UsersCollection.findOne({ name })
  if (!user) {
    return res.status(401).send({ message: 'User not found!' })
  }

  const { _id } = user

  const { isActive, password: databasePasswordHash, _id: uId } = user
  if (!isActive) {
    return res.status(401).send({ message: 'User is not active!' });
  }

  const currentPasswordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  const isCompare = bcrypt.compareSync(currentPasswordHash, databasePasswordHash);
  if (!isCompare) {
    return res.status(401).send({ message: 'Wrong password!' });
  }

  const userData = { isAdmin: false, _id }
  const token = generateToken(userData)
  res.status(200).send({ uId, name, token })

}



export async function checkToken(req, res) {
  const { token } = req.params
  if (!token) {
    return res.status(401).send({ message: 'Must pass token' });
  }

  verifyToken(token)
    .then(async function (data) {
      const { _id } = data
      const user = await UsersCollection.findOne({ _id })
      if (!user) {
        return res.status(401).send({ message: 'User not found!' });
      }
      const { name, avatar, age } = user
      res.status(200).send({ name, avatar, age, uId: _id })
    }, error => {
      res.status(401).send({ message: error });
    })
}


export async function updateUserData(req, res) {
  const { token, uId: currentId, update } = req.body
  if (!token) {
    return res.status(401).send({ message: 'Must pass token.!' });
  }

  verifyToken(token)
    .then(async function (data) {
      const { _id } = data
      if (currentId !== _id) {
        return res.status(403).send({ message: 'No permission!' })
      }
      const user = await UsersCollection.findOne({ _id })
      if (!user) {
        return res.status(401).send({ message: 'User not found!' });
      }

      const { nModified } = await UsersCollection.update({ _id }, { $set: update }, { upsert: true });
      if (!nModified) return res.status(400).send({ message: 'Cannot update user!' });

      const updatedUser = await UsersCollection.findOne({ _id })
      const { name, avatar, age, _id: uId } = updatedUser
      res.status(200).send({ name, avatar, age, uId })
    }, error => {
      res.status(401).send({ message: error });
    })
}




export const routes = express();
routes.post('/registration', registerUser);
routes.post('/', login);
routes.get('/check/:token', checkToken);
routes.put('/', updateUserData)
