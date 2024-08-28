// app/auth/signin/page.tsx

import styles from "../../page.module.css";
import SignInForm from "@/components/auth/SignInForm";
import ImageContainer from "@/components/auth/ImageContainer";

export default function SignInPage() {
  return (
    <div className={styles.main}>
      <SignInForm />
      <ImageContainer />
    </div>
  );
}
