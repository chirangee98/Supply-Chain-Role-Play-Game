import { connectDB } from "./db.js";
import express, { urlencoded } from 'express';
import  Customer  from "./models/Customer_m.js";
import orderRouter from "./routes/orders.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";



// import {RetailerSchema} from "./models/retailer_m.js";
// import {WholesalerSchema} from "./models/wholesaler_m.js";
// import {DistributorSchema} from "./models/distributor_m.js";
// import {ManufacturerSchema} from "./models/manufacturer_m.js";
// import {AdminSchema} from "./models/admin_m.js";
import cors from 'cors';
// server.js
const app = express();
const port = 3000;
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors())


app.get('/', (req, res) => {
   res.send('Hello World!');
});

//  the orders route
app.use('/api', orderRouter);    

//  the login route
app.use('/auth', userRouter); 

app.use('/admin', adminRouter);





// Route to fetch entities based on userType
app.get('/entities', async (req, res) => {
  // console.log(req);
  const { userType } = req.query;
  let targetUserType;
  // console.log(userType);
  // Define the target user type based on the current user's type
  switch (userType) {
    case 'user':
      targetUserType = 'retailer';
      break;
    case 'retailer':
      targetUserType = 'wholesaler';
      break;
    case 'wholesaler':
      targetUserType = 'distributor';
      break;
    case 'distributor':
      targetUserType = 'manufacturer';
      break;
    default:
      res.status(400).json({ error: 'Invalid userType' });
      return;
  }

  try {
    // Find entities of the target user type
    const entities = await Customer.find({ userType: targetUserType });

    res.json(entities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

connectDB();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
