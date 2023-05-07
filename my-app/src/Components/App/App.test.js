import { render, screen, fireEvent } from '@testing-library/react';
import {test, expect} from "@jest/globals";
import App from "./App";

// test that the input field is blank
// type a word into input field
// test that the input field contains the word

test ("input field functionality", ()=> {
  // render the app component
  render(<App/>);
  // store input into a variable
  const input = screen.getByRole("textbox");
  // test that the input is in the document
  expect(input).toBeInTheDocument();
  // test that the input field is blank
  expect(input.value).toBe("");
  // type a word into the input field
  fireEvent.change(input, {target: {value:"cat"}});
  // test that the input field has value entered previously
  expect(input.value).toBe("cat");
  // store button into a variable
  const searchButton = screen.getByRole("button");
  // test that the button is in the document
  expect(searchButton).toBeInTheDocument();
  // click the button
  fireEvent.click(searchButton);
  // test that the input field is blank
  expect(input.value).toBe("");
})
