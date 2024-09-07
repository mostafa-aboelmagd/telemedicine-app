// app/auth/signup/page.tsx
import SignUpForm from "@/components/auth/SignUpForm";
import ImageContainer from "@/components/auth/ImageContainer";

function SignUpPage() {
  return (
    <div className="flex h-full bg-neutral-100 flex-col lg:flex-row">
      <SignUpForm />
      <ImageContainer />
    </div>
  );
}

export default SignUpPage;
