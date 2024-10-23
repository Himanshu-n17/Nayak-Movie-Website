import React, { useContext, useEffect, useState } from "react";

export const APP_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

//Creating A provider Function
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [searchTerm, setSearchTerm] = useState("spider");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: "false",
          msg: data.Error,
        });
        setMovie(data.Search);
      } else if (data.Response === "False") {
        setIsLoading(false);
        setIsError({
          show: "true",
          msg: data.Error,
        });
        setMovie([]);
      } else {
        setIsError({
          show: "true",
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      getMovies(`${APP_URL}&s=${searchTerm}`);
    }, 900);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{ isLoading, isError, movie, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Global Custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
