import { useParams } from 'react-router-dom';
import GraphicDesignInternForm from './GraphicDesignInternForm'; // Form for Graphic Design Intern
import FrontendDeveloperForm from './FrontendDeveloperForm'; // Form for Frontend Developer
// Import other forms as needed

const JobApplication = () => {
  const { jobId } = useParams();  // Get jobId from the URL

  // Conditionally render the correct form based on jobId
  let form;
  switch (jobId) {
    case 'graphic_design_intern':
      form = <GraphicDesignInternForm />;
      break;
    case 'frontend_developer':
      form = <FrontendDeveloperForm />;
      break;
    // Add more cases for other job types
    default:
      form = <div>No form available for this job.</div>;
  }

  return (
    <div>
      <h2>Apply for {jobId.replace(/_/g, ' ')}</h2>
      {form}
    </div>
  );
};

export default JobApplication;
