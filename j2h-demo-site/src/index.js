import { j2hTag, setJ2HRoot } from "../../dist/index_esm.js";
import formatHTML from "./formatHTML.js";

let root = setJ2HRoot(document.getElementById("root"));

root.addTag(
    j2hTag("img", {
        id: "j2h-logo",
        src: "./j2h-demo-site/assets/j2h-logo.png",
    })
)
    .addTag(
        j2hTag("p", {
            id: "j2h-description",
            children:
                "JSON2HTML, also known as j2h, is a TypeScript and JavaScript library that used to produce UI components for HTML using JavaScript.",
        })
    )
    .addTag(
        j2hTag("p", {
            children:
                "This website was developed using j2h. An example of its own is provided.",
        })
    )
    .addTag(
        j2hTag("p", {
            id: "for-large-screens",
            children:
                "The left example demonstrates how the j2h generates json. The HTML result is seen in the right example.",
        })
    )
    .addTag(
        j2hTag("p", {
            id: "for-small-screens",
            children:
                "The upper example demonstrates how the j2h generates json. The HTML result is seen in the lower example.",
        })
    )
    .addTag(
        j2hTag("a", {
            href: "https://github.com/patelka2211/json2html",
            target: "_blank",
            children: "View j2h on GitHub",
        })
    )
    .addTag(
        j2hTag("div", {
            id: "example-container",
            children: [
                j2hTag("div", { id: "json-input-container" }),
                j2hTag("div", { id: "html-output-container" }),
            ],
        })
    )
    .addTag(
        j2hTag("a", {
            href: "https://github.com/patelka2211",
            target: "_blank",
            children: "Developed in 🇮🇳 with ❤️ by KP",
        })
    );

root.render((html) => {
    root.root.innerHTML = html;

    let html_input_container = document.getElementById("html-output-container");

    ((list) => {
        html_input_container.innerHTML = "";

        list.map((item) => {
            if (item.length)
                html_input_container.append(
                    ((element) => {
                        element.innerText = item;
                        return element;
                    })(document.createElement("pre"))
                );
        });
    })(formatHTML(html).split("\n"));

    let json_input_container = document.getElementById("json-input-container");

    ((list) => {
        json_input_container.innerHTML = "";
        list.map((item) => {
            if (item.length)
                json_input_container.append(
                    ((element) => {
                        element.innerText = item;
                        return element;
                    })(document.createElement("pre"))
                );
        });
    })(JSON.stringify(root.getStructure(), null, 3).split("\n"));
});
