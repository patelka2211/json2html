import j2h from "../../dist/j2h.js";
import formatHTML from "./formatHTML.js";

let root = j2h.setRoot(document.getElementById("root"));

root.append(
    j2h.element("img", {
        id: "j2h-logo",
        src: "./j2h-demo-site/assets/j2h-logo.png",
    })
)
    .append(
        j2h.element(
            "p",
            { id: "j2h-description" },
            "JSON2HTML, also known as j2h, is a TypeScript and JavaScript library that used to produce UI components for HTML using JavaScript."
        )
    )
    .append(
        j2h.element(
            "p",
            {},
            "This website was developed using j2h. An example of its own is provided."
        )
    )
    .append(
        j2h.element(
            "p",
            { id: "for-large-screens" },
            "The left example demonstrates how the j2h generates json. The HTML result is seen in the right example."
        )
    )
    .append(
        j2h.element(
            "p",
            { id: "for-small-screens" },
            "The upper example demonstrates how the j2h generates json. The HTML result is seen in the lower example."
        )
    )
    .append(
        j2h.element(
            "a",
            {
                href: "https://github.com/patelka2211/json2html",
                target: "_blank",
            },
            "View j2h on GitHub"
        )
    )
    .append(
        j2h.element("div", { id: "example-container" }, [
            j2h.element("div", { id: "json-input-container" }),
            j2h.element("div", { id: "html-output-container" }),
        ])
    )
    .append(
        j2h.element(
            "a",
            {
                href: "https://github.com/patelka2211",
                target: "_blank",
            },
            "Developed in 🇮🇳 with ❤️ by KP"
        )
    );

async function render() {
    root.render();
}

render().then(() => {
    let html_input_container = j2h.setRoot(
        document.getElementById("html-output-container")
    );

    ((list) => {
        list.map((item) => {
            html_input_container.append(j2h.element("pre", {}, item));
        });

        html_input_container.render();
    })(formatHTML(root.root.innerHTML).split("\n"));

    let json_input_container = j2h.setRoot(
        document.getElementById("json-input-container")
    );

    ((list) => {
        list.map((item) => {
            json_input_container.append(j2h.element("pre", {}, item));
        });

        json_input_container.render();
    })(JSON.stringify(root.list, null, 3).split("\n"));
});
