/**
 * Brand data model interface
 * Defines the structure of brand objects used throughout the application
 */
export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  fullDescription?: string;
  website?: string;
  category?: string;
  founded?: string;
  headquarters?: string;
}

/**
 * API response types
 */
export interface BrandsResponse {
  brands: Brand[];
  total: number;
  page: number;
}

export interface BrandResponse {
  brand: Brand;
}

/**
 * Error response interface
 */
export interface ApiError {
  message: string;
  code: string;
  timestamp: string;
  originalError?: any;
  brandId?: string;
}
