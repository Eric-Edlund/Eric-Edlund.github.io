

//https://stackoverflow.com/questions/73702850/how-to-properly-handle-javascript-custom-element-web-component-with-children-e
//https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
customElements.define("code-example", class extends HTMLElement {
    constructor(){
        super();
        // the Shadow is an encapsulated DOM
        this.shadow = this.attachShadow({mode: 'open'});

        // Give it some style
        const style = document.createElement('style');
        
        style.textContent = `
        .label {
            font-size: large;
            margin-bottom: 0;
            margin-top: auto;
            padding: 0.5ch;
            text-align: center;
        }

        .thecode {
            background-color: rgba(255, 255, 255, 0.3);
            padding: 1.5ch;
            border-radius: 1ch;
            margin-top: 0;
            overflow: auto;
        }
        
        `
        this.shadow.appendChild(style);

        this.label = document.createElement('p');
        this.label.innerText = "Example";
        this.label.setAttribute("class", "label");
        this.shadow.appendChild(this.label);

        this.code = document.createElement('pre');
        this.code.setAttribute("class", "thecode")
        this.shadow.appendChild(this.code);
    }

    // Called when the element connects to the DOM
    // Puts the example text into the box
    connectedCallback() {
        let exampleId = this.getAttribute("example");
        if (!(exampleId in example_texts)) alert('"' + exampleId + '"' + " is not a known example. You messed up the 'example' attribute in a 'code-example' element somewhere.")
        let example = example_texts[this.getAttribute("example")];
        this.label.innerText = example.label;
        this.code.innerText = example.code;

        if (this.hasAttribute("showPreview")) {
            $('#frameid').contents().find('html').html("LALALLA");
            //alert("k")
        }
            
    }
});




function onLoad() {
    // Put the "text" attribute of any element that has it into the innerText
    // (Writing html in html is tricky)
    Array.from(document.querySelectorAll("[text]")).forEach(element => {
        element.innerText = element.getAttribute("text");
    });
    Array.from(document.querySelectorAll("[t]")).forEach(element => {
        element.innerText = element.getAttribute("t");
    });
}

/**
 * Easier to store examples in js literals
 * than in html.
 * 
 * Each example needs
 *  label: (optionally empty string)
 *  code:
 */
const example_texts = {
    basic_html: {
        label: "A Simple HTML Document",
        code: `<!DOCTYPE html>

<html>
    <head>
        <title>Text Displayed on the Tab</title>
    </head>
    <body>
        <p> 
            A paragraph element (<p>) containing this text.
        </p>
    </body>
</html>`,

},

    text_elements: {
        label: "Some Elements Format Their Text",
        code: `<h1>Header 1</h1>
        <h2>Header 2</h2>
`
    },

    css_example: {
        label: "Some CSS from This Page",
        code: `h1 {
    background-color: white;
    border-radius: 5px; /* multi-line comment */
}

body {
    background-color: orange;
}
`
    },

    css_example_cascading: {
        label: "CSS Producing a white background with black text",
        code: `body {
    background-color: orange;
    color: black;
}

body {
    background-color: white;
}
`
    },

    css_example_groupselector: {
        label: "",
        code: `p {
    color: red;
}

h1 {
    color: red;
}

/* is the same as*/

p h1 {
    color: red;
}

`,
    },

    css_in_html: {
        label: "main.html",
        code: `<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <style>
            h1 {
                color: red;
                border: black solid 5px;
            }

            body {
                background-color: green;
            }
        </style>
    </head>
    <body>
        <h1>
            Red Text
        </h1>
        <p>
            Black text on green background.
        </p>
    </body>

</html>
`
    },

    style_css: {
        label: "style.css",
        code: `
p {
    color: black;
}

h {
    color: white;
}
`
    },

    grid_layout: {
        label: "",
        code: `<style>
    #gridexample1 {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr;
        grid-template-rows: 100px 150px;
        gap: 10px;
    }
</style>

<div id="gridexample1">
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
</div>`
    },

    elements: {
        label: "HTML Containing a Cat and a Dog",
        code: `<!--A cat element followed by a dog-->
<cat>
</cat>
<dog></dog>

<!--Nonsense-->
<cat></dog>`

    },

    nesting_elements: {
        label: "",
        code: `<cat>
    <heart></heart>
    <lung></lung>
    <lung></lung>
    <evil></evil>
</cat>`

    }
};
