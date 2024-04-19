 // Get a reference to the existing canvas element
 var canvasElement = document.getElementById('canvas');
 // Create a Fabric.js canvas object from the existing canvas element
 var canvas = new fabric.Canvas(canvasElement, {
     isDrawingMode: false, // Disable freehand drawing mode by default
     brushColor: '#FF0000', // Default brush color
     brushSize: 2 ,
     enableRetinaScaling: true,
     width: window.innerWidth,
     height: window.innerHeight,// Default brush size
 });
 var isDrawing = false;
 var isSquareDrawn = false; // متغير لتتبع ما إذا كان المربع قد رُسم بالفعل
 var startPosition = { x: 0, y: 0 };
 var listShape= []; // الاشكال الهندسية
 var isLocked = false;
 let countIndex = 0;
 var shape  = [ 1,2,3,4,5]; 
  // 1 مربع  
 // 2 دائرة
 // 3 مثلث
 // 4 نجمة 
 //5 text
 
 let selectedShap   = shape[0];
 
 var lock = document.getElementById('lock');
 var drawSquareButton = document.getElementById('square');
 var drawCircleButton = document.getElementById('circle');
 var drawTriangleButton = document.getElementById('triangle');
 var drawStarButton = document.getElementById('star');
 
 let addingSingleArrowLineBtnClicked = false;
 var addingSingleArrowLineBtn = document.getElementById('linearrow');
 let addingDoubleArrowLineBtnClicked = false;
 var addingDoubleArrowLineBtn = document.getElementById('linetwoarrow');
 let addingLineBtnClicked = false;
 var addingLineBtn = document.getElementById('lineshape');
 let line;
 let arrowHead1;
 let mouseDown = false;
 var eraseEnabled = false;

 var isErasing = false;
 isMouseDown = false;
 let lastMouseX, lastMouseY;
 let eraserSize = 50;


var eraserButton = document.getElementById('erasepart');

eraserButton.addEventListener('click', function () {
    overlaycolor.style.display = "none";
    overlayshape.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    overlaypdf.style.display = "none";
    isErasing = !isErasing;
    canvas.selectable =false;
    if (isErasing) {
        canvas.selection = false; 
        canvas.isDrawingMode = true;
        var eraser = new fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush = eraser;
        eraser.color = canvas.backgroundColor;
        eraser.width = 40;  
        // Disable object selection while erasing
    } else {
        canvas.selection = true; // Re-enable object selection when not erasing
    }
});



const setDrawableErasableProp = (drawable, value) => {
    canvas.get(drawable)?.set({ erasable: value });
   
  };

canvas.on('mouse:down', function (event) {
    isMouseDown = true;
});


// Function to toggle erase mode
function toggleEraseMode() {
    eraseEnabled = !eraseEnabled;
    canvas.isDrawingMode = false;
    overlaycolor.style.display = "none";
    overlayshape.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    overlaypdf.style.display = "none";
    isSquareDrawn = true;
    if (eraseEnabled) {
        isErasing = false;
        canvas.selection = false; // Disable object selection
        canvas.forEachObject(function (obj) {
            obj.selection = false; // Disable selection for all objects
        });
    } 
    // Attach a click event listener to the canvas
canvas.on('mouse:move', function (event) {
    if(isMouseDown){
    if (eraseEnabled && event.target) {
        canvas.remove(event.target); // Remove the clicked object
    }
    if(isErasing){
        eraseEnabled = false;
        const { offsetX, offsetY } = event.e;
        lastMouseX = offsetX;
        lastMouseY = offsetY;
    }
}
});
}

// Attach a click event listener to the erase button
var eraseButton = document.getElementById('eraseall');
eraseButton.addEventListener('click', toggleEraseMode);

 var overlayshape = document.getElementById("toolbarshape");
 var overlaycolor = document.getElementById("toolbarcolor");
 var overlaytext = document.getElementById("toolbartext");
 var overlayfile = document.getElementById("toolbarfile");
 var overlaypdf = document.getElementById("toolbarpdf");
 var overlayexcel = document.getElementById("toolbarexcel");

 var boxcolor = document.getElementById("boxcolor");
 // Function to update brush color
 function updateBrushColor(color) {
     canvas.freeDrawingBrush.color = color;
 }

 // Function to update brush size
 function updateBrushSize() {
     var brushSize = document.getElementById('brushSize');
     canvas.freeDrawingBrush.width = parseInt(brushSize.value, 10);
 }
 var color = '#FF0000' ;
  // Add event listeners to color circles
  var colorCircles = document.querySelectorAll('.color-circle');
 colorCircles.forEach(function (circle) {
     circle.addEventListener('click', function () {
       color = circle.style.backgroundColor
         colorCircles.forEach(function (c) {
            c.style.border = 'none';
        });
          // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

// التحقق من أن النص المحدد هو نص
if (activeObject && activeObject.type === 'rect' || 
activeObject && activeObject.type === 'triangle' || 
activeObject && activeObject.type === 'circle' ||
activeObject && activeObject.type === 'polygon'
) {
  // تحديث حجم الخط للنص المحدد
  activeObject.set({ fill: color});
  canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
}
    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === 'textbox') {
      // تحديث حجم الخط للنص المحدد
      activeObject.set({ fill: color });
      canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
        canvas.isDrawingMode = true;
        eraseEnabled = false;
        circle.style.border = '2px solid black';
        updateBrushColor(color);
        //  console.log(color);
         
     });
 });

 // Add event listener to brush size input
 document.getElementById('brushSize').addEventListener('input', function () {
     updateBrushSize();
 });

 let temporaryDrawingEnabled = false;

 // Add an event listener to toggle drawing mode
 document.getElementById('pencil').addEventListener('click', function () {
    temporaryDrawingEnabled = false;
     overlaycolor.style.display = "block";
     overlayshape.style.display = "none";
     overlaytext.style.display = "none";
     overlayfile.style.display = "none";
     overlaypdf.style.display = "none";
     overlayexcel.style.display = "none";
     canvas.isDrawingMode = true;
     isErasing = false; // Always switch to drawing mode when clicking the "Pen" button
     canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
     isSquareDrawn = true;
     eraseEnabled = false;
     addingSingleArrowLineBtnClicked = false;
     addingLineBtnClicked = false;
     canvas.renderAll(); // Redraw the canvas
 });
 var penciltime = document.getElementById('penciltime');
 penciltime.addEventListener('click', function () {
    temporaryDrawingEnabled = !temporaryDrawingEnabled;
    if (temporaryDrawingEnabled) {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        isErasing = false; 
        isSquareDrawn = true;
        eraseEnabled = false;
    }else{
        canvas.isDrawingMode = false;  
    }
        // Set drawing properties
        canvas.freeDrawingBrush.width = parseInt(brushSize.value, 10);
        canvas.freeDrawingBrush.color = color;
    
        let requestId;
        // Function to clear the canvas with a slow fade out animation
        function clearCanvas(objjj) {
           
            let opacity = 1;
         
    const initialOpacity = objjj.opacity;
    
    // Use Fabric.js animate method to create the fading animation
    objjj.animate('opacity', 0, {
        duration: 2000, // Animation duration in milliseconds
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
            // The animation is complete, you can remove the object from the canvas if needed
            canvas.remove(objjj);
        }
    });

            
        }
        canvas.on('path:created', function (event) {
            // The event object contains the drawn path
            const path = event.path;
            if (temporaryDrawingEnabled) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(clearCanvas(path), 2000);
                }
        
        });
        
    
        // Add event listener to trigger clearCanvas after 3 seconds of inactivity
        let timeoutId;
    
   
});



  // Add an event listener to toggle object selection mode
  document.getElementById('select').addEventListener('click', function () {
    document.getElementById("toolbarshape").style.display = "none";
    document.getElementById("toolbarcolor").style.display = "none";
    document.getElementById("toolbartext").style.display = "none";
    document.getElementById("toolbarfile").style.display = "none";
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    isErasing = false;
    if(isLocked){
        canvas.selection = false;
        objectSelectabilty(false);
    }else{
        canvas.selection = true;
        objectSelectabilty(true);
    }
    eraseEnabled = false;
    addingSingleArrowLineBtnClicked = false;
    addingLineBtnClicked = false;
    canvas.renderAll(); // Redraw the canvas
});

