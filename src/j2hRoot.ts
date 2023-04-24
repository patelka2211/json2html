import { tag } from "./tagGenerator";

/**
 * j2hRoot provides functionalities for a J2H root element.
 */
class j2hRoot {
    /**
     * Structure of innerHTML of root tag. Its like virtual DOM.
     */
    private structure: tag | tag[] | undefined;
    private singletonTagCache: {
        [tag: string]: boolean;
    } | null = null;
    constructor(readonly root: HTMLElement | null = null) {}

    /**
     * Returns structure of J2H root element.
     * @returns
     */
    public getStructure() {
        if (this.structure === undefined) return {} as tag;
        return this.structure;
    }

    /**
     * Sets structure of J2H root element.
     * @param structure
     */
    public setStructure(structure: tag | tag[] | undefined) {
        if (structure === undefined || typeof structure === "object")
            this.structure = structure;
    }

    /**
     * Determines whether an HTML tag is a singleton tag.
     * @function
     * @param {string} tagName - The name of the HTML tag to check.
     * @returns {boolean} - `true` if the tag is a singleton tag, otherwise `false`.
     */
    isSingletonTag(tagName: string): boolean {
        if (
            this.singletonTagCache !== null &&
            this.singletonTagCache.hasOwnProperty(tagName)
        ) {
            return this.singletonTagCache[tagName];
        } else {
            let el = document.createElement(tagName),
                isSingleton = el.outerHTML.indexOf(`</${tagName}>`) === -1;

            if (this.singletonTagCache === null) this.singletonTagCache = {};
            this.singletonTagCache[tagName] = isSingleton;
            return isSingleton;
        }
    }

    /**
     * You can add multiple tags using addTag method.
     * @param tag
     * @returns
     */
    public addTag(tag: tag) {
        if (this.structure === undefined) this.structure = tag;
        else if (this.structure.length === undefined)
            this.structure = [this.structure as tag, tag];
        else (this.structure as tag[]).push(tag);

        return this;
    }

    /**
     * Converts single tag to HTML string.
     * @param tag
     * @returns
     */
    private convertSingleTag(tag: tag) {
        try {
            let tagName = Object.keys(tag)[0],
                attributesObject = tag[tagName],
                isSingleton = this.isSingletonTag(tagName);

            if (
                !(
                    typeof attributesObject === "object" &&
                    attributesObject.length === undefined
                )
            ) {
                if (isSingleton) return `<${tagName}/>`;
                return `<${tagName}></${tagName}>`;
            }

            let children: string | tag | (string | tag)[] | null = null,
                output = `<${tagName}`;

            for (const attributeName in attributesObject) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        attributesObject,
                        attributeName
                    )
                ) {
                    const attributeValue = attributesObject[attributeName];

                    if (attributeName === "children") {
                        if (
                            children === null &&
                            (typeof attributeValue === "object" ||
                                typeof attributeValue === "string")
                        )
                            children = attributeValue;
                    } else {
                        if (
                            ["string", "boolean", "number"].indexOf(
                                typeof attributeValue
                            ) !== -1
                        ) {
                            if (
                                typeof attributeValue === "boolean" &&
                                attributeValue
                            )
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
            } else {
                output += ">";
                if (children !== null) {
                    if (typeof children === "string") output += children;
                    else if (children.length === undefined)
                        output += this.convertSingleTag(children as tag);
                    else if (children.length !== undefined)
                        output += this.convertMultipleTag(
                            children as (string | tag)[]
                        );
                }
                output += `</${tagName}>`;
            }

            return output;
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    /**
     * Converts multiple tags to HTML string.
     * @param tagList
     * @returns
     */
    private convertMultipleTag(tagList: (string | tag)[]) {
        let output = "";
        tagList.forEach((item) => {
            if (typeof item === "string") output += `\n${item}\n`;
            else output += `\n${this.convertSingleTag(item)}\n`;
        });
        return output;
    }

    /**
     * Renders HTML on the actual DOM.
     * @param onSuccess
     * @param onFailure
     */
    public async render(
        onSuccess = (html: string) => {
            if (this.root !== null) this.root.innerHTML = html;
        },
        onFailure = () => {}
    ) {
        if (this.root === null) return;
        try {
            let html = "";

            if (this.structure !== undefined) {
                if (
                    typeof this.structure === "object" &&
                    this.structure.length === undefined
                )
                    html = this.convertSingleTag(this.structure as tag);
                else html = this.convertMultipleTag(this.structure as tag[]);
            }
            onSuccess(html);
        } catch (error) {
            console.error(error);
            onFailure();
        } finally {
            this.singletonTagCache = null;
        }
    }
}

/**
 * Returns j2hRoot instance.
 * @param element
 * @returns
 */
export function setRoot(element: HTMLElement) {
    return new j2hRoot(element);
}
