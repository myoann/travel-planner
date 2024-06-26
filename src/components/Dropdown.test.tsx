import { render, screen } from "@testing-library/react";

import { TOption } from "@/types";

import Dropdown from "./Dropdown";

const defaultProps = {
  defaultSelectName: "Filter",
  onClick: jest.fn(),
  options: [
    {
      key: "1",
      name: "First option",
      value: "first",
    },
  ],
  selectedOption: null,
};

describe("Dropdown", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Dropdown {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("has a button which contains the text from the props defaultSelectName if no selectedOption is given", () => {
    render(<Dropdown {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(defaultProps.defaultSelectName);
  });

  it("has a button which contains the text from the props selectedOption when it is given", () => {
    const selectedOption = defaultProps.options[0];
    render(<Dropdown {...defaultProps} selectedOption={selectedOption} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(selectedOption.name);
  });

  it("has as many buttons as there are options in the props", async () => {
    const options: TOption[] = [
      {
        key: "1",
        name: "First option",
        value: "first",
      },
      {
        key: "2",
        name: "Second option",
        value: "second",
      },
      {
        key: "3",
        name: "Third option",
        value: "third",
      },
    ];
    render(<Dropdown {...defaultProps} options={options} />);

    const buttons = screen.getAllByTestId("dropdown-option");
    expect(buttons).toHaveLength(options.length);
  });
});
