
// "use client";
// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SearchFilter from "../components/SearchFilter";
// import { FaDownload, FaEye } from "react-icons/fa";

// export default function Downloader() {
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [studentName, setStudentName] = useState("");
//   const [studentClass, setStudentClass] = useState("");
//   const [studentRoll, setStudentRoll] = useState("");
//   const [downloadLinks, setDownloadLinks] = useState([]);

//   const fetchAvailablePdfs = async () => {
//     if (!selectedSchool || !studentClass || !studentRoll || !studentName) {
//       toast.warning("Please fill in all fields before searching!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `/api/get-pdfs?school=${encodeURIComponent(selectedSchool.value)}&class=${encodeURIComponent(studentClass)}&roll=${encodeURIComponent(studentRoll)}&name=${encodeURIComponent(studentName)}`
//       );
//       const data = await response.json();

//       if (response.ok) {
//         setDownloadLinks(data.files);
//         toast.success("PDFs found successfully!");
//       } else {
//         toast.error(data.error || "No PDFs found for the given details.");
//         setDownloadLinks([]);
//       }
//     } catch (error) {
//       toast.error("Error fetching PDFs. Please try again.");
//       setDownloadLinks([]);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-950 bg-cover bg-center" style={{ backgroundImage: "url('/backgroundd.jpg')" }}>
//       <div className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-96 border border-white/20">
//         <h1 className="text-2xl font-bold text-black mb-4 text-center">📄 Download Student PDFs</h1>

//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />

//         {/* Search Filter for Schools */}
//         <div className="mb-4">
//           <SearchFilter onSelectSchool={setSelectedSchool} />
//         </div>

//         <input
//           type="text"
//           placeholder="Enter Students Full Name"
//           className="w-full p-2 border border-white/30 bg-white/10 text-black placeholder-gray-800 rounded-xl outline-none focus:border-blue-300 transition-all duration-300"
//           value={studentName}
//           onChange={(e) => setStudentName(e.target.value)}
//         />

//         <select
//           className="w-full p-2 mt-3 border border-white/30 bg-white/10 text-black placeholder-gray-800 rounded-xl outline-none focus:border-blue-300 transition-all duration-300"
//           value={studentClass}
//           onChange={(e) => setStudentClass(e.target.value)}
//         >
//           <option value="">Select Class</option>
//           {[
//             "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"
//           ].map((cls) => (
//             <option key={cls} value={cls}>{cls}</option>
//           ))}
//         </select>


//         <input
//           type="text"
//           placeholder="Enter Student RollNo"
//           className="w-full p-2 mt-3 border border-white/30 bg-white/10 text-black placeholder-gray-800 rounded-xl outline-none focus:border-blue-300 transition-all duration-300"
//           value={studentRoll}
//           onChange={(e) => setStudentRoll(e.target.value)}
//         />

//         <button
//           className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
//           onClick={fetchAvailablePdfs}
//         >
//           🚀 Show Available PDFs
//         </button>

//         {downloadLinks.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-white mb-2">📜 Available PDFs:</h2>
//             <ul className="space-y-2">
//               {downloadLinks.map((link, index) => (
//                 <li key={index} className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
//                   <a href={link.url} download className="block text-blue-300 hover:text-white transition-all duration-300">
//                     🔥 {link.name}
//                   </a>
//                   <a href={link.url} target="_blank" rel="noopener noreferrer"
//                     className="p-2 m-2 bg-blue-500 text-white text-sm rounded-lg shadow-md transition-all duration-300 hover:bg-blue-600">
//                     <FaEye className="mr-2" />
//                   </a>
//                   <a href={link.url} download
//                     className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg shadow-md transition-all duration-300 hover:bg-green-600 flex items-center">
//                     <FaDownload className="mr-1" /> Download
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../components/SearchFilter";
import { FaDownload, FaEye } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://ferroynnuxmgpchfivdm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcnJveW5udXhtZ3BjaGZpdmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyODAzNTEsImV4cCI6MjA1Nzg1NjM1MX0.shy07yRxYHKPX2aEqfLnEMVaitx9PqPFAPz5m-Ku2vk"
);

export default function Downloader() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentRoll, setStudentRoll] = useState("");
  const [downloadLinks, setDownloadLinks] = useState([]);

  const fetchAvailablePdfs = async () => {
    if (!selectedSchool || !studentClass || !studentRoll || !studentName) {
      toast.warning("Please fill in all fields before searching!");
      return;
    }

    try {
      const folderPath = `${selectedSchool.value}`;
      const fileName = `${studentName}-${studentClass}-${studentRoll}.pdf`;

      // Fetch the list of PDFs in the school's folder
      const { data, error } = await supabase.storage
        .from("pdfs")
        .list(folderPath, { search: fileName });

      if (error || !data.length) {
        toast.error("No PDFs found for the given details.");
        setDownloadLinks([]);
        return;
      }

      const baseUrl = `https://ferroynnuxmgpchfivdm.supabase.co/storage/v1/object/public/pdfs`;

      const downloadLinks = data.map((file) => ({
        name: file.name,
        url: `${baseUrl}/${folderPath}/${file.name}`,
      }));

      setDownloadLinks(downloadLinks);
      toast.success("PDFs found successfully!");
    } catch (error) {
      toast.error("Error fetching PDFs. Please try again.");
      setDownloadLinks([]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950 bg-cover bg-center" style={{ backgroundImage: "url('/backgroundd.jpg')" }}>
      <div className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-96 border border-white/20">
        <h1 className="text-2xl font-bold text-black mb-4 text-center">📄 Download Student PDFs</h1>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />

        {/* Search Filter for Schools */}
        <div className="mb-4">
          <SearchFilter onSelectSchool={setSelectedSchool} />
        </div>

        <input
          type="text"
          placeholder="Enter Student's Full Name"
          className="w-full p-2 border border-white/30 bg-white/10 text-black placeholder-gray-800 rounded-xl outline-none focus:border-blue-300 transition-all duration-300"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <select
          className="w-full p-2 mt-3 border border-white/30 bg-white/10 text-black placeholder-gray-800 rounded-xl outline-none focus:border-blue-300 transition-all duration-300"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"].map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Student Roll No"
          className="w-full p-2 mt-3 border border-white/30 bg-white/10 text-black placeholder-gray-800 rounded-xl outline-none focus:border-blue-300 transition-all duration-300"
          value={studentRoll}
          onChange={(e) => setStudentRoll(e.target.value)}
        />

        <button
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={fetchAvailablePdfs}
        >
          🚀 Show Available PDFs
        </button>

        {downloadLinks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-2">📜 Available PDFs:</h2>
            <ul className="space-y-2">
              {downloadLinks.map((link, index) => (
                <li key={index} className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                  <a href={link.url} download className="block text-blue-300 hover:text-white transition-all duration-300">
                    🔥 {link.name}
                  </a>
                  <a href={link.url} target="_blank" rel="noopener noreferrer"
                    className="p-2 m-2 bg-blue-500 text-white text-sm rounded-lg shadow-md transition-all duration-300 hover:bg-blue-600">
                    <FaEye className="mr-2" />
                  </a>
                  <a href={link.url} download
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg shadow-md transition-all duration-300 hover:bg-green-600 flex items-center">
                    <FaDownload className="mr-1" /> Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
