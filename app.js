//import
const { MongoClient } = require("mongodb");


//url
const uri = "mongodb://127.0.0.1:27017";
//konfigurasi whatsapp bot start
const qrcode = require("terminal-qr");
const fs = require("fs");
const { Client, legacySessionAuth,  LocalAuth,  MessageMedia, } = require("whatsapp-web.js");
const client = new Client({ authStrategy: new LocalAuth({ clientId: "client-one",}),});
client.on("authenticastion", (session) => {
console.log(session);
});

client.initialize();
client.on("qr", (qr) => {
qrcode.generate(qr, { small: true });
});

client.on(`ready`, () => {
console.log("ready to message...");
});
//konfigurasi whatsapp bot end

const option = new MongoClient(uri);

//konfigurasi
async function run() {
    try {
        const db = 'output' 
        const database = option.db('output');
        const coll = database.collection('topics');

        const datas = await coll.find().toArray()
        datas.map((data) => {
          // console.log(data)


          let layer = null;
          client.on("message", (message) => { 
            layer;
            
            // layer 0
            if(layer === null){
              if(message.body === data.no){
                message.reply(data.desc)
                layer = message.body
              }
            }

            // layer 1
            if(layer === '1'){
              if(layer + message.body === layer + data.no){
                message.reply(data.desc)
                layer += message.body
              }
            }
            
            if(layer === '2'){
              if(layer + message.body === layer + data.no){
                message.reply(data.desc)
                layer += message.body
              }
            }
            
            if(layer === '3'){
              if(layer + message.body === layer + data.no){
                message.reply(data.desc)
                layer += message.body
              }
            }


            // layer 2
            if(layer === '11'){
              if(layer+ message.body === layer+data.no){
                message.reply(data.desc)
                layer +=message.body
              }
            }
          })
        })
        

        

  } finally {
    await option.close();
  }
}
run().catch(console.dir);