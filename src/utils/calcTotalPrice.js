export const calcTotalPrice = (items) => {
    return   items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
};
