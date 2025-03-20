import React, { useState, useRef, useEffect } from "react";

const schools = [
  { value: "sri_sri_academy", label: "Sri Sri Acadamy,Ezhukone" },
  // { value: "school_b", label: "School B" },
  // { value: "school_c", label: "School C" },
  // { value: "school_d", label: "School D" },
  // { value: "school_e", label: "School E" },
];

const SearchFilter = ({ onSelectSchool }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter the schools based on input text
  const filteredSchools = schools.filter((school) =>
    school.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Handle school selection
  const handleSelect = (school) => {
    setSelectedSchool(school);
    setInputValue(school.label); // Update input text
    onSelectSchool(school); // Pass school to parent
    setIsOpen(false); // Close the dropdown
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        placeholder="🔍 Search and select a school..."
        value={selectedSchool ? selectedSchool.label : inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          setSelectedSchool(null);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full border border-white/30 p-3 rounded-lg shadow-sm text-black
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
      />
      {isOpen && (
        <div
          className="absolute bg-white border mt-2 w-full max-h-52 overflow-y-auto z-10 
          shadow-lg rounded-lg transition-all duration-300 animate-fade-in"
        >
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <div
                key={school.value}
                className={`p-3 cursor-pointer transition-all duration-200 
                ${
                  selectedSchool?.value === school.value
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-100 text-black"
                }`}
                onClick={() => handleSelect(school)}
              >
                {school.label}
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500 text-center">
              ❌ No schools found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
