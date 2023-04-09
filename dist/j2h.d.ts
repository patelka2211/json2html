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
declare function tag(tag: string, attributes?: attributes): tag;
/**
 * j2hRoot provides functionalities for a j2h root element.
 */
declare class j2hRoot {
    private readonly root;
    private structure;
    constructor(root: HTMLElement);
    /**
     * Returns structure of j2h root element. Its like virtual DOM.
     * @returns
     */
    getStructure(): tag[];
    /**
     * You can add multiple tags using addTag method.
     * @param tag
     * @returns
     */
    addTag(tag: tag): this;
    /**
     * Renders and renturns default structure of j2h root element.
     * @param tagList
     * @returns
     */
    private _render;
    /**
     * Renders HTML on the actual DOM.
     * @param onSuccess
     * @param onFailure
     */
    render(onSuccess?: (html: string) => void, onFailure?: (msg: string) => void): Promise<void>;
}
/**
 * Returns j2hRoot instance.
 * @param element
 * @returns
 */
declare function setJ2HRoot(element: HTMLElement): j2hRoot;
export { tag, setJ2HRoot };
