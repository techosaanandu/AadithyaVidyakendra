
// import fs from 'fs';
// import path from 'path';

// export async function GET(request) {
//   const url = new URL(request.url);
//   const school = url.searchParams.get('school');
//   const studentClass = url.searchParams.get('class');
//   const roll = url.searchParams.get('roll');
//   const name = url.searchParams.get('name');

//   if (!school || !studentClass || !roll || !name) {
//     return new Response(JSON.stringify({ error: 'Missing query parameters' }), { status: 400 });
//   }

//   const folderPath = path.join(process.cwd(), 'public', 'pdfs', school);
//   if (!fs.existsSync(folderPath)) {
//     return new Response(JSON.stringify({ error: 'No files found for this school' }), { status: 404 });
//   }

//   const files = fs.readdirSync(folderPath);

//   // Function to normalize text for matching
//   const normalize = (str) => str.toLowerCase().replace(/\s+/g, ''); // Remove spaces & lowercase

//   // Normalize user input
//   const normalizedInput = normalize(`${name}-${studentClass}-${roll}.pdf`);

//   console.log("Looking for normalized match:", normalizedInput);
//   console.log("Available files:", files);

//   // Check for a match with normalization
//   const matchingFiles = files.filter(file => {
//     const normalizedFile = normalize(file);
//     return normalizedFile === normalizedInput;
//   });

//   console.log("Matched files:", matchingFiles);

//   if (matchingFiles.length === 0) {
//     return new Response(JSON.stringify({ error: 'No matching PDFs found' }), { status: 404 });
//   }

//   const fileUrls = matchingFiles.map(file => ({
//     name: file,
//     url: `/pdfs/${school}/${file}`
//   }));

//   return new Response(JSON.stringify({ files: fileUrls }), { status: 200 });
// }
// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase";

// export async function GET(request) {
//   try {
//     const url = new URL(request.url);
//     const school = url.searchParams.get("school");
//     const studentClass = url.searchParams.get("class");
//     const roll = url.searchParams.get("roll");
//     const name = url.searchParams.get("name");

//     if (!school || !studentClass || !roll || !name) {
//       return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
//     }

//     // 🔹 Construct the folder path inside Supabase Storage
//     const folderPath = `pdfs/${school}/`;

//     // Fetch all PDFs from the specified school folder
//     const { data, error } = await supabase.storage.from("pdfs").list(folderPath);

//     if (error) {
//       console.error("Supabase Error:", error);
//       return NextResponse.json({ error: "Failed to fetch PDFs" }, { status: 500 });
//     }

//     // 🔹 Function to normalize text for matching
//     const normalize = (str) => str.toLowerCase().replace(/\s+/g, ""); // Remove spaces & lowercase

//     // 🔹 Normalize user input
//     const normalizedInput = normalize(`${name}-${studentClass}-${roll}.pdf`);

//     console.log("Looking for normalized match:", normalizedInput);
//     console.log("Available files:", data.map((file) => file.name));

//     // 🔹 Check for a match with normalization
//     const matchingFiles = data.filter((file) => {
//       const normalizedFile = normalize(file.name);
//       // return normalizedFile === normalizedInput;
//       return normalizedFile.includes(normalizedInput);
//     });

//     console.log("Matched files:", matchingFiles);

//     if (matchingFiles.length === 0) {
//       return NextResponse.json({ error: "No matching PDFs found" }, { status: 404 });
//     }

//     // 🔹 Generate public URLs for matched PDFs
//     const fileUrls = matchingFiles.map((file) => ({
//       name: file.name,
//       url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${school}/${file.name}`,
//     }));

//     return NextResponse.json({ files: fileUrls }, { status: 200 });

//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// import fs from 'fs';
// import path from 'path';

// export async function GET(request) {
//   const url = new URL(request.url);
//   const school = url.searchParams.get('school');
//   const studentClass = url.searchParams.get('class');
//   const roll = url.searchParams.get('roll');
//   const name = url.searchParams.get('name');

//   if (!school || !studentClass || !roll || !name) {
//     return new Response(JSON.stringify({ error: 'Missing query parameters' }), { status: 400 });
//   }

//   const folderPath = path.join(process.cwd(), 'public', 'pdfs', school);
//   if (!fs.existsSync(folderPath)) {
//     return new Response(JSON.stringify({ error: 'No files found for this school' }), { status: 404 });
//   }

//   const files = fs.readdirSync(folderPath);

//   // Function to normalize text for matching
//   const normalize = (str) => str.toLowerCase().replace(/\s+/g, ''); // Remove spaces & lowercase

//   // Normalize user input
//   const normalizedInput = normalize(`${name}-${studentClass}-${roll}.pdf`);

//   console.log("Looking for normalized match:", normalizedInput);
//   console.log("Available files:", files);

//   // Check for a match with normalization
//   const matchingFiles = files.filter(file => {
//     const normalizedFile = normalize(file);
//     return normalizedFile === normalizedInput;
//   });

//   console.log("Matched files:", matchingFiles);

//   if (matchingFiles.length === 0) {
//     return new Response(JSON.stringify({ error: 'No matching PDFs found' }), { status: 404 });
//   }

//   const fileUrls = matchingFiles.map(file => ({
//     name: file,
//     url: `/pdfs/${school}/${file}`
//   }));

//   return new Response(JSON.stringify({ files: fileUrls }), { status: 200 });
// }
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const school = url.searchParams.get("school");
    const studentClass = url.searchParams.get("class");
    const roll = url.searchParams.get("roll");
    const name = url.searchParams.get("name");

    if (!school || !studentClass || !roll || !name) {
      return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
    }

    // 🔹 Construct the folder path inside Supabase Storage
    const folderPath = `pdfs/${school}/`;

    // Fetch all PDFs from the specified school folder
    const { data, error } = await supabase.storage.from("pdfs").list(folderPath);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to fetch PDFs" }, { status: 500 });
    }

    // 🔹 Function to normalize text for matching
    const normalize = (str) => str.toLowerCase().replace(/\s+/g, ""); // Remove spaces & lowercase

    // 🔹 Normalize user input
    const normalizedInput = normalize(`${name}-${studentClass}-${roll}.pdf`);

    console.log("Looking for normalized match:", normalizedInput);
    console.log("Available files:", data.map((file) => file.name));

    // 🔹 Check for a match with normalization
    const matchingFiles = data.filter((file) => {
      const normalizedFile = normalize(file.name);
      // return normalizedFile === normalizedInput;
      return normalizedFile.includes(normalizedInput);
    });

    console.log("Matched files:", matchingFiles);

    if (matchingFiles.length === 0) {
      return NextResponse.json({ error: "No matching PDFs found" }, { status: 404 });
    }

    // 🔹 Generate public URLs for matched PDFs
    const fileUrls = matchingFiles.map((file) => ({
      name: file.name,
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${school}/${file.name}`,
    }));

    return NextResponse.json({ files: fileUrls }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
