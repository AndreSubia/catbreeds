import { render } from "@testing-library/react-native";
import { CatBreed } from "../../../types/cats";
import BreedCard from "../BreedCard/BreedCard";

const mockBreed: CatBreed = {
  id: "1",
  name: "Test Breed",
  description: "This is a test breed",
  temperament: "Calm, Friendly",
  origin: "Testland",
  image_url: "",
  reference_image_id: "abc123",
  intelligence: 4,
  energy_level: 3,
  adaptability: 5,
  life_span: "12 - 15",
  alt_names: "Test Alt",
  wikipedia_url: "https://en.wikipedia.org/wiki/Test_Breed",
  weight: {
    imperial: "8 - 12",
    metric: "4 - 6",
  },
};

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

describe("<BreedCard />", () => {
  test("renders BreedCard correctly", () => {
    const { getByText } = render(<BreedCard breed={mockBreed} />);
    expect(getByText(mockBreed.name)).toBeTruthy();
    expect(getByText("See more...")).toBeTruthy();
    expect(getByText(mockBreed.origin)).toBeTruthy();
    expect(getByText(`Intelligence: ${mockBreed.intelligence}`)).toBeTruthy();
  });
});
