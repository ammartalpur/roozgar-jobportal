import { Button } from "../components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { Link } from "react-router-dom"
import companies from '../data/companies.json'
import faq from '../data/faq.json'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Deam Job and Get Hired
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4">
        <Link to="/jobs">
          {/* Optional: Add w-full to Button if you want it to stretch on mobile */}
          <Button variant={"blue"} size={"xl"}>
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size={"xl"}>
            Post a job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className={"flex gap-5 sm:gap-5 items-center"}>
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className={"basis-1/3 lg:basis-1/6"}>
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src="/banner.jpeg" alt="" className="w-full" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs , manage applications , and find the best candidates
          </CardContent>
        </Card>
      </section>

      <Accordion type="single" collapsible>
        {faq.map((faq, key) => {
          return (
            <AccordionItem key={key} value={`index-${key}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}

export default LandingPage