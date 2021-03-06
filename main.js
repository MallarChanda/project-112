prediction_1 = "";
prediction_2 = "";

Webcam.set({
width : 350,
height : 300,
image_format : 'png',
png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
});    
}

console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IZepjvnwc/model.json',modelLoaded);


function speak() {
var synth = window.speechSynthesis;
speak_data1 = "The first prediction is" + prediction_1;
speak_data2 = "And the second prediction is" + prediction_2; 
var utterThis = newspeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterThis);
}

function modelLoaded() {
console.log('Model Loaded!')
}

function check() {
img = document.getElementById("captured_image");
classifier.classify(img, gotResult);
}

function gotResult(error,results){
if (error) {
console.error(error);
}
else {
console.log(results);
document.getElementById("result_emotion_name").innerHTML = results[0].label;
document.getElementById("result_emotion_name2").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;
speak();
if (results[0].label == "Amazing"){
document.getElementById("updated_emoji").innerHTML = "Amazing as you";
}

if (results[0].label == "Best of Luck"){
document.getElementById("updated_emoji").innerHTML = "Best of Luck for everything";
}

if (results[0].label == "Victory"){
document.getElementById("updated_emoji").innerHTML = "V for Victory";
}

if (results[1].label == "Amazing"){
document.getElementById("updated_emoji2").innerHTML = "Amazing as you";
}

if (results[1].label == "Best of Luck"){
document.getElementById("updated_emoji2").innerHTML = "Best of Luck for everything";
}

if (results[1].label == "Victory"){
document.getElementById("updated_emoji2").innerHTML = "V for Victory";
}

}
}