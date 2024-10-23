import React from "react";
import { useGlobalContext } from "./context";

const Search = () => {
  const { searchTerm, setSearchTerm, isError } = useGlobalContext();
  return (
    <>
      <section className="search-section">
        <h2>Enter Movie you want to Search 👇</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="Tell me Your Favourite Movie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        <div className="card-error">
          <p>{isError.show && isError.msg}</p>
        </div>
      </section>
    </>
  );
};

export default Search;
