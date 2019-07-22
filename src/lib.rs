// extern crate wasm_bindgen;
// extern crate gjson;

use web_sys::console;
use wasm_bindgen::prelude::*;
use gjson::GJSON;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn get_value(json: &str, path: &str) -> Result<JsValue, JsValue> {
    // console::log_1(&"get json".into());
    // console::log_1(&json.into());
    // console::log_1(&"path".into());
    // console::log_1(&path.into());
    
    let r = GJSON::from_str(json);
    let v = r.get(path);
    Ok(JsValue::from_str(&format!("{:?}", v)))
}