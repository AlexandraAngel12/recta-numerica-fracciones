$(document).ready(function(){  
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var btn1 = document.getElementById("Reset");
var btn2 = document.getElementById("Verificar");
var btn3 = document.getElementById("VerificaAprox");
var btn4 = document.getElementById("ContinuaAprox");
var FraccionEjemplo = document.getElementById("FraccionEjemplo");
var FraccionReferencia1 = document.getElementById("FraccionReferencia1");
var FraccionReferencia2 = document.getElementById("FraccionReferencia2");
var FraccionReferencia3 = document.getElementById("FraccionReferencia3");
var FraccionReferencia4 = document.getElementById("FraccionReferencia4");
var proponefrac = document.getElementById("proponefrac");
var capDen = document.getElementById("fraccion"); //captura el número en el 
var den = 1;                        //el usuario desea fraccionar las unidades
var MQ = MathQuill.getInterface(2);
var lat, SegmentosRojos;
var Mq_disabled = true, continuar = false;
var numerador, denominador;
var FracProp;
var segmentos2;
var HaySegmentosRojos = false;  
var HaySegmentos = false;
//Se crea el espacio para trabajar en jsxgraph
var brd = JXG.JSXGraph.initBoard('box',{boundingbox:[-0.2, 1, 2.2, -1],showNavigation:false,showCopyright: false});
var brd1 = JXG.JSXGraph.initBoard('box1',{boundingbox:[-0.2,1,2.2,-1],showNavigation:false,showCopyright: false});
var brd2 = JXG.JSXGraph.initBoard('box2',{boundingbox:[-0.2,1,1.2,-1],showNavigation:false,showCopyright: false});
var brd3 = JXG.JSXGraph.initBoard('box3esp',{boundingbox:[-0.2,2.1,1.2,-1],showNavigation:false,showCopyright: false});
var posCor; // Esta variable será un punto, que tiene la posición correcta en la que se debe colocar el punto móvil
var p1; //punto móvil


   
//ejemplo
 function Inicios(board) {
        ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        
        uno = board.create('point', [1, 0], {name: '1', //creamos el punto 1
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        uno.setAttribute({fixed: true});
        uno.label.setAttribute({fontSize: 20, offset: [-6, 32]});
        dos = board.create('point', [2, 0], {name: '2', //creamos el punto 2
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        dos.setAttribute({fixed: true});
        dos.label.setAttribute({fontSize: 20, offset: [-6, 32]});
        cero = board.create('point', [0, 0], {name: '0', //creamos el punto 0
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        cero.setAttribute({fixed: true});
        cero.label.setAttribute({fontSize: 20, offset: [-6, 32]});
        
        segmentos = board.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: 0, strokeWidth:4,majorHeight: 17, minorHeight: 10, drawLabels: false});
        segmentos.setAttribute({fixed: true}); 
        board.create('ticks', [ax, [0]], {strokeColor: 'black',strokeWidth:4, majorHeight: 17});
        segDeCeroADos = board.create('segment', [[0, 0], [2, 0]], {strokeColor: 'black'});
        segDeCeroADos.setAttribute({fixed: true});  
    };

function EtiquetaSup(fraccion, board, color) {
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.x, color: color, size:3});
            point.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 45]});  
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: '---', color: 'none'});
            point.label.setAttribute({color: color, fontSize: 18, offset: [-10, 38]});
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.y, color: 'none'});
            point.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 25]});
            point.setAttribute({fixed: true}); 
    };
  
function Inicio(){ 
    den = 1;
    mathField.focus();
    Inicios(brd);
};


