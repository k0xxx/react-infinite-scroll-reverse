import React from "react";
import InfiniteScrollReverse from "./components/InfiniteScrollReverse";
import "./App.scss";

const App = () => {
  const data = [1, 2, 3, 4];

  function loadMore(page) {
    console.log("page", page);
  }

  return (
    <InfiniteScrollReverse className="itemsContainer" loadMore={loadMore} hasMore={true} isLoading={false}>
      {data.map((el) => (
        <div key={el}>{el}</div>
      ))}
    </InfiniteScrollReverse>
  );
};

export default App;
