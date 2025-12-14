import { getCompanies } from "@/api/apiCompanies";
import { getJob } from "@/api/apiJob";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  const { user , isLoaded } = useUser()
  const [searchQuery, setSearchQuery] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [location, setLocation] = useState("");

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJob, { location, company_id, searchQuery })

  const {
    fn: fnCompanies,
    data: companies
  } = useFetch(getCompanies);
  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target)
    const query = formData.get("search-query");
    // console.log(query);

    if(query) setSearchQuery(query)
  }
  
  const clearFilters = () => {
    setSearchQuery("")
    setCompany_id("")
    setLocation("")
  }

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);
   
  useEffect(() => {
     if (isLoaded) {
       fnCompanies();
     }
   }, {isLoaded});
  
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  console.log(`[job-card] For Development Purpose, UserID: ${user.id}`);
  return (
    <div>
      <h1 className="gradient-title font-extrabold  text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {/* Add Filters Here */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type={"text"}
          placeholder="Search Jobs by Title.."
          name="search-query"
          className={"h-full flex-1 px-4 text-md "}
        />
        <Button variant={"blue"} type="submit" className={"h-full sm:w-28"}>
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={location}
          onValueChange={(value) => {
            setLocation(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter By Location" />
          </SelectTrigger>
          <SelectContent>
            {State.getStatesOfCountry("PK").map((state) => {
              return (
                <SelectItem key={state.isoCode} value={state.name}>
                  {state.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => {
            setCompany_id(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter By Company" />
          </SelectTrigger>
          <SelectContent>
            {companies?.map((company) => {
              return (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button variant={"destructive"} className={""} onClick={clearFilters}>
          {" "}
          Clear Filters{" "}
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-5 mb-5 flex flex-row flex-wrap gap-2">
          {jobs?.length ? (
            jobs.map((job, index) => {
              return (
                <JobCard
                  job={job}
                  key={index}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found</div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default JobListing