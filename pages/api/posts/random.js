import axios from "axios";

const handler = async (req, res) => {
  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&count=15`
  );
  const data = response.data;

  res.status(200).json(data);
};

export default handler;
