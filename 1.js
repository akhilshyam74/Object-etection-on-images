status = "";
objects = [];
function preload(){
   console.log("Function preload()")
}
function setup(){
    canvas = createCanvas(380, 380);
    console.log("Canvas width = 380px and Canvas height = 380px");
    canvas.center();
    video = createCapture(VIDEO);
    console.log("Webcam is opened");
    video.size(380, 380)
    console.log("Webcam width = 380px and Webcam height = 380px");
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    console.log(status);
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object detected";
            console.log("Status : Objects detected");
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+objects.length;
            console.log("Number of objects detected are : "+objects.length);
            document.getElementById("objects_detected").innerHTML = "Objects detected are "+objects;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}