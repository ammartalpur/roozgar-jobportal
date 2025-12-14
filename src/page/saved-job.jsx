import { getSavedJob } from "@/api/apiJob";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SaveJob = () => {
  const { isLoaded} = useUser()

const {
  loading: loadingSavedJobs,
  data: savedJobs,
  fn: fnSavedJobs,
} = useFetch(getSavedJob);
  
  useEffect(() => {
    if(isLoaded) fnSavedJobs()
  } , [isLoaded])
  
  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Job
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-5 mb-5 flex flex-row flex-wrap gap-2">
          {savedJobs?.length ? (
            savedJobs.map((saved) => {
              return (
                <JobCard
                  job={saved.job}
                  key={saved.id}
                  savedInit={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div>No Saved Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SaveJob;