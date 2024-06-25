
import  Order  from "../models/OrderSchema.js";


export const placeOrders = async (req, res) => {
    // console.log(req);
    const { userId, orderQuantity, selectedDistributor, selectedDistributorname } = req.body;
    // console.log(quantity+" "+providerId +" "+providerName)

    try {
        const order = await new Order({
            quantity: orderQuantity,
            userId: userId,
            providerId: selectedDistributor,
            providerName: selectedDistributorname
        });
        order.save();
        res.json("success");
       // console.log('New order placed:', order);
    } catch (e) {
        console.log(e);
        res.json("fail");
    }
}    
export const viewOrders = async (req, res) => {
    // console.log(req);
     const { userId } = req.body;
     //console.log(userId);
     try {
        const orders = await Order.find({ userId: userId });
       //console.log(orders);
        res.json(orders);
     } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
     }
}

