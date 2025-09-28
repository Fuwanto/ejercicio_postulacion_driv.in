// Global module declarations to help TypeScript understand non-code imports

declare module "*.css" {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

// Leaflet CSS import may appear as a bare import
declare module "leaflet/dist/leaflet.css" {
  const content: string;
  export default content;
}

// Provide a minimal ImportMetaEnv typed interface for Vite env vars used in the project
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_API_KEY?: string;
  // add other env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
