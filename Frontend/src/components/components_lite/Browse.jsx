import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Job from './Job';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../../utils/data'; // make sure this points to your job API

function Browse() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/jobs`, {
          withCredentials: true, // include if using JWT cookies
        });
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 w-[85%]">
        <h1 className="font-bold text-xl my-10">
          {loading ? 'Loading Jobs...' : `Search Results: ${jobs.length}`}
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Please wait while jobs are loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
