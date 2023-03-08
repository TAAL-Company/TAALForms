import React, { useState } from "react";
import DataTableLTR from "./components/data_grid/DataTableLTR";
import DataTableRTL from "./components/data_grid/DataTableRTL";

import "./App.css";
import Status from "./components/classification_component/Status";
import StatusLTR from "./components/classification_component/StatusLTR";

import taskpic from "./Pictures/taskpic.png";
import taskpic1 from "./Pictures/taskpic1.jpg";
import taskpic2 from "./Pictures/taskpic2.jpeg";
import taskpic3 from "./Pictures/taskpic3.jpg";
import taskpic4 from "./Pictures/taskpic4.jpg";
import taskpic5 from "./Pictures/taskpic5.jpeg";
import taskpic6 from "./Pictures/taskpic6.jpeg";
import taskpic7 from "./Pictures/taskpic7.jpg";

import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Select } from "@mui/material";
import "flag-icon-css/css/flag-icon.min.css";

//  future animation to popup
// import Slide from "@mui/material/Slide";
// import Draggable from "react-draggable";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function App() {
  const [explainationError, setExplainationError] = useState("");
  const [interventionError, setinterventionError] = useState("");

  // this six variables will be get as props from editor window (editor will take this from DB)

  const [workerNameEN, setWorkerNameEN] = useState("Eyal Engel");
  const [routeNameEN, setRouteNameEN] = useState("Azrieli Tel Aviv - Morning");
  const [siteNameEN, setSiteNameEN] = useState("Azrieli Tel Aviv");

  const [workerNameHE, setWorkerNameHE] = useState("אייל אנגל");
  const [routeNameHE, setRouteNameHE] = useState("עזריאלי תל אביב - בוקר");
  const [siteNameHE, setSiteNameHE] = useState("עזריאלי תל אביב");

  const [cognitiveFields, setCognitiveFields] = useState([
    "מקום תעסוקה קודם",
    "תפקיד בתעסוקה קודמת",
    "שנות תעסוקה",
    "משך זמן מאז תעסוקה",
    "משך זמן ההכשרה",
    "משך זמן מאז ההכשרה",
    "רמת תפקוד בתעסוקה קודמת בתפקיד דומה",
    "רמת תפקוד בתעסוקה קודמת",
    "עבר הכשרה",
    "רמת הצלחה בהכשרה",
    "תואר אקדמי",
    "תעודת בגרות",
    "מעבר ל 12 שנות לימוד",
    "3-8 שנות לימוד",
    "שנות לימוד 8-12",
    "עצמאי בהכנת אוכל",
    "עצמאי באכילה",
    "עצמאי בליבוש חלק עליון",
    "עצמאי בליבוש חלק תחתון",
    "עצמאי בנעילת נעליים",
    "פתרון בעיות פשוטות",
    "פתרון בעיות מורכבות",
    "למידה עצמית - דבר מתוך דבר",
    "מסוגלות לעבוד בסביבת ריחות חזקים",
    "מסוגלות לעבוד בסביבה עם מרקמים ומשטחים שונים",
    "מסוגלות לעבוד בסביבה רועשת ",
    "מסוגלות לעבוד בסביבה עם אורות חזקים",
    "מסוגלות לעבוד בסביבה עם מכשור מסוכן",
    "מסוגלות לעבוד בסביבה עם חומרים מסוכנים",
    "מסוגלות לעבוד בסביבה עם לכלוך ואבק",
    "מסוגלות לעבוד בסביבה של ממצבי קור או חום קיצוניים",
    "ויסות פיזי-התנהגותי ( תנועות רפיטטיביות - נפנופי ידיים, רצון לפציעה עצמית )",
    "שפה 1 - משתמש בא'ב",
    "שפה 1 - כותב מילים בודדות ומוכרות",
    "שפה 1 -כותב מילים בודדות לא מוכרות",
    "שפה 1 -כתיבה שוטפת",
    "שפה 1 -כתיבה - כתב יד קריא וברור, מסר ברור",
    "שפה 1 -קורא מילים בודדות ומוכרות",
    "שפה 1 -קורא מילים בודדת לא מוכרות",
    "שפה 1 -קריאה שוטפת",
    "שפה 2 - משתמש בא'ב",
    "שפה 2 - כותב מילים בודדות ומוכרות",
    "שפה 2 -כותב מילים בודדות לא מוכרות",
    "שפה 2 -כתיבה שוטפת",
    "שפה 2 -כתיבה - כתב יד קריא וברור, מסר ברור",
    "שפה 2 -קורא מילים בודדות ומוכרות",
    "שפה 2 -קורא מילים בודדת לא מוכרות",
    "שפה 2 -קריאה שוטפת",
    "תפיסה קולית",
    "תפיסה חזותית",
    "זיהוי צורות (דו מימד)",
    "תפיסה מרחבית (תלת מימד)",
    "מזהה מגדר",
    "מזהה תפקידים",
    "זוכר פרצופים",
    "התניידות במרחב ומודעות למיקום ומנח הגוף",
    "מהירות פסיכומוטורית (חשיבה ופעולה, תיאום עין-יד)",
    "איכות פסיכו-מוטורית",
    "מיקוד קשב",
    "שימור קשב",
    "הסטת קשב (shifting)",
    "פיצול קשב (dividing)",
    "יכולת הפשטה",
    "יכולת הבנת סיבה ותוצאה",
    "סדר ארגון ותכנון",
    "ניהול זמן עצמאי",
    "מהירות חשיבה",
    "מהירות תגובה",
    "זיהוי מצב חירום (שיפוט)",
    "מודעות לסכנה (שיפוט)",
    "זהירות שימוש במכשירי חשמל",
    "פתרון בעיות",
    "גמישות קוגניטיבית",
    "תובנה",
    "יכולת הכללה",
    "קצב, ארגון, תוכן מותאם ושליטה",
    "אמינות",
    "ביטוי רגשות חיוביים",
    "ביטוי רגשות שליליים",
    "יכולת ביטוי בשפת סימנים",
    "ביצוע מטלה יחידה",
    "ביצוע ריבוי מטלות",
    "ביצוע מטלה רב-שלבית",
    "מזהה ומסוגל לקיים רוטינה יומית",
    "יכולת תיעדוף בין מטלות",
    "שומר על חפציו",
    "שומר על ציוד",
    "קבלת החלטות",
    "תכנון תנועה - ארגון וביצוע פעולות ברצף ובתזמון",
    "זיכרון לטווח קצר (30 שניות)",
    "שליפה מזיכרון לטווח ארוך",
    "זכירת הוראות / זכרון עבודה",
    "ראייה",
    "ראיה לקרוב",
    "ראיה לרחוק",
    "יכולת הבחנה בין צבעים",
    "חוש ריח",
    "חוש שמיעה",
    "שיווי משקל",
    "חוש טעם",
    "ראיה בעין ימין",
    "ראיה בעין שמאל",
    "שמיעה באוזן ימין",
    "שמיעה באוזן שמאל",
    "יכולת להיות במאמץ גופני (סיבולת)",
    "אוחז בדברים גדולים בשתי הידים",
    "בעל כח פיזי בידיים",
    "יכולת הרכבה ופירוק",
    "עצמאי בהליכה",
    "בעל כח פיזי ברגליים",
    "שיווי משקל בעמידה",
    "יכולת טיפוס על סולם/מדרגות",
    "יכולת דחיפה",
    "יכולת משיכה",
    "שימוש 2 ידיים וזרועות",
    "תיאם בי לאטרלי - בפעולות עם 2 ידיים שאחת מייצבת והשניה מבצעת תנועה",
    "שיווי משקל בישיבה",
    "שיווי משקל בהליכה",
    "עצמאי בלבישת בגד עליון כגון: סינר/ חלוק/סרבל",
    "עמידה ממושכת",
    "הליכה למרחקים ארוכים",
    "הליכה עם ציוד",
    "זיהוי מספרים 0-10",
    "זיהוי מספרים 10-100",
    "זיהוי מספרים 100-1000",
    "זיהוי מספרים ללא הגבלה",
    "סופר עד 10",
    "סופר עד 100",
    "סופר ללא הגבלה",
    "מבין כמויות בסיסי",
    "מבין כמויות יחסי (גדול מ... קטן מ...)",
    "מבין כמויות של משקל",
    "מבין כמויות גובה/אורך",
    "מבין כמויות מרחקים",
    "פעולות חילוק",
    "אחוזים",
    "שברים",
    "פעולות חיסור",
    "חישוב מורכב (בעיות מילוליות, נוסחאות מתמטיות, מניפולציות מספריות)",
    "תפיסת זמן",
    "יכולת מעקב אחר הוראות כתובות (צ'ק ליסט)",
    "רכישת מיומנויות בסיסיות (כגון שימוש במזלג)",
    "רכישת מיומנויות מורכבות (כגון כללי משחק)",
    "חיקוי",
    "יכולת למידה מסרטונים",
    "מזהה זמן",
    "מזהה שיוך זמן יחסי (אף פעם, תמיד)",
    "מזהה זמן יחסי (לפני, אחרי, מקודם, אחר כך)",
    "מזהה מקום ( חדר, קומה, בנין, עיר, מדינה)",
    "קורא שעון אנלוגי",
    "קורא שעון דיגיטלי",
    "מזהה לוח שנה",
    "רמת אוריינות בטלפון חכם",
    "רמת אוריינות בטאבלט",
    "משתמש בכסף",
    "יכול לחשב עודף",
    "יכול לגבות תשלום",
    "משלם חשבונות באופן עצמאי",
    "מנהל חשבון בנק באופן עצמאי",
    "יכול לתפעל בעיית כסף",
    "הפקת קול",
    "הגייה",
    "שטף דיבור",
    "הקשבה ויישום הוראות באודיו",
    "התבוננות",
    "מזהה אנשים (פנים ושם)",
    "מזהה תמונות",
    "מזהה סמלים גרפיים פשוטים",
    "מזהה צבעים פשוטים",
    "מזהה צבעים מורכבים",
    "מזהה צורות מורכבות",
    "מזהה איקונים",
    "יודע לנהוג",
    "בעל רשיון נהיגה",
    "משתמש עצמאית במונית",
    "טווח רגשי",
    "מותאמות רגשית",
    "מרגיע עצמית",
    "ויסות רגשי (שליטה בעוצמת ביטוי רגשות, חיוביים או שליליים)",
    "שליטה בדחפים",
    "שליטה בכעסים",
    "יציבות רגשית",
    "מוחצנות",
    "מצפוניות",
    "מוטיבציה",
    "הנעה עצמית",
    "פתיחות",
    "אופטימיות",
    "ביטחון עצמי",
    "חשיבה מערכתית",
    "יודע איך להגיע לשירותים",
    "מבקש ללכת לשירותים",
    "עצמאי בשירותים",
    "מודע לנושא לבוש הולם",
    "שומר על נקיון והגיינה עצמי",
    "שומר על נקיון והגיינה של הסביבה",
    "ישיבה ממושכת",
    "כיפוף (מעבר מעמידה זקופה לכפיפה)",
    "תנועתיות בין תנוחות",
    "הרמת וסחיבה של חפצים",
    "הפרדת תנועה בין האצבעות - אוחז בדברים קטנים באצבעות ",
    "דיוק בשימוש באצבעות",
    "זריזות בשימוש באצבעות",
    "שימוש עצמאי בתחבורה ציבורית למקום מוכר",
    "שימוש עצמאי בתחבורה ציבורית למקום חדש",
    "אין אין שימוש במשקפיים ",
    "אין אין שימוש במכשיר שמיעה",
    "אין אין שימוש בציוד תקשורת מיוחד",
    "אין אין שימוש בהליכון/מקל הליכה",
    "אין אין שימוש בכיסא גלגלים",
    "ערנות וחיוניות",
    "הבנת מידע מילולי ( הבנה של מה שנאמר בעל פה )",
    "הבנת מידע לא מילולי ופרשנות לרמזים",
    "הבנת מידע כתוב",
    "שיחה עם אדם יחיד (יזימה, שימור, סיום)",
    "שיחה קבוצתית",
    "דיון",
    "מתאים את כמות המלל בהתאם לסיטואציה",
    "מנהל שיחה שוטפת",
    "אינטרקציה חברתית בסיסית (מותאמות חברתית, קודים חברתיים)",
    "אינטראקציה חברתית מורכבת (יכולת ליזום ולסיים מערכות יחסים)",
    "יוזם שיחה עם אנשים באופן אקראי",
    "מקיים שיחה עם אנשים באופן אקראי",
    "תקשורת עם עמיתים",
    "מחכה לתורו במהלך השיחה",
    "דיבור חזרתי",
    "זוכר קשרי עבודה",
    "ניהול שיח",
    "משתמש בג'סטות",
    "מביע התנגדות",
    "מצביע על חפצים",
    "ביטוי עצמי",
    "יצירת קשר עין",
    "שמירה על מרחב אישי",
    "התנהלות על פי קודים חברתיים",
    "קבלת סמכות",
    "ציות להוראות",
    "שיקול דעת לגבי מצבים חברתיים עוינים",
    "יכולת מתן עזרה",
    "יכולת קבלת עזרה",
    "מבין שיגרה כללית",
    "מבין חריגות מהשיגרה",
  ]);

  console.log("cognitiveFields: " + cognitiveFields.length);

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

  // jsonObj = { langueges: true, langueges1: false, langueges2: false };

  // const [columnFillRows, setColumnFillRows] = useState({});

  // setColumnFillRows((prev) => ({ ...prev, languages: false }));

  // jsonObj.languages

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
      editable: false,
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
        //   icon={<DeleteIcon style={{ fill: "gray" }} />}
        //   label="Delete"
        //   showInMenu
        // />,
      ],
    },
  ]);

  const [rowsCognitiveHE, setRowsCognitiveHE] = useState([
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
    {
      field: "hebrew",
      headerName: cognitiveFields[0],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "english",
      headerName: cognitiveFields[1],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "usesAB",
      headerName: cognitiveFields[2],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "understandSpokenLanguageComprehension",
      headerName: cognitiveFields[3],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "understandWrittenLanguageComprehension",
      headerName: cognitiveFields[4],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "abilityExpressOrally",
      headerName: cognitiveFields[5],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "abilityExpressWriting",
      headerName: cognitiveFields[6],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fluentReading",
      headerName: "קריאה שוטפת",
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "writeSingleAndFamiliarWords",
      headerName: cognitiveFields[7],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "8",
      headerName: cognitiveFields[8],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "9",
      headerName: cognitiveFields[9],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "10",
      headerName: cognitiveFields[10],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "11",
      headerName: cognitiveFields[11],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "12",
      headerName: cognitiveFields[12],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "13",
      headerName: cognitiveFields[13],
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "14",
      headerName: cognitiveFields[14],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "15",
      headerName: cognitiveFields[15],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "16",
      headerName: cognitiveFields[16],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "17",
      headerName: cognitiveFields[17],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "18",
      headerName: cognitiveFields[18],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "19",
      headerName: cognitiveFields[19],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "20",
      headerName: cognitiveFields[20],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "21",
      headerName: cognitiveFields[21],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "22",
      headerName: cognitiveFields[22],

      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "23",
      headerName: cognitiveFields[23],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "24",
      headerName: cognitiveFields[24],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "25",
      headerName: cognitiveFields[25],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "26",
      headerName: cognitiveFields[26],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "27",
      headerName: cognitiveFields[27],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "28",
      headerName: cognitiveFields[28],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "29",
      headerName: cognitiveFields[29],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "30",
      headerName: cognitiveFields[30],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "31",
      headerName: cognitiveFields[31],
      width: 140,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "32",
      headerName: cognitiveFields[32],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "33",
      headerName: cognitiveFields[33],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "35",
      headerName: cognitiveFields[34],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "36",
      headerName: cognitiveFields[35],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "37",
      headerName: cognitiveFields[36],
      width: 210,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "38",
      headerName: cognitiveFields[37],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "39",
      headerName: cognitiveFields[38],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "40",
      headerName: cognitiveFields[39],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "41",
      headerName: cognitiveFields[40],

      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "42",
      headerName: cognitiveFields[41],

      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "1111",
      headerName: cognitiveFields[42],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "43",
      headerName: cognitiveFields[43],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "44",
      headerName: cognitiveFields[44],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "45",
      headerName: cognitiveFields[45],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "46",
      headerName: cognitiveFields[46],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "47",
      headerName: cognitiveFields[47],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "48",
      headerName: cognitiveFields[48],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "49",
      headerName: cognitiveFields[49],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "50",
      headerName: cognitiveFields[50],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "51",
      headerName: cognitiveFields[51],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "52",
      headerName: cognitiveFields[52],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "53",
      headerName: cognitiveFields[53],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "54",
      headerName: cognitiveFields[54],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "55",
      headerName: cognitiveFields[55],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "56",
      headerName: cognitiveFields[56],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "57",
      headerName: cognitiveFields[57],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "58",
      headerName: cognitiveFields[58],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "59",
      headerName: cognitiveFields[59],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "60",
      headerName: cognitiveFields[60],
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "61",
      headerName: cognitiveFields[61],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "2222",
      headerName: cognitiveFields[62],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "62",
      headerName: cognitiveFields[63],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "63",
      headerName: cognitiveFields[64],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "64",
      headerName: cognitiveFields[65],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "65",
      headerName: cognitiveFields[66],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "66",
      headerName: cognitiveFields[67],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "67",
      headerName: cognitiveFields[68],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "68",
      headerName: cognitiveFields[69],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "69",
      headerName: cognitiveFields[70],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "70",
      headerName: cognitiveFields[71],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "71",
      headerName: cognitiveFields[72],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "72",
      headerName: cognitiveFields[73],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "73",
      headerName: cognitiveFields[74],
      width: 320,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "74",
      headerName: cognitiveFields[75],
      width: 320,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "75",
      headerName: cognitiveFields[76],
      width: 320,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "76",
      headerName: cognitiveFields[77],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "77",
      headerName: cognitiveFields[78],
      width: 90,
      editable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "78",
      headerName: cognitiveFields[79],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "79",
      headerName: cognitiveFields[80],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "80",
      headerName: cognitiveFields[81],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "81",
      headerName: cognitiveFields[82],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "82",
      headerName: cognitiveFields[83],
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "83",
      headerName: cognitiveFields[84],
      width: 160,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "84",
      headerName: cognitiveFields[85],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "85",
      headerName: cognitiveFields[86],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "86",
      headerName: cognitiveFields[87],
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "87",
      headerName: cognitiveFields[88],
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "88",
      headerName: cognitiveFields[89],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "89",
      headerName: cognitiveFields[90],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "90",
      headerName: cognitiveFields[91],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "91",
      headerName: cognitiveFields[92],
      width: 170,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "92",
      headerName: cognitiveFields[93],
      width: 140,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "93",
      headerName: cognitiveFields[94],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "94",
      headerName: cognitiveFields[95],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "95",
      headerName: cognitiveFields[96],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "96",
      headerName: cognitiveFields[97],
      width: 220,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "97",
      headerName: cognitiveFields[98],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "98",
      headerName: cognitiveFields[99],
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "99",
      headerName: cognitiveFields[100],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "100",
      headerName: cognitiveFields[101],
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "101",
      headerName: cognitiveFields[102],
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "102",
      headerName: cognitiveFields[103],
      width: 180,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "103",
      headerName: cognitiveFields[104],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "105",
      headerName: cognitiveFields[105],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "106",
      headerName: cognitiveFields[106],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "107",
      headerName: cognitiveFields[107],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "108",
      headerName: cognitiveFields[108],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "109",
      headerName: cognitiveFields[109],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "110",
      headerName: cognitiveFields[110],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "111",
      headerName: cognitiveFields[111],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "112",
      headerName: cognitiveFields[112],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "113",
      headerName: cognitiveFields[113],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "114",
      headerName: cognitiveFields[114],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "115",
      headerName: cognitiveFields[115],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "116",
      headerName: cognitiveFields[116],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "117",
      headerName: cognitiveFields[117],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "118",
      headerName: cognitiveFields[118],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "119",
      headerName: cognitiveFields[119],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "120",
      headerName: cognitiveFields[120],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "121",
      headerName: cognitiveFields[121],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "122",
      headerName: cognitiveFields[122],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "123",
      headerName: cognitiveFields[123],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "124",
      headerName: cognitiveFields[124],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "125",
      headerName: cognitiveFields[125],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "126",
      headerName: cognitiveFields[126],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "127",
      headerName: cognitiveFields[127],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "128",
      headerName: cognitiveFields[128],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "129",
      headerName: cognitiveFields[129],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "130",
      headerName: cognitiveFields[130],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "131",
      headerName: cognitiveFields[131],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "132",
      headerName: cognitiveFields[132],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "133",
      headerName: cognitiveFields[133],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "134",
      headerName: cognitiveFields[134],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "135",
      headerName: cognitiveFields[135],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "136",
      headerName: cognitiveFields[136],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "137",
      headerName: cognitiveFields[137],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "138",
      headerName: cognitiveFields[138],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "139",
      headerName: cognitiveFields[139],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "140",
      headerName: cognitiveFields[140],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "141",
      headerName: cognitiveFields[141],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "142",
      headerName: cognitiveFields[142],
      width: 120,
      editable: false,
      align: "center",
    },
    {
      field: "143",
      headerName: cognitiveFields[143],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "144",
      headerName: cognitiveFields[144],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "145",
      headerName: cognitiveFields[145],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "146",
      headerName: cognitiveFields[146],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "147",
      headerName: cognitiveFields[147],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "148",
      headerName: cognitiveFields[148],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "149",
      headerName: cognitiveFields[149],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "150",
      headerName: cognitiveFields[150],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "151",
      headerName: cognitiveFields[151],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "152",
      headerName: cognitiveFields[152],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "153",
      headerName: cognitiveFields[153],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "154",
      headerName: cognitiveFields[154],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "155",
      headerName: cognitiveFields[155],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "156",
      headerName: cognitiveFields[156],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "157",
      headerName: cognitiveFields[157],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "158",
      headerName: cognitiveFields[158],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "159",
      headerName: cognitiveFields[159],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "160",
      headerName: cognitiveFields[160],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "161",
      headerName: cognitiveFields[161],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "162",
      headerName: cognitiveFields[162],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "163",
      headerName: cognitiveFields[163],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "164",
      headerName: cognitiveFields[164],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "165",
      headerName: cognitiveFields[165],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "166",
      headerName: cognitiveFields[166],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "167",
      headerName: cognitiveFields[167],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "167",
      headerName: cognitiveFields[167],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "168",
      headerName: cognitiveFields[168],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "169",
      headerName: cognitiveFields[169],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "169",
      headerName: cognitiveFields[169],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "170",
      headerName: cognitiveFields[170],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "170",
      headerName: cognitiveFields[170],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "171",
      headerName: cognitiveFields[171],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "172",
      headerName: cognitiveFields[172],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "173",
      headerName: cognitiveFields[173],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "174",
      headerName: cognitiveFields[174],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "175",
      headerName: cognitiveFields[175],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "176",
      headerName: cognitiveFields[176],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "177",
      headerName: cognitiveFields[177],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "178",
      headerName: cognitiveFields[178],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "179",
      headerName: cognitiveFields[179],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "180",
      headerName: cognitiveFields[180],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "181",
      headerName: cognitiveFields[181],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "182",
      headerName: cognitiveFields[182],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "183",
      headerName: cognitiveFields[183],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "184",
      headerName: cognitiveFields[184],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "185",
      headerName: cognitiveFields[185],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "186",
      headerName: cognitiveFields[186],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "187",
      headerName: cognitiveFields[187],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "188",
      headerName: cognitiveFields[188],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "189",
      headerName: cognitiveFields[189],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "190",
      headerName: cognitiveFields[190],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "191",
      headerName: cognitiveFields[191],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "192",
      headerName: cognitiveFields[192],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "193",
      headerName: cognitiveFields[193],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "194",
      headerName: cognitiveFields[194],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "195",
      headerName: cognitiveFields[195],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "196",
      headerName: cognitiveFields[196],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "197",
      headerName: cognitiveFields[197],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "198",
      headerName: cognitiveFields[198],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "199",
      headerName: cognitiveFields[199],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "200",
      headerName: cognitiveFields[200],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "201",
      headerName: cognitiveFields[201],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "202",
      headerName: cognitiveFields[202],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "203",
      headerName: cognitiveFields[203],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "204",
      headerName: cognitiveFields[204],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "205",
      headerName: cognitiveFields[205],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "206",
      headerName: cognitiveFields[206],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "207",
      headerName: cognitiveFields[207],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "208",
      headerName: cognitiveFields[208],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "209",
      headerName: cognitiveFields[209],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "210",
      headerName: cognitiveFields[210],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "211",
      headerName: cognitiveFields[211],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "212",
      headerName: cognitiveFields[212],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "213",
      headerName: cognitiveFields[213],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "214",
      headerName: cognitiveFields[214],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "215",
      headerName: cognitiveFields[215],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "216",
      headerName: cognitiveFields[216],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "217",
      headerName: cognitiveFields[217],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "218",
      headerName: cognitiveFields[218],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "219",
      headerName: cognitiveFields[219],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "220",
      headerName: cognitiveFields[220],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "221",
      headerName: cognitiveFields[221],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "222",
      headerName: cognitiveFields[222],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "223",
      headerName: cognitiveFields[223],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "224",
      headerName: cognitiveFields[224],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "225",
      headerName: cognitiveFields[225],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "226",
      headerName: cognitiveFields[226],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "227",
      headerName: cognitiveFields[227],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "228",
      headerName: cognitiveFields[228],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "229",
      headerName: cognitiveFields[229],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "230",
      headerName: cognitiveFields[230],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "231",
      headerName: cognitiveFields[231],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "232",
      headerName: cognitiveFields[232],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "233",
      headerName: cognitiveFields[233],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "234",
      headerName: cognitiveFields[234],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "235",
      headerName: cognitiveFields[235],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "236",
      headerName: cognitiveFields[236],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "237",
      headerName: cognitiveFields[237],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "238",
      headerName: cognitiveFields[238],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "239",
      headerName: cognitiveFields[239],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "240",
      headerName: cognitiveFields[240],
      width: 120,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "241",
      headerName: cognitiveFields[241],
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
      field: "actionsTaskabilityHE",
      type: "actions",
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon style={{ fill: "gray" }} />}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon style={{ fill: "gray" }} />}
          label="Delete"
          showInMenu
        />,
      ],
    },
  ]);

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
                    tableType={"FlagsHE"}
                    columns={columnsFlagsHE}
                    setColumns={setColumnsFlagsHE}
                    rows={rowsFlagsHE}
                    isInfoUserRoute={true}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={workerNameHE}
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
                    tableType={"CognitiveProfileHE"}
                    columns={columnsCognitiveHE}
                    setColumns={setColumnsCognitiveHE}
                    rows={rowsCognitiveHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={true}
                    fillFalse={fillFalse}
                    workerName={workerNameHE}
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
                    tableType={"PrivateCardHE"}
                    columns={columnsPrivateCardHE}
                    setColumns={setColumnsPrivateCardHE}
                    rows={rowsPrivateCardHE}
                    isInfoUserRoute={false}
                    isInfoUserSite={false}
                    fillFalse={fillFalse}
                    workerName={workerNameHE}
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
                    tableType={"CognitiveProfileEN"}
                    columns={columnsCognitiveHE}
                    setColumns={setColumnsCognitiveHE}
                    rows={rowsCognitiveHE}
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

export default App;
