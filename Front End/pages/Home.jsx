
import HomeSearch from "../components/HomeSearch";
import TopJob from "../components/TopJobs";
import TopHome from "../components/TopHome";

function Home(){
   return( 
   <main>
    
        <TopHome/>
        <HomeSearch/>
        <hr className="w-full h-[1px] bg-gray-300 border-none my-4 mt-25" />
        <TopJob/>

    </main>
   )
}
export default Home;