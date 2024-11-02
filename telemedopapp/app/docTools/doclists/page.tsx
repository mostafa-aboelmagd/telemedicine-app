import Doclists from "@/components/doctorTools/doclists";
import HowItWorks from "@/components/HowItWorksComp/howItWorks";

function ViewProfilePage() {
  return (
    <main className="flex flex-col space-y-10 md:space-y-20  mb-5">

      <Doclists/>
      <HowItWorks/>
    </main>

  );
}
export default ViewProfilePage;
