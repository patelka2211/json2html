type attributes = {
    [attributeName: string]: string | true | number | string[];
};

export default function j2h(tag: string, attributes: attributes) {
    if (typeof attributes === "object" && attributes.length !== undefined)
        return `<${tag}></${tag}>`;

    let output = `<${tag}`,
        children;

    for (const attributeName in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, attributeName)) {
            const attributeValue = attributes[attributeName];

            if (attributeName === "children") {
                if (
                    children === undefined &&
                    (typeof attributeValue === "object" ||
                        typeof attributeValue === "string")
                )
                    children = attributeValue;
            } else {
                if (
                    typeof attributeValue === "string" ||
                    typeof attributeValue === "number"
                )
                    output += ` ${attributeName}="${attributeValue}"`;
                if (
                    typeof attributeValue === "boolean" &&
                    attributeValue === true
                )
                    output += ` ${attributeName}`;
            }
        }
    }

    output += ">";

    if (children !== undefined) {
        if (typeof children === "string") output += children;
        else if (typeof children === "object" && children.length !== 0) {
            children.forEach((child) => {
                output += child;
            });
        }
    }

    output += `</${tag}>`;
    return output;
}
