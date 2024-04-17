import { useState, useEffect } from "react";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = (searchTerm) => {
      if (searchTerm.trim() === "" || !searchTerm) {
        setSuggestions([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchUsers(searchTerm);
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="user-search-container font-mono flex relative">
      <div className="user-search-input w-full flex items-center flex-wrap gap-2 p-2 border-[#ccc] border rounded-[20px]">
        {/* Pills */}

        {/* Input field with search suggestion */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for users..."
            className="focus:outline-none border-none outline-none"
          />

          {/* Search suggestions */}
          <ul className="suggestions-list max-h-[300px] overflow-y-scroll list-none p-0 m-0 absolute bg-[#fff] border border-[#ccc]">
            {suggestions?.users?.map((suggestion) => (
              <li
                key={suggestion.email}
                className="suggestion-item flex items-center gap-[10px] py-2 px-[10px] cursor-pointer border-b border-[#ccc] last:border-b-0 hover:bg-[#ccc]"
                onClick={() => handleSelectUser(suggestion)}
              >
                <img
                  src={suggestion.image}
                  alt={`${suggestion.firstName} ${suggestion.lastName}`}
                  className="h-[20px]"
                />
                <span>
                  {suggestion.firstName} {suggestion.lastName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
