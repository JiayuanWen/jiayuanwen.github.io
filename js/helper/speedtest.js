// BY romy421kumari from GeeksforGeeks
// For more info, see: https://www.geeksforgeeks.org/how-to-detect-network-speed-using-javascript

export function getInternetSpeed(mode) {
    var userImageLink = 
    "https://raw.githubusercontent.com/JiayuanWen/jiayuanwen.github.io/main/textures/Background/wallpapers/1.jpg";
                var time_start, end_time;
                
                // The size in bytes
                var downloadSize = 5616998;
                var downloadImgSrc = new Image();
      
                downloadImgSrc.onload = function () {
                    end_time = new Date().getTime();
                    displaySpeed();
                };
                time_start = new Date().getTime();
                downloadImgSrc.src = userImageLink;
      
                function displaySpeed() {
                    var timeDuration = (end_time - time_start) / 1000;
                    var loadedBits = downloadSize * 8;
                    
                    /* Converts a number into string
                        using toFixed(2) rounding to 2 */
                    var bps = (loadedBits / timeDuration).toFixed(2);  
                    var kbps = (bps / 1024).toFixed(2);
                    var mbps = (kbps / 1024).toFixed(2);

                    var final;
                    var postfix;
                    if (mode == "b") {
                        final = bps;
                        postfix = "bps";
                    } else if (mode == "k") {
                        final = kbps;
                        postfix = "Kbps";
                    } else {
                        final = mbps;
                        postfix = "Mbps";
                    }

                    if (bps === "Infinity") {
                        document.getElementById("user-speed").innerHTML = 0+' '+postfix;
                    }
                    else {
                        document.getElementById("user-speed").innerHTML = final+' '+postfix;
                    }
                    
                }
}