document.getElementById('image').addEventListener('click', function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    overlaypdf.style.display = "none";
    overlayexcel.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById('imageUploadInput').click();
});

// استمع لتغييرات اختيار ملف الصورة
document.getElementById('imageUploadInput').addEventListener('change', function (event) {
    canvas.isDrawingMode =false;
    isSquareDrawn = true;
    eraseEnabled = false;
    isErasing = false;
    temporaryDrawingEnabled = false;
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // قم بإنشاء صورة Fabric.js وأضفها إلى الكانفاس
            fabric.Image.fromURL(e.target.result, function (img) {
                img.set({
                    left: 100, // تعيين موقع الصورة على الكانفاس
                    top: 100,
                    scaleX: 0.5, // تعيين مقياس الصورة
                    scaleY: 0.5,
                });
                canvas.add(img);
            });
        };
        reader.readAsDataURL(file);
    }
});


    canvas.on('object:added',function(){
        if(!isRedoing){
          h = [];
        }
        isRedoing = false;
      });
      
      var isRedoing = false;
      var h = [];
      function undo(){
        if(canvas._objects.length>0){
         h.push(canvas._objects.pop());
         canvas.renderAll();
        }
      }
      function redo(){
        
        if(h.length>0){
          isRedoing = true;
         canvas.add(h.pop());
        }
      }

    // // Bind the redo function to a button
    // document.getElementById('addRedo').addEventListener('click', redo);
   
    
document.getElementById('addUndo').addEventListener('click', undo);
document.getElementById('addRedo').addEventListener('click', redo);
    





var shapes = document.getElementById("shape");

var files = document.getElementById("file");

files.onclick = function() {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "block";
}

shapes.onclick = function() {
    overlayshape.style.display = "block";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
}




function activateAddingLine(){
    overlaytext.style.display = "none";
    overlayshape.style.display = "block";
    overlaycolor.style.display = "none";
    overlayfile.style.display = "none";
    canvas.isDrawingMode = false;
    temporaryDrawingEnabled = false;
    isSquareDrawn = true;
    addingSingleArrowLineBtnClicked = false;
    if(addingLineBtnClicked===false){
        addingLineBtnClicked= true;

        canvas.on({
            'mouse:down':startAddingLine,
            'mouse:move':startDrawingLine,
            'mouse:up':stopDrawingLine
        });
        canvas.selection = false;
        canvas.hoverCursor = 'auto';
        objectSelectabilty(false);
    }
}

function startAddingLine(o){
mouseDown = true;
let pointer = canvas.getPointer(o.e);
line = new fabric.Line([pointer.x,pointer.y,pointer.x,pointer.y],{
id:'linearrow',
stroke:color,
strokeWidth:3,
selectable:false,
hasControls:false
});

canvas.add(line);
canvas.requestRenderAll();
}
function startDrawingLine(o){
if(mouseDown===true){
    let pointer = canvas.getPointer(o.e);
    line.set({
        x2:pointer.x,
        y2:pointer.y,
    });


   line.setCoords();
   canvas.requestRenderAll();
}
}

function stopDrawingLine(){
    if (mouseDown) {
        mouseDown = false;

        canvas.off({
            'mouse:down':startAddingLine,
            'mouse:move':startDrawingLine,
            'mouse:up':stopDrawingLine
        });
        // Reset the drawing mode flag
        addingLineBtnClicked = false;
        canvas.selection = true;
        canvas.hoverCursor = 'auto';
        objectSelectabilty(true);
        canvas.requestRenderAll();
    }
}
addingLineBtn.addEventListener('click', activateAddingLine);


function objectSelectabilty(value){
    canvas.getObjects().forEach(o=>{
            o.set({
             selectable:value
            });
          
    });
}

function activateAddingSingleArrowLine(){
    overlaytext.style.display = "none";
    overlayshape.style.display = "block";
    overlaycolor.style.display = "none";
    overlayfile.style.display = "none";
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    addingLineBtnClicked = false;
    if(addingSingleArrowLineBtnClicked===false){
        addingSingleArrowLineBtnClicked= true;

        canvas.on({
            'mouse:down':startAddingSingleArrowLine,
            'mouse:move':startDrawingSingleArrowLine,
            'mouse:up':stopDrawingSingleArrowLine
        });
        canvas.selection = false;
        canvas.hoverCursor = 'auto';
        objectSelectabilty(false);
    }
}

