// actions.js
export function selectOnFocus(node) {
  // make sure node is defined and has a select() method
  if (node && typeof node.select === "function") {
    // event handler
    const onFocus = (event) => node.select();
    // when node gets focus call onFocus()
    node.addEventListener("focus", onFocus);
    return {
      // this will be executed when the node is removed from the DOM
      destroy: () => node.removeEventListener("focus", onFocus),
    };
  }
}
