export function getDeviceOrientation(output_) {

    console.log("Executed");
    switch(window.orientation) 
    {  
        case -90:
        case 90:
            if (output_ == true) {
                console.log('Device in landscape mode');
                console.log( 'width: ' + window.innerWidth, 'height: ' + window.visualViewport.innerHeight );
            }

            return "landscape" ;
        default:
            if (output_ == true) {
                console.log('Device in portrait mode');
                console.log( 'width: ' + window.innerWidth, 'height: ' + window.innerHeight );
            }
            
            return "portrait" ;
    }
}