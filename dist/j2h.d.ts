/**
 * Copyright (c) 2023 Kartavya Patel
 * Repository url: https://github.com/patelka2211/json2html
 */
type BooleanAttributeName = string;
type PairedAttribute = {
    [_: string]: string | number;
};
type CompositeAttribute = [
    PairedAttribute,
    BooleanAttributeName | BooleanAttributeName[]
];
type Attributes = BooleanAttributeName | BooleanAttributeName[] | CompositeAttribute | PairedAttribute;
type ValidValue = string | ValidPair | ValidPair[];
type ValidPair = {
    [_: string]: [Attributes, ValidValue];
};
interface elements {
    a: "a";
    abbr: "abbr";
    address: "address";
    area: "area";
    article: "article";
    aside: "aside";
    audio: "audio";
    b: "b";
    base: "base";
    bdi: "bdi";
    bdo: "bdo";
    blockquote: "blockquote";
    body: "body";
    br: "br";
    button: "button";
    canvas: "canvas";
    caption: "caption";
    cite: "cite";
    code: "code";
    col: "col";
    colgroup: "colgroup";
    data: "data";
    datalist: "datalist";
    dd: "dd";
    del: "del";
    details: "details";
    dfn: "dfn";
    dialog: "dialog";
    div: "div";
    dl: "dl";
    dt: "dt";
    em: "em";
    embed: "embed";
    fieldset: "fieldset";
    figcaption: "figcaption";
    figure: "figure";
    footer: "footer";
    form: "form";
    h1: "h1";
    h2: "h2";
    h3: "h3";
    h4: "h4";
    h5: "h5";
    h6: "h6";
    head: "head";
    header: "header";
    hgroup: "hgroup";
    hr: "hr";
    html: "html";
    i: "i";
    iframe: "iframe";
    img: "img";
    input: "input";
    ins: "ins";
    kbd: "kbd";
    label: "label";
    legend: "legend";
    li: "li";
    link: "link";
    main: "main";
    map: "map";
    mark: "mark";
    menu: "menu";
    meta: "meta";
    meter: "meter";
    nav: "nav";
    noscript: "noscript";
    object: "object";
    ol: "ol";
    optgroup: "optgroup";
    option: "option";
    output: "output";
    p: "p";
    picture: "picture";
    pre: "pre";
    progress: "progress";
    q: "q";
    rp: "rp";
    rt: "rt";
    ruby: "ruby";
    s: "s";
    samp: "samp";
    script: "script";
    section: "section";
    select: "select";
    slot: "slot";
    small: "small";
    source: "source";
    span: "span";
    strong: "strong";
    style: "style";
    sub: "sub";
    summary: "summary";
    sup: "sup";
    table: "table";
    tbody: "tbody";
    td: "td";
    template: "template";
    textarea: "textarea";
    tfoot: "tfoot";
    th: "th";
    thead: "thead";
    time: "time";
    title: "title";
    tr: "tr";
    track: "track";
    u: "u";
    ul: "ul";
    var: "var";
    video: "video";
    wbr: "wbr";
}
declare class json2html {
    readonly root: HTMLElement;
    list: ValidPair[];
    constructor(root: HTMLElement);
    append(input: ValidPair): this;
    render(input?: ValidPair[], root?: HTMLElement): void;
}
declare const j2h: {
    setRoot: (root: HTMLElement) => json2html;
    element: <Tag extends keyof elements>(tagName: Tag, attributes?: Attributes, innerHTMl?: ValidValue) => ValidPair;
    setAttribute: (element: HTMLElement | json2html, attributes: Attributes) => HTMLElement;
};
export default j2h;
