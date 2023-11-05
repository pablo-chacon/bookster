/**
 * User field interface
 */

export interface User {
    username: string;
    role: string;
    purchases?: {
      title: string;
      author: string;
      quantity: string;
    }[];
  }