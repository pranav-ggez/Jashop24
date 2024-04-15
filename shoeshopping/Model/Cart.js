const mongoose=require('mongoose')
const {Schema}=mongoose;
const CartSchema=new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true
    },
    cartItems:[{
        id: {
          type: Number,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        colors: [{
          code: {
            type: String,
            required: true
          },
          img: {
            type: String,
            required: true
          }
        }]
      }]
})
const cart = mongoose.model('cart', clothesSchema);
module.exports=cart