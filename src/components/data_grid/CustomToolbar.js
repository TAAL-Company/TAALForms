import * as React from "react";
import "./DataTableRTL.css";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getingDataUsers } from "../../api/api";
import "./CustomToolbar.css";

import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
// import MultipleSelectChip from "./MultipleSelectChip";
// import AccessibleTabs1 from "./AccessibleTabs1";

import { Button, InputLabel } from "@mui/material";
import MultipleEdit from "../multiple_edit/MultipleEdit";
import AddColumn from "../add_column/AddColumn";
import SaveIcon from "@mui/icons-material/Save";

const CustomToolbar = ({
  isInfoUserRoute,
  isInfoUserSite,
  tableType,
  selectedRows,
  columns,
  setColumns,
  workerName,
  routeName,
  siteName,
  setWorker,
  worker,
  allUsers,
  setChangeUser,
  setSaveProfileChanges,
}) => {
  const saveProfileChanges = (e) => {
    console.log("true");
    setSaveProfileChanges(true);
  };
  const handleChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);

    console.log("worker", selectedValue);
    setWorker(selectedValue);
    setChangeUser(true);
  };
  return (
    <div>
      <GridToolbarContainer
        style={{
          paddingTop: "20px",
          paddingBottom: "15px",
          direction: "rtl",
          justifyContent: "space-between",
        }}
      >
        <div>
          <GridToolbarColumnsButton style={{ color: "black" }} />
          <GridToolbarFilterButton style={{ color: "black" }} />
          <GridToolbarDensitySelector style={{ color: "black" }} />
          <GridToolbarExport style={{ color: "black" }} />
        </div>

        {isInfoUserRoute && (
          <div className="info">
            <div className="workerName">שם עובד: {workerName}</div>
            <div className="workerRoute">שם מסלול: {routeName}</div>
          </div>
        )}

        {isInfoUserSite && (
          <div className="info">
            <div className="workerName">
              <InputLabel id="demo-simple-select-label">שם העובד:</InputLabel>
              <select
                className="selectUser"
                defaultValue={"DEFAULT"}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled>
                  {worker.length == 0 ? "בחירת משתמש" : worker.name}
                </option>
                {allUsers.map((value, index) => {
                  return (
                    <option key={index} value={JSON.stringify(value)}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* <div className="workerRoute">שם אתר: {siteName}</div> */}
          </div>
        )}

        <div>
          <InputAdornment position="start">
            <GridToolbarQuickFilter
              InputProps={{ disableUnderline: true }}
              placeholder="חיפוש"
              style={{
                paddingRight: "10px",
                width: "250px",
                position: "relative",
                borderRadius: "8px",
                paddingBottom: "2px",
                marginTop: "2px",
                background: "white",
              }}
              sx={{
                "& .MuiInputBase-root": {
                  // background: "blue",
                  width: "87%",
                  height: "28px",
                },
              }}
            />
            <SearchIcon
              style={{
                marginRight: "-30px",
                zIndex: "5",
              }}
            />
          </InputAdornment>
        </div>
      </GridToolbarContainer>

      {tableType === "TaskabilityHE" && selectedRows.length >= 2 ? (
        <>
          <div
            className="buttonaNavbar"
            style={{ display: "flex", right: 0, paddingBottom: "10px" }}
          >
            <div style={{ marginLeft: "10px" }}>
              <MultipleEdit
                textButton={"עריכה קבוצתית"}
                selectedRows={selectedRows}
                fieldsCount={columns.length}
                columns={columns}
              />{" "}
            </div>

            <AddColumn columns={columns} setColumns={setColumns}></AddColumn>
            {/* {selectedRows.map((item) => item.tasks)} */}
          </div>
        </>
      ) : tableType === "TaskabilityHE" ? (
        <>
          <div
            className="buttonaNavbar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                disabled
                style={{ marginLeft: "10px" }}
              >
                עריכה קבוצתית
              </Button>
              <AddColumn columns={columns} setColumns={setColumns}></AddColumn>
            </div>
            <div style={{ display: "flex" }}>
              <SaveIcon
                fontSize="large"
                color="primary"
                style={{ zIndex: "5" }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="buttonaNavbar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            <AddColumn columns={columns} setColumns={setColumns}></AddColumn>
            <div style={{ display: "flex", right: 0 }}>
              <SaveIcon
                fontSize="large"
                color="primary"
                style={{ zIndex: "5" }}
                onClick={saveProfileChanges}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CustomToolbar;
