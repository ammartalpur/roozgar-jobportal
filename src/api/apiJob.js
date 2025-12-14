import supabaseClient from "@/utils/supabase";

export const getJob = async (token , { location , company_id , searchQuery}) => {
  

  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("* , company:companies(name , logo_url) , saved: saved_jobs(id)");

  if (location) {
    query = query.eq("location" , location)
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[apiJob.js] Error getting jobs" , error);
    return null;
  }

  return data;
}


export const saveJob = async (token , {alreadySaved} , saveData) =>{
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase.from("saved_jobs").delete().eq("job_id", saveData.job_id)
    if (deleteError) {
      console.error("[apiJobs.js] Error Deleting saved jobs" , deleteError)
      return null;
    }
    return data
  } else {
    const { data, error: insertError } = await supabase.from("saved_jobs").insert([saveData]).select();
    if (insertError) {
      console.error(
        "[apijob.js] Error inserting job in saved_jobs",
        insertError
      );
      return null
    }
    return data
  }

  
}

export const getSingleJob = async (token , {job_id}) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("jobs").select("* , company:companies(name, logo_url) , applications: applications(*)").eq("id", job_id).single();

  if (error) {
    console.error("Error fetching Job", error);
    return null;
  }
  return data
}

export const updateHiringStatus = async (token , {job_id} , isOpen) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("jobs").update({ isOpen }).eq("id", job_id).select();

  if (error) {
    console.error("Error updating job status", error);
    return null
  }

  return data;
}


export const addNewJob = async (token, _, jobData) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("jobs").insert([jobData]).select()
  
  if (error) {
    console.error("Error creating job", error);
    return null;
  }

  return data;
}


export const getSavedJob = async (token) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching job", error);
    return null;
  }

  return data;
};

export const getMyJobs = async (token, { recuriter_id }) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
    *,
    company:companies(name, logo_url)
  `
    )
    .eq("recuriter_id", recuriter_id);


  if (error) {
    console.error("Error fetching job", error);
    return null;
  }

  return data;
};

export const deleteJob = async (token, { job_id }) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select()
  
  if (error) {
    console.error("Error deleting job", error);
    return null;
  }

  return data;
};
