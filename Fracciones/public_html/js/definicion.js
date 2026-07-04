/* 
 Se muestran boards de jsxgraph algunos dos con información fija y uni interactivo, para
 trabajar una definición de fracción y su correspondiente representación gráfica en la
 recta numérica.
 */


$(document).ready(function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var btn1 = document.getElementById("Reset");
    var btn2 = document.getElementById("Verificar");
    var btn5 = document.getElementById("Muestra");
    var btn4 = document.getElementById("Verifica");
    var btn3 = document.getElementById("btn3");
    var salida = document.getElementById('salida');
    var salida1 = document.getElementById('salida1');
    var uno, dos, segmentos, segUnitario, a, numerador, cad, cadena,ax;
    var nombre = "";
    var cadNum = ["un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho",
        "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
        "veinte", "veintiún", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis"];
    var cadDen = ["unidad", "medio", "tercio", "cuarto", "quinto", "sexto", "séptimo",
        "octavo", "noveno", "décimo", "onceavo", "doceavo", "treceavo"];
    var simbolo = document.getElementById("simbolo"); 
    var simbolo2 = document.getElementById("simbolo2"); 
    var simbolofrac = document.getElementById("simbolofrac"); 
    var MQ = MathQuill.getInterface(2);
    var config = {handlers:{}};
    var config2 = {handlers:{}};
    var config3;
    var mathField = MQ.MathField(simbolo, config); 
    var mathField2 = MQ.MathField(simbolo2, config2); 
    var mathField3 = MQ.MathField(simbolofrac, config3); 
//Se crea el espacio para trabajar en jsxgraph
    var brd = JXG.JSXGraph.initBoard('box1', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
    var brd1 = JXG.JSXGraph.initBoard('box2', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: true, showCopyright: false});
    var brd2 = JXG.JSXGraph.initBoard('box3', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
    var brd5 = JXG.JSXGraph.initBoard('box5E', {boundingbox: [-0.2, 1.5, 2.2, -1], showNavigation: false, showCopyright: false});
    var brdf = JXG.JSXGraph.initBoard('boxfinal', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
    var char; // variable que contendrá la información de la fracción aleatoria, se mostrará
    //en la etiqueta del punto móvil
 
 
 
var segant;
var creaSeg= function(brd, pto, seg, despl) {
    pto.on('drag', function() {
        if (pto.parents.length !== 0 ) {
          if (seg === undefined ) {
            pto.setAttribute({attractorDistance: 2.0});
            seg= brd.create('segment' ,[[0,0], pto], {color: pto.setAttribute('color'), strokeWidth: 4});
          }
          else {
            if (segant !== undefined && segant !== seg) {
                segant.setAttribute({color: 'none'});
            }
            seg.setAttribute({color: pto.setAttribute('color')});
          }
        
        }        
    });
    pto.on('mouseup', function() {
       if (pto.parents.length !== 0 && seg !== undefined ) { 
         segres= brd.create('segment', [ [pto.X(), pto.Y() + despl], [0, despl], 
                                       function() { return seg.L(); } ] ,
                                      { color: pto.getAttribute('color'), strokeWidth: 3, fixed: true});
         segant= seg;
       }
    });
};
 

   var denominador = getRandomInt(2, 13); //el denominador puede ser cualquier número entre 2 y 13
   var r = getRandomInt(2, 2 * denominador); //elige un numerador al azar para mostrar la fracción 
    //con este numerador y denominador elegido en el paso anterior
    var q;
    var name;
    mathField.write('\\frac{1}{'+denominador+'}');
    mathField2.write('\\frac{'+r+'}{'+denominador+'}');
    mathField3.write('\\frac{\\square}{\\square}');
 function EtiquetaInf(fraccion, board, color) {
            pnumerador = board.create('point', [fraccion.x/fraccion.y, 0], {name: fraccion.x,
                color: color, //este punto tiene la posición correcta de la
                size: 3, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
            pnumerador.setAttribute({fixed: true});
             if(fraccion.x<10){
            pnumerador.label.setAttribute({color: 'black', fontSize: 14, offset: [-5, -25]}); //offset para la posición de la etiqueta respecto al punto     
          
            raya = board.create('point', [fraccion.x/fraccion.y, 0], {name: '----',
                color: color, //este punto tiene la posición correcta de la
                size: 3, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
           
            raya.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -32]}); //offset para la posición de la etiqueta respecto al punto     
             }
            else{
                pnumerador.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -25]});
                raya = board.create('point', [fraccion.x/fraccion.y, 0], {name: '-----',
                color: color, //este punto tiene la posición correcta de la
                size: 3, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
                raya.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -32]}); //offset para la posición de la etiqueta respecto al punto     
            }
            raya.setAttribute({fixed: true});
            
            pdenominador = board.create('point', [fraccion.x/fraccion.y, 0], {name: fraccion.y,
                color: color, //este punto tiene la posición correcta de la
                size: 3, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
            if(fraccion.y<10){
                pdenominador.label.setAttribute({color: 'black', fontSize: 14, offset: [-5, -45]}); //offset para la posición de la etiqueta respecto al punto     
            }
            else{
                pdenominador.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -45]});
            }
            pdenominador.setAttribute({fixed: true});
        }; 



