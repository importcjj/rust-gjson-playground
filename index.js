import ace from 'ace-builds';
import "ace-builds/webpack-resolver";

var editor = ace.edit("editor");
editor.setValue(`{
    "name": {"first": "Tom", "last": "Anderson"},
    "age":37,
    "children": ["Sara","Alex","Jack"],
    "fav.movie": "Deer Hunter",
    "friends": [
        {"first": "Dale", "last": "Murphy", "age": 44, "nets": ["ig", "fb", "tw"]},
        {"first": "Roger", "last": "Craig", "age": 68, "nets": ["fb", "tw"]},
        {"first": "Jane", "last": "Murphy", "age": 47, "nets": ["ig", "tw"]}
    ]
}`)

editor.setShowPrintMargin(false);
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/json");
editor.renderer.setShowGutter(false);
editor.clearSelection()

var pathInput = document.getElementById("path");
pathInput.value = "name.last";
pathInput.focus();

var valueBox = ace.edit("json-value");
valueBox.setReadOnly(true);
valueBox.setShowPrintMargin(false);
valueBox.session.setMode("ace/mode/json");
valueBox.setTheme("ace/theme/monokai");
valueBox.renderer.setShowGutter(false);
var heightUpdateFunction = function () {

    // http://stackoverflow.com/questions/11584061/
    var newHeight =
        valueBox.getSession().getScreenLength()
        * valueBox.renderer.lineHeight
        + valueBox.renderer.scrollBar.getWidth();

    document.getElementById("json-value").style.height = newHeight.toString() + "px"
    // document.getElementById("json-value-section").height = newHeight.toString() + "px";

    // This call is required for the editor to fix all of
    // its inner structure for adapting to a change in size
    valueBox.resize();
};

heightUpdateFunction();
valueBox.getSession().on('change', heightUpdateFunction)
// var valueBox = document.getElementById("json-value");

const js = import("./pkg/playground.js");
js.then(js => {
    window.get_json_value = js.get_value;
    pathInput.oninput = function () {
        let json = editor.getValue();
        let path = this.value;
        let value = js.get_value(json, path);
        //   valueBox.innerHTML = value;
        if (value.length) {
            valueBox.setValue(value);
            // let o = JSON.parse(value);
            // valueBox.setValue(JSON.stringify(o, null, 2));
        } else {
            valueBox.setValue(value)
        }
        valueBox.clearSelection()
    }

    pathInput.oninput();
});