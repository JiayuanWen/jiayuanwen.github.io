
export function gpuEnabled() {
    var canvas = document.createElement('canvas');
    var gl;
    var debugInfo;
    var vendor;
    var renderer;

    try {
        gl = canvas.getContext('webgl', { powerPreference: "high-performance" }) || canvas.getContext('experimental-webgl', { powerPreference: "high-performance" });
    } catch (e) {
    }

    if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }

    // Sample output:
    //
    console.log("GPU in-use:")
    console.log(renderer);
    // Output ATI Technologies Inc. AMD Radeon R9 M370X OpenGL Engine

    var gCard = String(renderer);
    if (
        gCard.includes("AMD") ||
        gCard.includes("amd") ||
        gCard.includes("nvidia") ||
        gCard.includes("Nvidia") ||
        gCard.includes("NVIDIA") 
    ) {
        return true;
    } else {
        return false;
    }
    
    return false;
};

export function detectGPU() {
    var canvas = document.createElement('canvas');
    var gl;
    var debugInfo;
    var vendor;
    var renderer;

    try {
        gl = canvas.getContext('webgl', { powerPreference: "high-performance" }) || canvas.getContext('experimental-webgl', { powerPreference: "high-performance" });
    } catch (e) {
    }

    if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info'); console.log(debugInfo);
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL); console.log(vendor);
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL); console.log(renderer);
    }

    return renderer;
}