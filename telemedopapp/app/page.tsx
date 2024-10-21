import Banner from "@/components/BannerComp/banner";
import HowItWorks from "@/components/HowItWorksComp/howItWorks";
export default function Home() {
  return (
    <main className="flex flex-col space-y-10 md:space-y-20  mb-5">
      <Banner />
      <HowItWorks />
    </main>
  );
}
