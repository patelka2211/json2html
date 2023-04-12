export type tag = {
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
export declare function tagGenerator(tag: string, attributes?: attributes): tag;
export {};
