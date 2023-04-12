import { tag } from "./tagGenerator";
/**
 * j2hRoot provides functionalities for a j2h root element.
 */
declare class j2hRoot {
    readonly root: HTMLElement | null;
    private structure;
    private singletonTagCache;
    constructor(root?: HTMLElement | null);
    /**
     * Returns structure of j2h root element. Its like virtual DOM.
     * @returns
     */
    getStructure(): tag | tag[];
    /**
     * Determines whether an HTML tag is a singleton tag.
     * @function
     * @param {string} tagName - The name of the HTML tag to check.
     * @returns {boolean} - `true` if the tag is a singleton tag, otherwise `false`.
     */
    isSingletonTag(tagName: string): boolean;
    /**
     * You can add multiple tags using addTag method.
     * @param tag
     * @returns
     */
    addTag(tag: tag): this;
    /**
     * Converts single tag to HTML string.
     * @param tag
     * @returns
     */
    private convertSingleTag;
    /**
     * Converts multiple tags to HTML string.
     * @param tagList
     * @returns
     */
    private convertMultipleTag;
    /**
     * Renders HTML on the actual DOM.
     * @param onSuccess
     * @param onFailure
     */
    render(onSuccess?: (html: string) => void, onFailure?: () => void): Promise<void>;
}
/**
 * Returns j2hRoot instance.
 * @param element
 * @returns
 */
export declare function setJ2HRoot(element: HTMLElement): j2hRoot;
export {};