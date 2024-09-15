import { useRouter } from "next/navigation"; // next/navigation for App Router
import stylesButton from "../navbarComp/navbar.module.css";

const BookingButton = ({ doctor }: { doctor: any }) => {
  const router = useRouter();

  // Navigate to booking page with doctor info
  const handleBookNow = () => {
    console.log("Doctor: ", doctor);
    // const encodedDoctor = encodeURIComponent(JSON.stringify(doctor)); // Encode the doctor object
    const encodedDoctor = JSON.stringify(doctor); // Encode the doctor object
    router.push(`/booking?doctor=${encodedDoctor}`); // Construct URL manually
  };

  return (
    <button
      className={
        stylesButton.gradient_button +
        " text-xs md:text-md text-white py-1 px-1 md:px-0 md:py-3 rounded-xl w-full "
      }
      onClick={handleBookNow}
    >
      Book Now
    </button>
  );
};

export default BookingButton;
