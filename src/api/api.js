export const getMoviesBySearch = async (searchTerm, page) => {
  return await fetch(
    `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchTerm}&r=json&page=${page}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getMoviesByID = async (id) => {
  return await fetch(
    `https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=${id}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
        console.error(err);
    });
};
