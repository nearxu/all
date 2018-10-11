import Ids from "../app/models/ids";

export default class BaseComponent{
    constructor(){
        this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
		this.imgTypeList = ['shop', 'food', 'avatar','default'];
    }
    async getId(type){
        if(!this.idList.includes(type)){
            throw new Error('id 类型错误')
            return;
        }
        try{
            const idData = await Ids.findOne();
            idData[type]++;
            console.log(idData[type])
            await idData.save();
            return idData[type]
        }catch(err){
            throw new Error(err)
        }
    }

}