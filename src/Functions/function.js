//Formats Time String
export const getTime = timeString => {
  let time = timeString.trim();
  time = time.slice(0, 16).replace("T", " ");
  return time;
};

// Maps Food-id with order details
export const getPizzaInfo = (orderInfo, foodInfo) => {
  //console.log(foodInfo);

  let modedOrder = orderInfo.map((order, index) => {
    order.FOOD_DETAILS = getQtyID(order.FOOD_DETAILS);
    return order;
  });

  let updatedOrder = modedOrder.map((order, index) => {
    let finalOrder = order.FOOD_DETAILS.map(value1 => {
      //console.log(`orders: ${value.FOOD_ID}`);

      let jointOrder = foodInfo.filter(value2 => {
        if (value2.FOOD_ID === value1.FOOD_ID) {
          value1.FOOD_INFO = value2;
          return true;
        } else {
          return false;
        }
      });
      return jointOrder;
    });
    return finalOrder;
  });

  return updatedOrder;
};

//Function to seperate food-id and qantity
export const getQtyID = foodDetails => {
  let arr = foodDetails.split(",");

  let crr = arr.map((value, index) => {
    let brr = value.split(":");

    return { FOOD_ID: parseInt(brr[0]), FOOD_QTY: parseInt(brr[1]) };
  });

  //   return Object.assign({}, crr);
  return crr;
};
