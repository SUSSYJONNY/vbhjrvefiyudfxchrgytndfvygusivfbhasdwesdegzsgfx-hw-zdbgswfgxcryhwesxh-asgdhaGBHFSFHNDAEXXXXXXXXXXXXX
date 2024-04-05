objects = [];
stautus = "";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
   video = createCapture(VIDEO)
   video.size(480, 380);
    video.hide();
    
 }

function start() { 
    objectDetector = ml5.objectDetector('cocossd', modelLoaded );
    objectName = document.getElementById("objectName").value;
    document.getElementById("status").innerHTML = "status: detectando os objetos no video";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
 }

function gotResults(error, results) {
    if(error){
        console.error("LMFAOOOOOOOOO U GLITCHED I DON'T CARE KILL UTTP NOW DOX ME AND U NEVER WIL REACH ME CUZ U LIVE IN ANOTHER PLACE AND U DUMB GIVE YOU IP AND ADRESS AND I NUKE U");
    }
    console.log(results);
    objects = results;
 }

function draw() {
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length;i++){
            document.getElementById("status").innerHTML = "status: objetos detectados com sucesso";
            document.getElementById("numberOfobjects").innerHTML = "gedagidigidagagado"+objects.length;
            fill("rgb(200, 0, 200)");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("gold");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == objectName){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objectStatus").innerHTML = objectName + "encontrado";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectName + "encontrado");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectStatus").innerHTML = objectName + "não encontrado";
            }
        }
    }
 }