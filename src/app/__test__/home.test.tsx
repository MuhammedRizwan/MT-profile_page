import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// eslint-disable-next-line react/display-name
jest.mock("@/components/profile", () => () => <div data-testid="profile-component">Mocked Profile</div>);

describe("Home Page", () => {
  test("renders the Home component with Profile", () => {
    render(<Home />);

    // ✅ Ensure Profile component is rendered
    expect(screen.getByTestId("profile-component")).toBeInTheDocument();
  });

  test('applies correct background styles', () => {
    render(<Home />);
    
    // Update selector to use data-testid instead of role
    const divElement = screen.getByTestId('main-container');
    
    expect(divElement).toHaveClass('bg-black');
    expect(divElement).toHaveClass('bg-repeat');
  });
});