//Esta función contiene todas las instrucciones que se deben
//ejecutar al inicio. e: para elegir uno de los 3 boards,
//j=1 indica el número de uno de los tres boards
//No se está trabajando con un sistema coordenado, ya que pa no causar distracciones
//sólo se desea trabajar con el eje X, pero no es posible en jsxgraph desaparecer el eje Y
//por ello se ha dibujado el eje X empleando diversos objetos de jsxgraph

 
var txtq;
    function Inicio(e, j) { 
        
        ax = e.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X

        uno = e.create('point', [1, 0], {name: '1', //creamos el punto 1
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        uno.setAttribute({fixed: true});
        uno.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        dos = e.create('point', [2, 0], {name: '2', //creamos el punto 2
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        dos.setAttribute({fixed: true});
        dos.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        a = e.create('point', [0, 0], {name: '0', //creamos el punto 0
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        a.setAttribute({fixed: true});
        a.label.setAttribute({fontSize: 20, offset: [-6, 30]});

//las siguientes ticks(marcas), son necesarias, la primera para que ponga marcas en los enteros
//la segunda para ponga la marca en el cero, de lo contrario no la pone, los corchetes [0] son necesarios
//minorTicks: parte los segmentos unidad en minorTicks+1 partes
        segmentos = e.create('ticks', [ax, [2]], {strokeWidth:4,strokeColor: 'black', minorTicks: 0,majorHeight: 17, minorHeight: 10, drawLabels: false});
        segmentos.setAttribute({fixed: true}); 
        d=e.create('ticks', [ax, [1]], {strokeWidth:4,strokeColor: 'black', majorHeight: 17});
        d.setAttribute({fixed: true});
        c=e.create('ticks', [ax, [0]], {strokeWidth:4,strokeColor: 'black', majorHeight: 17});
        c.setAttribute({fixed: true});
        numerador = 1;
        nombre = LeeFrac(1, denominador);
        
        salida.innerHTML = "En el siguiente recuadro se muestra la recta numérica, si dividimos el segmento [0,1] en " + denominador + " partes iguales (subsegmentos), cada una de las partes recibe el nombre de " + "<span style=\"color:darkcyan\">"+ nombre + "</span>"+" y se representa con el símbolo:";
        salida.style.color="black";
       if (j === 1) {  //board1
            segUnitario = brd.create('segment', [[0, 0], [1, 0]], {strokeColor: 'black'});
//            brd.create('ticks', [ax, [0]], {strokeColor: 'black', strokeWidth: 4,   majorHeight: 17, minorHeight: 10, drawLabels: false});
//            brd.create('ticks', [ax, [1]], {strokeColor: 'black', strokeWidth: 4,   majorHeight: 17, minorHeight: 10, drawLabels: false});
            brd.create('ticks', [segUnitario, 1], {strokeColor: 'black', strokeWidth: 4,  minorTicks: denominador - 1, majorHeight: 17, minorHeight: 10, drawLabels: false});
            segUnitario.setAttribute({fixed: true});
            parte = brd.create('segment', [[0, 0], [1 / denominador, 0]], {name: "", strokeColor: 'blue',
                highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
            parte.setAttribute({fixed: true});
             for (var i = 1; i <= denominador; i++) {
                parte = brd.create('segment', [[(i - 1) / denominador, 0], [i / denominador, 0]], {name: "", strokeColor: '',
                    highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
                parte.setAttribute({fixed: true});
            }
                fraccion1 = new Frac(ctx, 1, denominador);
                EtiquetaInf(fraccion1,brd,"red");
                txt = brd.create('text',[-0.03,0.8, 'Pasa el mouse sobre los subsegmentos y cuenta en cuántos de ellos se dividió el segmento [0,1]'], {fontSize:17, color:"grey"});  
                txt.setAttribute({fixed:true});
       }
        cadena = " En este caso, el segmento azul mostrado representa " + r + " copias de " + nombre + ", por ello recibe el nombre de " +"<span style=\"color:darkcyan\">"+ cadNum[r-1]  + " " + cadDen[denominador-1] +"s" +"</span>"+ " y se representa por el símbolo:";
  
        salida1.innerHTML = "Si ahora dividimos no solo el segmento [0,1], sino también los segmentos [1,2], [2,3], etc., en " + denominador + " partes iguales,  entonces se tiene una secuencia infinita de " + cadDen[denominador - 1] + "s (la cual puedes explorar usando las flechas que aparecen en la parte inferior del siguiente recuadro)." + cadena;
        salida1.style.color="black";
        if (j === 2) {  //board2
             txt = brd1.create('text',[0.4,0.8, 'Cuenta cuántos subsegmentos forman el segmento azul'], {fontSize:17, color:"grey"});  
                txt.setAttribute({fixed:true});
            ax1 = brd1.create('line', [[0, 0], [1, 0]], {strokeColor: 'black'});
            ax1.setAttribute({fixed: true});
            for (var i = -10; i < 11; i++) {
                point = brd1.create('point', [i, 0], {name: i, //creamos el punto i
                    color: 'none',
                    highlightStrokeColor: 'none',
                    highlightFillColor: 'none', showInfobox: false});
                point.setAttribute({fixed: true});
                point.label.setAttribute({fontSize: 20, offset: [-6, 30]});
                point.setAttribute({fixed: true});
            }

            segDeCeroADos = brd1.create('segment', [[0, 0], [2, 0]], {strokeColor: 'black'});
            segDeCeroADos.setAttribute({fixed: true});
            
            brd1.create('ticks', [ax, 1], {strokeColor: 'black',strokeWidth: 4, minorTicks: denominador - 1, majorHeight: 17, minorHeight: 10, drawLabels: false});
            parte = brd1.create('segment', [[0, 0], [r / denominador, 0]], {name: "", strokeColor: 'blue',
                highlightStrokeColor: 'blue', strokeWidth: 5, drawLabels: false});
            parte.setAttribute({fixed: true});
            //brd1.create('ticks', [ax, [0]], {strokeColor: 'black', strokeWidth: 4,   majorHeight: 17, minorHeight: 10, drawLabels: false});
            fraccion2 = new Frac(ctx, r, denominador);
            EtiquetaInf(fraccion2,brd1, "red");
           parte = brd1.create('segment', [[0 / denominador, 0], [r / denominador, 0]], {name: "", strokeColor: '',
                    highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
                parte.setAttribute({fixed: true});
//            for (var i = 1; i <= 2 * denominador; i++) {
//                parte = brd1.create('segment', [[(i - 1) / denominador, 0], [i / denominador, 0]], {name: "", strokeColor: '',
//                    highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
//                parte.setAttribute({fixed: true});
//            }
        }
        if (j === 3) { //board3
            ax2 = brd2.create('line', [[0, 0], [1, 0]], {strokeColor: 'black'});
            ax2.setAttribute({fixed: true});
            segDeCeroADos = brd2.create('segment', [[0, 0], [2, 0]], {strokeColor: 'black'});
            segDeCeroADos.setAttribute({fixed: true});
            brd2.create('ticks', [ax2, 1], {strokeColor: 'black', strokeWidth: 4,minorTicks: denominador - 1, majorHeight: 17, minorHeight: 10, drawLabels: false});
            for (var i = 1; i <= 2 * denominador; i++) {
                parte = brd2.create('segment', [[(i - 1) / denominador, 0], [i / denominador, 0]], {name: "", strokeColor: '',
                    highlightStrokeColor: 'blue', strokeWidth: 5, drawLabels: false});
                parte.setAttribute({fixed: true});
            }
             txt = brd2.create('text',[0.42,-0.9, 'El punto te indica el número de copias que debes tomar'], {fontSize:17, color:"gray"});
             txt.setAttribute({fixed:true});
        }
        if (j === 4) {  //board4
            ax1 = brd3.create('line', [[0, 0], [1, 0]], {strokeColor: 'black'});
            ax1.setAttribute({fixed: true});
            for (var i = -10; i < 11; i++) {
                point = brd3.create('point', [i, 0], {name: i, //creamos el punto i
                    color: 'none',
                    highlightStrokeColor: 'none',
                    highlightFillColor: 'none', showInfobox: false});
                point.setAttribute({fixed: true});
                point.label.setAttribute({fontSize: 20, offset: [-6, 30]});
                point.setAttribute({fixed: true});
            }

            segDeCeroADos = brd3.create('segment', [[0, 0], [2, 0]], {strokeColor: 'black'});
            segDeCeroADos.setAttribute({fixed: true});
            brd3.create('ticks', [ax1, 1], {strokeColor: 'black',strokeWidth: 4, minorTicks: denominador - 1, majorHeight: 17, minorHeight: 10, drawLabels: false});

            q = getRandomInt(2, 2 * denominador); 
            p = brd3.create('point', [q / denominador, 0], {name: "", color: 'blue', size:6, showInfobox: false});

            p.setAttribute({fixed: true});
            for (var i = 1; i <= 2 * denominador; i++) {
                parte = brd3.create('segment', [[(i - 1) / denominador, 0], [i / denominador, 0]], {name: "", strokeColor: '',
                    highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
                parte.setAttribute({fixed: true});
            }
            
        }
        if(j === 5){
            ax2 = brd5.create('line', [[0, 0], [1, 0]], {strokeColor: 'black'});
            ax2.setAttribute({fixed: true});
            segDeCeroADos = brd5.create('segment', [[0, 0], [2, 0]], {strokeColor: 'black'});
            segDeCeroADos.setAttribute({fixed: true});
            brd5.create('ticks', [ax2, 1], {strokeColor: 'black', strokeWidth: 4,minorTicks: denominador - 1, majorHeight: 17, minorHeight: 10, drawLabels: false});
            for (var i = 1; i <= 2 * denominador; i++) {
                parte_i = brd5.create('segment', [[(i-1) / denominador, 0], [i / denominador, 0]], {name: "", strokeColor: '',
                    highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
                parte_i.setAttribute({fixed: true});
            } 
             txtq = brd5.create('text',[0.42,-0.9, 'El punto te indica el número de copias que debes tomar'], {fontSize:17, color:"gray"});
             txtq.setAttribute({fixed:true});
        }
        if(j === 6 ){
              ax2 = brdf.create('line', [[0, 0], [1, 0]], {strokeColor: 'black'});
              ax2.setAttribute({fixed: true});
              brdf.create('ticks', [ax2, 1], {strokeColor: 'black', strokeWidth: 4,minorTicks: denominador - 1, majorHeight: 17, minorHeight: 10, drawLabels: false});
              A = brdf.create('point', [0, 0], {color: 'none', name:"", showInfobox: false});
              A.setAttribute({fixed: true});
              B = brdf.create('point', [1/denominador, 0], {size:4, name:"", attractors: [ax2], attractorDistance: 2, showInfobox: false});
              l1 = brdf.create('segment', [A, B],{strokeWidth: 5});
              RandomFrac(brdf);
              txt = brdf.create('text',[0.55,0.8, 'Arrastra el punto rojo hacia otras marcas'], {fontSize:17, color:"orange"});  
              txt.setAttribute({fixed:true});
        }
        };

//Esta función genera una fracción aleatoria
    function RandomFrac(brd) {     
        for (var i = 0; i <= 2 * denominador; i++) {
            parte = brd.create('segment', [[i / denominador, 0], [(i + 1) / denominador, 0]], {name: char, strokeColor: '',
                highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: true});
            parte.setAttribute({fixed: true});
            fraccion3 = new Frac(ctx, i*numerador, denominador);
            EtiquetaInf(fraccion3,brd, "none");
        }
    };

  Inicio(brd, 1); //Ejecutamos Inicio(), para que de entrada le presenté un ejercicio al usuario
  Inicio(brd1, 2);
  Inicio(brd2, 3);
  Inicio(brd5, 5);
  Inicio(brdf,6);
  
  var p1, p12, p13, p2, p22, p23, p3, p32, p33, p4, p42, p43;
  var seg1, seg2, seg3, seg4;

function PuntoMovil1(fracx,fracy, CorX, CorY, color){
            p1 = brd5.create('point', [CorX, CorY], {attractors: [ax2], attractorDistance: 1, name: fracx, color: color, size:6, showInfobox: false});
            creaSeg(brd5,p1, seg1, 0.05);

            if( fracx < 10){
                p1.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 45]}); 
                p12 = brd5.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: '----', color: 'none', showInfobox: false});
                p12.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            else{
                p1.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 45]}); 
                p12 = brd5.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: '----', color: 'none', showInfobox: false});
                p12.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            p13 = brd5.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: fracy, color: 'none', showInfobox: false});
            if(fracy < 10){
                p13.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 25]});         
            }
            else{
                p13.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 25]});
            }
};
function PuntoMovil2(fracx, fracy, CorX, CorY, color){
            p2 = brd5.create('point', [CorX, CorY], {name: fracx, color: color, size:6, showInfobox: false, attractors: [ax2], attractorDistance: 2});
            creaSeg(brd5,p2, seg2, 0.1);
            if( fracx < 10){
                p2.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 45]}); 
                p22 = brd5.create('point', [function(){ return p2.X();}, function(){ return p2.Y();}], {name: '----', color: 'none', showInfobox: false});
                p22.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            else{
                p2.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 45]}); 
                p22 = brd5.create('point', [function(){ return p2.X();}, function(){ return p2.Y();}], {name: '----', color: 'none', showInfobox: false});
                p22.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            p23 = brd5.create('point', [function(){ return p2.X();}, function(){ return p2.Y();}], {name: fracy, color: 'none', showInfobox: false});
            if(fracy < 10){
                p23.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 25]});         
            }
            else{
                p23.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 25]});
            }
};
function PuntoMovil3(fracx, fracy, CorX, CorY,color){
            p3 = brd5.create('point', [CorX, CorY], {name: fracx, color: color, size:6, showInfobox: false});
            if( fracx < 10){
                p3.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 45]}); 
                p32 = brd5.create('point', [function(){ return p3.X();}, function(){ return p3.Y();}], {name: '----', color: 'none', showInfobox: false});
                p32.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            else{
                p3.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 45]}); 
                p32 = brd5.create('point', [function(){ return p3.X();}, function(){ return p3.Y();}], {name: '----', color: 'none', showInfobox: false});
                p32.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            p33 = brd5.create('point', [function(){ return p3.X();}, function(){ return p3.Y();}], {name: fracy, color: 'none', showInfobox: false});
            if(fracy < 10){
                p33.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 25]});         
            }
            else{
                p33.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 25]});
            }
};function PuntoMovil4(fracx, fracy, CorX, CorY,color){
            p4 = brd5.create('point', [CorX, CorY], {name: fracx, color: color, size:6, showInfobox: false});
            if( fracx < 10){
                p4.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 45]}); 
                p42 = brd5.create('point', [function(){ return p4.X();}, function(){ return p4.Y();}], {name: '----', color: 'none', showInfobox: false});
                p42.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            else{
                p4.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 45]}); 
                p42 = brd5.create('point', [function(){ return p4.X();}, function(){ return p4.Y();}], {name: '----', color: 'none', showInfobox: false});
                p42.label.setAttribute({color: color, fontSize: 18, offset: [-12, 38]});
            }
            p43 = brd5.create('point', [function(){ return p4.X();}, function(){ return p4.Y();}], {name: fracy, color: 'none', showInfobox: false});
            if(fracy < 10){
                p43.label.setAttribute({ color: color, fontSize: 16, offset: [-5, 25]});         
            }
            else{
                p43.label.setAttribute({ color: color, fontSize: 16, offset: [-10, 25]});
            }
};

  
    
   // RandomFrac(brd2); //generamos una fracción para que el usuario trabaje
    //RandomFrac(brd5);
    var d1, d2, d3, d4, num, indice;
    
    var subcadena = cadNum.slice(1, 2 * denominador);
    function Subcadena() {
        num = getRandomInt(0, subcadena.length - 1);
        nombre = subcadena[num];
        for(var i=0; i<26; i++){
        if(subcadena[num] === cadNum[i])
        { indice = i+1;
        }
        }
        subcadena.splice(num, 1, subcadena[subcadena.length - 1]);
        subcadena.pop(); 
    }
    var s1, s2, s3, s4, cade, se1;
    color = ["salmon", "firebrick", 'limegreen',"darkmagenta"];
       
    for (var i = 0; i < 4; i++) {
        Subcadena();
        cade = nombre + " " + cadDen[denominador - 1] + "s";
        
        if(i === 0){
        s1 = brd2.create('point', [i * 0.6, 0.60], {name: cade, color: color[i], showInfobox: false, attractors: [ax2], attractorDistance: 2});
        s1.setAttribute({size: 5});
        s1.label.setAttribute({fontSize:18, color: color[i], offset: [10, 20]}); 
        creaSeg(brd2,s1, se1, 0.1);
        d1 = indice/denominador;
        PuntoMovil1(indice, denominador, (i+1)*0.4, 0.65, color[i]);
        }
        if(i === 1){
        s2 = brd2.create('point', [i * 0.6, 0.60], {name: cade, color: color[i], showInfobox: false}); 
        s2.setAttribute({size: 5});
        s2.label.setAttribute({fontSize:18, color: color[i], offset: [10, 20]}); 
        d2 = indice/denominador;
        PuntoMovil2(indice, denominador, (i+1)*0.4, 0.65, color[i]);
        }
        if(i === 2){
        s3 = brd2.create('point', [i * 0.6, 0.60], {name: cade, color: color[i], showInfobox: false});
        s3.setAttribute({ size: 5});
        s3.label.setAttribute({fontSize:18, color: color[i], offset: [10, 20]}); 
        d3 = indice/denominador;
        PuntoMovil3(indice, denominador, (i+1)*0.4, 0.65, color[i]);
        }
         if(i === 3){
             if(denominador === 2){
                s4 = brd2.create('point', [3 * 0.6, 0.60], {name: "un medio", color: color[3], showInfobox: false});
                s4.setAttribute({size: 5});
                s4.label.setAttribute({fontSize:20, color: "darkmagenta",offset: [10, 20]}); 
                d4 = 0.5;
                PuntoMovil4(1, 2, (i+1)*0.4, 0.65, color[i]);
                     }
             else{
                s4 = brd2.create('point', [i * 0.6, 0.60], {name: cade, color: color[i], showInfobox: false});
                s4.setAttribute({size: 5});
                s4.label.setAttribute({fontSize:18, color: color[i], offset: [10, 20]}); 
                d4 = indice/denominador;
                PuntoMovil4(indice, denominador, (i+1)*0.4, 0.65, color[i]);
             }
        }
    }
    
   

