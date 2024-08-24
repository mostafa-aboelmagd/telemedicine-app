import Banner from "@/components/BannerComp/banner";
import Connection from "@/components/ConnectionComp/connection";
import HowItWorks from "@/components/HowItWorksComp/howItWorks";
import Navbar from "@/components/navbarComp/navbar";
import ReadyTherapist from "@/components/ReadyTherapistComp/readyTherapist";
export default function Home() {
  return (
    <main className="flex flex-col space-y-12">
      <Navbar />
      <Banner />
      <ReadyTherapist />
      <Connection />
      <HowItWorks />
    </main>
  );
}
