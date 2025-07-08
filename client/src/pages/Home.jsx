import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import Category from "../components/Category";
import NewsLetter from "../components/NewsLetter";
import FeaturesSection from '../components/FeaturesSection'; // ✅ path
const Home = () => {
  return (
    <div className="mt-10">
      <Banner />
      <Category />
      <BestSeller />
      
      <FeaturesSection />
      <NewsLetter />
    </div>
  );
};
export default Home;
