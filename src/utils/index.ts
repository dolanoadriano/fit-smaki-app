import React from "react";

export const apiUrl: string = "http://localhost:1337";
export const localstoargeVersion: string = "v1";

export const getImageUrl = (image: Image): string =>
  image && `${apiUrl}${image.url}`;

export const scrollToRef = (ref: React.RefObject<HTMLDivElement>) =>
  ref.current && window.scrollTo(0, ref.current.offsetTop - (70 + 60));

export const random = (min: number, max: number): number =>
  Math.random() * (max - min);

export const randomInteger = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export type AboutPage = {
  id: number;
  titleWhitePart: string;
  titleBluePart: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  hidden: boolean;
  created_at: Date;
  updated_at: Date;
  image: Image;
};

export type Curiosities = {
  id: number;
  created_at: Date;
  updated_at: Date;
  images: Array<Image>;
};

export type AboutMe = {
  id: number;
  created_at: Date;
  updated_at: Date;
  header: string;
  description: string;
};

export type Quote = {
  id: number;
  created_at: Date;
  updated_at: Date;
  content: string;
  author: string;
};

export type Contact = {
  id: number;
  created_at: Date;
  updated_at: Date;
  instagramUrl: string;
  mailContact: string;
  alternativeContact: string;
};

export interface Image {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  created_at: Date;
  updated_at: Date;
}

export interface Formats {
  thumbnail: Small;
  small: Small;
}

export interface Small {
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}
