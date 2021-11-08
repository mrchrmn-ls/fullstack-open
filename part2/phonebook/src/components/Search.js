import React from "react";

const Search = ({ state }) => {
  const {search, setSearch} = state;

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      Search: <input onChange={handleSearch} value={search}/>
    </div>
  )
}

export default Search;