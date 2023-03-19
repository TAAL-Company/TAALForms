import axios from "axios";

export const get = async (url, header) => {
  try {
    const res = await axios.get(url, header);
    if (res) {
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};
export const patch = async (url, body, headers) => {
  try {
    const res = await axios.patch(url, body, { headers });
    if (res) {
      console.log("success");
    }
  } catch (e) {
    console.log(e);
  }
};
export const post = async (url, body, header) => {
  try {
    const res = await axios.post(url, body, header); //body and header shuld be an object
    if (res) {
      console.log("succses");
    }
  } catch (e) {
    console.log(e);
  }
};
export const getingDataUsers = async () => {
  let all_Users;

  await get("https://prod-web-app0da5905.azurewebsites.net/students").then(
    (res) => {
      all_Users = res.data;
    }
  );
  console.log("res all_Users: ", all_Users);

  return all_Users;
};
export const getingDataTasks = async () => {
  let allTasks;
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  await get("https://prod-web-app0da5905.azurewebsites.net/tasks", {
    headers: headers,
  }).then((res) => {
    allTasks = res.data;
  });

  return allTasks;
};
export const postDataCognitiveProfile = async (
  workerId,
  cognitiveProfileValues
) => {
  const url =
    "https://prod-web-app0da5905.azurewebsites.net/cognitive-profiles/" +
    workerId;
  const body = {
    value: cognitiveProfileValues,
  };
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  await patch(url, body, headers);
};
