import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import AstryxDiscoveryBanner from './_components/AstryxDiscoveryBanner';
import Experiences from './_components/Experiences';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import LatestBlogs from './_components/LatestBlogs';

export default function Home() {
    return (
        <div className="bg-[#FAF8F5] min-h-screen text-[#0A1317] selection:bg-[#0064E0] selection:text-white">
            <Banner />
            <AboutMe />
            <Skills />
            <Experiences />
            <ProjectList />
            <LatestBlogs />
            <AstryxDiscoveryBanner />
        </div>
    );
}
