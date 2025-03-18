import { supabase } from "./supabase";

export async function getPdfUrl(schoolName, fileName) {
  const { data } = await supabase
    .storage
    .from("pdfs") // Bucket name
    .getPublicUrl(`pdfs/${schoolName}/${fileName}`); // Adjusted path

  return data.publicUrl;
}
