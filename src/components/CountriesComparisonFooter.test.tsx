import { render, screen } from "@testing-library/react";

import { TCountry } from "@/types";

import CountriesComparisonFooter from "./CountriesComparisonFooter";

const defaultProps = {
  selectedCountries: [
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
  removeCountry: jest.fn(),
};

describe("CountriesComparisonFooter", () => {
  it("matches the snapshot", () => {
    const { container } = render(
      <CountriesComparisonFooter {...defaultProps} />
    );

    expect(container).toMatchSnapshot();
  });

  it("displays the first selected country", () => {
    render(<CountriesComparisonFooter {...defaultProps} />);

    const image = screen.getByRole("img", { name: "France" });
    const name = screen.getByText("France");

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it("displays the second selected country", () => {
    render(<CountriesComparisonFooter {...defaultProps} />);

    const image = screen.getByRole("img", { name: "Singapore" });
    const name = screen.getByText("Singapore");

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it("displays a button to compare the selected countries", () => {
    render(<CountriesComparisonFooter {...defaultProps} />);

    const button = screen.getByRole("link", { name: "See the comparison" });

    expect(button).toBeInTheDocument();
  });

  it("displays a message if only one country is selected", () => {
    const selectedCountries = [defaultProps.selectedCountries[0]];
    render(
      <CountriesComparisonFooter
        selectedCountries={selectedCountries}
        removeCountry={defaultProps.removeCountry}
      />
    );

    const message = screen.getByText("Select one more country to compare");

    expect(message).toBeInTheDocument();
  });
});
