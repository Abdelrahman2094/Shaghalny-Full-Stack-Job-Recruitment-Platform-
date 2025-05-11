import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Link } from "react-router-dom";

export default function FAQ() {
  
  
  // FAQ data with questions and answers
  const faqData = {
    'Account & Registration': [
      { 
        question: 'How do I create an account on Shaghalny?', 
        answer: 'To create an account, click on the "Sign Up" button in the top right corner of the homepage. You can register using your email address, or sign up with your Google or LinkedIn account. Follow the prompts to complete your profile information.',
        isOpen: false 
      },
      { 
        question: 'Is it free to create a job seeker account?', 
        answer: 'Yes, creating a job seeker account on Shaghalny is completely free. You can create a profile, upload your resume, search for jobs, and apply to positions without any cost.',
        isOpen: false 
      },
      { 
        question: 'How do I reset my password if I forget it?', 
        answer: 'If you forget your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we\'ll send you a link to reset your password. The link is valid for 24 hours.',
        isOpen: false 
      },
      { 
        question: 'Can I have both an employer and job seeker account?', 
        answer: 'Yes, you can have both types of accounts, but you\'ll need to use different email addresses for each account type. This helps maintain separation between your recruiting activities and job seeking activities.',
        isOpen: false 
      },
    ],
    'Job Search & Application': [
      { 
        question: 'How do I search for jobs on Shaghalny?', 
        answer: 'You can search for jobs using the search bar on the homepage or the Jobs page. Filter results by location, job type, industry, experience level, and more. You can also browse jobs by category or use the advanced search options for more specific criteria.',
        isOpen: false 
      },
      { 
        question: 'How do I apply for a job?', 
        answer: 'Once you find a job you\'re interested in, click on the job title to view the full details. If you want to apply, click the "Apply Now" button. Depending on the employer\'s preferences, you may be directed to apply through Shaghalny or through an external website.',
        isOpen: false 
      },
      { 
        question: 'Can I save jobs to apply later?', 
        answer: 'Yes, you can save jobs to your favorites by clicking the "Save" or heart icon on any job listing. You can access your saved jobs from your dashboard under "Saved Jobs" and apply when you\'re ready.',
        isOpen: false 
      },
      { 
        question: 'How do I set up job alerts?', 
        answer: 'To set up job alerts, go to your dashboard and select "Job Alerts." Click "Create Alert" and specify your job preferences, including keywords, location, job type, and frequency of notifications. You\'ll receive email notifications when new jobs matching your criteria are posted.',
        isOpen: false 
      },
    ],
    'Resume & Profile': [
      { 
        question: 'How do I upload my resume?', 
        answer: 'To upload your resume, go to your profile section and click on the "Resume" tab. Click on "Upload Resume" and select your file. We support PDF, DOC, and DOCX formats. You can also create a resume using our resume builder tool.',
        isOpen: false 
      },
      { 
        question: 'Can employers see my profile before I apply?', 
        answer: 'By default, your profile is visible to employers searching for candidates with your skills. You can adjust your privacy settings to control who can view your profile. Go to "Settings" > "Privacy" to manage your visibility preferences.',
        isOpen: false 
      },
      { 
        question: 'How do I update my skills and experience?', 
        answer: 'To update your skills and experience, go to your profile and click on the "Edit" button. You can add new skills, update your work experience, education, and other relevant information. Remember to click "Save" when you\'re done.',
        isOpen: false 
      },
      { 
        question: 'What is the resume builder tool?', 
        answer: 'The resume builder tool is a feature that helps you create a professional resume directly on Shaghalny. It offers templates and formatting options to showcase your skills and experience effectively. To access it, go to your profile and select "Resume Builder".',
        isOpen: false 
      },
    ],
    'Employers & Recruiters': [
      { 
        question: 'How do I contact employers directly?', 
        answer: 'You can contact employers through the messaging system after applying for a job. Some employers may also enable direct messaging for their company profiles. Note that unsolicited messages may be regulated by the platform\'s communication policies.',
        isOpen: false 
      },
      { 
        question: 'Can I see who viewed my profile?', 
        answer: 'Yes, with a premium account, you can see which employers and recruiters have viewed your profile. This feature is available in the "Profile Views" section of your dashboard and shows views from the past 30 days.',
        isOpen: false 
      },
      { 
        question: 'How do I know if an employer is verified?', 
        answer: 'Verified employers display a blue checkmark badge next to their company name. This indicates that Shaghalny has confirmed the legitimacy of the company. You can also check the company\'s profile for more information about their verification status.',
        isOpen: false 
      },
    ],
    'Technical Support': [
      { 
        question: 'What browsers are supported by Shaghalny?', 
        answer: 'Shaghalny supports all major browsers including Chrome, Firefox, Safari, and Edge in their latest versions. For the best experience, we recommend using Chrome or Firefox with automatic updates enabled.',
        isOpen: false 
      },
      { 
        question: 'Is there a mobile app available?', 
        answer: 'Yes, Shaghalny has mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store. The mobile app allows you to search for jobs, receive notifications, and apply on the go.',
        isOpen: false 
      },
      { 
        question: 'How do I report a technical issue?', 
        answer: 'To report a technical issue, go to the "Help" section and click on "Report an Issue." Provide details about the problem you\'re experiencing, including any error messages and steps to reproduce the issue. Our support team will investigate and respond promptly.',
        isOpen: false 
      },
    ],
  };

  const [faqState, setFaqState] = useState(faqData);

  const toggleAccordion = (category, index) => {
    const updatedFaqs = { ...faqState };
    updatedFaqs[category][index].isOpen = !updatedFaqs[category][index].isOpen;
    setFaqState(updatedFaqs);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with gradient background */}
      <div className="bg-violet-800 p-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-white text-lg mb-8">
          Find answers to the most common questions about using Shaghalny to find your dream job.
        </p>
        
        {/* Search box */}
        
      </div>

      {/* FAQ content */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        {Object.entries(faqState).map(([category, questions]) => (
          <div key={category} className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${
              category.includes('Job Search') ? 'text-violet-800' : 
              category === 'Employers & Recruiters' ? 'text-violet-800' : 
              category === 'Technical Support' ? 'text-violet-800' : 'text-violet-800'
            }`}>
              {category}
            </h2>
            <div className="border-t border-gray-200">
              {questions.map((item, index) => (
                <div 
                  key={index}
                  className="border-b border-gray-200"
                >
                  <button
                    className="flex justify-between items-center w-full py-4 px-1 text-left focus:outline-none"
                    onClick={() => toggleAccordion(category, index)}
                  >
                    <span className={`text-lg ${
                      category.includes('Job Search') ? 'text-violet-800' : 
                      category === 'Employers & Recruiters' ? 'text-violet-800' :
                      category === 'Technical Support' ? 'text-violet-800' : 'text-violet-800'
                    }`}>
                      {item.question}
                    </span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${item.isOpen ? 'transform rotate-180' : ''} ${
                      category.includes('Job Search') ? 'text-violet-800' : 
                      category === 'Employers & Recruiters' ? 'text-violet-800' :
                      category === 'Technical Support' ? 'text-violet-800' : 'text-violet-800'
                    }`} />
                  </button>
                  {item.isOpen && (
                    <div className="pb-4 px-1">
                      <p className="text-violet-800">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still have questions section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Our support team is here to help with any questions you may have.
          </p>
          <div className="flex justify-center gap-4">
          <Link to="/ContactUs" className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-600 transition flex items-center justify-center">
          Contact Us
            
            </Link>
            
          </div>
        </div>
      </div>

      
    
    </div>
  );
}