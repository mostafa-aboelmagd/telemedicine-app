import Image from "next/image";
import userImage from "@/images/user.png";

type userParams = {
  role: string;
};

function ProfileCard({role}: userParams) {
  return (
    <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
      <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
      <p className="text-blue-500 mb-1 font-semibold">{role === "patient" ? "FirstName LastName" : "Dr. Name"}</p>
      {
        role === "patient" ? 
        <div className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 fill-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
          </svg>
          <p>Wallet</p>
          <p className="text-green-500">(0)</p>
        </div> :
        <></>
      }
    </div>
  );
}

export default ProfileCard;
