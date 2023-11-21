import React from "react";
import renderer from "react-test-renderer";
import Tags from "../Tags";
import { Calendar } from "../../Icon/Icons";
import { person1 } from "../../Avatar/__stories__/assets";

describe("Tags renders correctly", () => {
  it("renders correctly with empty props", () => {
    const tree = renderer.create(<Tags />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with color", () => {
    const tree = renderer.create(<Tags color={Tags.colors.NEGATIVE} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly disabled tag", () => {
    const tree = renderer.create(<Tags disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without close button", () => {
    const tree = renderer.create(<Tags readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with text", () => {
    const tree = renderer.create(<Tags label="text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with right icon", () => {
    const tree = renderer.create(<Tags rightIcon={Calendar} readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with left icon", () => {
    const tree = renderer.create(<Tags leftIcon={Calendar} readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with right avatar", () => {
    const tree = renderer.create(<Tags rightAvatar={person1} readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with left avatar", () => {
    const tree = renderer.create(<Tags leftAvatar={person1} readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
