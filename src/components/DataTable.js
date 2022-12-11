import * as React from "react";
import Box from "@mui/material/Box";
import "./DataTable.css";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import FilterByGroups from "./FilterByGroups";
import MultipleSelectChip from "./MultipleSelectChip";
import AccessibleTabs1 from "./AccessibleTabs1";
import { heIL } from "@mui/x-data-grid";

// const columnGroupingModel = [
//   {
//     groupId: "internal_data",
//     headerName: "Internal",
//     description: "",
//     renderHeaderGroup: (params) => (
//       <HeaderWithIcon {...params} icon={<BuildIcon fontSize="small" />} />
//     ),
//     children: [{ field: "id" }],
//   },
//   {
//     groupId: "character",
//     description: "Information about the character",
//     headerName: "Basic info",
//     renderHeaderGroup: (params) => (
//       <HeaderWithIcon {...params} icon={<PersonIcon fontSize="small" />} />
//     ),
//     children: [
//       {
//         groupId: "naming",
//         headerName: "Names",
//         headerClassName: "my-super-theme--naming-group",
//         children: [{ field: "fieldEN" }, { field: "classificationHE" }],
//       },
//       { field: "age" },
//     ],
//   },
// ];

const columnGroupingModel = [
  {
    groupId: "פרטים אישיים",
    description: "",

    children: [
      { field: "fieldHEPrivateCard" },
      { field: "xPrivateCard" },
      { field: "yPrivateCard" },
      { field: "fieldENPrivateCard" },
      { field: "classificationHEPrivateCard" },
    ],
  },
  {
    groupId: "היסטוריה",
    children: [
      { field: "beginningOfWorkPrivateCard" },
      { field: "employersPrivateCard" },
      { field: "reportsPrivateCard" },
      { field: "improvementPrivateCard" },
      { field: "interventionHEPrivateCard" },
    ],
  },
];

function CustomToolbar({ groups, headers, marginSearchBar }) {
  const marginSearchTextBox = marginSearchBar.toString() + "px";
  return (
    <GridToolbarContainer style={{ paddingTop: "10px", direction: "rtl" }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <FilterByGroups headers={headers} count={groups}></FilterByGroups>
      <div className="info">
        <div className="workerName">שם עובד: אייל אנגל</div>
        <div className="workerRoute">שם מסלול: עזריאלי תל אביב</div>
      </div>
      <InputAdornment position="start">
        <GridToolbarQuickFilter
          InputProps={{ disableUnderline: true }}
          placeholder="חיפוש"
          style={{
            marginRight: marginSearchTextBox,
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

            // "& .MuiTextField-root": {
            //   background: "yellow",
            //   zIndex: "200",
            // },
            // "& .MuiTextField-root:hover": {
            //   borderBottom: "0px solid rgba(0, 0, 0, 0)",
            // },
            // "& .MuiInput-underline:before": {
            //   borderBottom: "0px solid rgba(0, 0, 0, 0)",
            // },
            // "& .MuiInput-underline:after": {
            //   borderBottom: "0px solid rgba(0, 0, 0, 0)",
            // },
            // "& .MuiInput-underline:hover::before": {
            //   borderBottom: "0px solid rgba(0, 0, 0, 0)",
            // },
            // "& .MuiInput-underline:hover::after": {
            //   borderBottom: "0px solid rgba(0, 0, 0, 0)",
            // },
            // "& .MuiInput-underline:hover::focus": {
            //   borderBottom: "0px solid rgba(0, 0, 0, 0)",
            // },
            // "& .MuiInput-underline:hover": {
            //   borderBottom: "0px solid rgba(0, 0, 0, 0)",
            // },
          }}
        />
        <SearchIcon
          style={{
            marginRight: "-30px",
            zIndex: "5",
          }}
        />
      </InputAdornment>
    </GridToolbarContainer>
  );
}

const DataTable = ({ columns, rows, headers, groups, marginSearchBar }) => {
  return (
    <div className="all">
      <Box
        sx={{
          height: 750,
          width: "100%",
          direction: "ltr",
          backgroundColor: "#256FA133",
          mb: 2,
          display: "flex",
          flexDirection: "column",
          // overflow: "hidden",
          // overflowY: "scroll",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'

          "& .MuiDataGrid-root": {
            marginRight: "25px",
            marginLeft: "25px",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "Medium",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "white",
            marginTop: "5px",
            marginBottom: "0px",
            borderRadius: "6px",
            // width: "95%",
          },

          "& .MuiDataGrid-cellContent": {
            fontFamily: "Gotham Black, sans-serif",
            fontSize: "medium",
          },

          "& .MuiButton-startIcon": {
            marginLeft: "5px",
          },

          // css-1e2bxag-MuiDataGrid-root .MuiDataGrid-iconSeparator
          //  הפרדה בין כותרת עמודה לכותרת עמודה
          // "& .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-iconSeparator": {
          //   fill: "red",
          // },
          //           "& .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer":

          "& .MuiDataGrid-root .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer":
            {
              borderBottom: "solid white 3px",
              justifyContent: "center",
            },

          // .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer
          // border-bottom: solid #1976d2 1px;
        }}
      >
        <MultipleSelectChip></MultipleSelectChip>
        <AccessibleTabs1></AccessibleTabs1>

        <DataGrid
          // export default function BasicColumnPinning() {
          // initialState={{ pinnedColumns: { left: ["id"], right: ["actions"] } }}
          sx={{
            direction: "rtl",
            "& .MuiDataGrid-virtualScroller": {
              overflow: "unset !important",
              mt: "0 !important",
            },

            "& .MuiDataGrid-columnHeaders": {
              overflow: "unset",
              position: "sticky",
              left: 1,
              zIndex: 1,
            },
            "& .MuiDataGrid-columnHeadersInner > div": {
              direction: "rtl !important",
            },
            "& .MuiDataGrid-main": {
              overflow: "auto",
            },
            "& .MuiTablePagination-actions": {
              direction: "ltr",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#EDF3F8",
            },
            "& .MuiButton-textSizeSmall": {
              color: "rgb(8,8,137)",
            },
            "& .MuiDataGrid-columnHeadersInner": {
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
              bgcolor: "#d3e2ec",
            },
          }}
          experimentalFeatures={
            ({ newEditingApi: true }, { columnGrouping: true })
          }
          rows={rows}
          columns={columns}
          pageSize={10}
          // rowHeight={52}
          getRowHeight={() => "auto"}
          rowsPerPageOptions={[10]}
          // scrollbarSize={[1]}
          // scrollArea={(color = "red")}
          checkboxSelection
          disableSelectionOnClick
          columnGroupingModel={columnGroupingModel}
          localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
          components={{
            Toolbar: () => (
              <CustomToolbar
                groups={groups}
                headers={headers}
                marginSearchBar={marginSearchBar}
              />
            ),
          }}
          disableVirtualization
          componentsProps={{
            toolbar: {
              utf8WithBom: true,
              showQuickFilter: false,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default DataTable;
