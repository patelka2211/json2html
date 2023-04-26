const outFormats = ["iife", "esm"],
    time = new Date(),
    banner = `/**
* "J2H by KP"
* - JSON2HTML, also known as j2h, is a TypeScript and JavaScript library that used to produce UI components for HTML using JavaScript.
*
* @author Kartavya Patel <patelka2211@gmail.com>
*
* @license {@link https://github.com/patelka2211/json2html/blob/main/LICENSE MIT}
*
* @copyright Kartavya Patel ${time.getFullYear()}
*
* Last updated at : ${time.toISOString()}
*/`;

export default outFormats.map((format) => {
    return {
        input: `./dist/index_${format}.js`,
        output: {
            file: `./bundle/j2h.${format}.js`,
            format: format,
            name: "j2h",
            banner: banner,
        },
    };
});
