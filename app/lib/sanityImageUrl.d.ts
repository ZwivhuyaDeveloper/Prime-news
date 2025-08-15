declare module '@/lib/sanityImageUrl' {
  import { SanityImageSource } from '@sanity/image-url/lib/types/types';

  interface ImageUrlBuilder {
    url(): string;
    width(pixels: number): this;
    height(pixels: number): this;
    fit(value: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'): this;
    quality(value: number): this;
    format(value: 'jpg' | 'pjpg' | 'png' | 'webp'): this;
    auto(format: 'format'): this;
    blur(value: number): this;
    invert(value: boolean): this;
    rect(left: number, top: number, width: number, height: number): this;
    crop(value: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint' | 'entropy'): this;
  }

  export function urlFor(source: SanityImageSource): ImageUrlBuilder;
}