export default {
  cartLength(state) {
    return state.cartList.length ? state.cartList.length : 0
  },
  cartList(state) {
    return state.cartList;
  },
  cartTotal(state) {
    //1.方法只用reduce
    /*const price = []
    for (let i in state.cartList) {
      price.push(state.cartList[i].price);
    }


    return price.reduce((item, index) => item * 1 + index * 1, 0).toFixed(2)*/


    //2.filter结合reduce
    return state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.price * item.count
    }, 0).toFixed(2)
  },
  checkLength(state) {
    return state.cartList.filter(item => item.checked).length
  },
  isCheckAll(state) {
    //some函数,当数组中只要有一个值满足条件就停止检测并返回true,反之返回false。
    //当数组值为零时,some的结果是undefined，而!undefined=true
    if(state.cartList.length === 0) return false
    return !state.cartList.some(item => item.checked === false)
  }
}
