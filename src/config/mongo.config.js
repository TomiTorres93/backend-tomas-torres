import mongoose from 'mongoose';


export default  async function  connectMongoDB  () {
  try {
      await mongoose.connect('mongodb+srv://tomitorres93:rodolfowalsh93@cluster0.xhrxoec.mongodb.net/?retryWrites=true&w=majority');
      console.log("Conectado con éxito a MongoDB usando Mongoose.");
  } catch (error) {
      console.log("No te pudiste conectar usando Mongoose")
 
  }
};

