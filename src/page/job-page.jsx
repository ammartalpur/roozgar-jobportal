import { getSingleJob, updateHiringStatus } from "@/api/apiJob";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobDrawer from "@/components/apply-job";
import ApplicationCard from "@/components/ApplicationCard";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fetchJob,
  } = useFetch(getSingleJob, { job_id: id });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id }
  );

  const handleStatusChange = (value) => {
    const isOpen = value == "open";
    fnHiringStatus(isOpen).then(() => fetchJob());
  };

  useEffect(() => {
    if (isLoaded) fetchJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width="100%" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-6 mb-16 max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-4">
        <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        {job?.company?.logo_url && (
          <img
            src={job.company.logo_url}
            alt={job.title}
            className="h-14 object-contain"
          />
        )}
      </div>

      {/* Meta info */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-gray-200 sm:text-lg">
        <div className="flex items-center gap-2">
          <MapPinIcon size={20} />
          {job?.location}
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={20} /> {job?.applications?.length} Applicants
        </div>

        <div className="flex items-center gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen size={20} /> Open
            </>
          ) : (
            <>
              <DoorClosed size={20} /> Closed
            </>
          )}
        </div>
      </div>

      {job?.recuriter_id === user?.id && (
        <>
          {loadingHiringStatus ? (
            <BarLoader width={"100%"} color="#36d7b7" />
          ) : (
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger
                className="w-full"
                style={{
                  backgroundColor: job?.isOpen ? "#052e16" : "#7c2d12",
                }}
              >
                <SelectValue
                  placeholder={`Hiring Status ${
                    job?.isOpen ? "( Open )" : "( Closed )"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"open"}>Open</SelectItem>
                <SelectItem value={"closed"}>Closed</SelectItem>
              </SelectContent>
            </Select>
          )}
        </>
      )}

      {/* Job Description */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
        <p className="sm:text-lg leading-relaxed text-gray-200">
          {job?.description}
        </p>
      </section>

      {/* Job Requirements */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          What We Are Looking For
        </h2>
        <MDEditor.Markdown
          source={job?.requirement}
          className="bg-transparent sm:text-lg prose max-w-none"
        />
        {job?.recuriter_id !== user?.id && (
          <ApplyJobDrawer job={job} user={user} fetchJob={fetchJob} applied={job?.applications.find((ap)=> ap.candidate_id === user.id)} />
        )}
        
      </section>
      {job?.applications?.length > 0 && job?.recuriter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
          {job?.applications.map((application) => {
            return <ApplicationCard key={application.id} application={application}/>
          })}
        </div>
      )}
    </div>
  );
};

export default JobPage;
