import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import useFetch from '@/hooks/use-fetch';
import { updateApplicationsStatus } from '@/api/apiApplications';
import { BarLoader } from 'react-spinners';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const RESUME_BUCKET = "resume";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const resumeUrl = application?.resume?.startsWith("http")
    ? application.resume
    : `${SUPABASE_URL}/storage/v1/object/public/${RESUME_BUCKET}/${application?.resume}`;

  const handleDownload = () => {
    if (!resumeUrl) return;
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  }

  const {
    loading: loadingUpdateApplicationStatus,
    fn: fnUpdateApplicationsStatus,
  } = useFetch(updateApplicationsStatus , {job_id: application.job_id});

  const handleStatus = (status) => {
    fnUpdateApplicationsStatus(status)
  }

  return (
    <Card>
      {loadingUpdateApplicationStatus && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className={"flex justify-between font-bold"}>
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4 flex-1"}>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15} /> {application?.experience} years of
            experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={15} /> {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={15} /> {application?.skills}
          </div>
        </div>
      </CardContent>
      <CardFooter className={"flex justify-between"}>
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status: {application?.status}
          </span>
        ) : (
          <Select onValueChange={handleStatus} defaultValue={application.status}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder={"Application Status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"applied"}>Applied</SelectItem>
              <SelectItem value={"interviewing"}>Interviewing</SelectItem>
              <SelectItem value={"hired"}>Hired</SelectItem>
              <SelectItem value={"rejected"}>Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}

export default ApplicationCard