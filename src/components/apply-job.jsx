import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z.number().min(0, { message: "Experience must be at least 0" }).int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], { message: "Education is required" }),
  resume: z.any().refine(file=>file[0] && (file[0].type === "application/pdf" || file[0].type === "application/msword"),{message: "Only PDF or Word documents are allowed"})
  
})


const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const { register , handleSubmit , control , formState: {errors} , reset} = useForm({ resolver: zodResolver(schema) });
  
  const {loading: loadingApply , error: errorApply , fn:fnApply} = useFetch(applyToJob)

  const onSubmit = (data) => {
    fnApply({ ...data, job_id: job.id, candidate_id: user.id, name: user.fullName, resume: data.resume[0] }).then(() => {
      fetchJob();
      reset()
    })
  }

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size={"lg"}
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied}
          className={"cursor-pointer"}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please fill the form below.</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <Input
            {...register("experience", { valueAsNumber: true })}
            type={"number"}
            placeholder={"Years of experience"}
            className={"flex-1"}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message} </p>
          )}
          <Input
            {...register("skills")}
            type={"string"}
            placeholder={"Skills (Comma seperated)"}
            className={"flex-1"}
          />

          {errors.skills && (
            <p className="text-red-500">{errors.skills.message} </p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                className={"cursor-pointer"}
                {...field}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Intermediate"
                    id="Intermediate"
                    className={"cursor-pointer"}
                  />
                  <Label htmlFor="Intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Graduate"
                    id="Graduate"
                    className={"cursor-pointer"}
                  />
                  <Label htmlFor="Graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Post Graduate"
                    id="Post Graduate"
                    className={"cursor-pointer"}
                  />
                  <Label htmlFor="Post Graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          ></Controller>
          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}
          <Input
            type={"file"}
            accept={".pdf , .doc , .docx"}
            className={"flex-1 file:text-gray-500f"}
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}

          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )}
          {loadingApply && <BarLoader width={"100%"} color="#36d7b7"/>}
          <Button variant={"blue"} type={"submit"} size={"lg"}>
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