function PuntoMovil(fraccion, board, CorX, CorY){
            p1 = board.create('point', [CorX, CorY], {name: fraccion.x, color: 'red', size:6});
            if( fraccion.x < 10){
                p1.label.setAttribute({ color: 'red', fontSize: 16, offset: [-5, 45]}); 
                p12 = board.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: '----', color: 'none'});
                p12.label.setAttribute({color: 'red', fontSize: 18, offset: [-12, 38]});
            }
            else{
                p1.label.setAttribute({ color: 'red', fontSize: 16, offset: [-10, 45]}); 
                p12 = board.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: '----', color: 'none'});
                p12.label.setAttribute({color: 'red', fontSize: 18, offset: [-12, 38]});
            }
            p13 = board.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: fraccion.y, color: 'none'});
            if(fraccion.y < 10){
                p13.label.setAttribute({ color: 'red', fontSize: 16, offset: [-5, 25]});         
            }
            else{
                p13.label.setAttribute({ color: 'red', fontSize: 16, offset: [-10, 25]});
            }
};

 function EtiquetaInf(fraccion, board) {
            pnumerador = board.create('point', [fraccion.x/fraccion.y, 0], {name: fraccion.x,
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none'});
            pnumerador.setAttribute({fixed: true});
             if(fraccion.x<10){
            pnumerador.label.setAttribute({color: 'black', fontSize: 14, offset: [-5, -25]}); //offset para la posición de la etiqueta respecto al punto     
          
            raya = board.create('point', [fraccion.x/fraccion.y, 0], {name: '----',
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none'});
           
            raya.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -32]}); //offset para la posición de la etiqueta respecto al punto     
             }
            else{
                pnumerador.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -25]});
                raya = board.create('point', [fraccion.x/fraccion.y, 0], {name: '-----',
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none'});
                raya.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -32]}); //offset para la posición de la etiqueta respecto al punto     
            }
            raya.setAttribute({fixed: true});
            
            pdenominador = board.create('point', [fraccion.x/fraccion.y, 0], {name: fraccion.y,
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none'});
            if(fraccion.y<10){
                pdenominador.label.setAttribute({color: 'black', fontSize: 14, offset: [-5, -45]}); //offset para la posición de la etiqueta respecto al punto     
            }
            else{
                pdenominador.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -45]});
            }
            pdenominador.setAttribute({fixed: true});
        };             
    
