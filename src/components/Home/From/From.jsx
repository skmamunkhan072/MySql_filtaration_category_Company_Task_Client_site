import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// React icon
import { MdDelete } from "react-icons/md";

const From = () => {
  const navigate = useNavigate();
  const [defaultAllSkills, setDefaultAllSkills] = useState("");
  const [allSkills, setAllSkills] = useState([]);
  // handleKeyDown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log(e.target.value);
      if (defaultAllSkills) {
        setDefaultAllSkills("");
        const newAllSkill = [...allSkills, defaultAllSkills];
        setAllSkills(newAllSkill);
      }
    }
  };

  // handelAllSkilName
  const handelAllSkilName = (skilName) => {
    const newAllSkill = allSkills.filter((skill) => skill !== skilName);
    setAllSkills(newAllSkill);
  };

  const jobPostData = (e) => {
    e.preventDefault();
    const form = e.target;
    const jobTitle = form.jobTitle.value;
    const JobDescription = form.JobDescription.value;
    const location = form.location.value;
    const jobType = form.jobType.value;
    const expected = form.expected.value;
    const experience = form.experience.value;
    const jobPostData = {
      jobTitle,
      JobDescription,
      location,
      jobType,
      skills: allSkills,
      expected,
      experience,
    };
    jobPostFun(jobPostData, form);
  };

  // job post function
  const jobPostFun = (jobPostData, form) => {
    if (!allSkills.length) return;

    fetch("http://localhost:5000/job_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobPostData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.affectedRows) {
          form.reset();
          navigate("/Job-details");
        }
      });
  };

  console.log(defaultAllSkills);

  return (
    <div>
      <div>
        <h1 className="text-white mb-10">
          <Link to="/Job-details">Job Search</Link>
        </h1>
      </div>
      <div className="dark:bg-gray-900 min-h-[100vh] pt-20 px-20">
        <form onSubmit={jobPostData}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="jobTitle"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Job Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="JobDescription"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Job Discription
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="requerSkills"
              id="requerSkills"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={defaultAllSkills}
              onChange={(e) => setDefaultAllSkills(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label
              htmlFor="requerSkills"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              required
            >
              Requer Skills
            </label>

            {allSkills && (
              <div className=" flex justify-start flex-wrap items-center dark:text-white mt-3">
                {allSkills.map((skil, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-2 mr-4 mt-3 text-white bg-gray-800  focus:ring-4  font-medium rounded-lg text-sm dark:bg-gray-800  dark:border-gray-700"
                  >
                    <span className="p-1">{skil}</span>
                    <span
                      className="p-1 ml-3 cursor-pointer rounded-full bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={() => handelAllSkilName(skil)}
                    >
                      <MdDelete className="text-xl" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="location"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Location
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                name="jobType"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected>remote</option>
                <option>partial</option>
                <option>onsite</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                name="experience"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected>Fresher</option>
                <option>Intermediate</option>
                <option>MId Sinier</option>
                <option>Expert</option>
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                name="expected"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default From;
