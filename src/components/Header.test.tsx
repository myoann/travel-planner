import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });

  it("has a a link which redirects to /", () => {
    render(<Header />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("has an image with the alt 'Yoann Moise Logo'", () => {
    render(<Header />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Yoann Moise Logo");
  });
});
