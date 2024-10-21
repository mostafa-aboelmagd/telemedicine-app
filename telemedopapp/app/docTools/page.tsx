import DoctorManagementTools from "@/components/doctorTools/tools";
import HowItWorks from "@/components/HowItWorksComp/howItWorks";

function ViewProfilePage() {
  return (
    <main className="flex flex-col space-y-10 md:space-y-20  mb-5">

      <DoctorManagementTools />
      <HowItWorks />
    </main>

  );
}
export default ViewProfilePage;
