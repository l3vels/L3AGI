import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Tags from "../Tags";

describe("Tags tests", () => {
  const label = "Tag";

  const className = "test-class";
  let onDeletedMock: jest.Mock;

  beforeEach(() => {
    onDeletedMock = jest.fn();
    render(<Tags className={className} onDelete={onDeletedMock} label={label} />);
  });

  it("should call the click callback when clicked", () => {
    const testId = `${Tags.defaultTestId}-close`;
    fireEvent.click(screen.getByTestId(testId));
    expect(onDeletedMock.mock.calls.length).toBe(1);
  });
});
