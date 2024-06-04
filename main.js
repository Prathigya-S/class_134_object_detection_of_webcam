
status="";
objects=[];

function preload(){

}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    
}

function start(){
    objectDetector=ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML="status = detecting objects";
}

function model_loaded(){
    console.log("Model is loaded");
    status=true;
    
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video, 0,0,380,380);

    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(p=0; p < objects.length; p++){
            document.getElementById("status").innerHTML="status : Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are : "+objects.length;
            r = random(255);
            g = random(255);
            b = random(255); 

            fill(r,g,b);
            percent=Math.floor(objects[p].confidence * 100);
            text(objects[p].label+" "+ percent + "%" , objects[p].x+15, objects[p].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[p].x, objects[p].y, objects[p].width, objects[p].height);
        }
    }
}