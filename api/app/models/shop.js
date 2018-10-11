import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
    address:String,
    description:{type:String,default:''},
    id:Number,
    category: String,
    name: {
        type: String,
        required: true 
    },
    phone: {
        type: String,
        required: true 
    },
    status: { type: Number, default: 0 }
})

shopSchema.index({ id: 1 }); //primary_key 主键

const Shop = mongoose.model('Shop', shopSchema);

export default Shop