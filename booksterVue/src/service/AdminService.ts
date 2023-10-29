/**
 * Admin interface. 
 */

import axios, { type AxiosRequestConfig } from 'axios';

export async function getUsers() {
  const token = localStorage.getItem("accessToken");
  if (token) {

    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`
    };

    const requestOptions: AxiosRequestConfig = {
      method: "GET",
      url: "http://127.0.0.1:9000/admin/users",
      headers: headers
    };
    console.log("URL:", requestOptions.url);
    try {
      console.log('Retrieving users...');
      const response = await axios(requestOptions);
      console.log("Users retrieved successfully");
      return response.data;
    } catch (error) {
      console.error("User Error", error);
      throw error;
    }
  } else {
    console.log("Token not found.");
    return null;
  }
}

export async function promoteUser(username: string) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log("Access token.");

    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`
    };

    const data = {
      username: username
    }

    const requestOptions: AxiosRequestConfig = {
      method: "PUT",
      url: "http://127.0.0.1:9000/admin/users",
      headers: headers,
      data: data
    };
    console.log("URL:", requestOptions.url);
    try {
      console.log('Promotion request in progress...');
      const response = await axios(requestOptions);
      console.log("Users promoted.");
      return response.data;
    } catch (error) {
      console.error("Promotion Error", error);
      throw error;
    }
  } else {
    console.log("Token not found.");
    return null;
  }
}

export async function deleteUser(username: string) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log("Access token.");

    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`
    };

    const data = {
      username: username
    }

    const requestOptions: AxiosRequestConfig = {
      method: "DELETE",
      url: "http://127.0.0.1:9000/admin/users",
      headers: headers,
      data: data
    };
    console.log("Request URL:", requestOptions.url);
    try {
      console.log('Delete request in progress...');
      const response = await axios(requestOptions);
      console.log("Users deleted.");
      return response.data;
    } catch (error) {
      console.error("Retrieve User Error", error);
      throw error;
    }
  } else {
    console.log("Token not found.");
    return null;
  }
}

