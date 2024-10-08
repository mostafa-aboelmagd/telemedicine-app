import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Card,
  CardContent,
  Rating,
  Button,
  TextareaAutosize,
  Box,
  Slide,
} from "@mui/material";

interface RatingCompProps {
  text: string;
  variant: "text" | "outlined" | "contained";
  doctor: any;
  doctorRating: number | null;
  setDoctorRating(value: number | null): void;
}

const RatingComp: React.FC<RatingCompProps> = ({
  text,
  variant,
  doctor,
  doctorRating,
  setDoctorRating,
}) => {
  const [open, setOpen] = useState(false);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number | null>(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setReviewRating(newValue);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = () => {
    setOpen(false);
    setDoctorRating(reviewRating);
  };

  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = i < doctor.rating ? "#FFAD33" : "#D1D5DB";
      stars.push(
        <svg
          key={i}
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill={starColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <>
      <Button
        variant={variant}
        className="text-blue-500 underline text-xs"
        onClick={handleOpen}
      >
        {text}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6">{doctor.name}</Typography>
        </DialogTitle>

        <DialogContent>
          <Box textAlign="center" mb={4}>
            <Typography variant="subtitle1" mb={2}>
              Rate the Doctor
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" mb={2}>
                {" "}
                <span className="flex items-center gap-2">
                  Name:
                  <span className="text-blue-600 font-semibold">
                    {doctor.name}
                  </span>
                </span>
              </Typography>
              <Typography variant="body1" mb={2}>
                <span className="flex items-center gap-2">
                  Rating: {doctor.rating} {renderStars()}
                </span>
              </Typography>
            </Box>
            <Typography variant="body1" mb={2}>
              Title: {doctor.title}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Rating
              name="doctor-rating"
              value={reviewRating}
              size="large"
              precision={0.5}
              onChange={handleRatingChange}
            />
            <TextareaAutosize
              placeholder="Write your review here... (optional)"
              value={reviewText}
              onChange={handleReviewChange}
              className="w-full h-32 p-2 my-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </Box>
        </DialogContent>
        <Box display="flex" justifyContent="flex-end" gap={2} p={2}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!reviewRating}
          >
            Submit
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default RatingComp;
