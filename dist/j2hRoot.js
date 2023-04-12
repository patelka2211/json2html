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
 * j2hRoot provides functionalities for a J2H root element.
 */
class j2hRoot {
    constructor(root = null) {
        this.root = root;
        this.singletonTagCache = null;
    }
    /**
     * Returns structure of J2H root element.
     * @returns
     */
    getStructure() {
        if (this.structure === undefined)
            return {};
        return this.structure;
    }
    /**
     * Sets structure of J2H root element.
     * @param structure
     */
    setStructure(structure) {
        if (structure === undefined || typeof structure === "object")
            this.structure = structure;
    }
    /**
     * Determines whether an HTML tag is a singleton tag.
     * @function
     * @param {string} tagName - The name of the HTML tag to check.
     * @returns {boolean} - `true` if the tag is a singleton tag, otherwise `false`.
     */
    isSingletonTag(tagName) {
        if (this.singletonTagCache !== null &&
            this.singletonTagCache.hasOwnProperty(tagName)) {
            return this.singletonTagCache[tagName];
        }
        else {
            let el = document.createElement(tagName), isSingleton = el.outerHTML.indexOf(`</${tagName}>`) === -1;
            if (this.singletonTagCache === null)
                this.singletonTagCache = {};
            this.singletonTagCache[tagName] = isSingleton;
            return isSingleton;
        }
    }
    /**
     * You can add multiple tags using addTag method.
     * @param tag
     * @returns
     */
    addTag(tag) {
        if (this.structure === undefined)
            this.structure = tag;
        else if (this.structure.length === undefined)
            this.structure = [this.structure, tag];
        else
            this.structure.push(tag);
        return this;
    }
    /**
     * Converts single tag to HTML string.
     * @param tag
     * @returns
     */
    convertSingleTag(tag) {
        try {
            let tagName = Object.keys(tag)[0], attributesObject = tag[tagName], isSingleton = this.isSingletonTag(tagName);
            if (!(typeof attributesObject === "object" &&
                attributesObject.length === undefined)) {
                if (isSingleton)
                    return `<${tagName}/>`;
                return `<${tagName}></${tagName}>`;
            }
            let children = null, output = `<${tagName}`;
            for (const attributeName in attributesObject) {
                if (Object.prototype.hasOwnProperty.call(attributesObject, attributeName)) {
                    const attributeValue = attributesObject[attributeName];
                    if (attributeName === "children") {
                        if (children === null &&
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
            if (isSingleton) {
                output += "/>";
                children = null;
            }
            else {
                output += ">";
                if (children !== null) {
                    if (typeof children === "string")
                        output += children;
                    else if (children.length === undefined)
                        output += this.convertSingleTag(children);
                    else if (children.length !== undefined)
                        output += this.convertMultipleTag(children);
                }
                output += `</${tagName}>`;
            }
            return output;
        }
        catch (error) {
            console.error(error);
            return "";
        }
    }
    /**
     * Converts multiple tags to HTML string.
     * @param tagList
     * @returns
     */
    convertMultipleTag(tagList) {
        let output = "";
        tagList.forEach((item) => {
            if (typeof item === "string")
                output += `\n${item}\n`;
            else
                output += `\n${this.convertSingleTag(item)}\n`;
        });
        return output;
    }
    /**
     * Renders HTML on the actual DOM.
     * @param onSuccess
     * @param onFailure
     */
    render(onSuccess = (html) => {
        if (this.root !== null)
            this.root.innerHTML = html;
    }, onFailure = () => { }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.root === null)
                return;
            try {
                let html = "";
                if (this.structure !== undefined) {
                    if (typeof this.structure === "object" &&
                        this.structure.length === undefined)
                        html = this.convertSingleTag(this.structure);
                    else
                        html = this.convertMultipleTag(this.structure);
                }
                onSuccess(html);
            }
            catch (error) {
                console.error(error);
                onFailure();
            }
            finally {
                this.singletonTagCache = null;
            }
        });
    }
}
/**
 * Returns j2hRoot instance.
 * @param element
 * @returns
 */
export function setJ2HRoot(element) {
    return new j2hRoot(element);
}
