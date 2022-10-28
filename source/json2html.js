/**
 * Helps to create HTML in JavaScript. Uses JSON to store attributes and elements.
 */
export default class json2html {
    constructor() {
        this.list = [];
    }

    /**
     * Creates string of attributes from attributes object.
     */
    #get_attrs(attrs_obj) {
        let output = "",
            attrs_array = Object.entries(attrs_obj);

        for (let index = 0; index < attrs_array.length; index++) {
            output += `${attrs_array[index][0]}="${attrs_array[index][1]}" `;
        }

        return output;
    }

    /**
     * Takes element and appends to root element.
     * @param element Takes object (e.g. this.list)
     * @returns Object itself.
     */
    add(element) {
        this.list.push(element);
        return this;
    }

    /**
     * Converts JSON to HTML.
     * @param input Takes object (e.g. this.list) (Default)
     * @returns HTML string.
     */
    get_html(input = this.list) {
        let output = "";

        if (typeof input == "object" && input.length == undefined) {
            let array = Object.entries(input);
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element[1].length == 2) {
                    if (typeof element[1][1] == "object") {
                        output += `<${element[0]} ${this.#get_attrs(
                            element[1][0]
                        )}>${this.get_html(element[1][1])}</${element[0]}>`;
                    } else
                        output += `<${element[0]} ${this.#get_attrs(
                            element[1][0]
                        )}>${element[1][1]}</${element[0]}>`;
                } else
                    output += `<${element[0]} ${this.#get_attrs(
                        element[1][0]
                    )}/>`;
            }

            return output;
        }

        for (let index = 0; index < input.length; index++) {
            output += this.get_html(input[index]);
        }

        return output;
    }

    /**
     * Repeats given input.
     * @param what_to_repeat Specify what to repeat.
     * @param how_many_times Specity how many times to repeat.
     * @returns List of given input.
     */
    repeater(what_to_repeat, how_many_times) {
        let output = [];
        for (let index = 0; index < how_many_times; index++) {
            output.push(what_to_repeat);
        }
        return output;
    }

    /**
     * '\<div\>' tag.
     * @param attributes Can be object or list of objects.
     * @param innerHTML Can be object/string or list of objects/strings.
     * @returns '\<div\>' tag.
     */
    div(attributes = {}, innerHTML = "") {
        if (typeof attributes == "object" && attributes.length != undefined) {
            let output = [];

            for (let index = 0; index < attributes.length; index++) {
                try {
                    output.push({ div: [attributes[index], innerHTML[index]] });
                } catch (error) {
                    alert(error);
                }
            }
            return output;
        }
        return { div: [attributes, innerHTML] };
    }

    /**
     * '\<a\>' tag.
     * @param href Can be string or list of strings.
     * @param innerHTML Can be object/string or list of objects/strings.
     * @param attributes Can be object or list of objects.
     * @returns '\<a\>' tag.
     */
    a(href = "#", innerHTML = "", attributes = {}) {
        if (typeof href == "object" && href.length != undefined) {
            let output = [];

            for (let index = 0; index < href.length; index++) {
                try {
                    attributes[index].href = href[index];
                    output.push({ div: [attributes[index], innerHTML[index]] });
                } catch (error) {
                    alert(error);
                }
            }
            return output;
        }
        attributes.href = href;
        return { a: [attributes, innerHTML] };
    }

    /**
     * '\<img\>' tag.
     * @param src Can be string or list of strings.
     * @param alt Can be string or list of strings.
     * @param attributes Can be object or list of objects.
     * @returns '\<img\>' tag.
     */
    img(src = "", alt = "", attributes = {}) {
        if (typeof src == "object" && src.length != undefined) {
            let output = [];

            for (let index = 0; index < src.length; index++) {
                try {
                    attributes[index].src = src[index];
                    attributes[index].alt = alt[index];
                    output.push({ div: [attributes[index], innerHTML[index]] });
                } catch (error) {
                    alert(error);
                }
            }
            return output;
        }
        attributes.src = src;
        attributes.alt = alt;
        return { img: [attributes] };
    }
}
