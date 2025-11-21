const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// GET /api/coins
app.get('/api/coins', async (req, res) => {
  try {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

    const { data } = await axios.get(url);

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(204).json({ error: 'No Coin data available' });
    }

    const coins = data.map(c => ({
        img:c.image,
      name: c.name,
      symbol: c.symbol,
      current_price: c.current_price,
      price_change_percentage_24h: c.price_change_percentage_24h,
      market_cap: c.market_cap,
    }));
    res.json(coins); //Send cleaned coin data to frontend

  } catch (err) {
    if (err.response) {
    return res.status(err.response.status).json(err.response.data);
  }
    res.status(500).json({ error: 'Internal server error' });
  }
});

