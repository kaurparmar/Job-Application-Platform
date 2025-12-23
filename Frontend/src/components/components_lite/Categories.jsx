import React from 'react'
import JobCarousel from '../ui/JobCarousel';
const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Cybersecurity Engineer",
    "Product Manager",
    "Product Manager",
    "UI/UX Designer",
    "Graphics Engineer",
    "Video Editor",
];

function Categories() {
  return (
    <div>
      <JobCarousel categories={Category}/>
    </div>
  )
}

export default Categories
