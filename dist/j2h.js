var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Returns JSON object of tag and its attributes
 * @param tag
 * @param attributes
 * @returns
 */
function tag(tag, attributes = {}) {
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
/**
 * j2hRoot provides functionalities for a j2h root element.
 */
class j2hRoot {
    constructor(root) {
        this.root = root;
        this.structure = [];
    }
    /**
     * Returns structure of j2h root element. Its like virtual DOM.
     * @returns
     */
    getStructure() {
        return this.structure;
    }
    /**
     * You can add multiple tags using addTag method.
     * @param tag
     * @returns
     */
    addTag(tag) {
        this.structure.push(tag);
        return this;
    }
    /**
     * Renders and renturns default structure of j2h root element.
     * @param tagList
     * @returns
     */
    _render(tagList = this.structure) {
        let output = "";
        tagList.forEach((tagObject) => {
            try {
                let tagName = Object.keys(tagObject)[0], attributesObject = tagObject[tagName], children;
                output += `<${tagName}`;
                for (const attributeName in attributesObject) {
                    if (Object.prototype.hasOwnProperty.call(attributesObject, attributeName)) {
                        const attributeValue = attributesObject[attributeName];
                        if (attributeName === "children") {
                            if (children === undefined &&
                                (typeof attributeValue === "object" ||
                                    typeof attributeValue === "string"))
                                children = attributeValue;
                        }
                        else {
                            if (["string", "boolean", "number"].indexOf(typeof attributeValue) !== -1) {
                                if (typeof attributeValue === "boolean" &&
                                    attributeValue)
                                    output += ` ${attributeName}`;
                                else
                                    output += ` ${attributeName}="${attributeValue}"`;
                            }
                        }
                    }
                }
                output += `>`;
                if (children !== undefined) {
                    if (typeof children === "string")
                        output += children;
                    else if (children.length === undefined)
                        output += this._render([children]);
                    else if (children.length !== undefined) {
                        children.forEach((child) => {
                            if (typeof child === "string")
                                output += child;
                            else
                                output += this._render([child]);
                        });
                    }
                }
                output += `</${tagName}>`;
            }
            catch (error) {
                console.error(error);
            }
        });
        return output;
    }
    /**
     * Renders HTML on the actual DOM.
     * @param onSuccess
     * @param onFailure
     */
    render(onSuccess = (html) => {
        console.log(html);
    }, onFailure = (msg) => {
        console.log(msg);
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let html = this._render();
                this.root.innerHTML = html;
                onSuccess(html);
            }
            catch (error) {
                onFailure(String(error));
            }
        });
    }
}
/**
 * Returns j2hRoot instance.
 * @param element
 * @returns
 */
function setJ2HRoot(element) {
    return new j2hRoot(element);
}
export { tag, setJ2HRoot };
