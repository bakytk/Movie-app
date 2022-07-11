
const { OMDB_API_KEY } = process.env;
const OMDB_BASE_URL = `http://www.omdbapi.com`

const axios = require("axios");

exports.GetMovie = async (movie_name) => {
  try {
    if ( !(OMDB_API_KEY && movie_name)){
      throw new Error ("Api key or movie_name undefined");
    };
    let api_url = OMDB_BASE_URL +
      `/?apikey=${OMDB_API_KEY}&t=` + movie_name;
    let config = {
      method: "GET",
      url: api_url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"      }
    };
    //console.log("GetMovie config: ", config);
    return axios(config);
  } catch (error) {
    console.log("GetMovie error", error);
    throw error;
  }
};
