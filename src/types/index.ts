export interface Vehicle {
  city_mpg: number; // City fuel consumption in miles per gallon (premium only)
  highway_mpg: number; // Highway fuel consumption in miles per gallon (premium only)
  combination_mpg: number; // Combined city and highway fuel consumption in miles per gallon (premium only)
  class: string; // Vehicle class category (e.g. "midsize car", "suv", etc.)
  cylinders: number; // Number of cylinders in the engine
  displacement: number; // Engine displacement in liters
  drive: string; // Drive type (e.g. "fwd", "awd", etc.)
  fuel_type: string; // Type of fuel the vehicle uses (e.g. "gas", "diesel")
  make: string; // Vehicle manufacturer (e.g. "toyota")
  model: string; // Vehicle model name (e.g. "camry")
  transmission: string; // Transmission type (e.g. "a" for automatic, "m" for manual)
  year: number; // Vehicle model year
}

export interface VehicleFilters {
  class?: string;
  limit?: number;
  offset?: number;
  make?: string;
  model?: string;
  fuel_type?: string;
  drive?: string;
  cylinders?: number | string;
  transmission?: string;
  year?: string | number;
  min_city_mpg?: number | string;
  max_city_mpg?: number | string;
  min_hwy_mpg?: number | string;
  max_hwy_mpg?: number | string;
  min_comb_mpg?: number | string;
  max_comb_mpg?: number | string;
}
