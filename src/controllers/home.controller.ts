import { Request, Response} from "express";
import { RSA } from "../../../RSA-Module";
import { PublicKey } from "../../../RSA-Module";
import { PrivateKey } from "../../../RSA-Module";
const homeModel = require("../models/home");
const Data = require("../models/data");
const User = require("../models/user");
const publicKeyModel = require("../models/publicKey");
const privateKeyModel = require("../models/privateKey");
import * as bc from 'bigint-conversion'

const generatePublicKey = async (req: Request, res: Response) => {

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

          await pub.save();
          await priv.save();
          res.send(pub);
      } catch(err) {
          return res.status(500).json(err);
      }

}

const getData = async (req: Request, res: Response) => {

  try{
      const results = await User.find({"password": req.params.password});
      //console.log(results[0].publicKey[0].n);

      const data = await Data.find({"n": results[0].publicKey[0].n},{"_id":0, "data":1});
      //console.log(data[0].data);
      return res.status(200).json(data);
      
  } catch (err) {
      return res.status(404).json(err);
  }

}



const getPrivateKey = async (req: Request, res: Response) => {

  try{
     const results = await User.find({"password": req.params.password});
     console.log(results[0].privateKey[0].d);
      return res.status(200).json(results[0].privateKey[0].d);
  } catch (err) {
      return res.status(404).json(err);
  }
}


const getUser = async (req: Request, res: Response) => {

  try{
      const results = await User.find({"password": req.params.password});
      return res.status(200).json(results);
  } catch (err) {
      return res.status(404).json(err);
  }
}


//Obtener todos los comentarios
const getPublicKey = async (req: Request, res: Response) => {

  try{
      const results = await publicKeyModel.find({"password": req.params.password});
      return res.status(200).json(results);
  } catch (err) {
      return res.status(404).json(err);
  }
}

/*const encrypt = async (req: Request, res: Response) => {

    const user = new homeModel(req.body);
  
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }

    /*const rsa = new RSA();
    await rsa.generateRandomKeys()

    let text = req.body;

    const x =  rsa.publicKey.encrypt(bc.textToBigint(text.text));
    console.log("Texto encriptado: " + x);*/

    //const y = rsa.privateKey.decrypt(x);
    //console.log("Texto decriptado: " + bc.bigintToText(y));

//}


const postEncrypted = async (req: Request, res: Response) => {

  function save(){
    return new Promise<void>((resolve, reject) => {
      try{  

        let dataE = new Data({
          "data" : req.body.data,
          "n": req.body.n
        });
        
        dataE.save().then(() => {
          return res.status(201).json(dataE);
        });
  
        resolve();
    
      }catch(err) {
            return res.status(500).json(err);
      }
    })
  }

  async function encrypt(){
    
    

    const chekN = await User.find({"publicKey.0.n" : req.body.n},{"_id": 0, "privateKey": 1 })
    //chekN[0].privateKey[0].d;
  
    if(!chekN) return res.status(409).json({code: 409, message: "This PrivateKey does not exist"});
    else{
        try{

          let e = bc.base64ToBigint("AQAB");
          let n = bc.base64ToBigint(req.body.n);
          let d = bc.base64ToBigint(chekN[0].privateKey[0].d);
          const publicKey = new PublicKey(e, n);
          const privateKey = new PrivateKey(d, publicKey);

          const y = privateKey.decrypt(bc.base64ToBigint(req.body.data));
          console.log("Text decrypted: \n" + bc.bigintToText(y));

        }catch (err) {
            return res.status(404).json(err);
        } 
    }

  }

  save().then(res => encrypt());

}

export default {generatePublicKey, getPublicKey, postEncrypted, getData, getPrivateKey, getUser}