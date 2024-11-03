import axios from "axios";

const apiURL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (page) => {
  try {
    console.log(`Fetching characters for page: ${page}`);
    const response = await axios.get(`${apiURL}?page=${page}`);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
export const fetchHero = async (id) => {
  const response = await axios.get(`${apiURL}/${id}`);
  return response.data;
};
