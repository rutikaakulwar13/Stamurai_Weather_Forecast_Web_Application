import axios from "axios";

export const fetchCities = async () => {
  const response = await axios.get(
    "https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/"
  );
  return response.data;
};
