import { ReactNode } from "react";

export interface BookProps {
    pages: ReactNode;
    format: ReactNode;
    rating?: number;
    language: ReactNode;
    publisher: ReactNode;
    desc: ReactNode;
    authors: ReactNode;
    title: string;
    subtitle: string;
    image: string;
    url: string;
    description: string;
    price: string;
  }
  
  export interface ApiResponse {
    total: number;
    books: BookProps[];
  }