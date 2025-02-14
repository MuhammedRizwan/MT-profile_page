import { render, screen } from "@testing-library/react";
import InputField from "../input";
import { ChangeEvent } from "react";


describe("InputField Component", () => {
    test('does not display an error message when no error is provided', () => {
        render(
          <InputField
                label="Test Label"
                name="test"
                placeholder="Enter text"
                type="text"
                error=""
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                value="" onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.");
                } }            
          />
        );
      
        // Look for the error paragraph element instead of a data-testid
        const errorElement = screen.getByRole('paragraph', { hidden: true });
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent('');
      });
});
