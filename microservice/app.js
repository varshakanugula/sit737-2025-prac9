const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // optional if you're using a .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// MongoDB Connection (Step 6)
mongoose.connect(process.env.MONGO_URI || 'MONGO_URI=mongodb://mongoadmin:admin123@mongodb-service:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Example Schema and Model
const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});
const Item = mongoose.model('Item', ItemSchema);

// Example CRUD Routes
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  const savedItem = await newItem.save();
  res.json(savedItem);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

//  Health check
app.get('/', (req, res) => res.send('App is running 🚀'));

app.listen(port, () => console.log(`Server running on port ${port}`));
