import axios from "axios";

const handler = async (req, res) => {
  const { dates } = req.query;

  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=${dates[0]}&end_date=${dates[1]}`
  );
  const data = response.data;

  res.status(200).json(data);
};

export default handler;
