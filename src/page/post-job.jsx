'use client'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { State } from "country-state-city";

import { Controller, useForm } from "react-hook-form";
import z, { number } from "zod";
import useFetch from "@/hooks/use-fetch";
import { getCompanies } from "@/api/apiCompanies";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import { BarLoader } from "react-spinners";
import {  useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { addNewJob } from "@/api/apiJob";
import AddCompanyDrawer from "@/components/add-company-drawer";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "description is required!" }),
  location: z.string().min(1, { message: "Select a location!" }),
  company_id: z.string().min(1, { message: "Select or add a new company!" }),
  requirement: z.string().min(1, { message: "Requirement is required!" }),
});

const PostJob = () => {

  const Navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirement: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);
  const { loading: loadingCreateJob, error: errorCreateJob, data: dataCreateJob, fn: fnCreateJob } = useFetch(addNewJob)
  useEffect(() => {
    if(dataCreateJob?.length > 0) Navigate('/jobs')
    } , [loadingCreateJob])
  
  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role !== "recruiter") {
      Navigate("/jobs");
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);
  
  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  

  const onSubmit = (data) => {
    fnCreateJob({ ...data, recuriter_id: user.id, isOpen: true });
  }


  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a job
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input placeholder={"Job Title"} {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Job Description"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              rows={4}
            />
          )}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter By Location" />
                </SelectTrigger>
                <SelectContent>
                  {State?.getStatesOfCountry("PK").map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          ></Controller>

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter By Company">
                    {field.value
                      ? companies.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {companies?.map(({ name, id }) => (
                    <SelectItem key={name} value={String(id)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          ></Controller>
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}

        <Controller
          name="requirement"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirement && (
          <p className="text-red-500">{errors.requirement.message}</p>
        )}
        {errorCreateJob?.requirement && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && <BarLoader width={"100%"} color="#36d7b7" />}
        <Button type={"submit"} variant={"blue"} size={"lg"} className={"mt-2"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