function startAddingSingleArrowLine(o){
mouseDown = true;
let pointer = canvas.getPointer(o.e);
line = new fabric.Line([pointer.x,pointer.y,pointer.x,pointer.y],{
id:'linearrow',
stroke:color,
strokeWidth:3,
selectable:false,
hasControls:false
});
arrowHead1 = new fabric.Polygon([
{x:0,y:0},
{x:-20,y:-10},
{x:-20,y:10}
],{
  id:'arrow-head',
  stroke:color,
  strokeWidth:3,
  fill:color,
  selectable:false,
  hasControls:false,
  top:pointer.y,
  left:pointer.x,
  originX:'center',
  originY:'center',
});

canvas.add(line,arrowHead1);
canvas.requestRenderAll();
}
function startDrawingSingleArrowLine(o){
if(mouseDown===true){
    let pointer = canvas.getPointer(o.e);
    line.set({
        x2:pointer.x,
        y2:pointer.y,
    });
    arrowHead1.set({
        left:pointer.x,
        top:pointer.y
    });
    let x1 = line.x1;
    let y1 = line.y1;
    let x2 = pointer.x;
    let y2 = pointer.y;

    let verticalHeight = Math.abs(y2-y1);
    let horizontalWidth = Math.abs(x2-x1);

    let tanRatio = verticalHeight/horizontalWidth;
    let basicAngle = Math.atan(tanRatio)*180/Math.PI;

    if(x2>x1){
        if(y2<y1){
            arrowHead1.set({
                angle:-basicAngle
            });
        }else if(y2===y1){
            arrowHead1.set({
                angle:0
            });
        }
        else if(y2>y1){
            arrowHead1.set({
                angle:basicAngle
            });
        }
    }else if(x2<x1){
         if(y2>y1){
            arrowHead1.set({
                angle:180-basicAngle
            });
         }else if(y2===y1){
            arrowHead1.set({
                angle:180
            });
         }else if(y2<y1){
            arrowHead1.set({
                angle:180+basicAngle
            });
         }
    }
   line.setCoords();
   arrowHead1.setCoords();
   canvas.requestRenderAll();
}
}


function stopDrawingSingleArrowLine(){
    if (mouseDown) {
        mouseDown = false;

        canvas.off({
            'mouse:down':startAddingSingleArrowLine,
            'mouse:move':startDrawingSingleArrowLine,
            'mouse:up':stopDrawingSingleArrowLine
        });
          let group = new fabric.Group([line, arrowHead1], {
            id: 'arrowGroup',
            selectable: true,
            hasControls: true
        });
    
        canvas.add(group);
        // Reset the drawing mode flag
        addingSingleArrowLineBtnClicked = false;
        canvas.selection = true;
        canvas.hoverCursor = 'auto';
        objectSelectabilty(false);
        canvas.requestRenderAll();
    }
}
addingSingleArrowLineBtn.addEventListener('click', activateAddingSingleArrowLine);

function activateAddingDoubleArrowLine(){
    overlaytext.style.display = "none";
    overlayshape.style.display = "block";
    overlaycolor.style.display = "none";
    overlayfile.style.display = "none";
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    addingLineBtnClicked = false;
    temporaryDrawingEnabled = false;
    if(addingDoubleArrowLineBtnClicked===false){
        addingDoubleArrowLineBtnClicked= true;

        canvas.on({
            'mouse:down':startAddingDoubleArrowLine,
            'mouse:move':startDrawingDoubleArrowLine,
            'mouse:up':stopDrawingDoubleArrowLine
        });
        canvas.selection = false;
        canvas.hoverCursor = 'auto';
        objectSelectabilty(false);
    }
}

function startAddingDoubleArrowLine(o){
mouseDown = true;
let pointer = canvas.getPointer(o.e);
line = new fabric.Line([pointer.x,pointer.y,pointer.x,pointer.y],{
id:'linearrow',
stroke:color,
strokeWidth:3,
selectable:false,
hasControls:false
});
arrowHead1 = new fabric.Polygon([
{x:0,y:0},
{x:-20,y:-10},
{x:-20,y:10}
],{
  id:'arrow-head',
  stroke:color,
  strokeWidth:3,
  fill:color,
  selectable:false,
  hasControls:false,
  top:pointer.y,
  left:pointer.x,
  originX:'center',
  originY:'center',
});
arrowHead2 = new fabric.Polygon([
    {x:0,y:0},
    {x:-20,y:-10},
    {x:-20,y:10}
    ],{
      id:'arrow-head',
      stroke:color,
      strokeWidth:3,
      fill:color,
      selectable:false,
      hasControls:false,
      top:pointer.y,
      left:pointer.x,
      originX:'center',
      originY:'center',
    })
canvas.add(line,arrowHead1,arrowHead2);
canvas.requestRenderAll();
}
function startDrawingDoubleArrowLine(o){
if(mouseDown===true){
    let pointer = canvas.getPointer(o.e);
    line.set({
        x2:pointer.x,
        y2:pointer.y,
    });
    arrowHead1.set({
        left:pointer.x,
        top:pointer.y
    });
    arrowHead2.set({
        left:pointer.x,
        top:pointer.y
    });
    let x1 = line.x1;
    let y1 = line.y1;
    let x2 = pointer.x;
    let y2 = pointer.y;

    let verticalHeight = Math.abs(y2-y1);
    let horizontalWidth = Math.abs(x2-x1);

    let tanRatio = verticalHeight/horizontalWidth;
    let basicAngle = Math.atan(tanRatio)*180/Math.PI;

    if(x2>x1){
        if(y2<y1){
            arrowHead1.set({
                angle:-basicAngle
            });
            arrowHead2.set({
                angle:-basicAngle
            });
        }else if(y2===y1){
            arrowHead1.set({
                angle:0
            });
            arrowHead2.set({
                angle:0
            });
        }
        else if(y2>y1){
            arrowHead1.set({
                angle:basicAngle
            });
            arrowHead2.set({
                angle:basicAngle
            });
        }
    }else if(x2<x1){
         if(y2>y1){
            arrowHead1.set({
                angle:180-basicAngle
            });
            arrowHead2.set({
                angle:180-basicAngle
            });
         }else if(y2===y1){
            arrowHead1.set({
                angle:180
            });
            arrowHead2.set({
                angle:180
            });
         }else if(y2<y1){
            arrowHead1.set({
                angle:180+basicAngle
            });
            arrowHead2.set({
                angle:180+basicAngle
            });
         }
    }
   line.setCoords();
   arrowHead1.setCoords();
   arrowHead2.setCoords();
   canvas.requestRenderAll();
}
}


function stopDrawingDoubleArrowLine(){
    if (mouseDown) {
        mouseDown = false;

        canvas.off({
            'mouse:down':startAddingDoubleArrowLine,
            'mouse:move':startDrawingDoubleArrowLine,
            'mouse:up':stopDrawingDoubleArrowLine
        });
        // Reset the drawing mode flag
        addingDoubleArrowLineBtnClicked = false;
        canvas.selection = true;
        canvas.hoverCursor = 'auto';
        objectSelectabilty(false);
        canvas.requestRenderAll();
    }
}
addingDoubleArrowLineBtn.addEventListener('click', activateAddingDoubleArrowLine);
var text = document.getElementById('text');
// var fontSizeInput = document.getElementById('fontSizeInput');
// var fontFamilySelect = document.getElementById('fontFamilySelect');


