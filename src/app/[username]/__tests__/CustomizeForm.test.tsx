import { render, screen, fireEvent } from "@testing-library/react";
import CustomizeForm from "@/components/CustomizeForm";
import { themeOptions, fontOptions, patternOptions, defaultConfig } from "@/libs/utils";

describe("CustomizeForm", () => {
  const mockHandleChange = jest.fn();
  const mockConfig = {
    ...defaultConfig,
  };

  it("renders the form with correct fields", () => {
    render(<CustomizeForm config={mockConfig} handleChange={mockHandleChange} />);

    // Check for Theme select
    expect(screen.getByLabelText("Theme")).toBeInTheDocument();
    themeOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    // Check for Font select
    expect(screen.getByLabelText("Font")).toBeInTheDocument();
    fontOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    // Check for Pattern select
    expect(screen.getByLabelText("Pattern")).toBeInTheDocument();
    patternOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    // Check for Image URL input
    expect(screen.getByPlaceholderText("Enter image URL")).toBeInTheDocument();
  });

  it("calls handleChange on selecting Theme", () => {
    render(<CustomizeForm config={mockConfig} handleChange={mockHandleChange} />);
    const themeSelect = screen.getByLabelText("Theme");
    fireEvent.change(themeSelect, { target: { value: themeOptions[1] } });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.anything());
  });

  it("calls handleChange on selecting Font", () => {
    render(<CustomizeForm config={mockConfig} handleChange={mockHandleChange} />);
    const fontSelect = screen.getByLabelText("Font");
    fireEvent.change(fontSelect, { target: { value: fontOptions[1] } });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.anything());
  });

  it("calls handleChange on selecting Pattern", () => {
    render(<CustomizeForm config={mockConfig} handleChange={mockHandleChange} />);
    const patternSelect = screen.getByLabelText("Pattern");
    fireEvent.change(patternSelect, { target: { value: patternOptions[1] } });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.anything());
  });

  it("calls handleChange on entering Image URL", () => {
    render(<CustomizeForm config={mockConfig} handleChange={mockHandleChange} />);
    const imageInput = screen.getByPlaceholderText("Enter image URL");
    fireEvent.change(imageInput, { target: { value: "http://example.com/image.png" } });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.anything());
  });  
});
