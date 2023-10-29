/**
 * Book API.
 */
import axios, { type AxiosRequestConfig } from "axios";
import type { Book } from "@/model/book";

export async function searchBooks(inputValue: string): Promise<Book[]> {
  const query = inputValue.trim().toLocaleLowerCase();
  const URL = `http://127.0.0.1:9000/library/books/search?q=${query}`;
  try {
    const response = await axios.get(URL);
    return response.data.books as Book[];
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getBooks(): Promise<Book[]> {
  const URL = "http://127.0.0.1:9000/library/books";
  try {
    const response = await axios.get(URL);
    return response.data.books as Book[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export function editBook(previousTitle: string, updatedBook: Book): Promise<void> {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const requestOptions: AxiosRequestConfig = {
      method: "PUT",
      url: "/admin/books",
      headers: headers,
      data: {
        previous: {
          title: previousTitle
        },
        current: updatedBook
      }
    };

    return axios(requestOptions)
      .then(() => {
        console.log("Book updated.");
      })
      .catch((error) => {
        console.error("Update Error", error);
        throw error;
      });
  } else {
    console.log("Token not found.");
    return Promise.reject(new Error("Token not found."));
  }
}


export async function addBook(newBook: any, token: string): Promise<void> {
  const headers: AxiosRequestConfig["headers"] = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const requestOptions: AxiosRequestConfig = {
    method: "POST",
    url: "http://127.0.0.1:9000/admin/books",
    headers: headers,
    data: newBook
  };

  try {
    await axios(requestOptions);
    console.log("Book added.");
  } catch (error) {
    console.error("Add book Error", error);
    throw error;
  }
}

export function deleteBook(bookTitle: string): Promise<void> {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`
    };

    const requestOptions: AxiosRequestConfig = {
      method: "DELETE",
      url: `http://127.0.0.1:9000/admin/books`, // Add the base URL
      headers: headers,
      data: {
        title: bookTitle
      }
    };

    return axios(requestOptions)
      .then(() => {
        console.log('Book deleted');
      })
      .catch((error) => {
        console.error('Remove Error', error);
        throw error;
      });
  } else {
    console.log("Token not found.");
    return Promise.reject(new Error("Token not found."));
  }
}

export async function orderBook(bookTitle: String, quantity: number): Promise<void> {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const data = {
      title: bookTitle,
      quantity: quantity,
    }

    const requestOptions: AxiosRequestConfig = {
      method: "POST",
      url: "http://127.0.0.1:9000/library/user/books",
      headers: headers,
      data: data,
    };

    return axios(requestOptions)
      .then((response) => {
        console.log('Book added');
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Add book Error', error);
        throw error;
      });
  } else {
    console.log('Token not found.');
    return Promise.reject(new Error('Token not found.'));
  }
}

