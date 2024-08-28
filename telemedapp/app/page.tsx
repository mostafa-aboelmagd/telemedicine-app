import Banner from "@/components/BannerComp/banner";
import Benefits from "@/components/Benefits/benefits";
import Connection from "@/components/ConnectionComp/connection";
import HowItWorks from "@/components/HowItWorksComp/howItWorks";
import Navbar from "@/components/navbarComp/navbar";
import ReadyTherapist from "@/components/ReadyTherapistComp/readyTherapist";
import Reviews from "@/components/Reviews/reviews";
import Trusted from "@/components/TrustedComp/trusted";
export default function Home() {
  return (
    <main className="flex flex-col space-y-20">
      <Navbar />
      <Banner />
      <ReadyTherapist />
      <Connection />
      <HowItWorks />
      <Reviews />
      <Trusted />
      <Benefits />
    </main>
  );
}
