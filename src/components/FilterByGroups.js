import { Switch } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import * as React from "react";

import "./FilterByGroups.css";

const FilterByGroups = ({ headers, count }) => {
  const [personalInformation, setPersonalInformation] =
    React.useState("פרטים אישיים");
  const [history, setHistory] = React.useState("היסטוריה");

  const handleChangePersonalInformation = (event) => {
    setPersonalInformation(event.target.value);
  };

  const handleChangeHistory = (event) => {
    setHistory(event.target.value);
  };

  console.log("headers " + headers);
  console.log("count " + count);
  if (count === 1) {
    return;
  } else if (count === 2) {
    return (
      <div className="all">
        <div className="switch1">
          {/* <div className="h1">{headers[0]}</div> */}
          <FormControl
            sx={{
              m: 1,
              minWidth: 220,
              maxWidth: 220,
              "& 	.MuiInputLabel-formControl": {
                background: "#d3e2ec",
              },
            }}
            size="small"
          >
            <InputLabel id="example2">פרטים אישיים</InputLabel>
            <Select
              labelId="example2"
              id="example2"
              value={personalInformation}
              onChange={handleChangePersonalInformation}
              autoWidth
              label="Age"
            >
              {/* <MenuItem value="">
            <em>>פרטים אישיים</em>
          </MenuItem> */}
              <MenuItem value={true}>הכרחי לביצוע המשימה</MenuItem>
              <MenuItem value={false}>לא הכרחי לביצוע המשימה</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              m: 1,
              minWidth: 220,
              maxWidth: 220,
              "& 	.MuiInputLabel-formControl": {
                background: "#d3e2ec",
              },
            }}
            size="small"
          >
            <InputLabel id="example2">היסטוריה</InputLabel>
            <Select
              labelId="example2"
              id="example2"
              value={history}
              onChange={handleChangeHistory}
              autoWidth
              label="Age"
            >
              {/* <MenuItem value="">
            <em>>פרטים אישיים</em>
          </MenuItem> */}
              <MenuItem value={true}>הכרחי לביצוע המשימה</MenuItem>
              <MenuItem value={false}>לא הכרחי לביצוע המשימה</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="switch2">
          {/* <div className="h2">{headers[1]}</div> */}
        </div>
      </div>
    );
  } else if (count === 3) {
    return (
      <div className="all">
        <div className="switch1">
          <div className="h1">{headers[0]}</div>
          <Switch></Switch>
        </div>
        <div className="switch2">
          <div className="h2">{headers[1]}</div>
          <Switch></Switch>
        </div>
        <div className="switch3">
          <div className="h3">{headers[2]}</div>
          <Switch></Switch>
        </div>
      </div>
    );
  } else if (count === 4) {
    return (
      <div className="all">
        <div className="switch1">
          <div className="h1">{headers[0]}</div>
          <Switch></Switch>
        </div>
        <div className="switch2">
          <div className="h2">{headers[1]}</div>
          <Switch></Switch>
        </div>
        <div className="switch3">
          <div className="h3">{headers[2]}</div>
          <Switch></Switch>
        </div>
        <div className="switch3">
          <div className="h4">{headers[3]}</div>
          <Switch></Switch>
        </div>
      </div>
    );
  } else {
    return <div className="all"></div>;
  }
};

export default FilterByGroups;
