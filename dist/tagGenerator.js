/**
 * Returns JSON object of tag and its attributes
 * @param tag
 * @param attributes
 * @returns
 */
export function tagGenerator(tag, attributes = {}) {
    for (const attributeName in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, attributeName)) {
            const attributeValue = attributes[attributeName];
            if (attributeName === "children") {
                if (typeof attributeValue !== "object" &&
                    typeof attributeValue !== "string") {
                    delete attributes[attributeName];
                }
            }
            else {
                if (["string", "boolean", "number"].indexOf(typeof attributeValue) === -1) {
                    delete attributes[attributeName];
                }
            }
        }
    }
    return {
        [tag]: attributes,
    };
}
