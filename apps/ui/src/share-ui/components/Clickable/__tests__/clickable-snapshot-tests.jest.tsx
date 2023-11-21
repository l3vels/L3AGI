import React from "react";
import renderer from "react-test-renderer";
import Clickable from "../Clickable";

it("renders correctly with empty props", () => {
  const tree = renderer.create(<Clickable />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with props", () => {
  const tree = renderer
    .create(
      <Clickable onClick={() => console.log("test")} className="l3-style_tests-class" role="banner" enableTextSelection>
        Children text
      </Clickable>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
