import {test, expect} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import Dictionary from "./Dictionary";

// Write test that verifies the list and list items functionality

test ("list and listitems show on screen after generated", ()=> {
// store props in an array for the input "cork"
const typeDefs = [{
    type : ["noun", "verb"],
    defs: [
       ["The bark of the cork oak, which is very light and porous and used for making bottle stoppers, flotation devices, and insulation material.",
        "A bottle stopper made from this or any other material.",
        "An angling float, also traditionally made of oak cork.",
        "The cork oak, Quercus suber.",
        "The dead protective tissue between the bark and cambium in woody plants, with suberin deposits making it impervious to gasses and water."],
       ["To seal or stop up, especially with a cork stopper.",
        "To blacken (as) with a burnt cork",
        "To leave the cork in a bottle after attempting to uncork it.",
        "To fill with cork, as the center of a baseball bat.",
        "To injure through a blow; to induce a haematoma.",
        "To position one's drift net just outside of another person's net, thereby intercepting and catching all the fish that would have gone into that person's net."]]
}]

// render the Dictionary component
render (<Dictionary typeDefs={typeDefs}/>);

// get list and listitems in variables
const list = screen.getAllByRole("list");
const listitems = screen.getAllByRole("listitem");

// test if the list has length of 2, and if list has length of 11

expect(list).toHaveLength(2);
expect(listitems).toHaveLength(11);

// Change values to verify that the test fails with wrong values
//expect(list).toHaveLength(1);
//expect(listitems).toHaveLength(10);

})