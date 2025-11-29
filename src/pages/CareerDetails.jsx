const careerData = {
  STEM: {
    title: "STEM Career Path",
    description: "STEM careers involve analytical thinking, technology, engineering, and science.",
    jobs: ["Software Engineer", "Data Scientist", "Mechanical Engineer"],
    skills: ["Problem solving", "Maths", "Logical thinking"],
    salary: "₹6L – ₹35L per annum"
  },
  Arts: {
    title: "Arts & Creativity",
    description: "For students interested in creativity, design, communication, and media.",
    jobs: ["Graphic Designer", "Writer", "Film Editor"],
    skills: ["Creativity", "Communication"],
    salary: "₹2L – ₹15L per annum"
  },
  Business: {
    title: "Business & Management",
    description: "Management, marketing, finance and entrepreneurship careers.",
    jobs: ["Business Analyst", "Marketing Manager", "Entrepreneur"],
    skills: ["Leadership", "Communication", "Planning"],
    salary: "₹4L – ₹40L per annum"
  },
};

export default function CareerDetails({ area }) {
  const c = careerData[area] || careerData["Business"];

  return (
    <div className="career-card">
      <h2>{c.title}</h2>
      <p>{c.description}</p>
      <h3>Popular Jobs</h3>
      <ul>{c.jobs.map(j => <li key={j}>{j}</li>)}</ul>

      <h3>Skills Required</h3>
      <ul>{c.skills.map(s => <li key={s}>{s}</li>)}</ul>

      <h3>Salary Range</h3>
      <p>{c.salary}</p>
    </div>
  );
}
