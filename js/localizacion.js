$(document).ready(function(){  
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var btn1 = document.getElementById("Reset");
var btn2 = document.getElementById("Verificar");
var FraccionEjemplo = document.getElementById("FraccionEjemplo");
var capDen = document.getElementById("fraccion"); //captura el número en el 
var den = 1;                        //el usuario desea fraccionar las unidades
var MQ = MathQuill.getInterface(2);
var a, b, c, d, vector, ax, segmentos, brd, uno, dos, frac, lat, SegmentosRojos;
var Mq_disabled = true, continuar= false;
var numerador, denominador;

//Se crea el espacio para trabajar en jsxgraph
var brd = JXG.JSXGraph.initBoard('box',{boundingbox:[-0.2, 1, 2.2, -1],showNavigation:false,showCopyright: false});
var brd1 = JXG.JSXGraph.initBoard('box1',{boundingbox:[-0.2,1,2.2,-1],showNavigation:false,showCopyright: false});
var char; // variable que contendrá la información de la fracción aleatoria, se mostrará
            //en la etiqueta del punto móvil
var posCor; // Esta variable será un punto, que tiene la posición correcta en la que se debe colocar el punto móvil
var p, p1; //punto móvil

//ejemplo
 function Inicios(board) {
        ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        
        uno = board.create('point', [1, 0], {name: '1', //creamos el punto 1
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        uno.setAttribute({fixed: true});
        uno.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        dos = board.create('point', [2, 0], {name: '2', //creamos el punto 2
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        dos.setAttribute({fixed: true});
        dos.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        cero = board.create('point', [0, 0], {name: '0', //creamos el punto 0
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none'});
        cero.setAttribute({fixed: true});
        cero.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        
        segmentos = board.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: 0, majorHeight: 15, minorHeight: 12, drawLabels: false});
        segmentos.setAttribute({fixed: true}); 
        board.create('ticks', [ax, [0]], {strokeColor: 'black', majorHeight: 20});
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
  
function Inicio(){ //Esta función contiene todas las instrucciones que se deben
                    //ejecutar al inicio
//No se está trabajando con un sistema coordenado, ya que pa no causar distracciones
//sólo se desea trabajar con el eje X, pero no es posible en jsxgraph desaparecer el eje Y
//por ello se ha dibujado el eje X empleando diversos objetos de jsxgraph
    den = 1;
   // brd = JXG.JSXGraph.initBoard('box',{boundingbox:[-0.2,1,2.2,-1],showNavigation:false, showCopyright: false});

    mathField.focus();
    Inicios(brd);
//    ax = brd.create('line', [[0,0],[1,0]], {color: 'black'});  //línea que hará
//    ax.setAttribute({fixed:true});  //el papel del eje X
//    
//    uno = brd.create('point', [1, 0], { name: '1',  //creamos el punto 1
//             color:'none', 
//             highlightStrokeColor:'none', 
//             highlightFillColor:'none'});
//    uno.setAttribute({fixed:true});
//    uno.label.setAttribute({fontSize: 20, offset:[-6,30]}); 
//    dos = brd.create('point', [2, 0], { name: '2',  //creamos el punto 2
//                 color:'none', 
//                 highlightStrokeColor:'none', 
//                 highlightFillColor:'none'});
//    dos.setAttribute({fixed:true});
//    dos.label.setAttribute({ fontSize: 20, offset:[-6,30]}); 
//     a = brd.create('point',[0,0], { name:'0',  //creamos el punto 0
//                 color:'none', 
//                 highlightStrokeColor:'none', 
//                 highlightFillColor:'none'});
//     a.setAttribute({fixed:true});
//     a.label.setAttribute({fontSize: 20, offset:[-6,30]}); 
//
////las siguientes ticks(marcas), son necesarias, la primera para que ponga marcas en los enteros
////la segunda para ponga la marca en el cero, de lo contrario no la pone, los corchetes [0] son necesarios
////minorTicks: parte los segmentos unidad en minorTicks+1 partes
//    segmentos = brd.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: den-1, majorHeight: 25, minorHeight: 10, drawLabels: false});
//    brd.create('ticks', [ax, [0]],{strokeColor: 'black', majorHeight: 25});
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
    

var FracProp;

//Esta función genera una fracción aleatoria
function RandomFrac (){
    numerador = getRandomInt(1,15);
    if(numerador > 2){ //esto porque no deseamos generar fracciones que rebasen
        denominador = getRandomInt(Math.ceil(numerador/2),15); //las 2 unidades
    }
    else{ //si el numerador es 1 o 2, el denominador puede ser cualquiera entre 1 y 15
        denominador = getRandomInt(1,15);
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
    ctx.font="30px Comic Sans"; //se despliegan las instrucciones del ejercicio
    ctx.fillText("Ubica la fracción", 50,60);
    var m = ctx.measureText("Ubica la fracción ").width+50;
    var v = ctx.measureText(numerador).width; //para dibujar los números y la raya de         
    var w = ctx.measureText(denominador).width; //la fracción de manera proporcionada
    ctx.font="40px Comic Sans"; 
    ctx.fillText(numerador,m+w/2,43);
    ctx.strokeStyle="purple";
    ctx.beginPath();
    ctx.moveTo(m ,43 +12);
    ctx.lineTo(m+ v+w, 43 +12); //se dibuja la línea de la fracción
    ctx.stroke();
    ctx.fillText(denominador,m+v/2,43+55);
    ctx.font="30px Comic Sans";
    ctx.fillText(" en la posición que le corresponde en la recta numérica.", m+v+w,60);
    ctx.fillText("Primero indica en cuantas partes quieres fraccionar las unidades,", 50,130);   
    ctx.fillText("luego haz click en el punto rojo y arrástralo a su posición correspondiente en la recta. ",50,180);
    ctx.fillText("Finalmente, verifica tu resultado.",50,230);      
};
var HaySegmentosRojos = false;  
var HaySegmentos = false;
var Frac;
    /**
     Es lo que se hace al capturar un número y dar enter
     */
    function Fracciona(num) {
        
//    posCor = brd.create('point', [numerador/denominador,0], { name: '',
//                color: 'none',  //este punto tiene la posición correcta de la
//                size: 5,  //fracción con la que trabaja el usuario, es invisible
//                highlightStrokeColor: 'none',
//                highlightFillColor: 'none'});
//    posCor.setAttribute({fixed: true});
    Frac = new Frac(ctx, numerador, denominador);
    PuntoMovil(Frac, brd, p1.X(),p1.Y());
    for (var i = 1; i <= 2*num; i++) {
             SegmentosRojos = brd.create('segment', [[(i - 1)/(num), 0], [i/(num) , 0]], {name: "", strokeColor: '',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
             SegmentosRojos.setAttribute({fixed: true});
             HaySegmentosRojos = true;
        }
     segmentos = brd.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: num-1, majorHeight: 17, minorHeight: 10, strokeWidth: 4,  drawLabels: false});
     HaySegmentos = true;
     brd.create('ticks', [ax, [0]],{strokeColor: 'black', majorHeight: 17, strokeWidth: 4,  drawLabels: false});
    };
  
 
var config2={
    handlers:{
        
    }
};

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
        
        //if(HaySegmentos){ax.removeTicks(segmentos);}
        if(HaySegmentosRojos){brd.removeObject(SegmentosRojos);}
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

var cuatrotercios = new Frac(ctx, 4,3);
Inicios(brd1);
brd1.create('ticks', [ax, 1], {strokeColor:'black', minorTicks: 2, majorHeight: 17, minorHeight: 10, strokeWidth: 4,drawLabels: false});
brd1.create('ticks', [ax, [0]],{strokeColor: 'black', majorHeight: 17, minorHeight: 10, strokeWidth: 4,drawLabels: false});
EtiquetaSup(cuatrotercios,brd1,"red");
mathField2.write('\\frac{'+cuatrotercios.x+'}{'+cuatrotercios.y+'}');
mathField2.blur();
for (var i = 1; i <= 2*(cuatrotercios.y); i++) {
             parte = brd1.create('segment', [[(i - 1)/(cuatrotercios.y), 0], [i/(cuatrotercios.y) , 0]], {name: "", strokeColor: '',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
             parte.setAttribute({fixed: true});
        }



Inicio(); //Ejecutamos Inicio(), para que de entrada le presenté un ejercicio al usuario
RandomFrac(); //generamos una fracción para que el usuario trabaje

var filtro=function(e){     
    var caracAcept="0123456789\b\x0d";  //  "\b" es backspace, \x0d enter  
    var tecla=String.fromCharCode(e.which); // which contiene el Código Ascii del caracter oprimido.
    return caracAcept.indexOf(tecla)>=0; //  si regresa falso el caracter no se captura, en otro caso se captura.   
};  

capDen.onkeypress = filtro;

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
  if(continuar){ // se asegura que el usuario haya capturado un número en el mathquill
  ctx.clearRect(0,250,canvas.width,canvas.height);
     
     if( HayAyuda0 ){brd.removeObject(txayuda0);}
     if( HayAyuda1 ){brd.removeObject(txayuda1); brd.removeObject(fracCero); brd.removeObject(fracUno); brd.removeObject(fracDos); brd.removeObject(fracUnitaria);}
     if( HayAyuda2 ){brd.removeObject(txayuda2);}
  if (p1.Dist(posCor) < 0.04){
   
      btn2.disabled = true;
      Mq_disabled = false;
      p1.setAttribute({fixed:true});
    //  ctx.fillText("Muy bien",canvas.width/2-ctx.measureText("Muy bien").width/2, 290);   
      txt = brd.create('text',[0.9,0.7, '¡Muy bien!'], {fontSize:25, color:"orange"});
      txt.setAttribute({fixed: true}); 
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
                     if (p1.Dist(posCor) < 0.1){
                       txayuda0 = brd.create('text',[0.6,0.6, 'Trata de ser preciso ubicando el punto'], {fontSize:25, color:"red"});     
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
                    highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
                    subunidad.setAttribute({fixed:true});
                    txayuda1 = brd.create('text',[0.05,0.7, 'El punto no está en la posición correcta, vuelve a intentar ahora con ayuda'], {fontSize:25, color:"red"});     
                    txayuda1.setAttribute({fixed: true}); 
                    HayAyuda1 = true;
                     }
                }
                else{
                    txayuda2 = brd.create('text',[0.3,0.7, 'Fracciona las unidades de acuerdo al denominador de la fracción dada'], {fontSize:25, color:"red"});     
                    txayuda2.setAttribute({fixed: true}); 
                    HayAyuda2 = true;
                }
        }
        
      
//            for (var i = 0; i <= 2*denominador ; i++) {
//                if(i === numerador){ 
//                }
//                else{
//                 frac = brd.create('point', [i/denominador, 0], { name: i+'/'+denominador,  
//                 color:'none',    
//                 size:5,
//                 highlightStrokeColor:'none', 
//                 highlightFillColor:'none'});
//    frac.setAttribute({fixed:true});
//    frac.label.setAttribute({fontSize: 13, offset:[-10,Math.pow(-1,i)*20]}); 
//    brd.create('ticks', [ax, [i/denominador]],{strokeColor: 'red', majorHeight: 25, drawLabels: false, fixed:true});
    //p.label.setAttribute({offset:[-6,45]});
    //brd.removeObject(b);
//    a.label.setAttribute({fontSize: 20, offset:[-6,45]}); 
//    uno.label.setAttribute({fontSize: 20, offset:[-6,45]});
//    dos.label.setAttribute({fontSize: 20, offset:[-6,45]});
                    
    
    
//  else{
//      errores++;
//      ctx.fillText("Vuelve a intentarlo",canvas.width/2-ctx.measureText("Vuelve a intentarlo").width/2,290);
//      brd.removeObject(vector);
//      ax.removeTicks(segmentos);
//      brd.removeObject(b);
//      b = brd.create('point', [1/den, 0], { name: '1/'+den,
//                 color:'none', 
//                 size:5,
//                 highlightStrokeColor:'none', 
//                 highlightFillColor:'none'});
//      b.setAttribute({fixed:true});
//      b.label.setAttribute({fontSize: 13, offset:[-13,-20]}); 
//      segmentos = brd.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: den-1, majorHeight: 25, minorHeight: 10, drawLabels: false});
//      brd.create('ticks', [ax, [0]],{strokeColor: 'black', majorHeight: 25});
//      vector = brd.create('arrow',[a,b], {color: 'blue'}); //dibujamos un vector de longitud igual a la fracción capturada
//      vector.setAttribute({fixed:true});
//        if(errores > 1){
//            brd.removeObject(c);
//            c = brd.create('point', [1, 0], { name: den+'/'+den,
//                 color:'none', 
//                 size:5,
//                 highlightStrokeColor:'none', 
//                 highlightFillColor:'none'});
//            c.setAttribute({fixed:true});
//            c.label.setAttribute({fontSize: 13, offset:[-13,-20]});
//            brd.removeObject(d);
//            d = brd.create('point', [2, 0], { name: 2*den+'/'+den,
//                 color:'none', 
//                 size:5,
//                 highlightStrokeColor:'none', 
//                 highlightFillColor:'none'});
//            d.setAttribute({fixed:true});
//            d.label.setAttribute({fontSize: 13, offset:[-13,-20]});
//        }
//        if(errores === 3){
//            brd.removeObject(c);
//            brd.removeObject(d);
//            for (var i = 0; i <= 2*denominador ; i++) {
//                if(i === numerador){ 
//                }
//                else{
//                 frac = brd.create('point', [i/denominador, 0], { name: i+'/'+denominador,  
//                 color:'none',    
//                 size:5,
//                 highlightStrokeColor:'none', 
//                 highlightFillColor:'none'});
//    frac.setAttribute({fixed:true});
//    frac.label.setAttribute({fontSize: 13, offset:[-10,Math.pow(-1,i)*20]}); 
//    brd.create('ticks', [ax, [i/denominador]],{strokeColor: 'red', majorHeight: 25, drawLabels: false, fixed:true});
//    //p.label.setAttribute({offset:[-6,45]});
//    brd.removeObject(b);
//    a.label.setAttribute({fontSize: 20, offset:[-6,45]}); 
//    uno.label.setAttribute({fontSize: 20, offset:[-6,45]});
//    dos.label.setAttribute({fontSize: 20, offset:[-6,45]});
//        }
//    }
//    }
//} }
  }
    else{
        alert("Aún no haz fraccionado las unidades");
    }
};

//función que genera un número entero al azar entre el min y el max dados
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
  
}); //termina jQuery