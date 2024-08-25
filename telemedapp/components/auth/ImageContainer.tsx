import styles from "./ImageContainer.module.css";
import Image from "next/image";
import journeyImage from "@/images/journey.jpg";
import journeyImage2 from "@/images/journey2.jpg";
import journeyImage3 from "@/images/journey3.jpg";
import journeyImage4 from "@/images/journey4.jpg";

function ImageContainer() {
  const images = [journeyImage, journeyImage2, journeyImage3, journeyImage4];

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  return (
    <div className={styles.flexChild}>
      <Image
        className={styles.backgroundImage}
        src={randomImage}
        alt="Long Road Image"
      />
      <p className={styles.text}>
        A journey of a thousand miles begins with a single step
      </p>
    </div>
  );
}

export default ImageContainer;
