import VerifyReg from "@/components/doctorTools/verifyReg";
import HowItWorks from "@/components/HowItWorksComp/howItWorks";

function ViewProfilePage() {
  return (
    <main className="flex flex-col space-y-10 md:space-y-20  mb-5">

      <VerifyReg/>
      <HowItWorks/>
    </main>

  );
}
export default ViewProfilePage;
