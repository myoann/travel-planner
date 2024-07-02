import { render, screen } from "@testing-library/react";

import { TCountry } from "@/types";

import CountryCardList from "./CountryCardList";

const defaultProps = {
  findRandomCountry: jest.fn(),
  continentsOptions: [
    {
      key: "EU",
      name: "Europe",
      value: "EU",
    },
    {
      key: "AS",
      name: "Asia",
      value: "AS",
    },
  ],
  countries: [
    {
      capital: "Paris",
      code: "FR",
      continent: {
        code: "EU",
        name: "Europe",
      },
      name: "France",
    } as TCountry,
    {
      capital: "Singapore",
      code: "SG",
      continent: {
        code: "AS",
        name: "Asia",
      },
      name: "Singapore",
    } as TCountry,
  ],
};

describe("CountryCardList", () => {
  it("renders the SearchBar component", () => {
    render(<CountryCardList {...defaultProps} />);

    const searchBar = screen.getByRole("textbox");
    expect(searchBar).toBeInTheDocument();
  });

  it("renders the DropDown component", () => {
    render(<CountryCardList {...defaultProps} />);

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  it("renders a ul element", () => {
    render(<CountryCardList {...defaultProps} />);

    const ul = screen.getByRole("list");
    expect(ul).toBeInTheDocument();
  });

  it("shows the correct number of li elements", () => {
    render(<CountryCardList {...defaultProps} />);

    const li = screen.getAllByRole("listitem");
    expect(li).toHaveLength(2);
  });
});
