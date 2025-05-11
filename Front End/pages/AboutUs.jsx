import { ArrowRight, MessageSquare, Users, Grid3X3, Star } from "lucide-react"
import { Link } from "react-router-dom";
import Abdelrahman from '../assets/images/Abdelrahman.jpg'
import Omar from '../assets/images/Omar.jpg'
import Nuha from '../assets/images/Nuha.jpg'
import Kanzy from '../assets/images/Kanzy.jpg'



 function AboutUs() {
  return (
    <div className="bg-purple-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Great Talent With Great Opportunities</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
          Since 2010, we've been bridging the gap between exceptional candidates and forward-thinking companies,
          creating lasting professional relationships.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 text-center px-8">
        <div className="inline-block bg-purple-800 text-white px-5 py-2 rounded-full mb-4 text-xl">Our Story</div>
        <h2 className="text-4xl font-bold mb-6">From Startup to Industry Leader</h2>
        <div className="max-w-4xl mx-auto text-gray-600 space-y-6">
          <p>
            Founded in 2010, our recruitment agency began with a simple mission: to humanize the hiring process. What
            started as a small team of three passionate recruiters has grown into a nationwide network of talent
            acquisition specialists.
          </p>
          <p>
            Over the years, we've refined our approach, embraced new technologies, and expanded our expertise across
            industries. But our core belief remains unchanged – that the right match between employer and employee
            creates transformative opportunities for both.
          </p>
          <p>
            Today, we're proud to have facilitated over 10,000 successful placements and to be trusted partners to
            companies ranging from innovative startups to Fortune 500 corporations.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-800 text-white px-5 py-2 rounded-full mb-4 text-xl">Our Values</div>
          <h2 className="text-4xl font-bold mb-6">The Principles That Guide Us</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our core values shape every interaction, decision, and placement we make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-purple-800 mb-4">
              <Star className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in every placement, ensuring the perfect match between talent and opportunity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-purple-500 mb-4">
              <Grid3X3 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="text-gray-600">
              We operate with complete transparency and honesty in all our client and candidate relationships.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-pink-500 mb-4">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We leverage cutting-edge recruitment technologies and methodologies to stay ahead of industry trends.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-pink-600 mb-4">
              <MessageSquare className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalization</h3>
            <p className="text-gray-600">
              We believe in tailored approaches that recognize the unique needs of each client and candidate.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Meet the Experts Behind Our Success</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our diverse team brings together decades of industry experience and a passion for connecting talent with
            opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Team members with actual images */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-full aspect-square rounded-lg mb-4 overflow-hidden">
             
             {<img 
      src={Omar} 
      alt="Omar sherif" 
      className="w-full h-full object-cover"
    /> }

            </div>
            <h3 className="text-lg font-bold">Omar Sherif</h3>
            <p className="text-purple-800 text-sm mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
            15+ years in talent acquisition and HR leadership across tech and finance sectors.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
  <div className="w-full aspect-square rounded-lg mb-4 overflow-hidden">
    {<img 
      src={Abdelrahman} 
      alt="Abdelrahman" 
      className="w-full h-full object-cover"
    /> }
  </div>
  <h3 className="text-lg font-bold">Abdelrahman Sherif</h3>
  <p className="text-purple-800 text-sm mb-2">Acquisition Specialist</p>
  <p className="text-gray-600 text-sm">
  Acquisition specialist driving platform growth through partnerships and user onboarding.
  </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-full aspect-square rounded-lg mb-4 overflow-hidden">
            {<img 
      src={ Kanzy} 
      alt="Kanzy Waleed" 
      className="w-full h-full object-cover"
    /> }
            </div>
              <h3 className="text-lg font-bold">Kanzy Waleed</h3>
              <p className="text-purple-800 text-sm mb-2">Head of Recruitment</p>
              <p className="text-gray-600 text-sm">
              Former tech recruiter with experience at Fortune 500 companies and startups alike.
              </p>
            </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-full aspect-square rounded-lg mb-4 overflow-hidden">
          
          {<img 
      src={Nuha} 
      alt="Nuha Saudi" 
      className="w-full h-full object-cover"
    />}
          
           
              
            </div>
            
            <h3 className="text-lg font-bold">Nuha Saudi</h3> 
            <p className="text-purple-800 text-sm mb-2">Client Relations Director</p>
            <p className="text-gray-600 text-sm">
            Specialized in building lasting partnerships with companies of all sizes.
            </p>
          </div>

         
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-pink-100 text-purple-500 px-4 py-1 rounded-full mb-4">Testimonials</div>
          <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it – hear from the companies we've helped grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="italic text-gray-800 mb-4">
              "Their team understood our company culture perfectly and found candidates who not only had the skills but
              also fit our values."
            </p>
            <h4 className="font-bold">Emily Rodriguez</h4>
            <p className="text-gray-600 text-sm">TechVision Inc.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="italic text-gray-800 mb-4">
              "The quality of candidates and the speed of placement exceeded our expectations. A true partner in our
              growth."
            </p>
            <h4 className="font-bold">David Chang</h4>
            <p className="text-gray-600 text-sm">Innovate Solutions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Hiring Process?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
          Whether you're looking to hire top talent or find your next career opportunity, we're here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/ContactUs" className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-600 transition flex items-center justify-center">
           Contact Us
            <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          
        </div>
      </section>
    </div>
  )
} export default AboutUs;