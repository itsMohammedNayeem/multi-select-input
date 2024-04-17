import { useState, useEffect, useRef } from "react";
import Pill from "./components/Pill";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

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

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = setSelectedUsers(
      selectedUsers.filter((u) => u.email !== user.email)
    );
    setSelectedUserSet(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSearchTerm("");
    }
  };

  return (
    <div className="user-search-container font-mono flex relative m-5 items-center ">
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
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for users..."
            className="focus:outline-none border-none outline-none w-full"
            onKeyDown={handleKeyDown}
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