var lockimage = document.getElementById('lockimage');


canvas.on('mouse:down', function (event) {
    if (!isLocked && !isSquareDrawn) { // تحقق من أن السبورة غير مقفلة وأن المربع لم يُرَسَم بالفعل
        isDrawing = true;
        startPosition = canvas.getPointer(event.e);
    }
    // canvas.remove(listSquare[countIndex]);
});

canvas.on('mouse:up', function () {
    isDrawing = false;
    if (listShape[countIndex]) {
        isSquareDrawn = true;
    }
});
function drawSquare(){
canvas.on('mouse:move', function (event) {
    if (isDrawing && !isLocked && !isSquareDrawn) { // تحقق من أن السبورة غير مقفلة وأن المربع لم يُرَسَم بالفعل
        var currentPosition = canvas.getPointer(event.e);
        var width = currentPosition.x - startPosition.x;
        var height = currentPosition.y - startPosition.y;
        switch(selectedShap){
            case 1 :
                 if (!listShape[countIndex]){
             listShape[countIndex] = new fabric.Rect({
                left: startPosition.x,
                top: startPosition.y,
                width: 200,
                height: 200,
                fill: color,
            });
            canvas.add( listShape[countIndex]);
        }else {
            listShape[countIndex].set({ width: 200, height: 200 });
            canvas.renderAll();
            console.log(countIndex + "test 2");
        }break;
            case 2:
            if (!listShape[countIndex]){
                listShape[countIndex] = new fabric.Circle({
                    left: startPosition.x,
                    top: startPosition.y,
                    radius: height/2,
                    fill: color,
                
                });
                canvas.add(listShape[countIndex]);
            }else {
                listShape[countIndex].set({  radius : height/2});
                canvas.renderAll();
                console.log(countIndex + "test 2");
            }break;
            case 3:
            if (!listShape[countIndex]){
                listShape[countIndex] = new fabric.Triangle({
                    left: startPosition.x,
                    top: startPosition.y,
                    width: 200,
                    height: 300,
                    fill: color,
                
                });
                canvas.add(listShape[countIndex]);
            }else {
                listShape[countIndex].set({width: 200, height: 300});
                canvas.renderAll();
                console.log(countIndex + "test 2");
            }break;
            case 4:
            if (!listShape[countIndex]){
                var starPoints = [
                    { x: 100, y: 10 },    // Top point
                    { x: 125, y: 60 },    // Upper-right point
                    { x: 200, y: 70 },    // Right point
                    { x: 140, y: 115 },   // Lower-right point
                    { x: 160, y: 190 },   // Bottom point
                    { x: 100, y: 150 },   // Bottom-left point
                    { x: 40, y: 190 },    // Lower-left point
                    { x: 60, y: 115 },    // Lower-right point
                    { x: 0, y: 70 },      // Left point
                    { x: 75, y: 60 }      // Upper-left point
                ];
                listShape[countIndex] = new fabric.Polygon(starPoints, {
                    left: startPosition.x,
                    top: startPosition.y,
                    fill: color,
                });
                canvas.add(listShape[countIndex]);
            }else {
                listShape[countIndex].set({fill: color});
                canvas.renderAll();
                console.log(countIndex + "test 2");
            }break;
            case 5:
            if (!listShape[countIndex]){
                listShape[countIndex] = new fabric.Textbox('', {
                    left: startPosition.x,
                    top: startPosition.y,
                    fontSize: 20,
                    fontFamily: 'Arial',
                    fill: color,
                  });
                canvas.add(listShape[countIndex]);
            }else {
                listShape[countIndex].set({text:'اكتب هنا'});
                canvas.renderAll();
                console.log(countIndex + "textt 2");
            }break;
        }

       
        
    }

 
});

}
var minusButton = document.querySelector('.minus');
var plusButton = document.querySelector('.plus');
var normalButton = document.getElementById('normal');
var boldButton = document.getElementById('bold');
var italicButton = document.getElementById('italic');
var underlineButton = document.getElementById('underline');
var counterInput = document.getElementById('counterInput');


// Add an event listener for the minus button
minusButton.addEventListener('click', function() {
    var currentValue = parseInt(counterInput.value, 10);
    if (currentValue > 1) {
        counterInput.value = currentValue - 1;
    }
     // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === 'textbox') {
      // تحديث حجم الخط للنص المحدد
      activeObject.set({ fontSize: currentValue });
      canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});

// Add an event listener for the plus button
plusButton.addEventListener('click', function() {
    var currentValue = parseInt(counterInput.value, 10);
    counterInput.value = currentValue + 1;
      // حصول على النص المحدد حالياً
      var activeObject = canvas.getActiveObject();

      // التحقق من أن النص المحدد هو نص
      if (activeObject && activeObject.type === 'textbox') {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fontSize: currentValue });
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
      }
});
boldButton.addEventListener('click', function() {
    
    
      // حصول على النص المحدد حالياً
      var activeObject = canvas.getActiveObject();
      // التحقق من أن النص المحدد هو نص
      if (activeObject && activeObject.type === 'textbox') {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fontWeight: activeObject.fontWeight === 'bold' ? 'normal' : 'bold' });
         // Apply italic style if it's already italic
         if (activeObject.fontStyle === 'italic') {
            activeObject.set({ fontStyle: 'italic' });
        }
        if (activeObject.underline === true) {
            activeObject.set({ underline: true });
        }
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
      }
});

normalButton.addEventListener('click', function() {
   
      // حصول على النص المحدد حالياً
      var activeObject = canvas.getActiveObject();

      // التحقق من أن النص المحدد هو نص
      if (activeObject && activeObject.type === 'textbox') {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fontWeight: activeObject.fontWeight === 'normal' ? 'normal' : 'normal' });
        if (activeObject.fontStyle === 'italic') {
            activeObject.set({ fontStyle: 'italic' });
        }
        if (activeObject.fontWeight === 'bold') {
            activeObject.set({ fontWeight: 'bold' });
        }
        if (activeObject.underline === true) {
            activeObject.set({ underline: true });
        }
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
      }
});

italicButton.addEventListener('click', function() {
    // Get the currently selected text object
    var activeObject = canvas.getActiveObject();

    // Check if the selected object is a text object
    if (activeObject && activeObject.type === 'textbox') {
        // Toggle between italic and not italic
        activeObject.set({ fontStyle: activeObject.fontStyle === 'italic' ? 'normal' : 'italic' });

        // Apply bold style if it's already bold
        if (activeObject.fontWeight === 'bold') {
            activeObject.set({ fontWeight: 'bold' });
        }
        if (activeObject.underline === true) {
            activeObject.set({ underline: true });
        }

        canvas.renderAll(); // Update the canvas to reflect the changes
    }
});

