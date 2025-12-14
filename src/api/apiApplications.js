import supabaseClient from "@/utils/supabase"

export const applyToJob = async (token, _, jobData) => {

  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const ext = jobData?.resume?.name?.split(".").pop() || "pdf";
  const filePath = `resume-${random}-${jobData.candidate_id}.${ext}`;
  
  const { error: storageError } = await supabase.storage
    .from('resume')
    .upload(filePath, jobData.resume);

  if (storageError) {
    console.error("[apiApplications.js] Error uploading resume:", storageError);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('resume')
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData?.publicUrl || filePath;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        job_id: jobData.job_id,
        candidate_id: jobData.candidate_id,
        name: jobData.name,
        skills: jobData.skills,
        experience: jobData.experience,
        education: jobData.education,
        resume: publicUrl,
        status: "applied",
      },
    ])
    .select();

  if (error) {
    console.error("[apiApplications.js] Error inserting application:", error);
    return null;
  }

  return data;
}


export const updateApplicationsStatus = async (token , {job_id } , status) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("applications").update({ status }).eq("job_id", job_id).select()
  
  if (error || data.length === 0) {
    console.error("Error updating Applications status: ", error);
    return null;
  }

  return data;
}

export const getApplications = async (token , {user_id}) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .select("* , job:jobs(*, company:companies(name, logo_url))")
    .eq("candidate_id", user_id);
  
  if (error) {
    console.error("Error fetching applications", error);
    return null;
  }

  return data;
};