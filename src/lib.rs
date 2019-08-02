// extern crate wasm_bindgen;
// extern crate ajson;

use web_sys::console;
use wasm_bindgen::prelude::*;
use ajson;

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
    
    let r = ajson::get(json, path);
    Ok(JsValue::from_str(r.to_string().as_str()))
}