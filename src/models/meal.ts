export enum SchoolMealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
}
export interface SchoolMeal {
  content: string;
  type: SchoolMealType;
  calorie: string;
  nutrient?: string;
  origin?: string;
}

export interface SchoolMealVerbose extends SchoolMeal {
  nutrient?: string;
  origin?: string;
}
