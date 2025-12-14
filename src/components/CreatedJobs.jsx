import { getMyJobs } from '@/api/apiJob';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import JobCard from './job-card';
import { BarLoader } from 'react-spinners';

const CreatedJobs = () => {
  const { user } = useUser();
  const {
    loading: loadingCreateJobs,
    data: createdJob,
    fn: fnCreatedJob,
  } = useFetch(getMyJobs, { recuriter_id: user.id });

  useEffect(() => {
    fnCreatedJob()
  }, [])

   
  if (loadingCreateJobs) { 
   return  <BarLoader className={"mb-4"} width={"100%"} color="#36d7b7" />
  } 

  return (
    <div>
      <div className="mt-5 mb-5 flex flex-row flex-wrap gap-2">
        {createdJob?.length ? (
          createdJob.map((job, index) => {
            return (
              <JobCard
                job={job}
                key={index}
                onJobSaved={fnCreatedJob}
                isMyJob
              />
            );
          })
        ) : (
          <div>No Jobs Found</div>
        )}
      </div>
    </div>
  );
}

export default CreatedJobs