//Esta función genera una fracción aleatoria
function RandomFrac (){
    numerador = getRandomInt(1,12);
    if(numerador > 2){ //esto porque no deseamos generar fracciones que rebasen
        denominador = getRandomInt(Math.ceil(numerador/2),12); //las 2 unidades
        if(numerador === denominador){
         denominador = getRandomInt(Math.ceil(numerador/2),12);   
        }
    }
    else{ //si el numerador es 1 o 2, el denominador puede ser cualquiera entre 1 y 15
        denominador = getRandomInt(1,12);
        if(numerador === denominador){
         denominador = getRandomInt(1,12);   
        }
    }
    FracProp = new Frac(ctx, numerador, denominador);
    PuntoMovil(FracProp, brd, 0.1,-0.8); //el punto se llama p1
   // char = numerador+'/'+denominador; //aparecerá en la etiqueta del punto móvil
    posCor = brd.create('point', [numerador/denominador,0], { name: '',
                color: 'none',  //este punto tiene la posición correcta de la
                size: 5,  //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none'});
    posCor.setAttribute({fixed: true});
//    p = brd.create('point',[0,-0.7], { name: char,
//                 size : 5,   //este es el punto que el usuario debe arrastar
//                 color : 'red',  // a la recta, contiene una etiqueta que le
//                 highlightStrokeColor:'red', //recuerda con que fracción está
//                 highlightFillColor:'red'}); // trabajando
//    p.setAttribute({fixed:false}); //se trata de un punto móvil
//    p.label.setAttribute({color: 'red', fontSize: 20, offset:[-15,25]}); //offset para la posición de la etiqueta respecto al punto
    
    
    ctx.clearRect(0,0,canvas.width,canvas.height); //limpiamos el canvas
    ctx.fillStyle="purple";
    ctx.font="25px Comic Sans"; //se despliegan las instrucciones del ejercicio
    ctx.fillText("Ubica la fracción", 50,60);
    var m = ctx.measureText("Ubica la fracción ").width+50;
    var v = ctx.measureText(numerador).width; //para dibujar los números y la raya de         
    var w = ctx.measureText(denominador).width; //la fracción de manera proporcionada
    ctx.font="30px Comic Sans"; 
    ctx.fillText(numerador,m+w/2,43);
    ctx.strokeStyle="purple";
    ctx.beginPath();
    ctx.moveTo(m ,43 +12);
    ctx.lineTo(m+ v+w, 43 +12); //se dibuja la línea de la fracción
    ctx.stroke();
    ctx.fillText(denominador,m+v/2,43+55);
    ctx.font="25px Comic Sans";
    ctx.fillText(" en la posición que le corresponde en la recta numérica.", m+v+w,60);
    ctx.fillText("Primero indica en cuantas partes quieres fraccionar las unidades,", 50,130);   
    ctx.fillText("luego haz click en el punto rojo y arrástralo a su posición correspondiente en la recta. ",50,180);
    ctx.fillText("Finalmente, verifica tu resultado.",50,230);      
};

function BarraProgresiva(board, total, ejercicio) {
        etiqueta = ejercicio;
        ejercicio = ejercicio -1;
        linea = board.create('segment', [[0.3, 1.8], [0.7, 1.8]], {strokeColor: 'lightgray', strokeWidth:4});
        linea.setAttribute({fixed: true});  
        delta = 0.1;
        
        for (var i = 0; i < total; i++) {
        puntos = board.create('point', [0.3+(i*delta), 1.8], {name: '', color: 'lightgray', size:7, face:'<>', showInfobox: false});    
        puntos.setAttribute({fixed: true});
        }
        punto = board.create('point', [0.3+(ejercicio*delta), 1.8], {name: etiqueta+' de '+ total, color: 'gray', size:7, face:'<>', showInfobox: false});    
        punto.setAttribute({fixed: true});
    };

var eje;
    /**
     Es lo que se hace al capturar un número y dar enter
     */
    function Fracciona(e) {
      eje = brd.create('line', [[0,0],[1,0]], {color: 'black'});  //línea que hará
      eje.setAttribute({fixed:true});  //el papel del eje X  
       uno = brd.create('point', [1, 0], {name: '1', //creamos el punto 1
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        uno.setAttribute({fixed: true});
        uno.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        dos = brd.create('point', [2, 0], {name: '2', //creamos el punto 2
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        dos.setAttribute({fixed: true});
        dos.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        cero = brd.create('point', [0, 0], {name: '0', //creamos el punto 0
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        cero.setAttribute({fixed: true});
        cero.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        FracProp = new Frac(ctx, numerador, denominador);
        PuntoMovil(FracProp, brd, 0.1,-0.8); //el punto se llama p1
//    posCor = brd.create('point', [numerador/denominador,0], { name: '',
//                color: 'none',  //este punto tiene la posición correcta de la
//                size: 5,  //fracción con la que trabaja el usuario, es invisible
//                highlightStrokeColor: 'none',
//                highlightFillColor: 'none'});
//    posCor.setAttribute({fixed: true});
//    FracPropuesta = new Frac(ctx, numerador, denominador);
//    PuntoMovil(FracPropuesta, brd, p1.X(),p1.Y());
    for (var i = 1; i <= 2*e; i++) {
             SegmentosRojos_i = brd.create('segment', [[(i - 1)/(e), 0], [i/(e) , 0]], {name: '', strokeColor: 'none',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
             SegmentosRojos_i.setAttribute({fixed: true});
             HaySegmentosRojos = true;
    
        }
        
     segmentos2 = brd.create('ticks', [eje, 1], {strokeColor: 'black', minorTicks: e-1, majorHeight: 17, minorHeight: 10, strokeWidth: 4,  drawLabels: false});
     HaySegmentos = true;
     brd.create('ticks', [eje, [0]],{strokeColor: 'black', majorHeight: 17, strokeWidth: 4,  drawLabels: false});
    };
  
 
var config2={
    handlers:{
        
    }
};

 
var config3={
    handlers:{
        
    }
};
var config4={
    handlers:{
        
    }
};
var config5={
    handlers:{
        
    }
};
var config6={
    handlers:{
        
    }
};
var config7={
    handlers:{
        
    }
};
var tgris;
//Configuramos lo que el programa hará cuando se capture un número y se presione enter
var config= {
    handlers: {
    edit: function() {
                lat = mathField.latex(); //procesa el latex que se encuentra en el 
                                         //campo de MathQuill
                },
    enter: function() {
        if(Mq_disabled && lat !== undefined){  //verifica si el campo de mathquill está habilitado
        continuar = true;
        if(parseInt(lat) !== 0){
        mathField.blur(); // se le quita el foco al campo de mathquill
        for(el in brd.objects) {
        brd.removeObject(brd.objects[el]);
        }
        tgris = brd.create('text', [0.3,0.87, 'Pasa el mouse sobre los segmentos para iluminarlos y contarlos'], {fontSize:20, color:"grey"});

//        if(HaySegmentos){eje.removeTicks(segmentos2);}
//        if(HaySegmentosRojos){
//            for (var i = 1; i <= 2*den; i++) {
//                
//                brd.removeObject(SegmentosRojos_i);
//        }
//        }
//        brd.removeObject(eje);
        den = lat;
        
        Fracciona(den);
//        segmentos = brd.create('ticks', [ax, 1], {strokeColor: 'blue', minorTicks: den-1, majorHeight: 25, minorHeight: 10, strokeWidth: 3,  drawLabels: false});
//        brd.create('ticks', [ax, [0]],{strokeColor: 'blue', majorHeight: 25, strokeWidth: 3,  drawLabels: false});
//        HaySegmentos = true;
//        for (var i = 1; i <= 2*den; i++) {
//             SegmentosRojos = brd.create('segment', [[(i - 1)/(den), 0], [i/(den) , 0]], {name: "", strokeColor: '',
//             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
//             SegmentosRojos.setAttribute({fixed: true});
//             HaySegmentosRojos = true;
//        }
        }
        else{
            alert("Captura un número distinto de cero");
        }
        }
   else{
       return false;
        }
    }
}
};

var mathField = MQ.MathField(capDen, config); 
var mathField2 = MQ.MathField(FraccionEjemplo, config2); 
var mathField3 = MQ.MathField(FraccionReferencia1, config3); 
var mathField4 = MQ.MathField(FraccionReferencia2, config4); 
var mathField5 = MQ.MathField(FraccionReferencia3, config5); 
var mathField6 = MQ.MathField(FraccionReferencia4, config6); 
var mathField7 = MQ.MathField(proponefrac, config7); 
var cuatrotercios = new Frac(ctx, 4,3);
Inicios(brd1);
brd1.create('ticks', [ax, 1], {strokeColor:'black', minorTicks: 2, majorHeight: 17, minorHeight: 10, strokeWidth: 4,drawLabels: false});
brd1.create('ticks', [ax, [0]],{strokeColor: 'black', majorHeight: 17, minorHeight: 10, strokeWidth: 4,drawLabels: false});
EtiquetaSup(cuatrotercios,brd1,"red");
mathField2.write('\\frac{'+cuatrotercios.x+'}{'+cuatrotercios.y+'}');
mathField2.blur();
for (var i = 1; i <= 2*(cuatrotercios.y); i++) {
             part = brd1.create('segment', [[(i - 1)/(cuatrotercios.y), 0], [i/(cuatrotercios.y) , 0]], {name: "", strokeColor: '',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
             part.setAttribute({fixed: true});
        }


RandomFrac(); //generamos una fracción para que el usuario trabaje
Inicio(); //Ejecutamos Inicio(), para que de entrada le presenté un ejercicio al usuario
brd1.create('text', [0.3,0.8, 'Pasa el mouse sobre los segmentos para iluminarlos y contarlos'], {fontSize:20, color:"grey"});

var filtro=function(e){     
    var caracAcept="0123456789\b\x0d";  //  "\b" es backspace, \x0d enter  
    var tecla=String.fromCharCode(e.which); // which contiene el Código Ascii del caracter oprimido.
    return caracAcept.indexOf(tecla)>=0; //  si regresa falso el caracter no se captura, en otro caso se captura.   
};  

capDen.onkeypress = filtro;

  $( "#Reset" ).prop( "disabled", true ); //de entrada el botón reiniciar está bloqueado

btn1.onclick = function(){
    document.location.reload();  
};



//btn1.onclick = function(){ //botón Reiniciar
//   Mq_disabled = true;  //el campo de mathquill no tiene como tal la propiedad 
//                        //de ser deshabilitado, por eso se controla a través de esta variable
//   ctx.clearRect(0,0,canvas.width,canvas.height); //limpia el canvas
//   mathField.latex(""); //limpia el campo de mathQuill
//   char="";  //limpia la cadena que sirve para etiquetar el punto móvil
//   errores = 0;
//   continuar = false;
//   btn2.disabled = false;
//   brd.removeObject(b); //remueve algunos puntos del eje X
//   brd.removeObject(p1); //** habia una p
//   brd.removeObject(posCor);
//   brd.removeObject(vector);
//   ax.removeTicks(segmentos);
//   brd.removeObject(SegmentosRojos);
//   Inicio();
//   RandomFrac();
//};
var txt, CapturaCorrecta, HayAyuda0 = false, HayAyuda1 = false, HayAyuda2 = false, txayuda0, txayuda1, txayuda2, fracCero, fracUno, fracDos, fracUnitaria, maximo, subunidad;
var mcm = 1; // para simplificar la fracción con la que se trabaja
btn2.onclick = function(){ //botón Verificar
    console.log(p1.Dist(posCor), 1/denominador,1/(2*denominador));
  if(continuar){ // se asegura que el usuario haya capturado un número en el mathquill
  ctx.clearRect(0,250,canvas.width,canvas.height);
     
     if( HayAyuda0 ){brd.removeObject(txayuda0);}
     if( HayAyuda1 ){brd.removeObject(txayuda1); brd.removeObject(fracCero); brd.removeObject(fracUno); brd.removeObject(fracDos); brd.removeObject(fracUnitaria);}
     if( HayAyuda2 ){brd.removeObject(txayuda2);}
  if (p1.Dist(posCor) < 0.05){
   
      btn2.disabled = true;
      Mq_disabled = false;
      p1.setAttribute({fixed:true});
    //  ctx.fillText("Muy bien",canvas.width/2-ctx.measureText("Muy bien").width/2, 290);   
      txt = brd.create('text',[0.9,0.65, '¡Muy bien!'], {fontSize:20, color:"orange"});
      txt.setAttribute({fixed: true}); 
        $( "#Reset" ).prop( "disabled", false );
       for(i=0; i<=2*denominador; i++ ){
         fraction = new Frac(ctx, i, denominador);
         EtiquetaInf(fraction,brd);
        }
      medida = brd.create('segment',[[0,0],[numerador/denominador,0]],{name: "", strokeColor: 'blue',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
          // brd.removeObject(b);
       medida.setAttribute({fixed:true});
        }
        else{  //la respuesta no fue correcta, vamos a revisar la captura en mathquill
                if( numerador > denominador){ maximo = numerador;}
                else{maximo = denominador;}
                for (var i = 2; i < maximo; i++) {
                    if ((denominador % i === 0) && (numerador % i === 0) ){
                        mcm = i; 
                        console.log("mcm =",i);
                        //return false;} 
                }}
 
                if(mcm === 1){
                if( den % denominador  === 0){ CapturaCorrecta = true;}
                else{ CapturaCorrecta = false;}
                }
                else{
                    if(den % (denominador/mcm) === 0){ CapturaCorrecta = true; console.log(den % (denominador/mcm));}
                    else{CapturaCorrecta = false; console.log("no se vale");}
                }
                if(CapturaCorrecta){ //la captura de mathquill es válida, la posición del punto es la que es incorrecta
                     if (p1.Dist(posCor) < 0.08){
                       txayuda0 = brd.create('text',[0.50,0.65, 'Trata de ser preciso ubicando el punto'], {fontSize:20, color:"orange"});     
                       txayuda0.setAttribute({fixed: true});   
                       HayAyuda0 = true;
                     }
                     else{
                    fracCero = new Frac(ctx, 0, denominador);
                    EtiquetaInf(fracCero,brd); 
                    fracUnitaria = new Frac(ctx, 1, denominador);
                    EtiquetaInf(fracUnitaria,brd); //le dibujamos una fracción unitaria de referencia
                    fracUno = new Frac(ctx, denominador, denominador);
                    EtiquetaInf(fracUno,brd);
                    fracDos = new Frac(ctx, 2*denominador, denominador);
                    EtiquetaInf(fracDos,brd);
                    subunidad = brd.create('segment',[[0,0],[1/denominador,0]],{name: "", strokeColor: 'blue',
                    highlightStrokeColor: 'blue', strokeWidth: 5, drawLabels: false});
                    subunidad.setAttribute({fixed:true});
                    txayuda1 = brd.create('text',[0.1,0.65, 'El punto no está en la posición correcta, vuelve a intentar ahora con ayuda'], {fontSize:20, color:"orange"});     
                    txayuda1.setAttribute({fixed: true}); 
                    HayAyuda1 = true;
                     }
                }
                else{
                    txayuda2 = brd.create('text',[0.22,0.65, 'Fracciona las unidades de acuerdo al denominador de la fracción dada'], {fontSize:20, color:"orange"});     
                    txayuda2.setAttribute({fixed: true}); 
                    HayAyuda2 = true;
                }
        }
        
  }
    else{
        alert("Aún no haz fraccionado las unidades");
    }
};

//función que genera un número entero al azar entre el min y el max dados
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
  
  //Segunda parte: Estimación
  
 Inicios(brd2);
 var marca = brd2.create('ticks', [ax, [1/3]],{strokeColor: 'black', majorHeight: 17, minorHeight: 10, strokeWidth: 4,drawLabels: false});
 marca.setAttribute({fixed:true});
 var untercio = new Frac(ctx,1,3);
 EtiquetaInf(untercio,brd2);
 for (var i = 1; i <= 2*(untercio.y); i++) {
             part = brd2.create('segment', [[(i - 1)/(untercio.y), 0], [i/(untercio.y) , 0]], {name: "", strokeColor: '',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
             part.setAttribute({fixed: true});
        }
 FracAprox = new Frac(ctx, 17, 24);
 // EtiquetaSup(FracAprox, brd2, "red");
 //PuntoMovil(FracAprox, brd2, FracAprox.x/FracAprox.y,0); 
  p = brd2.create('point', [17/24, 0], {name: 17, color: 'red', size:6});
  p.label.setAttribute({ color: 'red', fontSize: 16, offset: [-10, 45]}); 
  p.setAttribute({fixed: true});  
  p = brd2.create('point', [17/24, 0], {name: '----', color: 'none'});
  p.label.setAttribute({color: 'red', fontSize: 18, offset: [-12, 38]});
  p.setAttribute({fixed: true});  
  p = brd2.create('point', [17/24, 0], {name: 24, color: 'none'});
  p.label.setAttribute({ color: 'red', fontSize: 16, offset: [-10, 25]});
  p.setAttribute({fixed: true});          
 brd2.create('text',[-0.1,0.88,"Pasa el mouse sobre los segmentos para iluminarlos, ¿el punto rojo está a la derecha o a la izquierda de dos tercios?"],{fontSize: 14,color:'grey'});
 mathField3.write('\\frac{'+untercio.x+'}{'+untercio.y+'}=\\frac{'+8+'}{'+24+'}'); 
 mathField4.write('\\frac{'+2+'}{'+3+'}=\\frac{'+16+'}{'+24+'}');   
 mathField5.write('\\frac{'+FracAprox.x+'}{'+FracAprox.y+'}');   
 mathField6.write('\\frac{'+2+'}{'+3+'}');   
 mathField7.write('\\frac{'+numerador+'}{'+denominador+'}');    
  //para generar ejercicios en board3
    Inicios(brd3);
    //brd3.create('text',[-0.05,1.5,"La recta se encuentra dividida en segmentos de acuerdo a la fracción de referencia, pasa el mouse para iluminarlos y úsalos"],{fontSize: 14,color:'grey'});
    var unsexto = new Frac(ctx, 1,6);
    var arreglo = [unsexto,new Frac(ctx, 1,5),new Frac(ctx, 1,2),new Frac(ctx, 1,4),new Frac(ctx, 1,8) ];
    var ParaAprox = [new Frac(ctx, 5,18),new Frac(ctx, 7,15),new Frac(ctx, 9,10),new Frac(ctx, 7,16),new Frac(ctx, 7,24)];
    /**
     Esta función recibe un índice que corresponde a un elemento de cada arreglo
     coloca una marca en la posición del elemento del arreglo "arreglo", mientras que
     dibuja un punto móvil etiquetado superiormente por el elemento correspondiente del
     arreglo "ParaAprox".
     */
    var selecciona = 0;
    var pointn;
    function ProponeEjercicio(indice) {
        brd3.create('text',[-0.15,1.43,"La recta se encuentra dividida en segmentos de acuerdo a la fracción de referencia, pasa el mouse para iluminarlos y úsalos"],{fontSize: 14,color:'grey'});
        ax = brd3.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        var tick = brd3.create('ticks', [ax, [arreglo[indice].x/arreglo[indice].y]],{strokeColor: 'blue', majorHeight: 13, minorHeight: 13, strokeWidth: 4,drawLabels: false});
        tick.setAttribute({fixed:true});
        EtiquetaSupEsp(arreglo[indice],brd3, "black");
         for (var i = 1; i <= 2*(arreglo[indice].y); i++) {
             part = brd3.create('segment', [[(i - 1)/(arreglo[indice].y), 0], [i/(arreglo[indice].y) , 0]], {name: "", strokeColor: '',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
             part.setAttribute({fixed: true});
        }
            pointn = brd3.create('point', [-0.1, -0.8], {name: ParaAprox[indice].x, color: 'red', size:6});
            pointn.label.setAttribute({ color: 'red', fontSize: 16, offset: [-5, 45]}); 
            pointr = brd3.create('point', [function(){ return pointn.X();}, function(){ return pointn.Y();}], {name: '----', color: 'none'});
            pointr.label.setAttribute({color: 'red', fontSize: 18, offset: [-12, 38]});
            pointd = brd3.create('point', [function(){ return pointn.X();}, function(){ return pointn.Y();}], {name: ParaAprox[indice].y, color: 'none'});
            pointd.label.setAttribute({ color: 'red', fontSize: 16, offset: [-10, 25]});   
    }
   
    ProponeEjercicio(selecciona);
    
    
    
function EtiquetaSupEsp(fraccion, board) {
            if(fraccion === unsexto){
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.x, color: 'none', size:3});
            point.label.setAttribute({ color: "black", fontSize: 14, offset: [-5, 51]});  
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: '---', color: 'none'});
            point.label.setAttribute({color: "black", fontSize: 14, offset: [-8, 44]});
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.y, color: 'none'});
            point.label.setAttribute({ color: "black", fontSize: 14, offset: [-5, 31]});
            point.setAttribute({fixed: true});  
            }
            else{
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.x, color: 'none', size:3});
            point.label.setAttribute({ color: "black", fontSize: 14, offset: [-5, 45]});  
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: '---', color: 'none'});
            point.label.setAttribute({color: "black", fontSize: 14, offset: [-8, 38]});
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.y, color: 'none'});
            point.label.setAttribute({ color: "black", fontSize: 14, offset: [-5, 25]});
            point.setAttribute({fixed: true}); 
        }
            
    };
    $( "#ContinuaAprox" ).prop( "disabled", true );
    var msj = false, orcor = false;
    var dist, orientacion, ori;
    //botón para verificar que se haya hecho una estimación correcta ubicando
    //a la fracción propuesta
   btn3.onclick = function(){
       if(Math.abs(pointn.Y())<0.2){
           
       
       if(msj){
           brd3.removeObject(tx);
//            for(el in brd3.objects) {
//            brd3.removeObject(brd3.objects[el]);
//        }
//           Inicios(brd3);
       }
       if(orcor){
           brd3.removeObject(ori);
       }
            dist = (((2*arreglo[selecciona].x)/arreglo[selecciona].y) - ParaAprox[selecciona].x/ParaAprox[selecciona].y);
            
            
           //si dist>0 el punto debe ubicarse atrás de 2-veces la fracción de referencia
           // si dist<0 entonces el punto debe estar a la derecha, es decir adelante de dos veces la fracción de referencia
           //esto se tomará en cuenta, pues es el propósito del ejercicio
           console.log(dist);
           orientacion = ((2*arreglo[selecciona].x)/arreglo[selecciona].y)-pointn.X();
           console.log(orientacion);
       if(dist*orientacion > 0){ //significa que no tuvieron el mismo signo, por lo tanto, el punto no quedó del lado correcto
         
       
       if((Math.sqrt(((ParaAprox[selecciona].x/ParaAprox[selecciona].y) - pointn.X())*((ParaAprox[selecciona].x/ParaAprox[selecciona].y) - pointn.X()))<0.04) && (Math.sqrt((pointn.Y())*(pointn.Y()))<0.1)){
           txMB = brd3.create('text',[0.42,1, '¡Muy bien!'], {fontSize:20, color:"orange"});
           txMB.setAttribute({fixed: true}); 
//            var tick2 = brd3.create('ticks', [ax, [ParaAprox[selecciona].x/ParaAprox[selecciona].y]],{strokeColor: 'blue', majorHeight: 15, minorHeight: 12, strokeWidth: 4,drawLabels: false});
//            tick2.setAttribute({fixed:true});
           for(i=1; i< arreglo[selecciona].y; i++){
           var ref = new Frac(ctx, i,arreglo[selecciona].y);
           if( i === 1 && arreglo[selecciona].y === 6){
            }
            else{
                EtiquetaSupEsp(ref,brd3);
            }
            }
            $( "#VerificaAprox" ).prop( "disabled", true );
            $( "#ContinuaAprox" ).prop( "disabled", false );
      
            for(i=0; i<=ParaAprox[selecciona].y; i++ ){
            var tick2 = brd3.create('ticks', [ax, [i/ParaAprox[selecciona].y]],{strokeColor: 'blue', majorHeight: 13, minorHeight: 13, strokeWidth: 4,drawLabels: false});
            tick2.setAttribute({fixed:true});
            fraction = new Frac(ctx, i, ParaAprox[selecciona].y);
            EtiquetaInf(fraction,brd3);
        }
       }
       else{
           tx = brd3.create('text',[0,1, 'Te alejaste mucho de la posición exacta, vuelve a intentarlo, ahora con ayuda'], {fontSize:18, color:"orange"});
           tx.setAttribute({fixed: true});
           msj = true;
           var fracdoble = new Frac(ctx, 2, arreglo[selecciona].y);
           EtiquetaSupEsp(fracdoble,brd3, "black");
           var tick3 = brd3.create('ticks', [ax, [2/arreglo[selecciona].y]],{strokeColor: 'blue', majorHeight: 13, minorHeight: 13, strokeWidth: 4,drawLabels: false});
           tick3.setAttribute({fixed:true});
           for(i=1; i<3; i++){
            fracequiv = new Frac(ctx, i*(ParaAprox[selecciona].y/arreglo[selecciona].y), ParaAprox[selecciona].y);
            EtiquetaInf(fracequiv,brd3);
            }
       }
   
   
    }
    else{
          ori = brd3.create('text',[0.05,1, 'Reconsidera la posición del punto con respecto al segundo segmento'], {fontSize:18, color:"orange"});
          orcor = true;
           var fracdoble = new Frac(ctx, 2, arreglo[selecciona].y);
           EtiquetaSupEsp(fracdoble,brd3, "black");
           var tick3 = brd3.create('ticks', [ax, [2/arreglo[selecciona].y]],{strokeColor: 'blue', majorHeight: 13, minorHeight: 13, strokeWidth: 4,drawLabels: false});
           tick3.setAttribute({fixed:true});
    }
}
        else{
            alert("Arrastra el punto rojo hacia la recta, estima su posición usando como referencia a la fracción mostrada en la recta");
        }
   }; 
   
   var conta = 1;
   btn4.onclick = function(){
       if(conta === 5){
           alert("Haz completado la lección");
           $( "#ContinuaAprox" ).prop( "disabled", true );
            return false;
        }
        conta++;
       for(el in brd3.objects) {
        brd3.removeObject(brd3.objects[el]);
        }
        selecciona++;
        Inicios(brd3);
        ProponeEjercicio(selecciona);
          BarraProgresiva(brd3, 5, conta);
        $( "#ContinuaAprox" ).prop( "disabled", true );
          $( "#VerificaAprox" ).prop( "disabled", false );
        msj = false;
        
   };
   
   
   $('#Muestra-Oculta').on('click',function(){
      $('#SegundaParte').toggle('slow');
   });
   
   BarraProgresiva(brd3, 5, conta);
    
}); //termina jQuery