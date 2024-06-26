import { render, screen } from "@testing-library/react";

import ErrorMessage from "./ErrorMessage";

const defaultProps = {
  message: "This is an error message",
};

describe("ErrorMessage", () => {
  it("matches the snapshot", () => {
    const { container } = render(<ErrorMessage {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("renders the given error message props", () => {
    render(<ErrorMessage {...defaultProps} />);

    const errorMessage = screen.getByText(defaultProps.message);
    expect(errorMessage).toBeInTheDocument();
  });
});
