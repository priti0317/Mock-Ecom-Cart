import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vibe-ecom');
  const count = await Product.countDocuments();
  if (count === 0) {
   const mock = [
  {
    name: "Classic White T-Shirt",
    price: 699,
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/670064/02/mod01/fnd/IND/fmt/png/All-in-Men's-Training-Polo-T-shirt",
  },
  {
    name: "Slim Fit Blue Jeans",
    price: 1899,
    image: "https://th.bing.com/th/id/R.6b24026ff114f0f65a2b3650f477030c?rik=NO0RvfeBkZ3Rxw&riu=http%3a%2f%2fcelio.in%2fcdn%2fshop%2ffiles%2fGOQUAD25_INDIGO_1.jpg%3fv%3d1750328684&ehk=dqZVqEBYo3K%2f46RsMa7%2bYpdiOBh5PGmeELJbmt5upp8%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    name: "Denim Jacket",
    price: 2599,
    image: "https://i5.walmartimages.com/asr/e956615c-5f71-4f27-950f-3b3460ed05e3_1.822afa92300b8dea0395359b9404f2e6.jpeg",
  },
  {
    name: "Cotton Hoodie",
    price: 1499,
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/671609/42/mod01/fnd/IND/fmt/png/NU-TILITY-Men's-Full-Zip-Hoodie",
  },
  {
    name: "Checked Casual Shirt",
    price: 1199,
    image: "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/2309622/2017/12/5/11512470028979-Basics-Men-Brown-Slim-Fit-Checked-Casual-Shirt-8581512470028861-1.jpg",
  },
  {
    name: "Athletic Joggers",
    price: 999,
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/585814/01/mod01/fnd/IND/fmt/png/Evostripe-Core-Men's-Trackpants",
  },
  {
    name: "Summer Floral Dress",
    price: 1799,
    image: "https://tse4.mm.bing.net/th/id/OIP.s6flZTipqFkkS4ErwKDCRwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Leather Belt",
    price: 799,
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/054908/01/fnd/IND/fmt/png/SEOUL-Reversible-Leather-Belt",
  },
  {
    name: "Black Formal Trousers",
    price: 1599,
    image: "https://5.imimg.com/data5/ANDROID/Default/2022/8/KB/PW/PK/158720090/product-jpeg-1000x1000.jpg",
  },
  {
    name: "Sports Sneakers",
    price: 2499,
    image: "https://assetscdn1.paytm.com/images/catalog/product/F/FO/FOONIKE-RUNALLDSMAR26297ED053FA/1563333298007_0..jpg",
  },
];
    await Product.insertMany(mock);
    console.log('Seeded products');
  } else {
    console.log('Products already present');
  }
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
