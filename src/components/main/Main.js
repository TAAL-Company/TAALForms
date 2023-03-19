import React, { useState } from "react";
import DataTableLTR from "../data_grid/DataTableLTR";
import DataTableRTL from "../data_grid/DataTableRTL";
import "../../App.css";
import Status from "../classification_component/Status";
import StatusLTR from "../classification_component/StatusLTR";
import cognitiveList from "../../api/cognitive.json";
import taskpic from "../../Pictures/taskpic.png";
import {
  getingDataUsers,
  getingDataTasks,
  postDataCognitiveProfile,
} from "../../api/api";
import taskpic1 from "../../Pictures/taskpic1.jpg";
import taskpic2 from "../../Pictures/taskpic2.jpeg";
import taskpic3 from "../../Pictures/taskpic3.jpg";
import taskpic4 from "../../Pictures/taskpic4.jpg";
import taskpic5 from "../../Pictures/taskpic5.jpeg";
import taskpic6 from "../../Pictures/taskpic6.jpeg";
import taskpic7 from "../../Pictures/taskpic7.jpg";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Select } from "@mui/material";
import "flag-icon-css/css/flag-icon.min.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getCognitiveProfile } from "../../api/get_requests/getCognitiveProfile";
import { useEffect } from "react";
import { id } from "date-fns/locale";

