// import { useState } from "react";
// import QueryInput from "./components/QueryInput";
// import ResultsTable from "./components/ResultsTable";

// export default function App() {
//   const [results, setResults] = useState([]);

//   const handleQuerySubmit = (query) => {
//     // MOCK data for now
//     const mockResults = [
//       { name: "OPQ32r", url: "https://www.shl.com/solutions/products/opq32r/" },
//       { name: "Verify G+", url: "https://www.shl.com/solutions/products/verify-g-plus/" },
//       { name: "CheckPoint", url: "https://www.shl.com/solutions/products/checkpoint/" },
//     ];
//     setResults(mockResults);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h1 className="text-3xl font-bold mb-5 text-center">SHL Assessment Recommender</h1>
//       <QueryInput onSubmit={handleQuerySubmit} />
//       <ResultsTable results={results} />
//     </div>
//   );
// }


import SearchBox from "./components/SearchBox";

function App() {
  return <SearchBox />;
}

export default App;
