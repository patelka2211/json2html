type tag = {
    [name: string]: attributes;
};

type attributes = {
    [key: string]: string | true | number | tag | (string | tag)[];
};

/**
 * Returns JSON object of tag and its attributes
 * @param tag
 * @param attributes
 * @returns
 */
function tag(tag: string, attributes: attributes = {}): tag {
    for (const attributeName in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, attributeName)) {
            const attributeValue = attributes[attributeName];

            if (attributeName === "children") {
                if (
                    typeof attributeValue !== "object" &&
                    typeof attributeValue !== "string"
                ) {
                    delete attributes[attributeName];
                }
            } else {
                if (
                    ["string", "boolean", "number"].indexOf(
                        typeof attributeValue
                    ) === -1
                ) {
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
    private structure: tag[] = [];
    constructor(private readonly root: HTMLElement) {}

    /**
     * Returns structure of j2h root element. Its like virtual DOM.
     * @returns
     */
    public getStructure() {
        return this.structure;
    }

    /**
     * You can add multiple tags using addTag method.
     * @param tag
     * @returns
     */
    public addTag(tag: tag) {
        this.structure.push(tag);
        return this;
    }

    /**
     * Renders and renturns default structure of j2h root element.
     * @param tagList
     * @returns
     */
    private _render(tagList = this.structure) {
        let output = "";
        tagList.forEach((tagObject) => {
            try {
                let tagName = Object.keys(tagObject)[0],
                    attributesObject = tagObject[tagName],
                    children: string | tag | (string | tag)[] | undefined;
                output += `<${tagName}`;

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
                                children === undefined &&
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

                output += `>`;

                if (children !== undefined) {
                    if (typeof children === "string") output += children;
                    else if (children.length === undefined)
                        output += this._render([children] as tag[]);
                    else if (children.length !== undefined) {
                        (children as (string | tag)[]).forEach((child) => {
                            if (typeof child === "string") output += child;
                            else output += this._render([child] as tag[]);
                        });
                    }
                }
                output += `</${tagName}>`;
            } catch (error) {
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
    public async render(
        onSuccess = (html: string) => {
            console.log(html);
        },
        onFailure = (msg: string) => {
            console.log(msg);
        }
    ) {
        try {
            let html = this._render();
            this.root.innerHTML = html;
            onSuccess(html);
        } catch (error) {
            onFailure(String(error));
        }
    }
}

/**
 * Returns j2hRoot instance.
 * @param element
 * @returns
 */
function setJ2HRoot(element: HTMLElement) {
    return new j2hRoot(element);
}

export { tag, setJ2HRoot };
