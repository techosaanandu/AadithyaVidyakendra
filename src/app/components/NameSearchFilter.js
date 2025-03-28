"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://ferroynnuxmgpchfivdm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcnJveW5udXhtZ3BjaGZpdmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyODAzNTEsImV4cCI6MjA1Nzg1NjM1MX0.shy07yRxYHKPX2aEqfLnEMVaitx9PqPFAPz5m-Ku2vk"
);

export default function NameSearchFilter({ selectedSchool, onSelectName }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [nameOptions, setNameOptions] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Add state for dropdown visibility

  // Fetch names from Supabase when the school changes
  useEffect(() => {
    if (!selectedSchool) return;

    // const fetchNames = async () => {
    //   try {
    //     const folderPath = `${selectedSchool.value}`;
    //     const { data, error } = await supabase.storage.from("pdfs").list(folderPath);

    //     if (error) {
    //       console.error("Error fetching names:", error);
    //       return;
    //     }

    //     // Extract names from filenames (assuming format: "name-class-roll.pdf")
    //     const names = data.map((file) => {
    //       const [name] = file.name.split("-");
    //       return name;
    //     });

    //     // Remove duplicates and sort
    //     const uniqueNames = [...new Set(names)].sort();
    //     setNameOptions(uniqueNames);
    //     setFilteredNames(uniqueNames);
    //   } catch (error) {
    //     console.error("Error in name fetch:", error);
    //   }
    // };
    const fetchNames = async () => {
      try {
        const folderPath = `${selectedSchool.value}`;
        let allFiles = [];
        let offset = 0;
        const limit = 100; // Supabase default limit

        while (true) {
          const { data, error } = await supabase.storage
            .from("pdfs")
            .list(folderPath, {
              limit,
              offset,
            });

          if (error) {
            console.error("Error fetching names:", error);
            return;
          }

          allFiles = allFiles.concat(data);
          if (data.length < limit) break; // Exit if fewer than limit, meaning no more files
          offset += limit;
        }

        // Extract names from filenames
        const names = allFiles.map((file) => {
          const [name] = file.name.split("-");
          return name;
        });

        const uniqueNames = [...new Set(names)].sort();
        setNameOptions(uniqueNames);
        setFilteredNames(uniqueNames);
      } catch (error) {
        console.error("Error in name fetch:", error);
      }
    };

    fetchNames();
  }, [selectedSchool]);

  // Filter names based on search input
  useEffect(() => {
    if (!searchTerm) {
      setFilteredNames(nameOptions);
    } else {
      const filtered = nameOptions.filter((name) =>
        name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredNames(filtered);
    }
  }, [searchTerm, nameOptions]);

  // Handle name selection
  const handleSelectName = (name) => {
    setSearchTerm(name); // Update the input field value
    onSelectName(name); // Pass the selected name to the parent component
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search Student Name..."
        className="w-full p-2 border border-white/30 bg-white/10 text-white placeholder-amber-50 rounded-xl outline-none focus:border-blue-300 transition-all duration-300"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true); // Open dropdown when typing
        }}
        onFocus={() => setIsOpen(true)} // Open dropdown when input is focused
      />
      {isOpen && filteredNames.length > 0 && (
        <ul className="absolute z-20 w-full bg-white/90 text-black rounded-xl mt-1 max-h-60 overflow-y-auto shadow-lg top-full left-0">
          {filteredNames.map((name, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer transition-all duration-200"
              onClick={() => handleSelectName(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
