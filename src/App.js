import React from "react";
import DataTable from "./components/DataTable";
import "./App.css";
import Status from "./components/Status";
import taskpic from "./Pictures/taskpic.png";

//
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import EditIcon from "@mui/icons-material/Edit";
import MultipleSelectChip from "./components/MultipleSelectChip";
import TestsComp from "./components/TestsComp";
function App() {
  //

  //

  // columns and rows will be taken from DB
  const columnsFlags = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "",
      width: 100,
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            <img
              src={params.row.image}
              alt=""
              style={{
                "margin-right": "10px",
                "margin-top": "4px",
                width: "71px",
                height: "45px",
                borderRadius: "6px",
              }}
            />
          </div>
        );
      },
    },
    {
      field: "task",
      headerName: "משימה",
      width: 150,
      editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "classification",
      headerName: "סיווג",
      width: 140,
      editable: true,
      renderCell: (params) => (
        <Status classification={params.row.classification} />
      ),
      headerAlign: "center",
      align: "right",
    },
    {
      field: "intervention",
      headerName: "התערבות",
      width: 180,
      editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.intervention === "no need") {
          return (
            <div
              style={{
                background: "rgb(220,220,220,0.7)",
                width: "100%",
                height: "100%",
              }}
            ></div>
          );
        } else {
          return <div> {params.row.intervention}</div>;
        }
      },
    },
    {
      field: "Alternatives",
      headerName: "חלופיות",
      width: 250,
      editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.Alternatives === "no need") {
          return (
            <div
              style={{
                background: "rgb(220,220,220,0.7)",
                width: "100%",
                height: "100%",
              }}
            ></div>
          );
        } else {
          return (
            <div className="alternativeBox">
              <MultipleSelectChip
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  width: "50px",
                  alignItems: "center",
                  justifyContent: "center",
                  direction: "rtl",
                }}
              ></MultipleSelectChip>
            </div>
          );
        }
      },
    },
    {
      field: "date",
      headerName: "תאריך",
      description: "This column has a value getter and is not sortable.",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "סטטוס",
      width: 100,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    // {
    //   field: "optionsForSolution",
    //   headerName: "אפשרויות",
    //   width: 250,
    //   editable: false,
    //   type: "string",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: () => (
    //     <div className="optionsBox">
    //       <button
    //         className="optionsBtn"
    //         onClick={() => {
    //           console.log("clicked");
    //           const buttons = document.getElementById("opendButtons");
    //           buttons.style.display = "flex";
    //         }}
    //       >
    //         ...
    //       </button>
    //       <div id="opendButtons" className="opendButtons">
    //         <button className="openedBtn" onClick={() => {}}>
    //           b1
    //         </button>
    //         <button
    //           className="openedBtn"
    //           onClick={() => {
    //             console.log("clicked");
    //           }}
    //         >
    //           b2
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      field: "actions",
      type: "actions",
      align: "left",
      width: 430,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon style={{ fill: "gray" }} />}
          label="Delete"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<EqualizerIcon style={{ fill: "gray" }} />}
          label="Toggle Admin"
          // onClick={}
          // showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon style={{ fill: "gray" }} />}
          label="Edit"

          // onClick={}
          // showInMenu
        />,
        // <GridActionsCellItem
        //   icon={<FileCopyIcon />}
        //   label="Duplicate User"
        //   // onClick={}
        //   showInMenu
        // />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
          showInMenu
        />,
      ],
    },
    // {task
    //   field: "needHelp",
    //   headerName: "Need Help",
    //   width: 150,
    //   editable: false,
    //   align: "center",
    //   renderCell: (params) => <Status needHelp={params.row.needHelp} />,
    // },
  ];

  const rowsFlags = [
    {
      id: 1,
      image: taskpic,
      classification: "red",
      task: "בדיקה",
      intervention: "no need",
      Alternatives: "",
      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 2,
      image: taskpic,
      classification: "yellow",
      task: "לבוש סינר",
      intervention: "לעזור בקשירת הסינר",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 3,
      image: taskpic,
      classification: "green",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 4,
      image: taskpic,
      classification: "yellow",
      task: "לבוש סינר",
      intervention: "לעזור בקשירת הסינר",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 5,
      image: taskpic,
      classification: "green",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 6,
      image: taskpic,
      classification: "green",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 7,
      image: taskpic,
      classification: "red",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "",
      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 8,
      image: taskpic,
      classification: "yellow",
      task: "לבוש סינר",
      intervention: "לעזור בקשירת הסינר",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 9,
      image: taskpic,
      classification: "red",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "",
      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 10,
      image: taskpic,
      classification: "yellow",
      task: "לבוש סינר",
      intervention: "לעזור בקשירת הסינר",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 11,
      image: taskpic,
      classification: "green",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "no need",

      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 12,
      image: taskpic,
      classification: "red",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "",
      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 13,
      image: taskpic,
      classification: "green",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "no need",
      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
    {
      id: 14,
      image: taskpic,
      classification: "green",
      task: "לבוש סינר",
      intervention: "no need",
      Alternatives: "no need",
      date: "5/12/2020",
      status: "פעיל",
      optionsForSolution: "...",
    },
  ];

  // cognitive profile
  const columnsCognitive = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fieldHE",
      headerName: "שדה-עברית",
      width: 100,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mustField",
      headerName: "שדה חובה",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "subfield",
      headerName: "תת שדה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "grade",
      headerName: "מדד ציון",
      width: 150,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fieldEN",
      headerName: "field - English",
      width: 160,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "classificationHE",
      headerName: "סיווג",
      width: 100,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "classificationEN",
      headerName: "classification",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "MLFactor",
      headerName: "פקטור ל ML",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Remarks",
      headerName: "הערות",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    // {
    //   field: "optionsForSolution",
    //   headerName: "אפשרויות",
    //   width: 250,
    //   editable: false,
    //   type: "string",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: () => (
    //     <div className="optionsBox">
    //       <button
    //         className="optionsBtn"
    //         onClick={() => {
    //           console.log("clicked");
    //           const buttons = document.getElementById("opendButtons");
    //           buttons.style.display = "flex";
    //         }}
    //       >
    //         ...
    //       </button>
    //       <div id="opendButtons" className="opendButtons">
    //         <button className="openedBtn" onClick={() => {}}>
    //           b1
    //         </button>
    //         <button
    //           className="openedBtn"
    //           onClick={() => {
    //             console.log("clicked");
    //           }}
    //         >
    //           b2
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      field: "actions",
      type: "actions",
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon style={{ fill: "gray" }} />}
          label="Delete"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<EqualizerIcon style={{ fill: "gray" }} />}
          label="Toggle Admin"
          // onClick={}
          // showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon style={{ fill: "gray" }} />}
          label="Edit"

          // onClick={}
          // showInMenu
        />,
        // <GridActionsCellItem
        //   icon={<FileCopyIcon />}
        //   label="Duplicate User"
        //   // onClick={}
        //   showInMenu
        // />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
          showInMenu
        />,
      ],
    },
  ];

  const rowsCognitive = [
    {
      id: 1,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",
      optionsForSolution: "...",
    },
    {
      id: 2,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",
      optionsForSolution: "...",
    },
    {
      id: 3,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",
      optionsForSolution: "...",
    },
    {
      id: 4,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",
      optionsForSolution: "...",
    },
    {
      id: 5,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",
      optionsForSolution: "...",
    },
    {
      id: 6,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",
      optionsForSolution: "...",
    },
    {
      id: 7,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",
      optionsForSolution: "...",
    },
    {
      id: 8,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",

      optionsForSolution: "...",
    },
    {
      id: 9,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",

      optionsForSolution: "...",
    },
    {
      id: 10,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",

      optionsForSolution: "...",
    },
    {
      id: 11,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",

      optionsForSolution: "...",
    },
    {
      id: 12,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",

      optionsForSolution: "...",
    },
    {
      id: 13,
      fieldHE: "שפה 1",
      mustField: "כן",
      subfield: "קריאה/כתיבה/דיבור/הבנה",
      grade: "0-5",
      fieldEN: "first languege",
      classificationHE: "שפה",
      classificationEN: "languege",
      MLFactor: "כן",

      optionsForSolution: "...",
    },
  ];

  // end of cognitive profile table

  // start of כרטסת אישית

  const columnsPrivateCard = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fieldHEPrivateCard",
      headerName: "שדה-עברית",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "xPrivateCard",
      headerName: "x",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "yPrivateCard",
      headerName: "y",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fieldENPrivateCard",
      headerName: "field - English",
      width: 150,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "classificationHEPrivateCard",
      headerName: "סיווג",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "beginningOfWorkPrivateCard",
      headerName: "תחילת עבודה",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "employersPrivateCard",
      headerName: "מעסיקים",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "reportsPrivateCard",
      headerName: "דוחות",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "improvementPrivateCard",
      headerName: "שיפור",
      width: 90,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Remarks",
      headerName: "הערות",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "interventionHEPrivateCard",
    //   headerName: "possible intervention",
    //   width: 180,
    //   editable: true,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "actionsPrivateCard",
      type: "actions",
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon style={{ fill: "gray" }} />}
          label="Delete"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<EqualizerIcon style={{ fill: "gray" }} />}
          label="Toggle Admin"
          // onClick={}
          // showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon style={{ fill: "gray" }} />}
          label="Edit"

          // onClick={}
          // showInMenu
        />,
        // <GridActionsCellItem
        //   icon={<FileCopyIcon />}
        //   label="Duplicate User"
        //   // onClick={}
        //   showInMenu
        // />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
          showInMenu
        />,
      ],
    },
  ];

  const rowsPrivateCard = [
    {
      id: 1,
      fieldHEPrivateCard: "שם פרטי",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 2,
      fieldHEPrivateCard: "שם משפחה",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportPrivateCards: "",
      improvementPrivateCard: "",
    },
    {
      id: 3,
      fieldHEPrivateCard: "תמונה",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 4,
      fieldHEPrivateCard: "מין",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "gender",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 5,
      fieldHEPrivateCard: "תאריך לידה",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 6,
      fieldHEPrivateCard: "מקום מגורים",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 7,
      fieldHEPrivateCard: "טלפון אישי",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 8,
      fieldHEPrivateCard: "טלפון למקרה חירום",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 9,
      fieldHEPrivateCard: "מספר טלפון נוסף",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 10,
      fieldHEPrivateCard: "ארגון נותן שירות",
      xPrivateCard: "מהמערכת",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 11,
      fieldHEPrivateCard: "מקום תעסוקה קודם",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 12,
      fieldHEPrivateCard: "תפקיד בתעסוקה קודמת",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 13,
      fieldHEPrivateCard: "שנת תעסוקה",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 14,
      fieldHEPrivateCard: "משך זמן מאז תעסוקה",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 15,
      fieldHEPrivateCard: "רמת תפקוד בתעסוקה קודמת",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 16,
      fieldHEPrivateCard: "הכשרה קודמת",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 17,
      fieldHEPrivateCard: "משך זמן",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 18,
      fieldHEPrivateCard: "משך זמן מאז ההכשרה",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
    {
      id: 19,
      fieldHEPrivateCard: "רמת הצלחה בהכשרה",
      xPrivateCard: "",
      yPrivateCard: "",
      fieldENPrivateCard: "",
      classificationHEPrivateCard: "",
      beginningOfWorkPrivateCard: "",
      employersPrivateCard: "",
      reportsPrivateCard: "",
      improvementPrivateCard: "",
    },
  ];

  // taskability
  const columnsTaskability = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tasks",
      headerName: "משימות",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "hebrew",
      headerName: "עברית",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "English",
      headerName: "אנגלית",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "task",
      headerName: 'משתמש ב א"ב',
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "2",
      headerName: "הבנת שפה דבורה",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "3",
      headerName: "הבנת שפה כתובה",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "4",
      headerName: 'יכולת ביטוי בע"פ',
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "6",
      headerName: "יכולת ביטוי בכתב",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "7",
      headerName: "קריאה שוטפת",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "8",
      headerName: "כותב מילים בודדות ומוכרות",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "9",
      headerName: "כותב מילים בודדות לא מוכרות",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "10",
      headerName: "כתיבה שוטפת",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "11",
      headerName: "רגישות יתר במישוש",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "12",
      headerName: "מזהה צבעים מורכבים",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "13",
      headerName: "מזהה צורות מורכבות",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "14",
      headerName: "מערכתיות - הבנה של ההיררכיה בעבודה",
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "15",
      headerName: "פיצול קשב (dividing)",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "16",
      headerName: "זיכרון לטווח קצר (30 שניות)",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "17",
      headerName: "שליפה מזיכרון לטווח ארוך",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "18",
      headerName: "זכירת הוראות / זכרון עבודה",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "19",
      headerName: "וייסות רגשי",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "20",
      headerName: "תפיסה קולית",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "21",
      headerName: "תפיסה חזותית",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "22",
      headerName: "מזהה מקום",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "23",
      headerName: "זיהוי צורות (דו מימד)",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "24",
      headerName: "תפיסה מרחבית (תלת מימד)",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "25",
      headerName: "מזהה אנשים (פנים ושם)",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "26",
      headerName: "מזהה תמונות",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "27",
      headerName: "מזהה סמלים גרפיים פשוטים",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "28",
      headerName: "מזהה איקונים",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "יכולת הפשטה",
      headerName: "יכולת הפשטה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "30",
      headerName: "יכולת הבנת סיבה ותוצאה",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "סדר ארגון ותכנון",
      headerName: "סדר ארגון ותכנון",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "התמצאות במקום",
      headerName: "התמצאות במקום",
      width: 140,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "33",
      headerName: "ניהול זמן עצמאי",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "מהירות חשיבה",
      headerName: "מהירות חשיבה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "35",
      headerName: "מהירות תגובה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "36",
      headerName: "זיהוי מצב חירום (שיפוט)",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "37",
      headerName: "מודעות לסכנה (שיפוט)",
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "38",
      headerName: "זהירות בשימוש בחומרים מסוכנים",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "39",
      headerName: "זהירות שימוש בעצמים חדים",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "40",
      headerName: "זהירות שימוש במכשירי חשמל",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "41",
      headerName: "פתרון בעיות",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "42",
      headerName: "זיהוי מספרים 0-10",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "1111",
      headerName: "כמותי",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "43",
      headerName: "זיהוי מספרים 10-100",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "44",
      headerName: "זיהוי מספרים 100-1000",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "45",
      headerName: "זיהוי מספרים ללא הגבלה",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "46",
      headerName: "סופר עד 10",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "47",
      headerName: "סופר עד 100",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "48",
      headerName: "סופר עד ללא הגבלה",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "49",
      headerName: "מבין כמויות יחסי (גדול מ... קטן מ...)",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "50",
      headerName: "מבין כמויות של משקל",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "51",
      headerName: "מבין כמויות גובה/אורך",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "52",
      headerName: "מבין כמויות מרחקים",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "53",
      headerName: "פעולות חיסור",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "54",
      headerName: "פעולות כפל",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "55",
      headerName: "פעולות חילוק",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "56",
      headerName: "אחוזים",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "57",
      headerName: "שברים",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "58",
      headerName: "תפיסת זמן",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "59",
      headerName: "מזהה זמן",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "60",
      headerName: "מזהה שיוך זמן יחסי",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "61",
      headerName: "מזהה זמן יחסי",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "2222",
      headerName: "ראייה",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "62",
      headerName: "עיוורון צבעים",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "63",
      headerName: "זיהוי צבעים בסיסיים",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "64",
      headerName: "שמיעה",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "65",
      headerName: "שיווי משקל",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "66",
      headerName: "רגישות לטעם",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "67",
      headerName: "רגישות לריח",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "68",
      headerName: "רגישות למגע / חוסר בתחושה",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "69",
      headerName: "הפקת קול",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "70",
      headerName: "הגייה",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "71",
      headerName: "שטף דיבור",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "72",
      headerName: "הקשבה ויישום הוראות באודיו",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "73",
      headerName: "יכולת מעקב אחר הוראות כתובות (צ'ק ליסט)",
      width: 320,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "74",
      headerName: "רכישת מיומנויות בסיסיות (כגון שימוש במזלג)",
      width: 320,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "75",
      headerName: "רכישת מיומנויות מורכבות (כגון כללי משחק)",
      width: 320,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "76",
      headerName: "קבלת החלטות",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "77",
      headerName: "דיבור",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "78",
      headerName: "כתיבה - כתב יד קריא וברור",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "79",
      headerName: "קורא שעון אנלוגי",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "80",
      headerName: "קורא שעון דיגיטלי",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "81",
      headerName: "מזהה לוח שנה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "82",
      headerName: "רמת אוריינות בטלפון חכם",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "83",
      headerName: "רמת אוריינות במחשב",
      width: 160,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "84",
      headerName: "שיווי משקל בישיבה",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "85",
      headerName: "שיווי משקל בהליכה",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "86",
      headerName: "יכולת להיות במאמץ גופני (סיבולת)",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "87",
      headerName: "אוחז בדברים גדולים בשתי הידים",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "88",
      headerName: "בעל כח פיזי בידיים",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "89",
      headerName: "יכולת הרכבה ופירוק",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "90",
      headerName: "עצמאי בהליכה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "91",
      headerName: "בעל כח פיזי ברגליים",
      width: 170,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "92",
      headerName: "שיווי משקל בעמידה",
      width: 140,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "93",
      headerName: "יכולת טיפוס על סולם/מדרגות",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "94",
      headerName: "יכולת דחיפה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "95",
      headerName: "יכולת משיכה",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "96",
      headerName: "שימוש 2 ידיים וזרועות",
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "97",
      headerName: "עמידה ממושכת",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "98",
      headerName: "הליכה למרחקים ארוכים",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "99",
      headerName: "הליכה עם ציוד",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "100",
      headerName: "שומר על נקיון והגיינה של הסביבה",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "101",
      headerName: "יכולת קבלת עזרה",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "102",
      headerName: "יכול לתפעל בעיית כסף",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "103",
      headerName: "משתמש בכסף",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "104",
      headerName: "יכול לחשב עודף",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "105",
      headerName: "יכול לגבות תשלום",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Remarks",
      headerName: "הערות",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actionsPrivateCard",
      type: "actions",
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon style={{ fill: "gray" }} />}
          label="Delete"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<EqualizerIcon style={{ fill: "gray" }} />}
          label="Toggle Admin"
          // onClick={}
          // showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon style={{ fill: "gray" }} />}
          label="Edit"

          // onClick={}
          // showInMenu
        />,
        // <GridActionsCellItem
        //   icon={<FileCopyIcon />}
        //   label="Duplicate User"
        //   // onClick={}
        //   showInMenu
        // />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon style={{ fill: "gray" }} />}
          label="Duplicate User"
          // onClick={}
          showInMenu
        />,
      ],
    },
  ];

  const rowsTaskability = [
    {
      id: 1,
      tasks: "לבוש מתאים",
    },
    {
      id: 2,
      tasks: "מסיכה",
    },

    {
      id: 3,
      tasks: "נעליים סגורות",
    },
    {
      id: 4,
      tasks: "חולצה לבנה",
    },
    {
      id: 5,
      tasks: "שיער אסוף",
    },
    {
      id: 6,
      tasks: "מוציאים בצק מהמקרר",
    },
    {
      id: 7,
      tasks: "משמנים מגשים",
    },
    {
      id: 8,
      tasks: "מקמחים את הבצק עם קמח",
    },
    {
      id: 9,
      tasks: "מניחים את הבצק על המרדד",
    },
    {
      id: 10,
      tasks: "פותחים את הבצק",
    },
    {
      id: 11,
      tasks: "משטחים את הבצק",
    },
    {
      id: 12,
      tasks: "מכסים את כל התבנית",
    },
    {
      id: 13,
      tasks: "מחוררים את הבצק",
    },
    {
      id: 14,
      tasks: "לוקחים רוטב עם הכף",
    },
    {
      id: 15,
      tasks: "מורחים את הרוטב",
    },
    {
      id: 16,
      tasks: "מקפידים להגיע לכל הפינות",
    },
    {
      id: 17,
      tasks: "משטחים את הרוטב",
    },
    {
      id: 18,
      tasks: "לוקחים גבינה מהמיכל",
    },
    {
      id: 19,
      tasks: "הפיצה מוכנה לתנור",
    },
  ];
  // until here will be from DB

  return (
    <div className="App">
      <div className="headline">Flags</div>
      <div className="table">
        <DataTable
          columns={columnsFlags}
          rows={rowsFlags}
          headers={["try"]}
          groups={1}
          marginSearchBar={198}
        />
      </div>
      <br></br>

      <br></br>
      <br></br>
      <br></br>
      <div className="headline">Cogntive Profile</div>
      <div className="table">
        <DataTable
          columns={columnsCognitive}
          rows={rowsCognitive}
          headers={["try"]}
          groups={1}
          marginSearchBar={855}
        />
      </div>

      <br></br>
      <br></br>
      <div className="headline">כרטסת אישית</div>
      <div className="table">
        <DataTable
          columns={columnsPrivateCard}
          rows={rowsPrivateCard}
          headers={["היסטוריה", "פרטים אישיים"]}
          groups={2}
          marginSearchBar={325}
        />
      </div>

      <br></br>
      <br></br>
      <div className="headline">Taskability</div>
      <div className="table">
        <DataTable
          columns={columnsTaskability}
          rows={rowsTaskability}
          headers={["try"]}
          groups={1}
          marginSearchBar={855}
        />
      </div>
    </div>
  );
}

export default App;