btn1.onclick = function(){ //botón Reiniciar
document.location.reload();   
};



var continuar;

var txt;

btn2.onclick = function(){ //botón Verificar
    if(continuar === 1){
       brd2.removeObject(txt);
    }
      if(  Math.abs(s1.Y())<0.1  && Math.abs(s2.Y())<0.1 && Math.abs(s3.Y())<0.1 && Math.abs(s4.Y())<0.1 ){
         
          if( (Math.sqrt((s1.X()-d1)*(s1.X()-d1))<0.04) && (Math.sqrt((s2.X()-d2)*(s2.X()-d2))<0.04) && (Math.sqrt((s3.X()-d3)*(s3.X()-d3))<0.04) && (Math.sqrt((s4.X()-d4)*(s4.X()-d4))<0.04) ){
              txt = brd2.create('text',[0.85,0.8, '¡Muy bien!'], {fontSize:25, color:"orange"});
              txt.setAttribute({fixed:true});
               RandomFrac(brd2);
               $( "#Verificar" ).prop( "disabled", true );
             
                segcolor = brd2.create('segment', [[0, 0.02], [d1, 0.02]], {strokeColor: 'salmon',
                highlightStrokeColor: 'salmon', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
                segcolor = brd2.create('segment', [[0, -0.05], [d2, -0.05]], {strokeColor: 'firebrick',
                highlightStrokeColor: 'firebrick', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
                segcolor = brd2.create('segment', [[0, 0.08], [d3, 0.08]], {strokeColor: 'limegreen',
                highlightStrokeColor: 'limegreen', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
                segcolor = brd2.create('segment', [[0, 0.12], [d4, 0.12]], {strokeColor: 'darkmagenta', 
                highlightStrokeColor: 'darkmagenta', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
             
          }
          else{
             txt = brd2.create('text',[0.1,0.8, 'Algunos puntos no están en la posición correcta, revisa la lectura previa'], {fontSize:20, color:"red"});  
             txt.setAttribute({fixed:true});
          }
            continuar = 1;
         }
         else{
             alert("Debes colocar todos los puntos en su lugar correspondiente sobre la recta");
         }
};


var continuar2;

var txt2;
btn4.onclick = function(){ //botón Verifica
    if(continuar2 === 1){
       brd5.removeObject(txt2);
    }
      if(  Math.abs(p1.Y())<0.1  && Math.abs(p2.Y())<0.1 && Math.abs(p3.Y())<0.1 && Math.abs(p4.Y())<0.1 ){
         
          if( (Math.sqrt((p1.X()-d1)*(p1.X()-d1))<0.04) && (Math.sqrt((p2.X()-d2)*(p2.X()-d2))<0.04) && (Math.sqrt((p3.X()-d3)*(p3.X()-d3))<0.04) && (Math.sqrt((p4.X()-d4)*(p4.X()-d4))<0.04) ){
              txt2 = brd5.create('text',[0.85,1.1, '¡Muy bien!'], {fontSize:25, color:"orange"});
              txt2.setAttribute({fixed:true});
             
              txt2 = brd5.create('text',[0.74,-0.9, 'Avanza a la segunda parte'], {fontSize:15, color:"orange"});
              txt2.setAttribute({fixed:true});
              brd5.removeObject(txtq);
               RandomFrac(brd5);
               $( "#Verifica" ).prop( "disabled", true );
               $( "#Muestra" ).prop( "disabled", false );
               $('#Muestra').css( 'cursor', 'pointer' ); //cambiamos la apariencia del cursor, de  no permitido a la manita
                segcolor = brd5.create('segment', [[0, 0.02], [d1, 0.02]], {strokeColor: 'salmon',
                highlightStrokeColor: 'salmon', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
                segcolor = brd5.create('segment', [[0, -0.05], [d2, -0.05]], {strokeColor: 'firebrick',
                highlightStrokeColor: 'firebrick', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
                segcolor = brd5.create('segment', [[0, 0.08], [d3, 0.08]], {strokeColor: 'limegreen',
                highlightStrokeColor: 'limegreen', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
                segcolor = brd5.create('segment', [[0, 0.12], [d4, 0.12]], {strokeColor: 'darkmagenta', 
                highlightStrokeColor: 'darkmagenta', strokeWidth: 4, drawLabels: true});
                segcolor.setAttribute({fixed: true});
             
          }
          else{
             txt2 = brd5.create('text',[0.08,1.1, 'Algunos puntos no están en la posición correcta, revisa la lectura previa'], {fontSize:20, color:"red"});  
             txt2.setAttribute({fixed:true});
          }
            continuar2 = 1;
         }
         else{
             alert("Debes colocar todos los puntos en su lugar correspondiente sobre la recta");
         }
};

//función que genera un número entero al azar entre el min y el max dados
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function LeeFrac(p, q) { //para leer el nombre de una fracción
        if (p === 1) {
            cad = cadNum[p - 1] + ' ' + cadDen[q - 1];
        }
        else {
            cad = cadNum[p - 1] + ' ' + cadDen[q - 1] + "s";
        }
        return cad;
    };

 $('#Muestra').on('click',function(){
//      $('#arrow').show('slow');
      $('#actividad2').show('slow');
      $('#fracnum').focus();
   });
   
   //segunda parte

    var filtro = function(e) {
        var caracAcept = "éóúacdehimnopqrstuvxz\b";  //  "\b" es backspace, \x0d enter  
       var tecla=String.fromCharCode(e.which);
        return caracAcept.indexOf(tecla) >= 0; //  si regresa falso el caracter no se captura, en otro caso se captura.   
    };
    
  var brd3 = JXG.JSXGraph.initBoard('box4', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
  Inicio(brd3,4);
  var Rnum = document.getElementById("fracnum");
  Rnum.onkeypress = filtro;
  var Rden = document.getElementById("fracden");
  Rden.onkeypress = filtro; 
  var mensj = brd3.create('text',[0.3,-0.75, 'Pasa el mouse sobre los segmentos para que puedas contarlos'], {fontSize:18, color:"grey"});
  mensj.setAttribute({fixed: true});
var borra;
btn3.onclick = function(){ //botón Verificar (segunda parte)
    
    if(borra === 1){
       brd3.removeObject(tx);
    }
if(Rnum.value!=="" && Rden.value!==""){
     for(i=0; i<=2*denominador; i++ ){
         fraccion4 = new Frac(ctx, i, denominador);
         EtiquetaInf(fraccion4,brd3, "none");
//            posCor = brd3.create('point', [i/denominador, 0], {name: i,
//                color: 'none', //este punto tiene la posición correcta de la
//                size: 5, //fracción con la que trabaja el usuario, es invisible
//                highlightStrokeColor: 'none',
//                highlightFillColor: 'none'});
//            posCor.setAttribute({fixed: true});
//             if(i<10){
//            posCor.label.setAttribute({color: 'black', fontSize: 14, offset: [-1, -25]}); //offset para la posición de la etiqueta respecto al punto     
//            raya = brd3.create('point', [i / denominador, 0], {name: '---',
//                color: 'none', //este punto tiene la posición correcta de la
//                size: 5, //fracción con la que trabaja el usuario, es invisible
//                highlightStrokeColor: 'none',
//                highlightFillColor: 'none'});
//            raya.label.setAttribute({color: 'black', fontSize: 14, offset: [-5, -32]}); //offset para la posición de la etiqueta respecto al punto     
//             }
//            else{
//             raya = brd3.create('point', [i / denominador, 0], {name: '----',
//                color: 'none', //este punto tiene la posición correcta de la
//                size: 5, //fracción con la que trabaja el usuario, es invisible
//                highlightStrokeColor: 'none',
//                highlightFillColor: 'none'});
//                raya.label.setAttribute({color: 'black', fontSize: 14, offset: [-7, -25]});
//            }
//            raya.setAttribute({fixed: true});
//            posCor = brd3.create('point', [i / denominador, 0], {name: denominador,
//                color: 'none', //este punto tiene la posición correcta de la
//                size: 5, //fracción con la que trabaja el usuario, es invisible
//                highlightStrokeColor: 'none',
//                highlightFillColor: 'none'});
//            if(denominador<10){
//                posCor.label.setAttribute({color: 'black', fontSize: 14, offset: [-1, -45]}); //offset para la posición de la etiqueta respecto al punto     
//            }
//            else{
//                posCor.label.setAttribute({color: 'black', fontSize: 14, offset: [-5, -45]});
//            }
//            posCor.setAttribute({fixed: true});
        }
    if(Rden.value===cadDen[denominador-1]+"s" && Rnum.value===cadNum[q-1]){
             $('#Definicion').show('slow');
            tx = brd3.create('text',[0.85,0.8, '¡Muy bien!'], {fontSize:25, color:"orange"});
            tx.setAttribute({fixed: true});
            $( "#btn3" ).prop( "disabled", true );
            brd3.removeObject(mensj);
            name = cadNum[q-1] + " " +cadDen[denominador-1]+"s";
            p = brd3.create('point', [q/denominador,0], {name: name, color:'', showInfobox: false});
            p.label.setAttribute({color: 'blue', fontSize: 20, offset: [10, 20]}); 
            p.setAttribute({fixed: true});
            }
        else{
            tx = brd3.create('text',[0.3,0.8, 'Tienes un error, inténtalo otra vez, ahora con ayuda'], {fontSize:20, color:"red"});
            tx.setAttribute({fixed: true});
            }
            brd3.update();
            borra = 1;
    }
else{
  alert("Respues no válida");
}


/**
     Función que recibe una fracción, la ubica en la recta y la etiqueta inferiormente
     */
   

};

 $('#muestra-acentua').on('click',function(){
      $('#acentua').toggle('slow');
   });


        
//var s, t;
//var segant;
//creaSeg(p, s, 0.15);
//creaSeg(q, t, 0.25);


}); //termina jQuery

