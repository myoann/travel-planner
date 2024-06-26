import { render } from "@testing-library/react";

import SearchBar from "./SearchBar";

const defaultProps = {
  filterBySearch: jest.fn(),
};

describe("SearchBar", () => {
  it("matches the snapshot", () => {
    const { container } = render(<SearchBar {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("renders an input", () => {
    const { container } = render(<SearchBar {...defaultProps} />);

    expect(container.firstChild?.nodeName).toBe("INPUT");
  });
});
