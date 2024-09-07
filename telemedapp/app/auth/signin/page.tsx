// app/auth/signin/page.tsx
import SignInForm from "@/components/auth/SignInForm";
import ImageContainer from "@/components/auth/ImageContainer";

function SignInPage() {
  return (
    <div className="flex h-screen bg-neutral-100 flex-col lg:flex-row">
      <SignInForm />
      <ImageContainer />
    </div>
  );
}

export default SignInPage;
