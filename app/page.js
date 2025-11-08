import Image from "next/image";

import Banner from "@/app/components/Banner";
import CityCrousel from "@/app/components/CityCrousel";
import CollageCard from "@/app/components/CollageCard";
import CourseFinder from "@/app/components/CourseCard";
import CollagePredictor from "@/app/components/CollagePredictor";
import CareerGuidance from "@/app/components/CareerGuidance";
import Testimonial from "@/app/components/Testimonial";

export default function Home() {
  return (
    <>
      <Banner />
      <CityCrousel />
      <CollageCard />
      <CourseFinder />
      <CollagePredictor />
      <CareerGuidance />
      <Testimonial />
    </>
  );
}
