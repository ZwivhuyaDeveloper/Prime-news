import imageUrlBuilder from '@sanity/image-url';
import type { SanityClient } from '@sanity/client';
import { client } from './sanity';

interface SanityImageSource {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  [key: string]: unknown;
}

type ImageUrlBuilder = {
  image: (source: SanityImageSource) => ImageUrlBuilder;
  width: (pixels: number) => ImageUrlBuilder;
  height: (pixels: number) => ImageUrlBuilder;
  fit: (value: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min') => ImageUrlBuilder;
  quality: (value: number) => ImageUrlBuilder;
  format: (format: 'jpg' | 'pjpg' | 'png' | 'webp') => ImageUrlBuilder;
  auto: (format: 'format') => ImageUrlBuilder;
  url: () => string;
};

// Create an image builder instance
export const urlFor = (source: SanityImageSource): ImageUrlBuilder => {
  return imageUrlBuilder(client as unknown as SanityClient).image(source);
};