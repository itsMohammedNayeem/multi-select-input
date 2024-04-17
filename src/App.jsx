import { useState } from "react";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="user-search-container font-mono flex relative">
      <div className="user-search-input w-full flex items-center flex-wrap gap-2 p-[5px] border-[#ccc] rounded-3xl">
        {/* Pills */}

        {/* Input field with search suggestion */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for users"
          />
          {/* Search suggestions */}
        </div>
      </div>
    </div>
  );
}