underlineButton.addEventListener('click', function() {
      // حصول على النص المحدد حالياً
      var activeObject = canvas.getActiveObject();

      // التحقق من أن النص المحدد هو نص
      if (activeObject && activeObject.type === 'textbox') {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ underline: activeObject.underline === true ? false : true });
        if (activeObject.fontWeight === 'bold') {
            activeObject.set({ fontWeight: 'bold' });
        }
        if (activeObject.fontStyle === 'italic') {
            activeObject.set({ fontStyle: 'italic' });
        }

        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
      }
});



   // إضافة حدث عند تغيير حجم الخط
   document.getElementById('fontFamilySelect').addEventListener('input', function () {
    var newFontFamily = this.value;

    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === 'textbox') {
      // تحديث حجم الخط للنص المحدد
      activeObject.set({ fontFamily: newFontFamily });
      canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});

text.addEventListener('click', function () {
    overlaytext.style.display = "block";
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlayfile.style.display = "none";
    // canvas.isDrawingMode = false;
    temporaryDrawingEnabled = false;
    selectedShap =5;
    isSquareDrawn = false;
    eraseEnabled = false;
    countIndex ++;
    drawSquare(5);
});

drawStarButton.addEventListener('click', function () {
    canvas.isDrawingMode = false;
    selectedShap =4;
    isSquareDrawn = false;
    eraseEnabled = false;
    temporaryDrawingEnabled = false;
    countIndex ++;
    drawSquare(4);
});

drawTriangleButton.addEventListener('click', function () {
    canvas.isDrawingMode = false;
    selectedShap =3;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex ++;
    drawSquare(3);
});

drawCircleButton.addEventListener('click', function () {
    canvas.isDrawingMode = false;
    selectedShap =2;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex ++;
    drawSquare(2);
});
drawSquareButton.addEventListener('click', function () {
    canvas.isDrawingMode = false;
    selectedShap = 1;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex ++;
    drawSquare(1);
});

lock.addEventListener('click', function () {
        isLocked = !isLocked;
        lockimage.src  = isLocked ? 'images/lock.png' : 'images/unlock.png';

        canvas.forEachObject(function (object) {
            object.selectable = !isLocked;
            if(isLocked){
                canvas.selection = false;
                objectSelectabilty(false);
            }else{
                canvas.selection = true;
                objectSelectabilty(true);
            }
            object.evented = !isLocked;
        });
       
        canvas.renderAll();
});

var zoomLevel = 1.0; // 100%

// Function to zoom in
function zoomIn() {
    zoomLevel += 0.1; // Increase zoom level by 10%
    canvas.setZoom(zoomLevel);
    canvas.renderAll(); // Redraw the canvas
}

// Add event listener to the zoom-in button
var zoomInButton = document.getElementById('zoomIn');
zoomInButton.addEventListener('click', zoomIn);
       
// Initial zoom level
var zoomLevel = 1.0; // 100%

// Function to zoom out
function zoomOut() {
    zoomLevel -= 0.1; // Decrease zoom level by 10%
    if (zoomLevel < 0.1) {
        zoomLevel = 0.1; // Set a minimum zoom level
    }
    canvas.setZoom(zoomLevel);
    canvas.renderAll(); // Redraw the canvas
}

// Add event listener to the Zoom Out button
var zoomOutButton = document.getElementById('zoomOut');
zoomOutButton.addEventListener('click', zoomOut);






let mediaRecorder;
let recordedChunks = [];
let isRecordingPaused = false;

const startRecordingButton = document.getElementById('startRecording');
const stopRecordingButton = document.getElementById('stopRecording');
const pauseResumeRecordingButton = document.getElementById('pauseRecording');
const stopVideo = document.getElementById('stopVideo');
const addVideo = document.getElementById('addVideo');
const pauseVideo = document.getElementById('pauseVideo');
const filenameInput = document.getElementById('filenameInput');
const confirmFilenameButton = document.getElementById('confirmFilename');
const dialog = document.getElementById('dialog');

// Audio stream
let audioStream;

pauseResumeRecordingButton.addEventListener('click', () => {
    if (isRecordingPaused) {
        // استئناف التسجيل
        mediaRecorder.resume();
        pauseResumeRecordingButton.src = 'images/pausevideo.svg';
    } else {
        // إيقاف مؤقت للتسجيل
        mediaRecorder.pause();
        pauseResumeRecordingButton.src = 'images/play.svg';
    }
    isRecordingPaused = !isRecordingPaused;
});


