import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const names = [
  "מדבקות מוכנות",
  "כרטיסיה",
  "צורות",
  "כפפה",
  "מטלית",
  "ציור",
  "סמלול",
  "הסבר בקול",
  "סמלול",
  "חדר שקט",
  "הפסקה",
  "חזרה על משימה",
  "תזכורות באפליקציה",
  "רשימה מודפסת",
  "צילום",
  "כרטסת מודפסת",
  "הוספת אמצעי הגנה",
  "הרחקה",
  "הוספת אזהרה",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl
        size="small"
        sx={{
          m: 1,
          width: 200,
          //   minWidth: 220,
          //   maxWidth: 220,
          "& 	.MuiInputLabel-formControl": {
            background: "none",
          },
        }}
      >
        <InputLabel id="demo-multiple-chip-label">התערבות אפשרית</InputLabel>
        <Select
          // sx={{
          //   "& 	.MuiSelect-outlined.MuiSelect-outlined .MuiSelect-outlined.MuiSelect-outlined:active .MuiSelect-outlined.MuiSelect-outlined:focus":
          //     {
          //       backgroundColor: "white",
          //       textAlign: "left",
          //       fontFamily: "sans-serif !important",
          //       fontSize: "14px !important",
          //       fontWeight: "400 !important",
          //     },
          // }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          label="התערבות אפשרית"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
