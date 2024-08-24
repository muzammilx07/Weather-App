import React, { useState, useEffect } from "react";

const Table = ({ weatherData }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedRows, setHighlightedRows] = useState(new Set());

  useEffect(() => {
    if (weatherData) {
      const formattedData = Object.keys(weatherData).map((key, index) => ({
        city: weatherData[key].city,
        description: weatherData[key].description || "",
        temperature: weatherData[key].temperature || "",
        pressure: weatherData[key].pressure || "",
        age: weatherData[key].age || "",
        id: index + 1,
      }));
      setData(formattedData);
    } else {
      setData([]);
    }
  }, [weatherData]);

  const filteredData = data.filter((row) =>
    row.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    const matchedRowIds = new Set(filteredData.map((row) => row.id));
    setHighlightedRows(matchedRowIds);

    const timer = setTimeout(() => {
      setHighlightedRows(new Set());
    }, 3000);

    return () => clearTimeout(timer);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDescriptionChange = (id, newDescription) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, description: newDescription } : item
      )
    );
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="w-3/4 h-full flex flex-col">
      <div className="searchbar w-full flex justify-end p-4 border-b border-black">
        <div className="search flex items-center border border-black bg-white">
          <input
            type="text"
            placeholder="Search by city..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="outline-none px-4 py-2 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 px-4 py-2 text-white"
          >
            Search
          </button>
        </div>
      </div>
      <div className="table-main flex-grow px-32 py-20">
        <div className="table w-full h-full rounded">
          <table className="w-full border-collapse border border-black">
            <thead className="bg-blue-500">
              <tr>
                <th className="border border-black px-4 py-2">City</th>
                <th className="border border-black px-4 py-2">Description</th>
                <th className="border border-black px-4 py-2">Temperature</th>
                <th className="border border-black px-4 py-2">Pressure</th>
                <th className="border border-black px-4 py-2">
                  Data age (hrs)
                </th>
                <th className="border border-black px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className={
                    highlightedRows.has(row.id) ? "bg-yellow-300" : "bg-white"
                  }
                >
                  <td className="border border-black px-4 py-2">{row.city}</td>
                  <td className="border border-black px-4 py-2">
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        handleDescriptionChange(row.id, e.target.value)
                      }
                      className="w-full outline-none border border-gray-300 p-1"
                    />
                  </td>
                  <td className="border border-black px-4 py-2">
                    {row.temperature}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {row.pressure}
                  </td>
                  <td className="border border-black px-4 py-2">{row.age}</td>
                  <td className="border border-black px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
