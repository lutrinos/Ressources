/**
 * Perlin noise for image generation.
 * 
 * KA Tutorial: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-noise/a/perlin-noise
 * 
 * Made on November 1, 2023
 * 
 * EDIT:
 *  - change from rect to point to make it 2x faster
**/

background(224, 238, 255);

noStroke();

var sunRadius = 100;
var sunX = 100;
var sunY = 80;

var time = 0;
var noiseY = 1000;
var sunNoiseY = 10000;

draw = function() {
    
    // the sun
    var sunNoiseX = 100;
    
    var currentSunWidth = sqrt((time - sunY * 0.75) * (sunRadius - (time -sunY * 0.75))) || 0;
    
    for (var x = - currentSunWidth; x < currentSunWidth; x++) {
        var alpha = map(noise(sunNoiseX, sunNoiseY), 0, 1, 0, 100);
        
        stroke(255, 242, 0, 100);
        point(x + sunX, time);
        
        stroke(255, 100, 0, alpha);
        point(x + sunX, time);
        
        sunNoiseX += 0.1;
    }
    
    time += 1;
    sunNoiseY += 0.1;
    
    // the clouds
    var noiseX = 0.0;
    
    for (var x = 0; x < width; x++) {
        var alpha = map(noise(noiseX, noiseY), 0, 1, 0, 255);
        stroke(255, 255, 255, alpha);
        point(x, time);
        
        stroke(100, 100, 0, alpha - 100);
        point(x, time);
        
        noiseX += 0.01;
    }
    
    noiseY += 0.01;
};