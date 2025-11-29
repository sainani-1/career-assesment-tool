import careerData from "../data/careerData";

export default function ScoreSummary({ result }) {
  const data = careerData[result.recommendation];

  return (
    <div className="result">
      <h3>Assessment Result</h3>

      <p>
        <strong>Recommended Career Area:</strong> {result.recommendation}
      </p>

      <h4>Score Breakdown</h4>
      <pre>{JSON.stringify(result.scores, null, 2)}</pre>

      <h4>Career Details</h4>
      <p>{data.description}</p>

      <h4>Top Careers</h4>
      {data.jobs.map((j) => (
        <li>{j}</li>
      ))}

      <h4>Skills</h4>
      {data.skills.map((s) => (
        <li>{s}</li>
      ))}
    </div>
  );
}
