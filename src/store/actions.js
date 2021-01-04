import {ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED} from "@/store/mutations-types";

export default {
  addCart(context, payload) {

    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct){
        context.commit(ADD_COUNTER, oldProduct);
        resolve('商品数量+1')
      }else{
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('成功添加商品')
      }
    })
  },
  changeCheck(context, payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct){
      context.commit(CHANGE_CHECKED, oldProduct);
    }
  },
  changeCheckAll(context, payload) {
    let Products = context.state.cartList.filter(item => item.checked !== payload)

    for(let Product in Products){
      context.commit(CHANGE_CHECKED, Products[Product]);
    }

  }
}
