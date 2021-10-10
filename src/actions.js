// The function will add an event listener to that node, so that whenever it gets focused it will select the text.
// Then it will return an object with a destroy property. The destroy property is what Svelte will execute after
// removing the node from the DOM. Here we will remove the listener to make sure we don't leave any memory leak behind.
export function selectOnFocus(node) {
	// make sure node is defined and has a select() method
	if (node && typeof node.select === 'function') {
		// event handler to select all text on the focused node!
		const onFocus = (event) => node.select();
		// when node gets focus call onFocus()
		node.addEventListener('focus', onFocus);
		return {
			// this will be executed when the node is removed from the DOM
			destroy: () => node.removeEventListener('focus', onFocus)
		};
	}
}
