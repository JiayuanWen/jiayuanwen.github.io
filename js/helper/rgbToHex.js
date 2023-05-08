export function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(color) {
	var hexadecimal = color.toString(16);
	return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}