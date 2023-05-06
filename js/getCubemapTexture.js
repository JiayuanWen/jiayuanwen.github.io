///Source:   https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_cubemap.html
//          https://threejs.org/examples/?q=cubemap#webgl_materials_cubemap
//Credit to all contributor(s) of this function, we take no credit for creation of it.

export function getCubeTexture( cubemapPath, mapFormat ) {

	const path = cubemapPath;
				const format = mapFormat;
				const urls = [
					path + 'px' + format, path + 'nx' + format,
					path + 'py' + format, path + 'ny' + format,
					path + 'pz' + format, path + 'nz' + format
				];

	return urls;

}