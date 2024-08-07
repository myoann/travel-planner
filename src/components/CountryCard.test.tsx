import { render, screen } from "@testing-library/react";

import { TCountry } from "@/types";

import CountryCard from "./CountryCard";

const defaultProps = {
  country: {
    code: "FR",
    name: "France",
  } as TCountry,
  isChecked: false,
  isDisabled: false,
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

  it("displays a checkbox to compare the country card", () => {
    render(<CountryCard {...defaultProps} />);

    const input = screen.getByRole("checkbox", { name: "Compare" });

    expect(input).toBeInTheDocument();
  });

  it("calls onCompare when the checkbox is clicked", () => {
    render(<CountryCard {...defaultProps} />);

    const input = screen.getByRole("checkbox", { name: "Compare" });
    input.click();

    expect(defaultProps.onCompare).toHaveBeenCalled();
  });

  it("disables the checkbox if isDisabled is true", () => {
    render(<CountryCard {...defaultProps} isDisabled={true} />);

    const input = screen.getByRole("checkbox", { name: "Compare" });

    expect(input).toBeDisabled();
  });

  it("checks the checkbox if isChecked is true", () => {
    render(<CountryCard {...defaultProps} isChecked={true} />);

    const input = screen.getByRole("checkbox", { name: "Compare" });

    expect(input).toBeChecked();
  });

  it("does not check the checkbox if isChecked is false", () => {
    render(<CountryCard {...defaultProps} isChecked={false} />);

    const input = screen.getByRole("checkbox", { name: "Compare" });

    expect(input).not.toBeChecked();
  });
});
