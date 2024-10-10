import Banner from "@/components/BannerComp/banner";
import Benefits from "@/components/Benefits/benefits";
import Connection from "@/components/ConnectionComp/connection";
import HowItWorks from "@/components/HowItWorksComp/howItWorks";
import ReadyTherapist from "@/components/ReadyTherapistComp/readyTherapist";
import Reviews from "@/components/Reviews/reviews";
import Trusted from "@/components/TrustedComp/trusted";
import VideoCall from "@/components/common/VideoCall";
export default function Home() {
  return (
    <main className="flex flex-col space-y-10 md:space-y-20  mb-5">
      <Banner />
      <div className="h-screen">
        <VideoCall />
      </div>
      <ReadyTherapist />
      <Connection />
      <HowItWorks />
      <Reviews />
      <Trusted />
      <Benefits />
    </main>
  );
}