startRecordingButton.addEventListener('click', () => {
    
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = false;

    recordedChunks = [];

    navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((videoStream) => {
        navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((audioStream) => {
            audioStream.getTracks().forEach((track) => {
                videoStream.addTrack(track);
            });
        mediaRecorder = new MediaRecorder(videoStream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        stopVideo.style.display = "block";
        addVideo.style.display = "none";
        pauseVideo.style.display = "block";
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });

            // عرض مربع الحوار لتسمية الفيديو بعد الضغط على زر التحميل
            dialog.style.display = 'block';

            confirmFilenameButton.addEventListener('click', () => {
                const filename = filenameInput.value || 'recorded-video';

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${filename}.webm`;

                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                // إخفاء مربع الحوار بعد التحميل
                dialog.style.display = 'none';


            });
        };

        mediaRecorder.start();
    }).catch((audioError) => {
            console.error('Error accessing audio:', audioError);
        });
    }).catch((error) => {
        console.error('حدث خطأ في الحصول على شاشة العرض:', error);
    });
});

stopRecordingButton.addEventListener('click', () => {
    stopVideo.style.display = "none";
    addVideo.style.display = "block";
    pauseVideo.style.display = "none";
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;

    mediaRecorder.stop();
});

cancelRecordingButton.addEventListener('click', () => {
    isRecording = false; // إلغاء التسجيل
    if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    dialog.style.display = 'none'; // إخفاء مربع الحوار
});

function clearCanvas() {
    canvas.clear();
}

var exitButton = document.getElementById('addexist');
var customAlert = document.getElementById('customAlert');
var confirmExitButton = document.getElementById('confirmExit');
var cancelExitButton = document.getElementById('cancelExit');
var grayBackground = document.getElementById('grayBackground');
var linkModal = document.getElementById('linkModal');

exitButton.addEventListener('click', function () {
    customAlert.style.display = 'block';
    grayBackground.style.display = 'block'; // عرض الخلفية الرمادية
});

function showModal(){
    linkModal.style.display = 'block';
    grayBackground.style.display = 'block';
    grayBackground.style.zIndex = 0;
}

function closeModal() {
    linkModal.style.display = 'none';
    grayBackground.style.display = 'none';
}
function addLink() {
    var linkTitle = document.getElementById('linkTitle').value;
    var linkURL = document.getElementById('linkURL').value;
    isSquareDrawn = true;
    canvas.isDrawingMode = false;
    var linkText = new fabric.Text(linkTitle, {
        left: 200,
        top: 300,
        fontSize: 25,
        fontWeight:'bold',
        fill: '#008CF7',
        underline: true,
    });

    linkText.on('mousedown', function (event) {
        canvas.selection = true;
        if (event.e.detail === 2) {
        window.open(linkURL, '_blank');
        // linkText.lockMovementX = true; // Lock horizontal movement
        // linkText.lockMovementY = true; // Lock vertical movement
    }
    });
        //   // حصول على النص المحدد حالياً
        //   var activeObject = canvas.getActiveObject();

        //   // التحقق من أن النص المحدد هو نص
        //   if (activeObject && activeObject.type === 'text') {
        //     // تحديث حجم الخط للنص المحدد
        //     activeObject.set({ lockMovementX: false,lockMovementY:false});
        //     canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
        //   }

    canvas.add(linkText);
    closeModal();
}


confirmExitButton.addEventListener('click', function () {
    customAlert.style.display = 'none';
    clearCanvas();
    window.location.href = 'srar.html';
});

cancelExitButton.addEventListener('click', function () {
    customAlert.style.display = 'none';
    grayBackground.style.display = 'none'; // اخفاء الخلفية الرمادية
});

// Function to clear the canvas
function clearCanvas() {
    canvas.clear();
}

var pdfInput = document.getElementById('pdfInput');
var pagePreviews = document.getElementById('pagePreviews');
var addPageButton = document.getElementById('addPageButton');
var pdfDocument = null;
var selectedPage = [];

const excelFileInput = document.getElementById('excelFileInput');
const renderButton = document.getElementById('renderButton');
const excelSheetsContainer = document.getElementById('excelSheetsContainer');


document.getElementById('excel').addEventListener('click', function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById('excelFileInput').click();
});

let selectedSheetNames = []; // Store selected sheet names
let renderedSheets = []; // Store references to rendered sheets

// Event listener for file input change
excelFileInput.addEventListener('change', handleFileSelect);

// Event listener for render button click
renderButton.addEventListener('click', renderExcelToCanvas);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            // Display available sheet names to the user
            const sheetNames = workbook.SheetNames;
            // Clear previous sheets
            excelSheetsContainer.innerHTML = '';
            sheetNames.forEach((sheetName) => {
                // Create a div for each sheet
                const sheetDiv = document.createElement('div');
                sheetDiv.classList.add('sheet');
                sheetDiv.textContent = sheetName;
                sheetDiv.setAttribute('data-sheet', sheetName); // Add data-sheet attribute
                sheetDiv.addEventListener('click', () => toggleSheetSelection(sheetName));
                excelSheetsContainer.appendChild(sheetDiv);
                overlayexcel.style.display = "block";
                overlaypdf.style.display = "none";
            });
            // Store the workbook for later use
            excelData = { workbook };
        };
        reader.readAsArrayBuffer(file);
        
    }
}

function toggleSheetSelection(sheetName) {
    const index = selectedSheetNames.indexOf(sheetName);
    if (index === -1) {
        selectedSheetNames.push(sheetName);
    } else {
        selectedSheetNames.splice(index, 1);
    }

    // Update the style of the clicked sheet div
    const sheetDiv = document.querySelector(`.sheet[data-sheet="${sheetName}"]`);
    sheetDiv.classList.toggle('selected', index === -1);

    // Find the corresponding sheet on the canvas
    const selectedSheet = renderedSheets.find((sheet) => sheet.name === sheetName);
    if (selectedSheet) {
        // If the sheet is selected, add borders
        selectedSheet.set({
            hasBorders: index === -1,
            borderColor: 'blue', // You can customize the border color here
        });
        canvas.renderAll();
    }
}

function renderExcelToCanvas() {
    if (!excelData) {
        alert('Please select an Excel file and at least one sheet.');
        return;
    }
    // Clear the canvas
    // canvas.clear();
    renderedSheets = []; // Clear the rendered sheets array
    selectedSheetNames.forEach((sheetName) => {
        const sheet = excelData.workbook.Sheets[sheetName];
        if (sheet) {
            renderSheetToCanvas(sheet, sheetName);
        }
    });
}

function renderSheetToCanvas(sheet, sheetName) {
    // Convert sheet data to an array of objects
    const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Define cell dimensions and styling
    const cellWidth = 100;
    const cellHeight = 50;
    const cellFontSize = 18;
    const cellFillColor = 'white';
    const cellStrokeColor = 'black';

    // Create a new Fabric.js group for this sheet
    const sheetGroup = new fabric.Group([], {
        left:100,
        top:100,
        selectable: true,
        hasControls: true,
        hasBorders: false,
        hoverCursor: 'move',
        name: sheetName, // Set a unique name for this sheet group
    });

    // Render each cell content on the sheet group
    sheetData.forEach((row, rowIndex) => {
        row.forEach((cellData, colIndex) => {
            // Calculate cell position
            const left = colIndex * cellWidth;
            const top = rowIndex * cellHeight;

            // Create cell rectangle
            const cell = new fabric.Rect({
                left,
                top,
                width: cellWidth,
                height: cellHeight,
                fill: cellFillColor,
                stroke: cellStrokeColor,
                strokeWidth: 1,
                selectable: false, // Cells should not be selectable individually
            });

            // Create cell text
            const text = new fabric.Text(cellData.toString(), {
                left: left + cellWidth / 2,
                top: top + cellHeight / 2,
                fontSize: cellFontSize,
                fill: 'black',
                originX: 'center',
                originY: 'center',
                selectable: false, // Text should not be selectable individually
            });

            // Add cell and text to the sheet group
            sheetGroup.addWithUpdate(cell);
            sheetGroup.addWithUpdate(text);
        });
    });

    // Add the sheet group to the canvas and store it in the renderedSheets array
    canvas.add(sheetGroup);
    renderedSheets.push(sheetGroup);
}

// Enable object selection and drag on the canvas
canvas.selection = true;


let excelData = null; // Store workbook and sheet selector for later use

// Function to create a page preview
function createPagePreview(pageNumber) {

    // Create the page preview div
    var pagePreview = document.createElement('div');
    pagePreview.classList.add('page-preview');
    pagePreview.dataset.pageNumber = pageNumber;
    // Create a canvas for rendering the PDF page
    var canvasPreview = document.createElement('canvas');
    var contextPreview = canvasPreview.getContext('2d');
   

     // Create the page number element
     var pageNumberElement = document.createElement('div');
     pageNumberElement.classList.add('page-number');
     pageNumberElement.textContent = pageNumber;
     pagePreview.appendChild(pageNumberElement);


  // Get the selected page from the PDF
  pdfDocument.getPage(pageNumber).then(function (page) {
    // Set the scale for rendering
    var scale = 0.37; // Adjust the scale as needed
    var viewport = page.getViewport({ scale: scale });

    canvasPreview.width = viewport.width; // Set the width of the preview
    canvasPreview.height = viewport.height; // Set the height of the preview
    // Render the PDF page on the canvas
    var renderContext = {
        canvasContext: contextPreview,
        viewport: viewport,
    };

    page.render(renderContext).promise.then(function () {
        // Add the canvas to the page preview container
        pagePreview.appendChild(canvasPreview);

        // Add event listener to load the page when the thumbnail is clicked
        pagePreview.addEventListener('click', function () {
            // Handle click event to load the selected page
            loadPage(pageNumber);
        });
    });
});

    
    // Add click event to select the page
    pagePreview.addEventListener('click', function () {
        // Remove the 'selected' class from other previews
        var previews = pagePreviews.getElementsByClassName('page-preview');
        var pageNumber = parseInt(this.dataset.pageNumber, 10);
        var index = selectedPage.indexOf(pageNumber);
        if (index === -1) {
            // Page not selected, so add it to the array
            selectedPage.push(pageNumber);
            this.classList.add('selected');
        } else {
            // Page already selected, so remove it from the array
            selectedPage.splice(index, 1);
            this.classList.remove('selected');
        }

        // Enable the "Add Page" button if any pages are selected
        if (selectedPage.length > 0) {
            addPageButton.removeAttribute('disabled');
        } else {
            addPageButton.setAttribute('disabled', 'disabled');
        }
       
    });
    return pagePreview;
}


// Function to load and display a specific page
function loadPage(pageNumber) {
    if (pdfDocument) {
        // Get the selected page from the PDF
        pdfDocument.getPage(pageNumber).then(function (page) {
            // Add your logic to handle the loaded page, e.g., display it on the canvas
            console.log('Loaded page:', page);
        });
    }
}

document.getElementById('pdf').addEventListener('click', function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById('pdfInput').click();
});
// Event listener for PDF input change
pdfInput.addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (file) {
        // Load the PDF using PDF.js
        pdfjsLib.getDocument(URL.createObjectURL(file)).promise.then(function (pdf) {
            pdfDocument = pdf;
            // Clear previous page previews
            pagePreviews.innerHTML = '';
            var rowContainer = document.createElement('div');
            rowContainer.classList.add('page-preview-container');
            for (var i = 1; i <= pdf.numPages; i++) {
                // Create a page preview and append it
                var pagePreview = createPagePreview(i);
                rowContainer.appendChild(pagePreview);
                pagePreviews.appendChild(rowContainer);
            }
            overlaypdf.style.display = "block";
            overlayexcel.style.display = "none";
        }).catch(function (error) {
            console.error('Error loading PDF:', error);
        });
    }
});

// Event listener for "Add Page" button click
addPageButton.addEventListener('click', function () {
    eraseEnabled = false;
    if (pdfDocument && selectedPage.length > 0) {
        
        // canvas.clear();

        for (var i = 0; i < selectedPage.length; i++) {
            var pageNumber = selectedPage[i];
        // Get the selected page from the PDF
        pdfDocument.getPage(pageNumber).then(function (page) {
            // Set the scale for rendering
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });

            // Create a canvas for rendering the PDF page
            var canvasPdf = document.createElement('canvas');
            var context = canvasPdf.getContext('2d');
            canvasPdf.height = viewport.height;
            canvasPdf.width = viewport.width;

            // Render the PDF page on the canvas
            var renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            page.render(renderContext).promise.then(function () {
                // Create a Fabric.js image object from the canvas
                var pdfImage = new fabric.Image(canvasPdf, {
                    left: 50,
                    top: 50,
                });

                // Add the PDF image to the Fabric.js canvas
                canvas.add(pdfImage);
                overlaypdf.style.display = "none";
                selectedPage = [];
                
            });

        });
        pdfInput.value = null;
    }
}
});

// var addNoteButton = document.getElementById('textfile');

// addNoteButton.addEventListener('click', function () {
//     // Create a background image
//     fabric.Image.fromURL('images/background.png', function(img) {
//         var desiredWidth = 300; // Set your desired width
//         var desiredHeight = 200; // Set your desired height
//         var scale = Math.min(desiredWidth / img.width, desiredHeight / img.height);

//         img.set({
//             left: 200,
//             top: 400,
//             scaleX: scale, // Scale the image based on the desired width and height
//             scaleY: scale,
//             hasControls: true,
//         });

//         // Create a text object with custom styling
//         var noteText = new fabric.Textbox('اكتب هنا', {
//             left: 200,
//             top: 440,
//             fontSize: 20,
//             fill: 'black',
//             fontFamily: 'Arial',
//             fontWeight: 'bold',
//             lineHeight: 1.2,
//             angle: 0,
//             width: 200,
//             direction: 'rtl',
//         });
//         // Add the background image to the canvas first
//         canvas.add(img);
//         canvas.add(noteText);
        
 
//         noteText.on('mousedown', function () {
//             noteText.set({ selectable: false ,hasControls: true,editable: true,});
//             canvas.renderAll();// ادخل وضع تحرير النص
//         });

//         // Make the text object selected for editing
//         canvas.setActiveObject(noteText);
//         noteText.enterEditing(); // Enter text editing mode
//     });
// });
var addNoteButton = document.getElementById('textfile');

addNoteButton.addEventListener('click', function () {
    // Create a background image
    fabric.Image.fromURL('images/background.png', function(img) {
        var desiredWidth = 300; // Set your desired width
        var desiredHeight = 200; // Set your desired height
        var scale = Math.min(desiredWidth / img.width, desiredHeight / img.height);

        img.set({
            left: 200,
            top: 400,
            scaleX: scale, // Scale the image based on the desired width and height
            scaleY: scale,
            hasControls: false,
            selectable:true,
        });

        // Create a text object with custom styling
        var noteText = new fabric.Textbox('اكتب هنا', {
            left: 200,
            top: 440,
            fontSize: 20,
            fill: 'black',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            lineHeight: 1.2,
            angle: 0,
            width: 200,
            direction: 'rtl',
        });

        // Create a group containing both the image and text
        var group = new fabric.Group([img, noteText], {
            clipTo: function (ctx) {
                ctx.rect(-img.width / 2, -img.height / 2, img.width, img.height);
            }
        });

        // Add the group to the canvas
        canvas.add(group);

        noteText.on('mousedown', function () {
            noteText.set({selectable: true, hasControls: true, editable: true });
            canvas.renderAll();
            // Make the text object selected for editing
        canvas.setActiveObject(noteText);
        noteText.enterEditing(); // Enter text editing mode // Enter text editing mode
        });

        
    });
});





// Check if there is saved canvas data in local storage
var savedCanvasData = localStorage.getItem('canvasData');

if (savedCanvasData) {
    // If data exists, load it into the canvas
    canvas.loadFromJSON(savedCanvasData, function() {
        canvas.renderAll();
    });
}

// Add an event listener to save canvas data when the page is unloaded (e.g., on refresh or close)
window.addEventListener('beforeunload', function() {
    // Serialize the canvas data to JSON and store it in local storage
    var canvasData = JSON.stringify(canvas.toJSON());
    localStorage.setItem('canvasData', canvasData);
});


const overlayaudio = document.getElementById("toolbaraudio");
const audioFileInput = document.getElementById('audioFileInput');
const audio = document.getElementById('myAudio');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const audioSource = document.getElementById('audioSource');
const seekStartButton = document.getElementById('seekStartButton');
const seekEndButton = document.getElementById('seekEndButton');
const endTime = document.getElementById('endTime');
const startTime = document.getElementById('startTime');
const sliderBar = document.querySelector('.custom-slider');
const sliderKnob = document.querySelector('.slider-knob');
const closeaudio = document.getElementById('close');
const sliderBg = document.querySelector('.slider-bg');
document.getElementById('audio').addEventListener('click', function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById('audioFileInput').click();
});
 // Initialize slider position
 let isDragging = false;

 audioFileInput.addEventListener('change', handleAudioFileSelect);
 let isDraggingaudio = false;
 let offsetX = 0;
 let offsetY = 0;
 

 overlayaudio.addEventListener('mousedown', (e) => {
    isDraggingaudio = true;
     overlayaudio.style.cursor = 'pointer';
     // حساب الإزاحة بين موقع الماوس وموقع العنصر
     offsetX = e.clientX - overlayaudio.getBoundingClientRect().left;
     offsetY = e.clientY - overlayaudio.getBoundingClientRect().top;
 
    
 });
 
 overlayaudio.addEventListener('mousemove', (e) => {
     if (isDraggingaudio) {
         // حساب الموقع الجديد للعنصر بناءً على حركة الماوس
         const left = e.clientX - offsetX;
         const top = e.clientY - offsetY;
 
         // تحديث موقع العنصر
         overlayaudio.style.left = left + 'px';
         overlayaudio.style.top = top + 'px';
     }
 });
 
 overlayaudio.addEventListener('mouseup', () => {
    isDraggingaudio = false;
 });

 closeaudio.addEventListener('click', () => {
    overlayaudio.style.display = 'none';
    audio.pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    audio.currentTime = 0;
    // Reset the file input to allow selecting the same file again
    audioFileInput.value = null;

 });

 function handleAudioFileSelect(event) {
     const file = event.target.files[0];
     if (file) {
         // Set the audio source to the selected file
         audioSource.src = URL.createObjectURL(file);

        //  // Show the audio player
          myAudio.style.display = 'block';
          
        
         // Load the audio
         myAudio.load();
         overlayaudio.style.display = 'block';
         audio.play();
         playButton.style.display = 'none';
         pauseButton.style.display = 'block';
         // Store the selected file
     } else {
         // Hide the audio player if no file is selected
           myAudio.style.display = 'none';
     }
    
 }

 // Play audio
 playButton.addEventListener('click', () => {
     playButton.style.display = 'none';
     pauseButton.style.display = 'block';
     audio.play();
     sliderBar.style.background = `linear-gradient(to right, #0caf3d ${0}%, #ccc ${0}%)`;
 });

 // Pause audio
 pauseButton.addEventListener('click', () => {
     playButton.style.display = 'block';
     pauseButton.style.display = 'none';
     audio.pause();
 });


 // Seek to the start of the audio
 seekStartButton.addEventListener('click', () => {
     audio.currentTime = 0;
 });

 // Seek to the end of the audio
 seekEndButton.addEventListener('click', () => {
     audio.currentTime = audio.duration;
 });

 // Update the end time when the audio time updates
 audio.addEventListener('timeupdate', () => {
     const currentTime = audio.currentTime;
     const duration = audio.duration;
     if (!isNaN(audio.duration)) {
     // Format the duration as minutes and seconds
     const minutes = Math.floor(audio.duration / 60);
     const seconds = Math.floor(audio.duration % 60);
     const formattedDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
     endTime.textContent =  formattedDuration;
     } else {
         // If the duration is NaN, display "0:00"
         endTime.textContent = '0:00';
     }
     // endTime.textContent = formatTime(duration);
     startTime.textContent = formatTime(currentTime);
    

     // Calculate the progress percentage
     const progress = (currentTime / duration) * 100;

     // Update the custom slider position
     const sliderWidth = progress;
     sliderKnob.style.left = sliderWidth + '%';

     // Update the background color of the slider based on progress
     sliderBg.style.width = progress + '%';
 });
 audio.addEventListener('ended', () => {
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
 });

 // Handle custom slider knob dragging
 sliderKnob.addEventListener('mousedown', () => {
     isDragging = true;
     playButton.style.display = 'none';
    pauseButton.style.display = 'block';
     audio.pause();
 });

 sliderKnob.addEventListener('mousemove', (e) => {
     if (isDragging) {
        isDraggingaudio = false;
         const clickX = e.clientX - sliderBar.getBoundingClientRect().left;
         const sliderWidth = (clickX / sliderBar.clientWidth) * 100;
         sliderKnob.style.left = sliderWidth + '%';
     }
 });

 sliderKnob.addEventListener('mouseup', () => {
     if (isDragging) {
         const sliderWidth = parseFloat(sliderKnob.style.left);
         const seekTime = (sliderWidth / 100) * audio.duration;
         audio.currentTime = seekTime;
         audio.play();
         isDragging = false;
     }
 });

 // Helper function to format time in MM:SS format
 function formatTime(timeInSeconds) {
     const minutes = Math.floor(timeInSeconds / 60);
     const seconds = Math.floor(timeInSeconds % 60);
     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
 }


