import supabaseClient from "@/utils/supabase";

export const getCompanies = async (token) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("[apiCompanies.js] Error getting companies", error);
    return null;
  }

  return data;
};

export const addNewCompany = async (token, _, companydata) => {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companydata.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companydata.logo);
  
  if (storageError) {
    console.error("Error uploading company logo", storageError);
    return null;
  }

  const logo_url = `${supabase.storageUrl}/object/public/company-logo/${fileName}`;

  const { data, error } = await supabase.from("companies").insert([{
    name: companydata.name,
    logo_url
  }]).select();

  if (error) {
    console.error("Error submitting company", error);
    return null;
  }

  return data;
};
