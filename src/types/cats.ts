export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  image_url: string;
  reference_image_id: string;
  intelligence: number;
  energy_level: number;
  adaptability: number;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  weight: {
    imperial: string;
    metric: string;
  };
}
