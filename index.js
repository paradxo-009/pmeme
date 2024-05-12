const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const MEME_API_URL = 'https://programming-memes-images.p.rapidapi.com/v1/memes';
const API_KEY = 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b';
app.get('/', (req, res) => {
  res.send('programming meme');
});
app.get('/meme', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: MEME_API_URL,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com',
      }
    };

    const response = await axios.request(options);
    const memes = response.data;

    if (memes.length === 0) {
      return res.status(404).json({ error: 'No memes found' });
    }

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    const imageUrl = randomMeme.image;

    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
