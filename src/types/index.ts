export type ThemeType = 'industrial' | 'psytrance' | 'detroit';
export type GenderFilter = 'male' | 'female';

export interface ProductCategory {
  id: string;
  name: string;
  maleLabel?: string;
  femaleLabel?: string;
}
