import Image from "next/image";

import Banner from "@/app/components/Banner";
import CityCrousel from "@/app/components/CityCrousel";
import CollageCard from "@/app/components/CollageCard";
import CourseFinder from "@/app/components/CourseCard";
import CollagePredictor from "@/app/components/CollagePredictor";
import CareerGuidance from "@/app/components/CareerGuidance";
import Testimonial from "@/app/components/Testimonial";


export const metadata ={
  title :"Career Aashram | Online Career Guidance & Counseling for Students in India",
  description: "career guidance, career counseling, online counseling India, student career advice, best career options, college admission guidance, career test India, career planning, courses after 12th, top colleges India, online career guidance platform, study in India",
   keywords: "career guidance, career counseling, online counseling India, student career advice, best career options, college admission guidance, career test India, career planning, courses after 12th, top colleges India, online career guidance platform, study in India"  ,   
  classification: "Career Guidance, Education, Counseling"
}

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
