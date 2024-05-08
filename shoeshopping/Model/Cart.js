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
            required: false
          },
          img: {
            type: String,
            required: true
          }
        }]
      }]
})
const cart = mongoose.model('cartitems', CartSchema);
module.exports=cart