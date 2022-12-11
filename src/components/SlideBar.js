import Slider from "@mui/material/Slider";
// import { useState } from "react";

const SlideBar = (props) => {
  // Insead 50 - will taken from DB
  //   const [grade, setGrade] = useState(props.grade);
  const grade = props.grade;
  let colorGrade = "rgb(244, 67, 54)";

  if (grade < 3) {
    colorGrade = "rgb(244, 67, 54)";
  } else if (grade < 4) {
    colorGrade = "rgba(239, 187, 90, 0.64)";
  } else {
    colorGrade = "rgba(8, 130, 8, 0.64)";
  }
  return (
    <Slider
      defaultValue={grade}
      aria-label="Always visible"
      valueLabelDisplay="auto"
      min={0}
      max={5}
      sx={{
        width: 150,
        height: 30,
        color: colorGrade,
        "& .MuiSlider-thumb": {
          color: "rgb(0,0,0,0.8)",
          borderRadius: "30px",
          height: 30,
          width: 5,
        },

        "& .MuiSlider-thumb:active": {
          color: "rgb(0,0,0,1)",
        },

        "& .MuiSlider-rail": {
          color: "rgba(8, 130, 8, 0.24)",
        },
        "& 	.MuiSlider-root": {
          color: "none",
        },

        "& .MuiSlider-valueLabel": {
          position: "absolute",
          marginTop: "35px",
          borderRadius: "50px",
          zIndex: 5,
        },
        "& .MuiSlider-valueLabelLabel": {
          color: "white",
        },
      }}
    />
  );
};

// MuiSlider-thumb
// MuiSlider-thumbColorPrimary
// MuiSlider-thumbSizeMedium

export default SlideBar;
