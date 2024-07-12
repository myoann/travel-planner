import { render } from "@testing-library/react";

import SearchBar from "./SearchBar";

const defaultProps = {
  filterBySearch: jest.fn(),
  placeholder: "Search",
};

describe("SearchBar", () => {
  it("matches the snapshot", () => {
    const { container } = render(<SearchBar {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("renders an input", () => {
    const { container } = render(<SearchBar {...defaultProps} />);

    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("renders a button if onSubmit is given", () => {
    const { container } = render(
      <SearchBar {...defaultProps} onSubmit={jest.fn()} />,
    );

    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("does not render a button if onSubmit is not given", () => {
    const { container } = render(<SearchBar {...defaultProps} />);

    expect(container.querySelector("button")).not.toBeInTheDocument();
  });
});
