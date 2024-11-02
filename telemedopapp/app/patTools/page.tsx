import HowItWorks from "@/components/HowItWorksComp/howItWorks";
import PatientManagementTools from "@/components/patientTools/Tools";

function ViewProfilePage() {
  return (
    <main className="flex flex-col space-y-10 md:space-y-20  mb-5">

      <PatientManagementTools />
      <HowItWorks />
    </main>

  );
}
export default ViewProfilePage;
