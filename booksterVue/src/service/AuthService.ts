/**
 * Authentication.
 */

import axios from "axios";

export async function login(username: string, password: string) {
  try {
    const url = "http://localhost:9000/auth/login";
    const data = {
      username,
      password,
    };

    console.log("Request URL:", url);
    console.log("Request Data:", JSON.stringify(data));

    const response = await axios.post(url, data);
    const accessToken = response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    throw new Error("Authentication error");
  }
}