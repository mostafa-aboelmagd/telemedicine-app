// app/auth/signup/page.tsx
import styles from "../../page.module.css";
import SignupForm from "@/components/auth/SignupForm";
import ImageContainer from "@/components/auth/ImageContainer";
export default function SignUpPage() {
  return (
    <div className={styles.main}>
      <SignupForm />
      <ImageContainer />
    </div>
  );
}
