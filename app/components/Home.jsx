"use client";

import React from "react";
import Head from "next/head";
import Banner from "./Banner";
import CityCrousel from "./CityCrousel";
import CollageCard from "./CollageCard";
import CourseFinder from "./CourseCard";
import Testimonial from "./Testimonial";
import CareerGuidance from "./CareerGuidance";
import CollagePredictor from "./CollagePredictor";

const Home = () => {
  return (
    <>
      <Head>
        <title>Career Aashram | Online Career Guidance & Counseling for Students in India</title>
        <meta
          name="description"
          content="career guidance, career counseling, online counseling India, student career advice, best career options, college admission guidance, career test India, career planning, courses after 12th, top colleges India, online career guidance platform, study in India"
        />
        <meta
          name="keywords"
          content="career guidance, career counseling, online counseling India, student career advice, best career options, college admission guidance, career test India, career planning, courses after 12th, top colleges India, online career guidance platform, study in India"
        />
        <meta name="classification" content="Career Guidance, Education, Counseling" />
      </Head>

      <Banner />
      <CityCrousel />
      <CollageCard />
      <CourseFinder />
      <CollagePredictor />
      <CareerGuidance />
      <Testimonial />
    </>
  );
};

export default Home;
