import { Link } from "react-router-dom";
import { SearchIcon,Briefcase, Megaphone, Monitor, FlaskConical, Factory, Utensils, ShoppingBag, Search, DollarSign, TrendingUp } from "lucide-react";

function TopJob(){
    return(
        <section className="w-full py-12">
            <h2 className="text-3xl font-bold text-center mb-20">Top Job Categories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mr-6 ml-6">
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    <DollarSign  className="text-black h-20 w-20" />
                    <h3 className="text-2xl font-semibold mt-3 mb-2">Finance</h3>
                    <p className="text-gray-500 text-sm">1,700 Jobs Openings</p>
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    <Monitor className="text-black  rounded-sm h-20 w-20 py-2" />
                    <h3 className="text-2xl font-semibold mt-3 mb-2">IT Services</h3>
                    <p className="text-gray-500 text-sm">1,340 Jobs Openings</p>
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    <Megaphone  className="text-black  rounded-sm h-20 w-20 py-2" />
                    <h3 className="text-2xl font-semibold mt-3 mb-2">Marketing</h3>
                    <p className="text-gray-500 text-sm">2,100 Jobs Openings</p>
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    <FlaskConical  className="text-black  rounded-sm h-20 w-20 py-2" />
                    <h3 className="text-2xl font-semibold mt-3 mb-2">Science</h3>
                    <p className="text-gray-500 text-sm">560 Jobs Openings</p>
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    <Factory  className="text-black  rounded-sm h-20 w-20 py-2" />
                    <h3 className="text-2xl font-semibold mt-3 mb-2">Technology</h3>
                    <p className="text-gray-500 text-sm">1,800 Jobs Openings</p>
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    <Utensils  className="text-black  rounded-sm h-20 w-20 py-2" />
                    <h3 className="text-2xl font-semibold mt-3 mb-2">Culinary Arts</h3>
                    <p className="text-gray-500 text-sm">600 Jobs Openings</p>
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    <TrendingUp  className="text-black  rounded-sm h-20 w-20 py-2" />
                    <h3 className="text-2xl font-semibold mt-3 mb-2">Sales</h3>
                    <p className="text-gray-500 text-sm">1,900 Jobs Openings</p>
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 p-6 rounded-lg flex flex-col text-left transform transition duration-300 ease-in-out hover:scale-105">
                    
                    <h3 className="text-2xl font-semibold mt-3 mb-2">10K+ job</h3>
                    <p className="text-gray-500 text-sm">Apply Today!</p>
                    <div className="flex flex-col items-start mt-auto relative">


                    <Link to="/Jobs">
                    <button className="bg-black text-white px-6 py-2 rounded-md mt-4 
                        transform transition duration-300 ease-in-out hover:bg-violet-500 hover:scale-105 hover:shadow-lg hover:text-black font-semibold 
                        hover:font-semibold">Explore Jobs</button>
                    </Link>
                    <SearchIcon className="text-black  rounded-sm h-20 w-20 py-2 ml-auto absolute bottom-0 right-0 z-0" />
                    </div>

                </div>
                </div>

        </section>
    );
}
export default TopJob;