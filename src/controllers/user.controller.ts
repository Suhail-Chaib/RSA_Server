import { Request, Response} from "express";
const User = require("../models/user");
import { RSA } from "../../../RSA-Module";
import { PublicKey } from "../../../RSA-Module";
import { PrivateKey } from "../../../RSA-Module";
const publicKeyModel = require("../models/publicKey");
const privateKeyModel = require("../models/privateKey");
import * as bc from 'bigint-conversion'

async function registerUser(req:Request, res:Response) {

    let user = req.body;
    const rsa = new RSA();
    await rsa.generateRandomKeys()

      try{ 

        let pub = new publicKeyModel({
            "n": bc.bigintToBase64(rsa.publicKey.n),
            "e": bc.bigintToBase64(rsa.publicKey.e),
        });

        let priv = new privateKeyModel({
            "d": bc.bigintToBase64(rsa.privateKey.d),
            "publicKey": pub,
        });

        let u = new User({
            "password": user.password,
            "publicKey": pub,
            "privateKey": priv,
        });

        await u.save().then(() => {
            return res.status(201).json("User created successfully!");
        });
      } catch(err) {
          return res.status(500).json(err);
      }

}

async function loginUser(req: Request, res: Response) {
    
    const password = req.params.password;

    let user = await User.findOne({ "password": password });
    console.log(req.params.password);

    if(!user){
        return res.status(404).json({ message: "User not found." });
    } else {
        return res.status(200).json({message: "Usuario Conectado"});
    }

}


export default {loginUser, registerUser}