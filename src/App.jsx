import { useState, useEffect } from "react";
import Pill from "./components/Pill";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

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
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = setSelectedUsers(
      selectedUsers.filter((u) => u.email !== user.email)
    );
    setSelectedUserSet(updatedUsers);
  };

  return (
    <div className="user-search-container font-mono flex relative">
      <div className="user-search-input w-full flex items-center flex-wrap gap-2 p-2 border-[#ccc] border rounded-[20px]">
        {/* Pills */}
        {selectedUsers.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}

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
          <ul className="suggestions-list max-h-[300px] overflow-y-auto list-none p-0 m-0 absolute bg-[#fff] border border-[#ccc]">
            {suggestions?.users?.map((user) => {
              return !selectedUserSet.has(user.email) ? (
                <li
                  key={user.email}
                  className="suggestion-item flex items-center gap-[10px] py-2 px-[10px] cursor-pointer border-b border-[#ccc] last:border-b-0 hover:bg-[#ccc]"
                  onClick={() => handleSelectUser(user)}
                >
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-[20px]"
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
