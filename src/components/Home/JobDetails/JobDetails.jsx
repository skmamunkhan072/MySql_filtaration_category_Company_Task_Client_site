import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// react icon
import { AiFillShopping } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";

const JobDitails = () => {
  const [jobData, setJobData] = useState([]);
  const [allSkil, setAllSkil] = useState([]);
  const [jobTitle, setjobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [skill, setSkill] = useState("");
  const [expected, setExpected] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/job_info")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setJobData(data);
          for (const allSkillsdata of data) {
            const allSkilldata = allSkillsdata?.skills;
            setAllSkil(JSON.parse(allSkilldata));
          }
        }
      });
  }, []);

  const jobSearch = (e) => {
    e.preventDefault();
    const from = e.target;
    const searchJobTitle = from.jobTitle.value;
    const searchLocation = from.location.value;
    // console.log(jobTitle, location);
    setLocation(searchLocation);
    setjobTitle(searchJobTitle);
  };

  useEffect(() => {
    if (jobTitle || location || jobType || experience || skill || expected) {
      console.log(experience);

      console.log(jobTitle, location, jobType);
      fetch(
        `http://localhost:5000/search_job_info?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}&experience=${experience}&skill=${skill}&expected=${expected}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setJobData(data);
          setJobType("");
        });
    }
  }, [jobTitle, location, jobType, skill, expected, experience]);
  // remoteJob

  console.log(expected);
  return (
    <div>
      <div className="pb-20">
        <h1 className="text-white mb-10">
          <Link to="/">Home</Link>
        </h1>
        <div>
          <form className="flex items-center" onSubmit={jobSearch}>
            <div className="flex justify-start w-full">
              <div className="relative w-full mx-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none dark:text-white">
                  <h4>What</h4>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  name="jobTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search your job Name..."
                />
              </div>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none dark:text-white">
                  <h4>Location</h4>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  name="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-20 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos, Design Templates..."
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 dark:text-red-300"
                >
                  <ImLocation />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-2 -ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-5">
        <div className="text-black dark:text-white">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onClick={() => setJobType("remote")}
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Remote
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onClick={() => setJobType("onsite")}
              checked
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Onsite
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onClick={() => setJobType("partial")}
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Partial
            </label>
          </div>
          <div className="pr-10">
            <div>
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                onChange={(e) => setExperience(e.target.value)}
              >
                <option selected>Fresher</option>
                <option>Intermediate</option>
                <option>MId Sinier</option>
                <option>Expert</option>
              </select>
            </div>

            <div>
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                name="expected"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                onChange={(e) => setExpected(e.target.value)}
              >
                <option selected>CTC- 0- 2 lakhs</option>
                <option>CTC- 1- 3 lakhs</option>
                <option>CTC- 2- 4 lakhs</option>
                <option>CTC- 3- 5 lakhs</option>
                <option>CTC- 5- 7 lakhs</option>
                <option>CTC- 7- 9 lakhs</option>
                <option>CTC- 7- 10 lakhs</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          {jobData &&
            jobData.map((data, i) => (
              <div key={i}>
                <div className="w-full my-3 p-4 text-start bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                  <h5 className=" mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {data?.jobTitle}
                  </h5>
                  <p className="flex justify-start items-center">
                    <span>
                      <AiFillShopping className="text-red-300 mr-1" />
                    </span>
                    <span className="text-black dark:text-white">
                      {data?.jobType}
                    </span>
                  </p>
                  <p className="flex justify-start items-center">
                    <span>
                      <ImLocation className="text-red-300 mr-1" />
                    </span>
                    <span className="text-black dark:text-white">
                      {data?.location}
                    </span>
                  </p>
                  <span className="text-black dark:text-white">
                    Experience : {data?.experience}
                  </span>
                  <p className="mb-6 text-base text-gray-500 sm:text-md dark:text-gray-400">
                    Expected : {data?.expected}
                  </p>

                  <p className="mb-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    Job Description
                  </p>
                  <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    Job Description : {data?.JobDescription}
                  </p>
                  <p className="mb-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    skills
                  </p>

                  <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400 flex justify-start items-center flex-wrap">
                    {allSkil.map((skil, i) => (
                      <span
                        key={i}
                        className="text-white bg-gray-800 rounded-lg  px-5 py-2 mr-2 mb-2 dark:bg-gray-500 dark:border-gray-700"
                      >
                        {skil}
                      </span>
                    ))}
                  </p>
                  <div className="flex justify-end items-center">
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {!jobData.length && (
            <div className="h-[400px] flex justify-center items-center">
              <p className="text-3xl dark:text-white">Not Fund Data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDitails;
