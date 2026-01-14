export type University = {
  id: string;
  name: string;
  details: string;
  headerImage: string;
  knowMore?: string;
  // Allow any other properties for dynamic columns
  [key: string]: any;
};
