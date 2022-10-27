export default class json2html {
    constructor() {}

    get_attrs(attrs_obj) {
        let output = "",
            attrs_array = Object.entries(attrs_obj);

        for (let index = 0; index < attrs_array.length; index++) {
            output += `${attrs_array[index][0]}="${attrs_array[index][1]}" `;
        }

        return output;
    }

    convert(input) {
        let output = "",
            array = Object.entries(input);

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element[1].length == 2) {
                if (typeof element[1][1] == "object") {
                    output += `<${element[0]} ${this.get_attrs(
                        element[1][0]
                    )}> ${this.convert(element[1][1])} </${element[0]}>`;
                } else
                    output += `<${element[0]} ${this.get_attrs(
                        element[1][0]
                    )}> ${element[1][1]} </${element[0]}>`;
            } else
                output += `<${element[0]} ${this.get_attrs(element[1][0])}/>`;
        }

        return output;
    }
}
