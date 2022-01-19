import axios from "axios";

const handler = async (req, res) => {
  const { date } = req.query;

  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`
  );
  const data = response.data;

  res.status(200).json(data);
};

export default handler;
