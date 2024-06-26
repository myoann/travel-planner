import { render, screen } from "@testing-library/react";

import { TCountry } from "@/types";

import CountryCard from "./CountryCard";

const defaultProps = {
  country: {
    code: "FR",
    name: "France",
  } as TCountry,
  onCompare: jest.fn(),
};

describe("CountryCard", () => {
  it("matches the snapshot", () => {
    const { container } = render(<CountryCard {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("has a a link which redirects to the country page", () => {
    render(<CountryCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/country/FR");
  });

  it("displays an image and the name of the country", () => {
    render(<CountryCard {...defaultProps} />);

    const image = screen.getByRole("img", { name: "France" });
    const name = screen.getByText("France");

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it("displays a button to compare the country card", () => {
    render(<CountryCard {...defaultProps} />);

    const button = screen.getByRole("button", { name: "Compare" });

    expect(button).toBeInTheDocument();
  });
});