function Main() {
  const [explainationError, setExplainationError] = useState("");
  const [interventionError, setinterventionError] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  // this six variables will be get as props from editor window (editor will take this from DB)
  const [workerNameEN, setWorkerNameEN] = useState("Eyal Engel");
  const [routeNameEN, setRouteNameEN] = useState("Azrieli Tel Aviv - Morning");
  const [siteNameEN, setSiteNameEN] = useState("Azrieli Tel Aviv");

  const [worker, setWorker] = useState([]);

  const [workerNameHE, setWorkerNameHE] = useState("אייל אנגל");
  const [routeNameHE, setRouteNameHE] = useState("עזריאלי תל אביב - בוקר");
  const [siteNameHE, setSiteNameHE] = useState("");
  let loadingCog = false;
  let loadingTaskAb = false;

  const [rowsCognitiveHE, setRowsCognitiveHE] = useState([]);
  const [changeUser, setChangeUser] = useState(false);
  const [saveProfileChanges, setSaveProfileChanges] = useState(false);

  const [cognitiveProfileValues, setCognitiveProfileValues] = useState([]);
  const [columnsTaskabilityHE, setColumnsTaskabilityHE] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "taskTaskabilityHE",
      headerName: "משימה",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "routeTaskabilityHE",
      headerName: "מסלול",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "siteTaskabilityHE",
      headerName: "אתר",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAllUsers(await getingDataUsers()); //get request for Users
        setAllTasks(await getingDataTasks());
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("worker", worker);
  }, [worker]);

  useEffect(() => {
    console.log("columnsTaskabilityHE", columnsTaskabilityHE);
    if (columnsTaskabilityHE.length > 0 && !loadingTaskAb) {
      loadingTaskAb = true;
      cognitiveList.map((cognitive) => {
        if (cognitive.score === "A-D") {
          setColumnsTaskabilityHE((prev) => [
            ...prev,
            {
              field: cognitive.NO.toString(),
              headerName: cognitive.trait,
              width: 200,
              editable: false,
              headerAlign: "center",
              align: "center",
            },
          ]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (saveProfileChanges === true) {
      setSaveProfileChanges(false);
      if (worker.length != 0) {
        postDataCognitiveProfile(worker.id, cognitiveProfileValues);
        console.log("66 cognitiveProfileValues", cognitiveProfileValues);
      }
    }
  }, [saveProfileChanges]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCognitiveProfileValues(await getCognitiveProfile(worker.id));
      } catch (error) {
        console.error(error.message);
        setCognitiveProfileValues(new Array(242).fill(0));
      }
    };
    fetchData();

    console.log("cognitiveProfileValues", cognitiveProfileValues);
  }, [worker]);

  useEffect(() => {
    if ((rowsCognitiveHE.length === 0 && !loadingCog) || changeUser) {
      if (changeUser) setRowsCognitiveHE([]);
      loadingCog = true;

      cognitiveList.map((cognitive) => {
        let cogValue = 0;
        if (cognitiveProfileValues != undefined)
          cogValue = cognitiveProfileValues[cognitive.NO];

        setRowsCognitiveHE((prev) => [
          ...prev,
          {
            id: cognitive.NO,
            fieldHE: cognitive.trait,
            mustField: cognitive.requiredField,
            subfield: cognitive.subTrait,
            grade: cogValue,
            // fieldEN: "first languege",
            classificationHE: cognitive.category,
            // classificationEN: "languege",
            MLFactor: cognitive.ML,
          },
        ]);

        // }
      });
    }

    if (changeUser) {
      setChangeUser(false);
    }

    console.log("rowsCognitiveHE", rowsCognitiveHE);
  }, [cognitiveProfileValues]);

  const [selectedTable, setSelectedTable] = useState("flags");
  const handleSelectTable = (table) => {
    setSelectedTable(table);
  };

  const [explainationBorderColor, setExplainationBorderColor] =
    useState("initial");
  const [interventionBorderColor, setinterventionBorderColor] =
    useState("initial");

  const validateExplaination = (value) => {
    if (value.length > 100) {
      setExplainationError("Maximum length is 100 characters");
      setExplainationBorderColor("red");
    } else {
      setExplainationError("");
      setExplainationBorderColor("initial");
    }
  };

  const validateintervention = (value) => {
    if (!value) {
      setinterventionError("Please enter a value");
      setinterventionBorderColor("red");
    } else if (value.length > 100) {
      setinterventionError("Maximum length is 100 characters");
      setinterventionBorderColor("red");
    } else {
      setinterventionError("");
      setinterventionBorderColor("initial");
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    setRowsFlagsHE((prev) => prev.filter((row) => row.id !== id));
    setRowsFlagsEN((prev) => prev.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    // console.log(row);
    setIsDialogOpen(true);
    setCurrRow(row);
    setInitialValuesRow(row);
    setSlide(!slide);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSlide(!slide);
  };

  const handleSave = (data) => {
    if (explainationError || interventionError) {
      return;
    }
    const updatedRows = [...rowsFlagsHE];
    let eyh = true;

    for (let i = 0; i < rowsFlagsHE.length && eyh; i++) {
      if (rowsFlagsHE[i].id === data.id) {
        // console.log("true");
        updatedRows[i] = data;
        setRowsFlagsHE(updatedRows);
        eyh = false;
      }
    }
    setIsDialogOpen(false);
    setSlide(!slide);
  };

  const handleSaveEN = (data) => {
    if (explainationError || interventionError) {
      return;
    }
    const updatedRowsEN = [...rowsFlagsEN];
    let eyh = true;

    for (let i = 0; i < rowsFlagsEN.length && eyh; i++) {
      if (rowsFlagsEN[i].id === data.id) {
        // console.log("true");
        updatedRowsEN[i] = data;
        setRowsFlagsEN(updatedRowsEN);
        eyh = false;
      }
    }
    setIsDialogOpen(false);
    setSlide(!slide);
  };

  const handleReset = () => {
    setCurrRow(initialValuesRow);
    // setCurrRow({ ...currRow, Alternatives: initialValuesRow.Alternatives });
  };

  const fillFalse = (props) => {
    console.log(`Setting ${props.groupingColumn}`);
    console.log(`show:  ${props.show} `);

    if (props.groupingColumn === "PrivateInfoEN") {
      setRowsPrivateCardHE(
        rowsPrivateCardHE.map((row) => ({
          ...row,
          // fieldHEPrivateCard: props.show ? "" : false,
          xPrivateCard: props.show ? "" : false,
          yPrivateCard: props.show ? "" : false,
          fieldENPrivateCard: props.show ? "" : false,
          classificationHEPrivateCard: props.show ? "" : false,
        }))
      );
    } else if (props.groupingColumn === "HistoryEN") {
      setRowsPrivateCardHE(
        rowsPrivateCardHE.map((row) => ({
          ...row,
          beginningOfWorkPrivateCard: props.show ? "" : false,
          employersPrivateCard: props.show ? "" : false,
          reportsPrivateCard: props.show ? "" : false,
          improvementPrivateCard: props.show ? "" : false,
          interventionHEPrivateCard: props.show ? "" : false,
        }))
      );
    } else if (props.groupingColumn === "LanguageComprehensionEN") {
      setRowsTaskabilityHE(
        rowsTaskabilityHE.map((row) => ({
          ...row,
          understandSpokenLanguageComprehension: props.show ? "" : false,
          understandWrittenLanguageComprehension: props.show ? "" : false,
        }))
      );
    } else if (props.groupingColumn === "LanguagesEN") {
      setRowsTaskabilityHE(
        rowsTaskabilityHE.map((row) => ({
          ...row,
          hebrew: props.show ? "" : false,
          english: props.show ? "" : false,
        }))
      );
    } else if (props.groupingColumn === "PrivateInfoHE") {
      setRowsPrivateCardHE(
        rowsPrivateCardHE.map((row) => ({
          ...row,
          // fieldHEPrivateCard: props.show ? "" : false,
          xPrivateCard: props.show ? "" : false,
          yPrivateCard: props.show ? "" : false,
          fieldENPrivateCard: props.show ? "" : false,
          classificationHEPrivateCard: props.show ? "" : false,
        }))
      );
    } else if (props.groupingColumn === "HistoryHE") {
      setRowsPrivateCardHE(
        rowsPrivateCardHE.map((row) => ({
          ...row,
          beginningOfWorkPrivateCard: props.show ? "" : false,
          employersPrivateCard: props.show ? "" : false,
          reportsPrivateCard: props.show ? "" : false,
          improvementPrivateCard: props.show ? "" : false,
          interventionHEPrivateCard: props.show ? "" : false,
        }))
      );
    } else if (props.groupingColumn === "LanguageComprehensionHE") {
      setRowsTaskabilityHE(
        rowsTaskabilityHE.map((row) => ({
          ...row,
          understandSpokenLanguageComprehension: props.show ? "" : false,
          understandWrittenLanguageComprehension: props.show ? "" : false,
        }))
      );
    } else if (props.groupingColumn === "LanguagesHE") {
      setRowsTaskabilityHE(
        rowsTaskabilityHE.map((row) => ({
          ...row,
          hebrew: props.show ? "" : false,
          english: props.show ? "" : false,
        }))
      );
    }
  };

  // columns and rows will be taken from DB
  const [columnsFlagsHE, setColumnsFlagsHE] = useState([
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
      editable: false,
      sortable: false,
      disableExport: true,
      filterable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        return (
          <div>
            <img
              src={params.row.image}
              alt=""
              style={{
                marginRight: "10px",
                marginTop: "4px",
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
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div style={{ textAlign: "right", fontSize: "1rem" }}>
          {params.row.task}
        </div>
      ),
    },

    {
      field: "classification",
      headerName: "סיווג",
      width: 140,
      editable: false,
      renderCell: (params) => (
        <Status classification={params.row.classification} />
      ),
      headerAlign: "center",
      align: "center",
    },
    {
      field: "intervention",
      headerName: "התאמה",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        if (params.row.intervention === " ") {
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
            <div style={{ textAlign: "right", fontSize: "1rem" }}>
              {params.row.intervention}
            </div>
          );
        }
      },
    },
    {
      field: "Alternatives",
      headerName: "חלופה",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        if (params.row.Alternatives === " ") {
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
            <div style={{ textAlign: "right", fontSize: "1rem" }}>
              {params.row.Alternatives}
            </div>
          );
        }
      },
    },

    {
      field: "explaination",
      headerName: "הסבר",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div style={{ textAlign: "right", fontSize: "1rem" }}>
          {params.row.explaination}
        </div>
      ),
    },

    {
      field: "actions",
      headerName: "אפשרויות",
      headerAlign: "left",
      align: "left",
      type: "actions",
      direction: "rtl",
      width: 470,
      editable: false,
      sortable: false,
      disableExport: true,
      getActions: (params) => {
        let actions = [];

        if (params.row.classification !== "green") {
          actions.push(
            <GridActionsCellItem
              icon={<EditIcon style={{ fill: "gray" }} />}
              label="Edit"
              onClick={() => handleEdit(params.row)}
              showInMenu
            />
          );
        }

        actions.push(
          <GridActionsCellItem
            icon={<DeleteIcon style={{ fill: "gray" }} />}
            label="Delete"
            onClick={() => handleDelete(params.id)}
            showInMenu
          />
        );

        return actions;
      },
    },
  ]);

  const [columnsFlagsEN, setColumnsFlagsEN] = useState([
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
      editable: false,
      sortable: false,
      filterable: false,
      disableExport: true,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div>
            <img
              src={params.row.image}
              alt=""
              style={{
                marginRight: "10px",
                marginTop: "4px",
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
      headerName: "Task",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div style={{ textAlign: "left", fontSize: "1rem" }}>
          {params.row.task}
        </div>
      ),
    },

    {
      field: "classification",
      headerName: "Classification",
      width: 160,
      editable: false,
      renderCell: (params) => (
        <StatusLTR classification={params.row.classification} />
      ),
      headerAlign: "center",
      align: "center",
    },
    {
      field: "intervention",
      headerName: "Intervention",
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        if (params.row.intervention === " ") {
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
            <div style={{ textAlign: "left", fontSize: "1rem" }}>
              {params.row.intervention}
            </div>
          );
        }
      },
    },
    {
      field: "Alternatives",
      headerName: "Alternatives",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        if (params.row.Alternatives === " ") {
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
            <div style={{ textAlign: "left", fontSize: "1rem" }}>
              {params.row.Alternatives}
            </div>
          );
        }
      },
    },
    {
      field: "explaination",
      headerName: "Explaination",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div style={{ textAlign: "left", fontSize: "1rem" }}>
          {params.row.explaination}
        </div>
      ),

      // renderCell: (params) =>
      // params.row.explaination.length > 0 ? (
      //   <div style={{ textAlign: "left", fontSize: "1rem" }}>
      //     {params.row.explaination}
      //   </div>
      // ) : (
      //   <div
      //     style={{ textAlign: "center", fontSize: "0.8rem", color: "grey" }}
      //   >
      //     No explanation has been entered for this task
      //   </div>
      // ),
    },

    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      type: "actions",
      width: 80,
      editable: false,
      sortable: false,
      disableExport: true,

      getActions: (params) => {
        let actions = [];

        if (params.row.classification !== "green") {
          actions.push(
            <GridActionsCellItem
              className="grid-actions-cell"
              icon={<EditIcon style={{ fill: "gray" }} />}
              label="Edit"
              onClick={() => handleEdit(params.row)}
              showInMenu
            />
          );
        }

        actions.push(
          <GridActionsCellItem
            className="grid-actions-cell"
            icon={<DeleteIcon style={{ fill: "gray" }} />}
            label="Delete"
            onClick={() => handleDelete(params.id)}
            showInMenu
          />
        );

        return actions;
      },
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currRow, setCurrRow] = useState({});
  const [initialValuesRow, setInitialValuesRow] = useState({});

  const [slide, setSlide] = React.useState(false);
  const [language, setLanguage] = useState("hebrew");

  const [rowsFlagsHE, setRowsFlagsHE] = useState([
    {
      id: 1,
      image: taskpic,
      classification: "red",
      task: "לבוש סינר",
      intervention: " ",
      Alternatives: "הסבר בקול",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר לחיצה על כפתור העזרה.",
      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 2,
      image: taskpic1,
      classification: "yellow",
      task: "לנעול את חדר המחזור עם המפתח הירוק",
      intervention: "טקסט מילולי על המפתח",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה.",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 3,
      image: taskpic2,
      classification: "green",
      task: "לנקות את הקופסאות ולייבש",
      intervention: " ",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר לחיצה על כפתור העזרה.",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 4,
      image: taskpic3,
      classification: "yellow",
      task: "לפזר גבינה על הפיצה",
      intervention: "עזרה",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר לחיצה על כפתור העזרה.",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 5,
      image: taskpic4,
      classification: "green",
      task: "לנעול את חדר המחזור עם המפתח הירוק",
      intervention: " ",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר .",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 6,
      image: taskpic5,
      classification: "green",
      task: "לשים תג שם על הסינר",
      intervention: " ",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר לחיצה.",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 7,
      image: taskpic6,
      classification: "red",
      task: "לשטוף את המלפפונים בכיור",
      intervention: " ",
      Alternatives: "הסבר בקול",
      // date: "5/12/2020",
      // status: "לא פעיל",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה.",
    },
    {
      id: 8,
      image: taskpic7,
      classification: "yellow",
      task: "למיין את הבקבוקים שבשקית הכחולה",
      intervention: "טקסט מילולי על השקית",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 9,
      image: taskpic1,
      classification: "red",
      task: "לנעול את חדר המחזור עם המפתח הירוק",
      intervention: " ",
      Alternatives: "הסבר בקול",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר לחיצה על כפתור העזרה.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 10,
      image: taskpic2,
      classification: "yellow",
      task: "לנקות את הקופסאות ולייבש",
      intervention: "עזרה בההפעלה וכיבוי הברז",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר לחיצה על כפתור העזרה.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 11,
      image: taskpic3,
      classification: "green",
      task: "לפזר גבינה על הפיצה",
      intervention: " ",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג",
      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 12,
      image: taskpic4,
      classification: "red",
      task: "לנעול את חדר המחזור עם המפתח הירוק",
      intervention: " ",
      Alternatives: "הסבר בקול",
      explaination: "טקסט הסבר זה יוצג.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 13,
      image: taskpic2,
      classification: "green",
      task: "לנקות את הקופסאות ולייבש",
      intervention: " ",
      Alternatives: " ",
      explaination: "טקסט הסבר זה יוצג בהודעת עזרה לאחר לחיצה על כפתור העזרה.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 14,
      image: taskpic1,
      classification: "green",
      task: "לנעול את חדר המחזור עם המפתח הירוק",
      intervention: " ",
      Alternatives: " ",
      explaination: "טקסט הסבר.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
  ]);

  const [rowsFlagsEN, setRowsFlagsEN] = useState([
    {
      id: 1,
      image: taskpic,
      classification: "red",
      task: "wearing an apron",
      intervention: " ",
      Alternatives: "tab",
      // date: "5/12/2020",
      // status: "לא פעיל",
      explaination:
        "helpful text, this will be showed on help msg after clicking the help button.",
    },
    {
      id: 2,
      image: taskpic1,
      classification: "yellow",
      task: "Lock the cycle room with the green key",
      Alternatives: " ",
      explaination: "helpful text, this will be showed on help message.",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 3,
      image: taskpic2,
      classification: "green",
      task: "Clean the boxes and dry",
      intervention: " ",
      Alternatives: " ",
      explaination: "",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 4,
      image: taskpic3,
      classification: "yellow",
      task: "Put cheese on the pizza",
      intervention: "helping",
      Alternatives: " ",
      explaination: "short text",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 5,
      image: taskpic4,
      classification: "green",
      task: "Lock the cycle room with the green key",
      intervention: " ",
      Alternatives: " ",
      explaination: "helpful text, this will be showed on help msg after.",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 6,
      image: taskpic5,
      classification: "green",
      task: "Put a name tag on the apron",
      intervention: " ",
      Alternatives: " ",
      explaination:
        "helpful text, this will be showed on help msg after clicking.",

      // date: "5/12/2020",
      // status: "לא פעיל",
    },
    {
      id: 7,
      image: taskpic6,
      classification: "red",
      task: "Wash the cucumbers in the sink",
      intervention: " ",
      Alternatives: "tab",
      // date: "5/12/2020",
      // status: "לא פעיל",
      explaination: "helpful text, this will be showed on help.",
    },
    {
      id: 8,
      image: taskpic7,
      classification: "yellow",
      task: "Sort the bottles inside the blue bag",
      intervention: "helping",
      Alternatives: " ",
      explaination: "helpful text, this will be showed on help msg.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 9,
      image: taskpic1,
      classification: "red",
      task: "Lock the cycle room with the green key",
      intervention: " ",
      Alternatives: "tab",
      // date: "5/12/2020",
      // status: "פעיל",
      explaination: "helpful text",
    },
    {
      id: 10,
      image: taskpic2,
      classification: "yellow",
      task: "Clean the boxes and dry",
      intervention: "helping",
      Alternatives: " ",
      explaination:
        "helpful text, this will be showed on help msg after clicking the help button.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 11,
      image: taskpic3,
      classification: "green",
      task: "Put cheese on the pizza",
      intervention: " ",
      Alternatives: " ",
      explaination: "helpful text, this will.",

      // date: "5/12/2020",
      // status: "פעיל",
    },
    {
      id: 12,
      image: taskpic4,
      classification: "red",
      task: "Lock the cycle room with the green key",
      intervention: " ",
      Alternatives: "tab",
      // date: "5/12/2020",
      // status: "פעיל",
      explaination: "helpful text, this will be showed.",
    },
    {
      id: 13,
      image: taskpic2,
      classification: "green",
      task: "Clean the boxes and dry",
      intervention: " ",
      Alternatives: " ",
      // date: "5/12/2020",
      // status: "פעיל",
      explaination: "",
    },
    {
      id: 14,
      image: taskpic1,
      classification: "green",
      task: "Lock the cycle room with the green key",
      intervention: " ",
      Alternatives: " ",
      // date: "5/12/2020",
      // status: "פעיל",
      explaination: "helpful text.",
    },
  ]);

  // cognitive profile
  const [columnsCognitiveHE, setColumnsCognitiveHE] = useState([
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
      width: 200,
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

    {
      field: "actions",
      type: "actions",
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon style={{ fill: "gray" }} />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
          showInMenu
        />,
        // <GridActionsCellItem
        //   icon={<DeleteIcon style={{ fill: "gray" }} />} "",
        //   label="Delete"
        //   showInMenu
        // />,
      ],
    },
  ]);

  // end of cognitive profile table

  // start of כרטסת אישית

  const [columnsPrivateCardHE, setColumnsPrivateCardHE] = useState([
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
      editable: false,
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
    //   field: "interventionHEPrivateCard",
    //   headerName: "possible intervention",
    //   width: 180,
    //   editable: false,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "actionsPrivateCard",
      type: "actions",
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon style={{ fill: "gray" }} />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
          showInMenu
        />,
      ],
    },
  ]);

  const [rowsPrivateCardHE, setRowsPrivateCardHE] = useState([
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
  ]);

  // taskability
  // ToDo - A function that calculates the width each column needs according to the number of characters (length)

  const [rowsTaskabilityHE, setRowsTaskabilityHE] = useState([
    {
      id: 1,
      tasks: "לבוש מתאים",
      hebrew: "4A",
      english: "1C",
    },
    {
      id: 2,
      tasks: "מסיכה",
      hebrew: "3c",
      english: "1b",
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
  ]);
  // until here will be from DB

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors };
  //   if ("task" in fieldValues)
  //     temp.task = fieldValues.fullName ? "" : "This field is required.";
  //   if ("intervention" in fieldValues)
  //     temp.intervention = fieldValues.intervention
  //       ? ""
  //       : "This field is required.";
  //   if ("Alternative" in fieldValues) {
  //     temp.Alternative = fieldValues.Alternative
  //       ? ""
  //       : "This field is required.";
  //   }
  //   if ("image" in fieldValues) {
  //     temp.image = fieldValues.image ? "" : "This field is required.";
  //   }
  //   setErrors({
  //     ...temp,
  //   });

  //   if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  // };

  return (
    <div className="App">
      <div>
        <div>
          <button
            className={`switch-button ${
              language === "hebrew" ? "hebrew" : "english"
            }`}
            onClick={() =>
              setLanguage(language === "hebrew" ? "english" : "hebrew")
            }
          >
            {/* {language === "hebrew" ? "HE" : "EN"} */}
            {language === "hebrew" ? (
              <>
                <i className="flag-icon flag-icon-il"></i>
                <h4 style={{ marginLeft: "3px" }}>HE</h4>
              </>
            ) : (
              <>
                <i className="flag-icon flag-icon-us"></i>
                <h4 style={{ marginLeft: "3px" }}>EN</h4>
              </>
            )}
          </button>
        </div>

        {language === "hebrew" ? (
          <>
            <div className="Navbar" style={{ direction: "rtl" }}>
              <nav>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("flags")}
                >
                  דגלים
                </button>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("privateCard")}
                >
                  כרטסת אישית
                </button>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("cognitiveProfile")}
                >
                  פרופיל קוגנטיבי
                </button>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("taskability")}
                >
                  דרישות למשימה
                </button>
              </nav>
            </div>
            {selectedTable === "flags" && (
              <div>
                <div className="headline">דגלים</div>
                <div className="table">
                  {isDialogOpen && (
                    // <Draggable>
                    <Dialog
                      open={isDialogOpen}
                      onClose={handleClose}
                      aria-labelledby={"alert-dialog-slide-title"}
                      aria-describedby={"alert-dialog-slide-description"}
                      // TransitionComponent={Transition}
                      // keepMounted={slide}
                      // transitionDuration={300}
                      disableEscapeKeyDown
                      // style={{ direction: "rtl" }}
                      // style={{ position: "absolute", top: "0", right: "0" }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <DialogActions
                          style={{ direction: "rtl", flexGrow: 1 }}
                        >
                          <Button onClick={handleClose}>X</Button>
                        </DialogActions>

                        <DialogTitle id="form-dialog-title">
                          עריכת משימה
                        </DialogTitle>
                      </div>
                      <DialogContent dividers>
                        <div
                          className="firstRow"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            autoFocus
                            margin="dense"
                            id="task"
                            label="Task"
                            type="text"
                            value={currRow.task}
                            onChange={(e) =>
                              setCurrRow({ ...currRow, task: e.target.value })
                            }
                            style={{ width: "75%" }}
                            disabled
                          />
                          <img
                            src={currRow.image}
                            alt=""
                            style={{
                              marginLeft: "20px",
                              marginTop: "4px",
                              width: "88px",
                              height: "56px",
                              borderRadius: "3px",
                            }}
                          />
                        </div>
                        <TextField
                          margin="dense"
                          id="classification"
                          label="Classification"
                          type="text"
                          value={currRow.classification}
                          onChange={(e) =>
                            setCurrRow({
                              ...currRow,
                              classification: e.target.value,
                            })
                          }
                          fullWidth
                          disabled
                        />

                        {currRow.intervention !== " " && (
                          <TextField
                            margin="dense"
                            id="intervention"
                            label="intervention"
                            type="text"
                            value={currRow.intervention}
                            onChange={(e) => {
                              setCurrRow({
                                ...currRow,
                                intervention: e.target.value,
                              });
                              validateintervention(e.target.value);
                            }}
                            error={Boolean(interventionError)}
                            helperText={interventionError}
                            style={{ borderColor: interventionBorderColor }}
                            fullWidth
                          />
                        )}

                        {currRow.intervention === " " && (
                          <TextField
                            margin="dense"
                            id="intervention"
                            label="intervention"
                            type="text"
                            value={"שדה זה זמין רק כאשר הסיווג הוא צהוב"}
                            style={{
                              borderColor: interventionBorderColor,
                            }}
                            fullWidth
                            disabled
                          />
                        )}

                        {currRow.Alternatives === " " && (
                          <Select
                            native
                            value={"שדה זה זמין רק כאשר הסיווג הוא אדום"}
                            id="select-Alternatives"
                            label="Alternatives"
                            fullWidth
                            style={{ direction: "rtl" }}
                            disabled
                          >
                            {" "}
                            <option
                              value={"שדה זה זמין רק כאשר הסיווג הוא אדום"}
                            >
                              שדה זה זמין רק כאשר הסיווג הוא אדום
                            </option>
                          </Select>
                        )}

                        {currRow.Alternatives !== " " && (
                          <Select
                            native
                            value={currRow.Alternatives.toString()}
                            id="select-Alternatives"
                            label="Alternatives"
                            fullWidth
                            onChange={(e) =>
                              setCurrRow({
                                ...currRow,
                                Alternatives: e.target.value,
                              })
                            }
                            style={{ direction: "rtl" }}
                          >
                            {/* <option aria-label="None" value="" /> */}
                            <optgroup label="כותב מילים בודדות לא מוכרות">
                              <option value={"מדבקות מוכנות"}>
                                מדבקות מוכנות
                              </option>
                              <option value={"כרטיסיה"}>כרטיסיה</option>
                              <option value={"צורות"}>צורות</option>
                            </optgroup>
                            <optgroup label="רגישות יתר במישוש">
                              <option value={"כפפה"}>כפפה</option>
                              <option value={"מטלית"}>מטלית</option>
                            </optgroup>
                            <optgroup label="מזהה צבעים מורכבים">
                              <option value={"ציור"}>ציור</option>
                              <option value={"סמלול"}>סמלול</option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                            </optgroup>{" "}
                            <optgroup label="מזהה צורות מורכבות">
                              <option value={"ציור"}>ציור</option>
                              <option value={"סמלול"}>סמלול</option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                            </optgroup>{" "}
                            <optgroup label="פיצול קשב (dividing)">
                              <option value={"חדר שקט"}>חדר שקט</option>
                              <option value={"הפסקה"}>הפסקה</option>
                            </optgroup>{" "}
                            <optgroup label="זיכרון לטווח קצר (30 שניות)">
                              <option value={"חזרה על משימה"}>
                                חזרה על משימה
                              </option>
                              <option value={"תזכורות באפליקציה"}>
                                תזכורות באפליקציה
                              </option>
                              <option value={"רשימה מודפסת"}>
                                רשימה מודפסת
                              </option>
                            </optgroup>{" "}
                            <optgroup label="זיהוי צורות (דו מימד)">
                              <option value={"ציור"}>ציור</option>
                              <option value={"סמלול"}>סמלול</option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                            </optgroup>{" "}
                            <optgroup label="מזהה אנשים (פנים ושם)">
                              <option value={"צילום"}>צילום</option>
                              <option value={"כרטסת מודפסת"}>
                                כרטסת מודפסת
                              </option>
                            </optgroup>
                            <optgroup label="מזהה תמונות">
                              <option value={"ציור"}>ציור</option>
                              <option value={"סמלול"}>סמלול</option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                            </optgroup>
                            <optgroup label="מזהה סמלים גרפיים פשוטים">
                              <option value={"ציור"}>ציור</option>
                              <option value={"סמלול"}>סמלול</option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                            </optgroup>
                            <optgroup label="מזהה איקונים">
                              <option value={"ציור"}>ציור</option>
                              <option value={"סמלול"}>סמלול</option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                            </optgroup>
                            <optgroup label="זהירות בשימוש בחומרים מסוכנים">
                              <option value={"הוספת אמצעי הגנה"}>
                                הוספת אמצעי הגנה
                              </option>
                              <option value={"הרחקה"}>הרחקה</option>
                              <option value={"הוספת אזהרה"}>הוספת אזהרה</option>
                            </optgroup>
                            <optgroup label="זהירות שימוש בעצמים חדים">
                              <option value={"הוספת אמצעי הגנה"}>
                                הוספת אמצעי הגנה
                              </option>
                              <option value={"הרחקה"}>הרחקה</option>
                              <option value={"הוספת אזהרה"}>הוספת אזהרה</option>
                            </optgroup>
                            <optgroup label="זהירות שימוש במכשירי חשמל">
                              <option value={"הוספת אמצעי הגנה"}>
                                הוספת אמצעי הגנה
                              </option>
                              <option value={"הרחקה"}>הרחקה</option>
                              <option value={"הוספת אזהרה"}>הוספת אזהרה</option>
                            </optgroup>
                            <optgroup label="עמידה לאורך זמן מחולשת רגליים">
                              <option value={"ישיבה על כיסא"}>
                                ישיבה על כיסא
                              </option>
                              <option value={"הפסקות כל 10 דקות"}>
                                הפסקות כל 10 דקות
                              </option>
                              <option value={"שינוי מנח לאורך הפעילות"}>
                                שינוי מנח לאורך הפעילות
                              </option>
                            </optgroup>
                            <optgroup label="זיהוי מקום והתמצאות במרחב">
                              <option value={"שלטים עם מלל"}>
                                שלטים עם מלל
                              </option>
                              <option value={"תמונות"}>תמונות </option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                            </optgroup>
                            <optgroup label="עיוורון צבעים">
                              <option value={"שיטת מיון שונה"}>
                                שיטת מיון שונה
                              </option>
                              <option value={"הסבר בקול"}>הסבר בקול</option>
                              <option value={"בקרה חיצונית"}>
                                בקרה חיצונית
                              </option>
                            </optgroup>
                          </Select>
                        )}

                        <TextField
                          margin="dense"
                          id="explaination"
                          label="Explaination"
                          type="text"
                          value={currRow.explaination}
                          onChange={(e) => {
                            setCurrRow({
                              ...currRow,
                              explaination: e.target.value,
                            });
                            validateExplaination(e.target.value);
                          }}
                          error={Boolean(explainationError)}
                          helperText={explainationError}
                          style={{ borderColor: explainationBorderColor }}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions style={{ direction: "rtl" }}>
                        <Button onClick={handleReset}>איפוס</Button>
                        <Button onClick={() => handleSave(currRow)}>
                          שמור
                        </Button>
                        {/* <Button onClick={handleClose}>X</Button> */}
                      </DialogActions>
                    </Dialog>
                    // </Draggable>
                  )}
                  <DataTableRTL
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"FlagsHE"}
                    columns={columnsFlagsHE}
                    setColumns={setColumnsFlagsHE}
                    rows={rowsFlagsHE}
                    isInfoUserRoute={true}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={workerNameHE}
                    setWorker={setWorker}
                    worker={worker}
                    routeName={routeNameHE}
                    siteName={siteNameHE}
                  />
                </div>
              </div>
            )}

            {selectedTable === "cognitiveProfile" && (
              <div>
                <div className="headline">פרופיל קוגנטיבי</div>
                <div className="table">
                  <DataTableRTL
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"CognitiveProfileHE"}
                    columns={columnsCognitiveHE}
                    setColumns={setColumnsCognitiveHE}
                    rows={rowsCognitiveHE}
                    setRows={setRowsCognitiveHE}
                    setCognitiveProfileValues={setCognitiveProfileValues}
                    setSaveProfileChanges={setSaveProfileChanges}
                    cognitiveProfileValues={cognitiveProfileValues}
                    setRowsCognitiveHE={setRowsCognitiveHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={true}
                    fillFalse={fillFalse}
                    workerName={workerNameHE}
                    setWorker={setWorker}
                    worker={worker}
                    routeName={routeNameHE}
                    siteName={siteNameHE}
                  />
                </div>
              </div>
            )}

            {selectedTable === "privateCard" && (
              <div>
                <div className="headline">כרטסת אישית</div>
                <div className="table">
                  <DataTableRTL
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"PrivateCardHE"}
                    columns={columnsPrivateCardHE}
                    setColumns={setColumnsPrivateCardHE}
                    rows={rowsPrivateCardHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={workerNameHE}
                    setWorker={setWorker}
                    worker={worker}
                    routeName={null}
                    siteName={null}
                  />
                </div>
              </div>
            )}

            {selectedTable === "taskability" && (
              <div>
                <div className="headline">דרישות למשימה</div>
                <div className="table">
                  <DataTableRTL
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"TaskabilityHE"}
                    columns={columnsTaskabilityHE}
                    setColumns={setColumnsTaskabilityHE}
                    rows={rowsTaskabilityHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={null}
                    routeName={routeNameHE}
                    siteName={siteNameHE}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="Navbar">
              <nav>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("flags")}
                >
                  Flags
                </button>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("privateCard")}
                >
                  Priavte Card
                </button>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("cognitiveProfile")}
                >
                  Cogntive Profile
                </button>
                <button
                  className="btn_nav"
                  onClick={() => handleSelectTable("taskability")}
                >
                  Taskability
                </button>
              </nav>
            </div>
            {selectedTable === "flags" && (
              <div>
                <div className="headline">Flags</div>
                <div className="table">
                  {isDialogOpen && (
                    // <Draggable>
                    <Dialog
                      open={isDialogOpen}
                      onClose={handleClose}
                      aria-labelledby={"alert-dialog-slide-title"}
                      aria-describedby={"alert-dialog-slide-description"}
                      // TransitionComponent={Transition}
                      // keepMounted={slide}
                      // transitionDuration={300}
                      disableEscapeKeyDown
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <DialogTitle id="form-dialog-title">
                          Edit Flag
                        </DialogTitle>
                        <DialogActions
                          style={{ direction: "ltr", flexGrow: 1 }}
                        >
                          <Button onClick={handleClose}>X</Button>
                        </DialogActions>
                      </div>

                      <DialogContent dividers>
                        <div
                          className="firstRow"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          fullWidth
                        >
                          <TextField
                            autoFocus
                            margin="dense"
                            id="task"
                            label="Task"
                            type="text"
                            value={currRow.task}
                            onChange={(e) =>
                              setCurrRow({ ...currRow, task: e.target.value })
                            }
                            style={{ width: "75%" }}
                            disabled
                          />
                          <img
                            src={currRow.image}
                            alt=""
                            style={{
                              marginLeft: "20px",
                              marginTop: "4px",
                              width: "88px",
                              height: "56px",
                              borderRadius: "3px",
                            }}
                          />
                        </div>
                        <TextField
                          margin="dense"
                          id="classification"
                          label="Classification"
                          type="text"
                          value={currRow.classification}
                          onChange={(e) =>
                            setCurrRow({
                              ...currRow,
                              classification: e.target.value,
                            })
                          }
                          fullWidth
                          disabled
                        />

                        {currRow.intervention !== " " && (
                          <TextField
                            margin="dense"
                            id="intervention"
                            label="intervention"
                            type="text"
                            value={currRow.intervention}
                            onChange={(e) => {
                              setCurrRow({
                                ...currRow,
                                intervention: e.target.value,
                              });
                              validateintervention(e.target.value);
                            }}
                            error={Boolean(interventionError)}
                            helperText={interventionError}
                            style={{ borderColor: interventionBorderColor }}
                            fullWidth
                          />
                        )}

                        {currRow.intervention === " " && (
                          <TextField
                            margin="dense"
                            id="intervention"
                            label="intervention"
                            type="text"
                            value={
                              "This field is available only when classification is yellow"
                            }
                            style={{
                              borderColor: interventionBorderColor,
                            }}
                            fullWidth
                            disabled
                          />
                        )}

                        {currRow.Alternatives === " " && (
                          <Select
                            native
                            value={
                              "This field is available only when classification is red"
                            }
                            id="select-Alternatives"
                            label="Alternatives"
                            fullWidth
                            disabled
                          >
                            {" "}
                            <option
                              value={
                                "This field is available only when classification is red"
                              }
                            >
                              This field is available only when classification
                              is red
                            </option>
                          </Select>
                        )}

                        {currRow.Alternatives !== " " && (
                          <Select
                            native
                            value={currRow.Alternatives.toString()}
                            id="select-Alternatives"
                            label="Alternatives"
                            fullWidth
                            onChange={(e) =>
                              setCurrRow({
                                ...currRow,
                                Alternatives: e.target.value,
                              })
                            }
                          >
                            {/* <option aria-label="None" value="" /> */}
                            <optgroup label="writes single unfamiliar words">
                              <option value={"Ready stickers"}>
                                Ready stickers
                              </option>
                              <option value={"tab"}>tab</option>
                              <option value={"Shapes"}>Shapes</option>
                            </optgroup>
                            <optgroup label="hypersensitivity to touch">
                              <option value={"Glove"}>Glove</option>
                              <option value={"cloth"}>cloth</option>
                            </optgroup>
                            <optgroup label="Complex Color ID">
                              <option value={"Drawing"}>Drawing</option>
                              <option value={"symbol"}>symbol</option>
                              <option value={"Explain with voice"}>
                                Explain with voice
                              </option>
                            </optgroup>{" "}
                            <optgroup label="complex shape identifier">
                              <option value={"Drawing"}>Drawing</option>
                              <option value={"symbol"}>symbol</option>
                              <option value={"Explain with voice"}>
                                Explain with voice
                              </option>
                            </optgroup>{" "}
                            <optgroup label="dividing">
                              <option value={"Quiet room"}>Quiet room</option>
                              <option value={"Pause"}>Pause</option>
                            </optgroup>{" "}
                            <optgroup label="Short-term memory (30 seconds)">
                              <option value={"Task repetition"}>
                                Task repetition
                              </option>
                              <option value={"Reminders in the app"}>
                                Reminders in the app
                              </option>
                              <option value={"printed list"}>
                                printed list
                              </option>
                            </optgroup>{" "}
                            <optgroup label="Shape recognition (2D)">
                              <option value={"Drawing"}>Drawing</option>
                              <option value={"symbol"}>symbol</option>
                              <option value={"Explain with voice"}>
                                Explain with voice
                              </option>
                            </optgroup>{" "}
                            <optgroup label="People ID (face and name)">
                              <option value={"photograph"}>photograph</option>
                              <option value={"on a printed card"}>
                                on a printed card
                              </option>
                            </optgroup>
                            <optgroup label="image ID">
                              <option value={"Drawing"}>Drawing</option>
                              <option value={"symbol"}>symbol</option>
                              <option value={"Explain with voice"}>
                                Explain with voice
                              </option>
                            </optgroup>
                            <optgroup label="simple graphic symbol identifier">
                              <option value={"Drawing"}>Drawing</option>
                              <option value={"symbol"}>symbol</option>
                              <option value={"Explain with voice"}>
                                Explain with voice
                              </option>
                            </optgroup>
                            <optgroup label="Icon ID">
                              <option value={"Drawing"}>Drawing</option>
                              <option value={"symbol"}>symbol</option>
                              <option value={"Explain with voice"}>
                                Explain with voice
                              </option>
                            </optgroup>
                            <optgroup label="Caution in the use of hazardous materials">
                              <option value={"Add protection measures"}>
                                Add protection measures
                              </option>
                              <option value={"Exclusion"}>Exclusion</option>
                              <option value={"Add warning"}>Add warning</option>
                            </optgroup>
                            <optgroup label="Caution use of sharp objects">
                              <option value={"Add protection measure"}>
                                Add protection measures
                              </option>
                              <option value={"Exclusion"}>Exclusion</option>
                              <option value={"Add warning"}>Add warning</option>
                            </optgroup>
                            <optgroup label="Caution for using electrical appliances">
                              <option value={"Add protection measures"}>
                                Add protection measures
                              </option>
                              <option value={"Exclusion"}>Exclusion</option>
                              <option value={"Add warning"}>Add warning</option>
                            </optgroup>
                            <optgroup label="long standing from weak legs">
                              <option value={"Sitting on a chair"}>
                                Sitting on a chair
                              </option>
                              <option value={"Breaks every 10 minutes"}>
                                Breaks every 10 minutes
                              </option>
                              <option
                                value={
                                  "modification change throughout the activity"
                                }
                              >
                                modification change throughout the activity
                              </option>
                            </optgroup>
                            <optgroup label="Place identification and spatial orientation">
                              <option value={"Signs with text"}>
                                Signs with text
                              </option>
                              <option value={"Images"}>Images </option>
                              <option value={"Explain with voice"}>
                                Explain with voice
                              </option>
                            </optgroup>
                            <optgroup label="color blindness">
                              <option value={"Different sorting method"}>
                                Different sorting method
                              </option>
                              <option value={"Explain with voice"}>
                                Explain with voice{" "}
                              </option>
                              <option value={"External control"}>
                                External control
                              </option>
                            </optgroup>
                          </Select>
                        )}

                        <TextField
                          margin="dense"
                          id="explaination"
                          label="Explaination"
                          type="text"
                          value={currRow.explaination}
                          onChange={(e) => {
                            setCurrRow({
                              ...currRow,
                              explaination: e.target.value,
                            });
                            validateExplaination(e.target.value);
                          }}
                          error={Boolean(explainationError)}
                          helperText={explainationError}
                          style={{ borderColor: explainationBorderColor }}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleReset}>Reset</Button>
                        <Button onClick={() => handleSaveEN(currRow)}>
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                    // </Draggable>
                  )}
                  <DataTableLTR
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"FlagsEN"}
                    columns={columnsFlagsEN}
                    setColumns={setColumnsFlagsEN}
                    rows={rowsFlagsEN}
                    isInfoUserRoute={true}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={workerNameEN}
                    routeName={routeNameEN}
                    siteName={siteNameEN}
                  />
                </div>
              </div>
            )}

            {selectedTable === "cognitiveProfile" && (
              <div>
                <div className="headline">Cogntive Profile</div>
                <div className="table">
                  <DataTableLTR
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"CognitiveProfileEN"}
                    columns={columnsCognitiveHE}
                    setColumns={setColumnsCognitiveHE}
                    rows={rowsCognitiveHE}
                    setRowsCognitiveHE={setRowsCognitiveHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={true}
                    fillFalse={fillFalse}
                    workerName={workerNameEN}
                    routeName={routeNameEN}
                    siteName={siteNameEN}
                  />
                </div>
              </div>
            )}

            {selectedTable === "privateCard" && (
              <div>
                <div className="headline">Private Card</div>
                <div className="table">
                  <DataTableLTR
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"PrivateCardEN"}
                    columns={columnsPrivateCardHE}
                    setColumns={setColumnsPrivateCardHE}
                    rows={rowsPrivateCardHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={workerNameEN}
                    routeName={null}
                    siteName={null}
                  />
                </div>
              </div>
            )}

            {selectedTable === "taskability" && (
              <div>
                <div className="headline">Taskability</div>
                <div className="table">
                  <DataTableLTR
                    setChangeUser={setChangeUser}
                    allUsers={allUsers}
                    tableType={"TaskabilityEN"}
                    columns={columnsTaskabilityHE}
                    setColumns={setColumnsTaskabilityHE}
                    rows={rowsTaskabilityHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={null}
                    routeName={routeNameEN}
                    siteName={siteNameEN}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Main;
