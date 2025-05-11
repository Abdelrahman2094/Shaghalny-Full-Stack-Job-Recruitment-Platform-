import { ClockIcon, TrophyIcon, WalletIcon, FaceSmileIcon,  PresentationChartBarIcon,MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid"; 
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";


function TopHome(){

    return(

        <div className="text-center py-10">

                <div className="flex gap-10 mb-5">
                    <MagnifyingGlassCircleIcon className="h-25 w-25 text-white mx-auto  bg-black rounded-xl p-2.5 mt-50 duration-300 hover:bg-violet-800" />
                    <BuildingOfficeIcon className="h-25 w-25 text-white mx-auto  bg-black rounded-xl p-2.5 mt-25 duration-300 hover:bg-violet-800" />
                    <WalletIcon className="h-25 w-25 text-white mx-auto  bg-black rounded-xl p-2.5 mt-50 duration-300 hover:bg-violet-800" />
                </div>
                <h1 className="text-6xl font-bold mb-20">Explore 5,000+ job listings</h1>
                <p className="text-gray-600  text-2xl">Connect with top companies, recruit skilled professionals</p>
                    <div className=" flex x gap-155">
                        <ClockIcon className="h-25 w-25 text-white mx-auto bg-black rounded-xl p-2.5 duration-300 hover:bg-violet-800"/>
                        < PresentationChartBarIcon className="h-25 w-25 text-white mx-auto bg-black rounded-xl p-2.5 duration-300 hover:bg-violet-800" />
                    </div>
                
                    <div className="flex justify-center gap-10 mt-4">
                        
                    </div>
        </div>

    );
}
export default TopHome;