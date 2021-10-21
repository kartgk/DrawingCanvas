var canvas;
var drawing=[]
var currentPath=[];
var isDrawing=false;

var database;

function setup() {
    canvas = createCanvas(400, 400);
    canvas.mousePressed(startPath);  
    canvas.mouseReleased(endPath);
    
    database=firebase.database();
   // readData();

   var saveButton=createButton("Save");
   saveButton.position(290,430);
   saveButton.size(60,20);
   saveButton.mousePressed(saveDrawing);

   var clearButton=createButton("Clear Drawing");
   clearButton.position(570,430);
   clearButton.size(120,30);
   clearButton.mousePressed(clearDrawing);

}
var databaseDrawing=[];

function draw() {
    background(100);
   
    stroke(255)
    noFill();
    strokeWeight(6);
    

    for(var i=0;i<drawing.length;i++){
        path=drawing[i];
        beginShape();
        for(var j=0;j<path.length;j++){
            vertex(path[j].x,path[j].y);
        }
        endShape();
    }   
}

function startPath(){
    isDrawing=true;
    currentPath=[];
    drawing.push(currentPath);
}

function endPath(){
    isDrawing=false;
}

function mouseDragged(){
    if(isDrawing){
        var point={
                x:mouseX,
                y:mouseY
        }  
        currentPath.push(point);
    }

}

function saveDrawing(){
    var ref=database.ref('drawings');
    var data={
        drawing:drawing,
        name:name
    }
    ref.push(data);
}

function clearDrawing(){
    drawing=[];
}