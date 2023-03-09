import { get } from "../api";

export const getCognitiveProfile = async (user_id) => {
  let CognitiveProfile;

  await get(
    "https://prod-web-app0da5905.azurewebsites.net/cognitive-profiles/" +
      user_id
  ).then((res) => {
    CognitiveProfile = res.data.value;
  });
  console.log("res CognitiveProfile: ", CognitiveProfile);

  return CognitiveProfile;
};
