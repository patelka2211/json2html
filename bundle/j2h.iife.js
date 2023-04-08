/**
* "J2H by KP"
* - JSON2HTML, also known as j2h, is a TypeScript and JavaScript library that used to produce UI components for HTML using JavaScript.
*
* @author Kartavya Patel <patelka2211@gmail.com>
*
* @license {@link https://github.com/patelka2211/json2html/blob/main/LICENSE MIT}
*
* @copyright Kartavya Patel 2023
*
* Last updated at : 2023-04-08T16:51:14.137Z
*/
var j2h = (function () {
    'use strict';

    function j2h(tag, attributes) {
        if (typeof attributes === "object" && attributes.length !== undefined)
            return `<${tag}></${tag}>`;
        let output = `<${tag}`, children;
        for (const attributeName in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, attributeName)) {
                const attributeValue = attributes[attributeName];
                if (attributeName === "children") {
                    if (children === undefined &&
                        (typeof attributeValue === "object" ||
                            typeof attributeValue === "string"))
                        children = attributeValue;
                }
                else {
                    if (typeof attributeValue === "string" ||
                        typeof attributeValue === "number")
                        output += ` ${attributeName}="${attributeValue}"`;
                    if (typeof attributeValue === "boolean" &&
                        attributeValue === true)
                        output += ` ${attributeName}`;
                }
            }
        }
        output += ">";
        if (children !== undefined) {
            if (typeof children === "string")
                output += children;
            else if (typeof children === "object" && children.length !== 0) {
                children.forEach((child) => {
                    output += child;
                });
            }
        }
        output += `</${tag}>`;
        return output;
    }

    return j2h;

})();
