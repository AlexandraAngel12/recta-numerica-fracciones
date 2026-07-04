/* 
Se estudian las fracciones equivalentes
 */

$(document).ready(function() {
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var salida = document.getElementById('salida');
var salida2 = document.getElementById('salida2');
var btn1 = document.getElementById("Continuar");
var btn2 = document.getElementById("Siguiente");
var btn3 = document.getElementById("Verificar");
var btn4 = document.getElementById("OtroEjemplo");
var btn5 = document.getElementById("btn5");
var btn6 = document.getElementById("btn6"); //botón continuar última parte
var btn7 = document.getElementById("btn7");
var btn8 = document.getElementById("conti");

//$("#btn6").prop( "disabled", false ); 

var brd1 = JXG.JSXGraph.initBoard('box1', {boundingbox: [-0.2, 2.6, 2.2, -1], showNavigation: false, showCopyright: false});
var brd2 = JXG.JSXGraph.initBoard('box2', {boundingbox: [-0.2, 2.6, 2.2, -1.1], showNavigation: false, showCopyright: false});
var brd3 = JXG.JSXGraph.initBoard('box3', {boundingbox: [-0.2, 2.65, 2.2, -1.1], showNavigation: false, showCopyright: false});
var brd4 = JXG.JSXGraph.initBoard('boxespecial', {boundingbox: [-0.2, 2.6, 2.2, -1], showNavigation: false, showCopyright: false});
var brd5 = JXG.JSXGraph.initBoard('boxespecial2', {boundingbox: [-0.2, 2.6, 2.2, -1.1], showNavigation: false, showCopyright: false});
var p1;
var unmedio = new Frac(ctx,1,2);
var untercio = new Frac(ctx,1,3);
var unquinto = new Frac(ctx,1,5);
var dosquintos = new Frac(ctx,2,5);
var cincocuartos = new Frac(ctx,5,4);
var fracciones =[unmedio, untercio, unquinto, dosquintos, cincocuartos];

var uncuarto = new Frac(ctx,1,4);
var unoctavo = new Frac(ctx,1,8);
var dostercios = new Frac(ctx,2,3);
var unsexto = new Frac(ctx,1,6);
var cuatrotercios = new Frac(ctx,4,3);
var uno = new Frac(ctx,1,1);
var dos = new Frac(ctx,2,1);
//var ejercicios = [uno, unquinto , dostercios, unmedio, unoctavo, uncuarto, unsexto, cuatrotercios];
var ejercicios = [uno, unquinto , dostercios, uncuarto, cuatrotercios];
    /**
     Dibuja el eje X del 0 al 2, con etiquetas superiores
     */
    function Inicio(board) {
        ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        
        uno = board.create('point', [1, 0], {name: '1', //creamos el punto 1
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        uno.setAttribute({fixed: true});
        uno.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        dos = board.create('point', [2, 0], {name: '2', //creamos el punto 2
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        dos.setAttribute({fixed: true});
        dos.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        cero = board.create('point', [0, 0], {name: '0', //creamos el punto 0
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        cero.setAttribute({fixed: true});
        cero.label.setAttribute({fontSize: 20, offset: [-6, 30]});
        
        segmentos = board.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: 0, majorHeight: 15, minorHeight: 12, drawLabels: false});
        segmentos.setAttribute({fixed: true}); 
        board.create('ticks', [ax, [0]], {strokeColor: 'black', majorHeight: 20});
        segDeCeroADos = board.create('segment', [[0, 0], [2, 0]], {strokeColor: 'black'});
        segDeCeroADos.setAttribute({fixed: true});  
    };
    
    //Esta función recibe dos parámetros, el board en el que va a dibujar y el número de
    //ejercicios o problemas. Dibujará puntos que muestren al usuario lo que ha avanzado y lo que le falt
    function BarraProgresiva(board, total, ejercicio) {
        etiqueta = ejercicio;
        ejercicio = ejercicio -1;
        linea = board.create('segment', [[0.5, 2.2], [1.5, 2.2]], {strokeColor: 'lightgray', strokeWidth:4});
        linea.setAttribute({fixed: true});  
        delta = 1/(total-1);
        for (var i = 0; i < total; i++) {
        puntos = board.create('point', [0.5+(i*delta), 2.2], {name: '', color: 'lightgray', size:7, face:'<>', showInfobox: false});    
        puntos.setAttribute({fixed: true});
        }
        punto = board.create('point', [0.5+(ejercicio*delta), 2.2], {name: etiqueta+' de '+ total, color: 'gray', size:7, face:'<>', showInfobox: false});    
        punto.setAttribute({fixed: true});
    };
    

    /**
     Tiene como parámetro una fracción a/b, y dibuja en el board una recta numérica
     partida en segmentos de longitud factor*b. Donde factor pertenece al conjunto {2,3,4}
     */
 
 var factor;
     function BoardOne(fraccion, board, muestra) {
        if( fraccion.y === 5 ){
             factor = getRandomInt(2, 3);  //si dibuja veinteavos, que ocurre con 5*4, se ve muy amontonado 
        }
        else{
             factor = getRandomInt(2, 4); 
        }
        ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        
        uno = board.create('point', [1, 0], {name: '1', //creamos el punto 1
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        uno.setAttribute({fixed: true});
        uno.label.setAttribute({color: "red",fontSize: 20, offset: [8, 20]});
        dos = board.create('point', [2, 0], {name: '2', //creamos el punto 2
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        dos.setAttribute({fixed: true});
        dos.label.setAttribute({color: "red",fontSize: 20, offset: [8, 20]});
        cero = board.create('point', [0, 0], {name: '0', //creamos el punto 0
            color: 'none',
            highlightStrokeColor: 'none',
            highlightFillColor: 'none', showInfobox: false});
        cero.setAttribute({fixed: true});
        cero.label.setAttribute({color: "red",fontSize: 20, offset: [8, 20]});
        
        segmentos = board.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: 0, majorHeight: 15, minorHeight: 12, drawLabels: false});
        segmentos.setAttribute({fixed: true}); 
    
        segDeCeroADos = board.create('segment', [[0, 0], [2, 0]], {strokeColor: 'black'});
        segDeCeroADos.setAttribute({fixed: true});  
    
        board.create('ticks', [ax,[0,0]],{strokeColor: 'black', strokeWidth:4, majorHeight: 17, minorHeight: 10, drawLabels: false});
        board.create('ticks', [ax, 1], {strokeColor: 'black', strokeWidth:4, minorTicks: factor*(fraccion.y) - 1, majorHeight: 17, minorHeight: 10, drawLabels: false});
        for (var i = 0; i <= 2*factor*fraccion.y; i++) {
            frac = new Frac(ctx, i, factor*fraccion.y);
            EtiquetaInf(frac, board, "black");
        }  
         if(muestra){
            salida.innerHTML = "Por ejemplo: "+ "<span style=\"color:darkcyan\">"+ fraccion.x+ "/"+fraccion.y+ " y "+ factor*fraccion.x+"/"+factor*fraccion.y+ "</span>"+", son fracciones equivalentes, como lo puedes verificar en la recta numérica.";
             
            parte = board.create('segment', [[0, 0], [fraccion.x/fraccion.y, 0]], {name: "", strokeColor: 'blue',
            highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
            parte.setAttribute({fixed: true});
           //ubicamos la fracción recibida y la etiquetamos con una etiqueta superior
            
            for (var i = 0; i <= factor*fraccion.y; i++) {
                frac = new Frac(ctx, i, fraccion.y);
                EtiquetaSup(frac, board, "none",14);
            } 
            
            EtiquetaSup(fraccion, board, 'red', 14);
            frac = new Frac(ctx, factor*fraccion.x, factor*fraccion.y);
            EtiquetaInf(frac, board, "red");
         }
        //dibujamos los segmentos de longitud 2*denominador
        for (var i = 1; i <= 2*factor*(fraccion.y); i++) {
             parte = board.create('segment', [[(i - 1)/(factor*fraccion.y), 0], [i/(factor*fraccion.y) , 0]], {name: "", strokeColor: '',
             highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
             parte.setAttribute({fixed: true});
        }
 };
//Se comienza poniendo un ejemplo en el primer board
n = 0;            
BoardOne(fracciones[n],brd1, true);

BarraProgresiva(brd1, fracciones.length, 1); 
btn1.onclick = function(){ //botón Continuar
// var brd1 = JXG.JSXGraph.initBoard('box1', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
 for(el in brd1.objects) {
 brd1.removeObject(brd1.objects[el]);
}
   n++; 
   if(n === 4){
      $('#ejemplo').toggle('slow');
      $('#cambiaTexto').show('slow');
   }
   if(n === 5){
      $( "#Continuar" ).prop( "disabled", true );
      $('#actividad2').toggle('slow');
      $('#cambiaTexto').toggle('slow');
      $('#Continuar').toggle('slow');
      BoardOne(fracciones[4],brd1,true);
      BarraProgresiva(brd1,fracciones.length, n); 
   }
   else{
       BarraProgresiva(brd1,fracciones.length, n+1); 
       BoardOne(fracciones[n],brd1,true);
       
   }
};

/* Esta función crea un punto móvil y lo etiqueta superiormente con el nombre de la fracción
 * que recibe como parámetro, en este caso recibe el indice para acceder a un elemento de un
 * arreglo que contiene fracciones */

function Exercise(m){
            BoardOne(ejercicios[m], brd2, false);
            PuntoMovil(ejercicios[m],brd2,0.25,1.1);     
};

//básicamente esta función existe por que a los puntos no se les puede poner
//el nombre de una fracción en vertical es de de la forma:     a
//                                                            ---
//                                                             b
//ya que solo permite a/b, por eso se crean tres puntos uno con nombre a, otro
//con nombre --- y el último  con nombre b, luego se asocian para que se muevan juntos
//dando el efecto de ser un solo punto
function PuntoMovil(fraccion, board, CorX, CorY){
            p1 = board.create('point', [CorX, CorY], {name: fraccion.x, color: 'red', size:6, showInfobox: false});
            p1.label.setAttribute({ color: 'red', fontSize: 15, offset: [-5, 45]});  
           
            p12 = board.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: '---', color: 'none', showInfobox: false});
            p12.label.setAttribute({color: 'red', fontSize: 14, offset: [-8, 35]});
           
            p13 = board.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: fraccion.y, color: 'none', showInfobox: false});
            p13.label.setAttribute({ color: 'red', fontSize: 15, offset: [-5, 25]});         
};

m = 0;
Exercise(m);

haytexto = false;

btn3.onclick = function(){  //botón verificar
 ax = brd2.create('line', [[0, 0], [1, 0]], {color: ''});  
 ax.setAttribute({fixed: true});
if(haytexto){
brd2.removeObject(txt);
}
if( Math.abs(p1.Y()) < 0.1 ){
  if( (Math.sqrt((p1.X()-ejercicios[m].x/ejercicios[m].y)*(p1.X()-ejercicios[m].x/ejercicios[m].y))<0.04) && (Math.sqrt((p1.Y())*(p1.Y()))<0.1)){
              txt = brd2.create('text',[0.85,1.4, '¡Muy bien!'], {fontSize:23, color:"orange"});
              txt.setAttribute({fixed: true}); 
              for (var i = 0; i <= 2*ejercicios[m].y; i++) {
                 if( i !== ejercicios[m].x){
                frac = new Frac(ctx, i, ejercicios[m].y);
                EtiquetaSup(frac, brd2, "none",14);
                 }
                } 
                if(m !==0){
                frac = new Frac(ctx, factor*ejercicios[m].x, factor*ejercicios[m].y);
                EtiquetaInf(frac, brd2, "red");
            }
              s = brd2.create('segment', [[0,0],[ejercicios[m].x/ejercicios[m].y,0]],{name: "", strokeColor: 'blue',
              highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
              s.setAttribute({fixed: true}); 
              brd2.create('ticks', [ax, 1], {strokeColor: 'blue', strokeWidth:4, minorTicks: (ejercicios[m].y) - 1, majorHeight: 17, minorHeight: 17, drawLabels: false});
              brd2.create('ticks', [ax, [0]], {strokeColor: 'blue', strokeWidth:4, majorHeight: 17, minorHeight: 17, drawLabels: false});
            $( "#Siguiente" ).prop( "disabled", false );
               $( "#Verificar" ).prop( "disabled", true );
          }
          else{
             if( (Math.sqrt((p1.X()-ejercicios[m].x/ejercicios[m].y)*(p1.X()-ejercicios[m].x/ejercicios[m].y))<0.1) && (Math.sqrt((p1.Y())*(p1.Y()))<0.2)){
             txt = brd2.create('text',[0.7,1.4, 'Trata de ser más preciso'], {fontSize:20, color:"orange"});    
             txt.setAttribute({fixed: true}); 
            }
             else{
              txt = brd2.create('text',[0.375,1.4, 'Te equivocaste, vuelve a intentar ahora con ayuda'], {fontSize:20, color:"orange"});     
              txt.setAttribute({fixed: true}); 
              brd2.create('ticks', [ax,[0]], {strokeColor:'blue', strokeWidth:4, majorHeight: 17})
              brd2.create('ticks', [ax, 1], {strokeColor: 'blue', strokeWidth:4, minorTicks: (ejercicios[m].y) - 1, majorHeight: 17, minorHeight: 17, drawLabels: false});
            }
        $( "#Siguiente" ).prop( "disabled", true );  
        
        }
          haytexto = true;
    }
    else{
        alert("Coloca el punto sobre la recta en su posición correspondiente");
    }       
};




 BarraProgresiva(brd2,ejercicios.length, 1); 
$( "#Siguiente" ).prop( "disabled", true );
btn2.onclick = function(){ //botón Continuar
    if(m === ejercicios.length-1){
      $( "#oculta" ).toggle('slow'); 
      $( "#Siguiente" ).prop( "disabled", true );
     
      $('#act3').show('slow');
      $( "#Verificar" ).prop( "disabled", true );
        return false;
    }
    else{
 for(el in brd2.objects) {
 brd2.removeObject(brd2.objects[el]);
 }
   m++;
  
//  if(m === 8){
////       Recta(ejercicios[7],brd2, false);
////       EtiquetaSup(ejercicios[7],brd2, 'red',16);
////       txt = brd2.create('text',[0.9,0.8, '¡Muy bien!'], {fontSize:20, color:"red"});
////       txt.setAttribute({fixed: true});        
////       brd2.create('segment', [[0,0],[ejercicios[7].x/ejercicios[7].y,0]],{name: "", strokeColor: 'blue',
////       highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
//          
//      $( "#Siguiente" ).prop( "disabled", true );
//      $('#Segundaparte').toggle('slow');
//      $( "#Verificar" ).prop( "disabled", true );
//      return false;
//   }
//   else{
       Exercise(m);
       BarraProgresiva(brd2,ejercicios.length, m+1); 
       $( "#Siguiente" ).prop( "disabled", true );
       $( "#Verificar" ).prop( "disabled", false );
   }
 }; 
 
   btn8.onclick = function(){
   $('#muestrayoculta').toggle('slow');
   $( "#conti" ).prop( "disabled", true );
   $('#Segundaparte').toggle('slow');
   };
   
 //Segunda parte
 var doscuartos = new Frac(ctx, 2, 4);
 var tresmedios = new Frac(ctx, 3, 2);
 var paraejemplos = [untercio, unmedio, doscuartos, tresmedios];
 
    /**
     Esta función dibuja la fracción que recibe junto con la fracción un tercio
    y muestra que ambas fracciones pueden ser expresadas con el mismo denominador
    a través de fracciones equivalentes
     */
    function SegundaParte(indice,board) {
        fraccion = paraejemplos[indice];
        salida2.innerHTML = "Por ejemplo, en el caso de las fracciones " + paraejemplos[indice].x+"/"+paraejemplos[indice].y + " y 1/3 si se divide cada unidad en "+ 3*paraejemplos[indice].y + " segmentos, entonces a " + paraejemplos[indice].x+"/"+paraejemplos[indice].y + " le corresponden " + 3*paraejemplos[indice].x +" de estos " +3*paraejemplos[indice].y+" segmentos. Observa en el siguiente recuadro cuántos segmentos le corresponden a 1/3.";  
        ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        Inicio(board);
        board.create('ticks', [ax, 1], {strokeColor: 'black', minorTicks: 3*(fraccion.y) - 1, strokeWidth:4,majorHeight: 17, minorHeight: 10, drawLabels: false});
        board.create('ticks', [ax, [0]], {strokeColor: 'black', strokeWidth:4,majorHeight: 17, minorHeight: 10, drawLabels: false});
        EtiquetaSup(fraccion, board, 'mediumturquoise',16);
         
        //dibujamos los segmentos de longitud 2*denominador
        for (var i = 1; i <= 6*(fraccion.y); i++) {
            parte = board.create('segment', [[(i - 1)/(3*fraccion.y), 0], [i/(3*fraccion.y) , 0]], {name: "", strokeColor: '',
            highlightStrokeColor: 'red', strokeWidth: 5, drawLabels: false});
            parte.setAttribute({fixed: true});
        }
        EtiquetaSup(untercio, board, 'mediumvioletred',16);  
        for (var i = 0; i <= 6*fraccion.y; i++) {
            frac = new Frac(ctx,i,3*fraccion.y);      
            EtiquetaInf(frac,board, "black");
        }             
    };
 
 var indice = 1;

 SegundaParte(indice, brd3);
 BarraProgresiva(brd3,3, 1);
 
 btn4.onclick = function(){  //Botón Continuar para ejemplos
 for(el in brd3.objects) {
 brd3.removeObject(brd3.objects[el]);
 }
 if(indice === 3){
       SegundaParte(3, brd3);
       $('#desvanece').toggle('slow');
       $('#actividadTP').toggle('slow');    
       $( "#OtroEjemplo" ).prop( "disabled", true );
       BarraProgresiva(brd3,3, 3);
   }
   else{
        indice++;
        SegundaParte(indice, brd3);
        BarraProgresiva(brd3,3, indice); 
   
    }
 };

 var pA1, pB1, slider;
 function TerceraParte(frac1, frac2, board) {
      
     ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        Inicio(board);
         pA1 = board.create('point', [0.1, 0.4], {name: frac1.x, color: 'mediumturquoise', size:6, showInfobox: false});
         pA1.label.setAttribute({ color: 'mediumturquoise', fontSize: 16, offset: [-5, 45]});  
           
         pA = board.create('point', [function(){ return pA1.X();}, function(){ return pA1.Y();}], {name: '---', color: 'none', showInfobox: false});
         pA.label.setAttribute({color: 'mediumturquoise', fontSize: 18, offset: [-10, 38]});
           
         pA = board.create('point', [function(){ return pA1.X();}, function(){ return pA1.Y();}], {name: frac1.y, color: 'none', showInfobox: false});
         pA.label.setAttribute({ color: 'mediumturquoise', fontSize: 16, offset: [-5, 25]}); 
         
         pB1 = board.create('point', [0.2, 0.4], {name: frac2.x, color: 'mediumvioletred', size:6, showInfobox: false});
         pB1.label.setAttribute({ color: 'mediumvioletred', fontSize: 16, offset: [-5, 45]});  
           
         pB = board.create('point', [function(){ return pB1.X();}, function(){ return pB1.Y();}], {name: '---', color: 'none', showInfobox: false});
         pB.label.setAttribute({color: 'mediumvioletred', fontSize: 18, offset: [-10, 38]});
           
         pB = board.create('point', [function(){ return pB1.X();}, function(){ return pB1.Y();}], {name: frac2.y, color: 'none', showInfobox: false});
         pB.label.setAttribute({ color: 'mediumvioletred', fontSize: 16, offset: [-5, 25]}); 
        
        slider = board.create('slider',[[0,1.8],[1.2,1.8],[1,1,12]],{name:'S',snapWidth:1, precision:0, withLabel:false});
        slider.baseline.setAttribute({color: "red"}); 
        slider.highline.setAttribute({color: "red"});                         
        leyenda = board.create('text', [1.3,1.8,function(){ return 'cada unidad se divide en '+slider.Value()+" segmentos";}],{color:'red', fontSize:17});
        leyenda.setAttribute({fixed: true});
        
          var f = function(r) {
            if(r < 10){
              
                deno0.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno1.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno2.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno3.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno4.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno5.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno6.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno7.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno8.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno9.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno10.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno11.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]});
                deno12.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno13.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno14.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno15.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno16.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno17.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]});
                deno18.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno19.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno20.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno21.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno22.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno23.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]});
                deno24.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
            }
            else{
                
                deno0.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno1.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno2.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno3.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno4.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno5.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno6.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno7.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno8.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno9.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno10.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno11.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
                deno12.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno13.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno14.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno15.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno16.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno17.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
                deno18.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno19.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno20.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno21.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno22.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno23.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
                deno24.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
            }
            return 0;
        };

//        for (var i = 0; i < 10; i++) {
//            point_i = board.create('point',[function(){return i/slider.Value();},0], {name:i, size:7, face:'+',color:'black'});
//            point_i.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
//            raya_i = board.create('point', [function(){return i/slider.Value();}, 0], {name: '----', color:'none'});
//            raya_i.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]});
//            deno_i = board.create('point',[function(){return i/slider.Value();},0], {name: function(){return slider.Value();}, color:'none'});
//        }
//        for (var i = 10; i < 25; i++) {
//            point_i = board.create('point',[function(){return i/slider.Value();},0], {name:i, size:7, face:'+', color:'black'});
//            point_i.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
//            raya_i = board.create('point', [function(){return i/slider.Value();}, 0], {name: '-----', color:'none'});
//            raya_i.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
//            deno_i = board.create('point',[function(){return i/slider.Value();},0], {name: function(){return slider.Value();}, color:'none'});
//
//        }
              
         
        point0 = board.create('point',[function(){return 0/slider.Value();},0], {name:0, size:7, face:'+', color:'black', showInfobox: false});
        point0.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya0 = board.create('point', [function(){return 0/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya0.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]});
        deno0 = board.create('point',[function(){return 0/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});

        point1 = board.create('point',[function(){return 1/slider.Value();},0], {name:1, size:7, face:'+', color:'black', showInfobox: false});
        point1.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya1 = board.create('point', [function(){return 1/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya1.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno1 = board.create('point',[function(){return 1/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point2 = board.create('point',[function(){return 2/slider.Value();},0], {name:2, size:7, face:'+', color:'black', showInfobox: false});
        point2.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya2 = board.create('point', [function(){return 2/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya2.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno2 = board.create('point',[function(){return 2/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});

        point3 = board.create('point',[function(){return 3/slider.Value();},0], {name:3, size:7, face:'+', color:'black', showInfobox: false});
        point3.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya3 = board.create('point', [function(){return 3/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya3.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno3 = board.create('point',[function(){return 3/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
      
        point4 = board.create('point',[function(){return 4/slider.Value();},0], {name:4,size:7, face:'+',color:'black', showInfobox: false});
        point4.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya4 = board.create('point', [function(){return 4/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya4.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno4 = board.create('point',[function(){return 4/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point5 = board.create('point',[function(){return 5/slider.Value();},0], {name:5,size:7, face:'+', color:'black', showInfobox: false});
        point5.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya5= board.create('point', [function(){return 5/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya5.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno5 = board.create('point',[function(){return 5/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point6 = board.create('point',[function(){return 6/slider.Value();},0], {name:6,size:7, face:'+', color:'black', showInfobox: false});
        point6.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya6 = board.create('point', [function(){return 6/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya6.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno6 = board.create('point',[function(){return 6/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
     
        point7 = board.create('point',[function(){return 7/slider.Value();},0], {name:7,size:7, face:'+', color:'black', showInfobox: false});
        point7.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya7 = board.create('point', [function(){return 7/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya7.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno7 = board.create('point',[function(){return 7/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
      
        point8 = board.create('point',[function(){return 8/slider.Value();},0], {name:8,size:7, face:'+', color:'black', showInfobox: false});
        point8.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya8 = board.create('point', [function(){return 8/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya8.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno8 = board.create('point',[function(){return 8/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point9 = board.create('point',[function(){return 9/slider.Value();},0], {name:9,size:7, face:'+', color:'black', showInfobox: false});
        point9.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya9 = board.create('point', [function(){return 9/slider.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya9.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno9 = board.create('point',[function(){return 9/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point10 = board.create('point',[function(){return 10/slider.Value();},0], {name:10,size:7, face:'+', color:'black', showInfobox: false});
        point10.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya10 = board.create('point', [function(){return 10/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya10.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno10 = board.create('point',[function(){return 10/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point11 = board.create('point',[function(){return 11/slider.Value();},0], {name:11,size:7, face:'+', color:'black', showInfobox: false});
        point11.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya11 = board.create('point', [function(){return 11/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya11.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno11 = board.create('point',[function(){return 11/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point12 = board.create('point',[function(){return 12/slider.Value();},0], {name:12,size:7, face:'+', color:'black', showInfobox: false});
        point12.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya12 = board.create('point', [function(){return 12/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya12.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno12 = board.create('point',[function(){return 12/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point13 = board.create('point',[function(){return 13/slider.Value();},0], {name:13,size:7, face:'+', color:'black', showInfobox: false});
        point13.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya13 = board.create('point', [function(){return 13/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya13.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno13 = board.create('point',[function(){return 13/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point14 = board.create('point',[function(){return 14/slider.Value();},0], {name:14,size:7, face:'+', color:'black', showInfobox: false});
        point14.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya14 = board.create('point', [function(){return 14/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya14.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno14 = board.create('point',[function(){return 14/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point15 = board.create('point',[function(){return 15/slider.Value();},0], {name:15,size:7, face:'+', color:'black', showInfobox: false});
        point15.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya15= board.create('point', [function(){return 15/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya15.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno15 = board.create('point',[function(){return 15/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point16 = board.create('point',[function(){return 16/slider.Value();},0], {name:16,size:7, face:'+', color:'black', showInfobox: false});
        point16.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya16 = board.create('point', [function(){return 16/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya16.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno16 = board.create('point',[function(){return 16/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
      
        point17 = board.create('point',[function(){return 17/slider.Value();},0], {name:17,size:7, face:'+', color:'black', showInfobox: false});
        point17.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya17 = board.create('point', [function(){return 17/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya17.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno17 = board.create('point',[function(){return 17/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point18 = board.create('point',[function(){return 18/slider.Value();},0], {name:18,size:7, face:'+', color:'black', showInfobox: false});
        point18.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya18 = board.create('point', [function(){return 18/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya18.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno18 = board.create('point',[function(){return 18/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point19 = board.create('point',[function(){return 19/slider.Value();},0], {name:19,size:7, face:'+', color:'black', showInfobox: false});
        point19.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya19 = board.create('point', [function(){return 19/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya19.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno19 = board.create('point',[function(){return 19/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point20 = board.create('point',[function(){return 20/slider.Value();},0], {name:20,size:7, face:'+', color:'black', showInfobox: false});
        point20.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya20 = board.create('point', [function(){return 20/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya20.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno20 = board.create('point',[function(){return 20/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point21 = board.create('point',[function(){return 21/slider.Value();},0], {name:21,size:7, face:'+', color:'black', showInfobox: false});
        point21.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya21 = board.create('point', [function(){return 21/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya21.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno21 = board.create('point',[function(){return 21/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point22 = board.create('point',[function(){return 22/slider.Value();},0], {name:22,size:7, face:'+', color:'black', showInfobox: false});
        point22.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya22 = board.create('point', [function(){return 22/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya22.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno22 = board.create('point',[function(){return 22/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
       
        point23 = board.create('point',[function(){return 23/slider.Value();},0], {name:23,size:7, face:'+', color:'black', showInfobox: false});
        point23.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya23 = board.create('point', [function(){return 23/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya23.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno23 = board.create('point',[function(){return 23/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point24 = board.create('point',[function(){return 24/slider.Value();},0], {name:24,size:7, face:'+', color:'black', showInfobox: false});
        point24.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya24 = board.create('point', [function(){return 24/slider.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya24.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno24 = board.create('point',[function(){return 24/slider.Value();},0], {name: function(){return slider.Value();}, color:'none', showInfobox: false});
        
        point25 = board.create('point',[function(){return 36/slider.Value();},function(){return f(slider.Value());}], {name:'', showInfobox: false});
        point25.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
     
    };
    
    
 var pA2, slider2;
 function Desliza(fraccion,board) {
      
     ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        Inicio(board);
         pA2 = board.create('point', [1/3, 0], {name: '', color: 'mediumturquoise', size:6, showInfobox: false});
         pA2.label.setAttribute({ color: 'mediumturquoise', fontSize: 16, offset: [-5, 45]});  
         EtiquetaSup(fraccion, board, 'mediumturquoise', 14);
//         pA = board.create('point', [function(){ return pA1.X();}, function(){ return pA1.Y();}], {name: '---', color: 'none', showInfobox: false});
//         pA.label.setAttribute({color: 'mediumturquoise', fontSize: 18, offset: [-10, 38]});
//           
//         pA = board.create('point', [function(){ return pA1.X();}, function(){ return pA1.Y();}], {name: frac1.y, color: 'none', showInfobox: false});
//         pA.label.setAttribute({ color: 'mediumturquoise', fontSize: 16, offset: [-5, 25]}); 
         
        slider2 = board.create('slider',[[0,2],[1.2,2],[1,1,12]],{name:'S',snapWidth:1, precision:0, withLabel:false});
        slider2.baseline.setAttribute({color: "red"}); 
        slider2.highline.setAttribute({color: "red"});                         
        leyenda = board.create('text', [1.3,2,function(){ return 'cada unidad se divide en '+slider2.Value()+" segmentos";}],{color:'red', fontSize:17});
        leyenda.setAttribute({fixed: true});
        
          var f = function(r) {
            if(r < 10){
              
                deno0.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno1.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno2.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno3.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno4.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno5.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno6.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno7.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno8.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno9.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno10.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno11.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]});
                deno12.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno13.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno14.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno15.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno16.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno17.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]});
                deno18.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno19.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno20.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno21.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno22.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
                deno23.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]});
                deno24.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -48]}); 
            }
            else{
                
                deno0.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno1.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno2.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno3.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno4.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno5.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno6.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno7.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno8.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno9.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno10.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno11.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
                deno12.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno13.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno14.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno15.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno16.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno17.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
                deno18.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno19.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno20.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno21.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno22.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]}); 
                deno23.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
                deno24.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -48]});
            }
            return 0;
        };

//        for (var i = 0; i < 10; i++) {
//            point_i = board.create('point',[function(){return i/slider.Value();},0], {name:i, size:7, face:'+',color:'black'});
//            point_i.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
//            raya_i = board.create('point', [function(){return i/slider.Value();}, 0], {name: '----', color:'none'});
//            raya_i.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]});
//            deno_i = board.create('point',[function(){return i/slider.Value();},0], {name: function(){return slider.Value();}, color:'none'});
//        }
//        for (var i = 10; i < 25; i++) {
//            point_i = board.create('point',[function(){return i/slider.Value();},0], {name:i, size:7, face:'+', color:'black'});
//            point_i.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
//            raya_i = board.create('point', [function(){return i/slider.Value();}, 0], {name: '-----', color:'none'});
//            raya_i.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
//            deno_i = board.create('point',[function(){return i/slider.Value();},0], {name: function(){return slider.Value();}, color:'none'});
//
//        }
              
         
        point0 = board.create('point',[function(){return 0/slider2.Value();},0], {name:0, size:7, face:'+', color:'black', showInfobox: false});
        point0.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya0 = board.create('point', [function(){return 0/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya0.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]});
        deno0 = board.create('point',[function(){return 0/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});

        point1 = board.create('point',[function(){return 1/slider2.Value();},0], {name:1, size:7, face:'+', color:'black', showInfobox: false});
        point1.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya1 = board.create('point', [function(){return 1/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya1.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno1 = board.create('point',[function(){return 1/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point2 = board.create('point',[function(){return 2/slider2.Value();},0], {name:2, size:7, face:'+', color:'black', showInfobox: false});
        point2.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya2 = board.create('point', [function(){return 2/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya2.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno2 = board.create('point',[function(){return 2/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});

        point3 = board.create('point',[function(){return 3/slider2.Value();},0], {name:3, size:7, face:'+', color:'black', showInfobox: false});
        point3.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya3 = board.create('point', [function(){return 3/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya3.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno3 = board.create('point',[function(){return 3/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
      
        point4 = board.create('point',[function(){return 4/slider2.Value();},0], {name:4,size:7, face:'+',color:'black', showInfobox: false});
        point4.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya4 = board.create('point', [function(){return 4/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya4.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno4 = board.create('point',[function(){return 4/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point5 = board.create('point',[function(){return 5/slider2.Value();},0], {name:5,size:7, face:'+', color:'black', showInfobox: false});
        point5.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya5= board.create('point', [function(){return 5/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya5.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno5 = board.create('point',[function(){return 5/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point6 = board.create('point',[function(){return 6/slider2.Value();},0], {name:6,size:7, face:'+', color:'black', showInfobox: false});
        point6.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya6 = board.create('point', [function(){return 6/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya6.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno6 = board.create('point',[function(){return 6/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
     
        point7 = board.create('point',[function(){return 7/slider2.Value();},0], {name:7,size:7, face:'+', color:'black', showInfobox: false});
        point7.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya7 = board.create('point', [function(){return 7/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya7.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno7 = board.create('point',[function(){return 7/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
      
        point8 = board.create('point',[function(){return 8/slider2.Value();},0], {name:8,size:7, face:'+', color:'black', showInfobox: false});
        point8.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya8 = board.create('point', [function(){return 8/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya8.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno8 = board.create('point',[function(){return 8/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point9 = board.create('point',[function(){return 9/slider2.Value();},0], {name:9,size:7, face:'+', color:'black', showInfobox: false});
        point9.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya9 = board.create('point', [function(){return 9/slider2.Value();}, 0], {name: '----', color:'none', showInfobox: false});
        raya9.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno9 = board.create('point',[function(){return 9/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point10 = board.create('point',[function(){return 10/slider2.Value();},0], {name:10,size:7, face:'+', color:'black', showInfobox: false});
        point10.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya10 = board.create('point', [function(){return 10/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya10.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno10 = board.create('point',[function(){return 10/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point11 = board.create('point',[function(){return 11/slider2.Value();},0], {name:11,size:7, face:'+', color:'black', showInfobox: false});
        point11.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya11 = board.create('point', [function(){return 11/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya11.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno11 = board.create('point',[function(){return 11/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point12 = board.create('point',[function(){return 12/slider2.Value();},0], {name:12,size:7, face:'+', color:'black', showInfobox: false});
        point12.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya12 = board.create('point', [function(){return 12/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya12.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno12 = board.create('point',[function(){return 12/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point13 = board.create('point',[function(){return 13/slider2.Value();},0], {name:13,size:7, face:'+', color:'black', showInfobox: false});
        point13.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya13 = board.create('point', [function(){return 13/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya13.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno13 = board.create('point',[function(){return 13/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point14 = board.create('point',[function(){return 14/slider2.Value();},0], {name:14,size:7, face:'+', color:'black', showInfobox: false});
        point14.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya14 = board.create('point', [function(){return 14/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya14.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno14 = board.create('point',[function(){return 14/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point15 = board.create('point',[function(){return 15/slider2.Value();},0], {name:15,size:7, face:'+', color:'black', showInfobox: false});
        point15.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya15= board.create('point', [function(){return 15/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya15.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno15 = board.create('point',[function(){return 15/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point16 = board.create('point',[function(){return 16/slider2.Value();},0], {name:16,size:7, face:'+', color:'black', showInfobox: false});
        point16.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya16 = board.create('point', [function(){return 16/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya16.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno16 = board.create('point',[function(){return 16/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
      
        point17 = board.create('point',[function(){return 17/slider2.Value();},0], {name:17,size:7, face:'+', color:'black', showInfobox: false});
        point17.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya17 = board.create('point', [function(){return 17/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya17.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno17 = board.create('point',[function(){return 17/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point18 = board.create('point',[function(){return 18/slider2.Value();},0], {name:18,size:7, face:'+', color:'black', showInfobox: false});
        point18.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya18 = board.create('point', [function(){return 18/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya18.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno18 = board.create('point',[function(){return 18/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point19 = board.create('point',[function(){return 19/slider2.Value();},0], {name:19,size:7, face:'+', color:'black', showInfobox: false});
        point19.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya19 = board.create('point', [function(){return 19/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya19.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno19 = board.create('point',[function(){return 19/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point20 = board.create('point',[function(){return 20/slider2.Value();},0], {name:20,size:7, face:'+', color:'black', showInfobox: false});
        point20.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya20 = board.create('point', [function(){return 20/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya20.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno20 = board.create('point',[function(){return 20/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point21 = board.create('point',[function(){return 21/slider2.Value();},0], {name:21,size:7, face:'+', color:'black', showInfobox: false});
        point21.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya21 = board.create('point', [function(){return 21/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya21.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno21 = board.create('point',[function(){return 21/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point22 = board.create('point',[function(){return 22/slider2.Value();},0], {name:22,size:7, face:'+', color:'black', showInfobox: false});
        point22.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya22 = board.create('point', [function(){return 22/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya22.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno22 = board.create('point',[function(){return 22/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
       
        point23 = board.create('point',[function(){return 23/slider2.Value();},0], {name:23,size:7, face:'+', color:'black', showInfobox: false});
        point23.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya23 = board.create('point', [function(){return 23/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya23.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno23 = board.create('point',[function(){return 23/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point24 = board.create('point',[function(){return 24/slider2.Value();},0], {name:24,size:7, face:'+', color:'black', showInfobox: false});
        point24.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya24 = board.create('point', [function(){return 24/slider2.Value();}, 0], {name: '-----', color:'none', showInfobox: false});
        raya24.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno24 = board.create('point',[function(){return 24/slider2.Value();},0], {name: function(){return slider2.Value();}, color:'none', showInfobox: false});
        
        point25 = board.create('point',[function(){return 36/slider2.Value();},function(){return f(slider2.Value());}], {name:'', showInfobox: false});
        point25.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
     
    };
 
     Desliza(untercio, brd5);
    
    /**
     Función que recibe una fracción, la ubica en la recta y la etiqueta inferiormente
     */
    function EtiquetaInf(fraccion, board, color) {
  
            pnumerador = board.create('point', [fraccion.x/fraccion.y, 0], {name: fraccion.x,
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
            pnumerador.setAttribute({fixed: true});
             if(fraccion.x<10){
            pnumerador.label.setAttribute({color: color, fontSize: 14, offset: [-5, -25]}); //offset para la posición de la etiqueta respecto al punto     
          
            raya = board.create('point', [fraccion.x/fraccion.y, 0], {name: '----',
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
           
            raya.label.setAttribute({color: color, fontSize: 14, offset: [-10, -32]}); //offset para la posición de la etiqueta respecto al punto     
             }
            else{
                pnumerador.label.setAttribute({color: color, fontSize: 14, offset: [-10, -25]});
                raya = board.create('point', [fraccion.x/fraccion.y, 0], {name: '-----',
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
                raya.label.setAttribute({color: color, fontSize: 14, offset: [-12, -32]}); //offset para la posición de la etiqueta respecto al punto     
            }
            raya.setAttribute({fixed: true});
            
            pdenominador = board.create('point', [fraccion.x/fraccion.y, 0], {name: fraccion.y,
                color: 'none', //este punto tiene la posición correcta de la
                size: 5, //fracción con la que trabaja el usuario, es invisible
                highlightStrokeColor: 'none',
                highlightFillColor: 'none', showInfobox: false});
            if(fraccion.y<10){
                pdenominador.label.setAttribute({color: color, fontSize: 14, offset: [-5, -45]}); //offset para la posición de la etiqueta respecto al punto     
            }
            else{
                pdenominador.label.setAttribute({color: color, fontSize: 14, offset: [-10, -45]});
            }
            pdenominador.setAttribute({fixed: true});
        };             
    
 
 
    /**
     Etiqueta la fracción que recibe superiormente y la ubica
     */
    function EtiquetaSup(fraccion, board, color, font) {
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.x, color: color, size:3, showInfobox: false});
            if(fraccion.x <10){
            point.label.setAttribute({ color: color, fontSize: font, offset: [-5, 45]});  
            }
            else{
            point.label.setAttribute({ color: color, fontSize: font, offset: [-10, 45]});    
            }
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: '---', color: 'none', showInfobox: false});
            point.label.setAttribute({color: color, fontSize: font+2, offset: [-10, 38]});
            point.setAttribute({fixed: true});
            point = board.create('point', [fraccion.x / fraccion.y, 0], {name: fraccion.y, color: 'none', showInfobox: false});
            point.label.setAttribute({ color: color, fontSize: font, offset: [-5, 25]});
            point.setAttribute({fixed: true}); 
    };
 
 var FraccionesA = [unmedio,unsexto,uncuarto,unquinto];
 var FraccionesB = [untercio,uncuarto,unsexto,unmedio];
 
 var mensaje, mensaje1, mensaje2, mensaje3;
 var letrero = false;
 var PosCorSlider;
 
 btn5.onclick = function(){   //botón verificar
      $( "#btn7" ).prop( "disabled", false );
      $( "#btn6" ).prop( "disabled", true );
      
     if(letrero){
        brd4.removeObject(mensaje);
        brd4.removeObject(mensaje1);
        brd4.removeObject(mensaje2);
        brd4.removeObject(mensaje3);
    }
    if(pA1.Y()< 0.1 && pB1.Y()< 0.1){
        if(A<4){
            Califica(FraccionesA, A);
        }
        else{
            Califica(FraccionesB, B);
        }
     }
    else{
        alert("Coloca los puntos sobre la recta en su posición correspondiente"); 
    }
 };
 
 var contador;
 function Califica(arreglo, l){
            contador = 0;
             if((slider.Value() === (arreglo[0].y)*(arreglo[l].y)) || (slider.Value() === 2*(arreglo[0].y)*(arreglo[l].y))){
                 PosCorSlider = true;
                 contador++;
             }
             else{
                    if(arreglo[l].y % arreglo[0].y === 0){
                    if(slider.Value() === arreglo[l].y || (slider.Value() === 2*arreglo[l].y) || (slider.Value() === 3*arreglo[l].y)){
                     PosCorSlider = true;  
                     contador++;
                    }
                    else{
                     PosCorSlider = false;  
                     mensaje3 = brd4.create('text',[0.25,0.7, 'Mueve el deslizador para etiquetar ambas fracciones inferiormente'], {fontSize:18, color:"red"});
                     mensaje3.setAttribute({fixed: true}); 
                     letrero = true;
                        }
                    }
                    else{
                     PosCorSlider = false;  
                     mensaje3 = brd4.create('text',[0.25,0.7, 'Mueve el deslizador para etiquetar ambas fracciones inferiormente'], {fontSize:18, color:"red"});
                     mensaje3.setAttribute({fixed: true}); 
                     letrero = true;
                        }
                    }
           //verifico la posición del punto 1
            if( (Math.sqrt((pA1.X()-arreglo[0].x/arreglo[0].y)*(pA1.X()-arreglo[0].x/arreglo[0].y))<0.04) && (Math.sqrt((pA1.Y())*(pA1.Y()))<0.1) ){
                contador++;   
              }
            else{
                mensaje1 = brd4.create('text',[0.65,1.1, 'Revisa la posición de la fracción'], {fontSize:18, color:"mediumturquoise"});
                mensaje1.setAttribute({fixed: true}); 
                letrero = true;
            }
            //verifico la posición del punto 2
            if( (Math.sqrt((pB1.X()-arreglo[l].x/arreglo[l].y)*(pB1.X()-arreglo[l].x/arreglo[l].y))<0.04) && (Math.sqrt((pB1.Y())*(pB1.Y()))<0.1) ){
                contador++;   
              }
            else{
                mensaje2 = brd4.create('text',[0.65,0.9, 'Revisa la posición de la fracción'], {fontSize:18, color:"mediumvioletred"});
                mensaje2.setAttribute({fixed: true}); 
                letrero = true;
            }
          if(contador === 3){
              mensaje = brd4.create('text',[0.9,1.2, '¡Muy bien!'], {fontSize:25, color:"orange"});
              mensaje.setAttribute({fixed: true}); 
              $( "#btn5" ).prop( "disabled", true );
              letrero = true;
              $('#Oculta').toggle('slow');
              $('#ActividadDeComparacion').toggle('slow');
              Compara(arreglo[0], arreglo[l]);
           }
           else{
             // $( "#btn6" ).prop( "disabled", true );
              return;
           }
 };
 
// $( "#btn6" ).prop( "disabled", false ); //de entrada el botón está deshabilitado
//        
//                                                      //se habilitará hasta que se resuelva correctamente el ejercicio
var a = 1;
btn6.onclick = function(){ //botón Continuar para generar otro ejercicio
    if(B === 3){
     $( "#btn5" ).prop( "disabled", true );
     $( "#btn6" ).prop( "disabled", true ); 
     //ctx.font = "33px Georgia";
    // ctx.fillText("Haz completado la lección",250,93); 
     alert("Haz completado la lección");
  }
  else{
     $('#Oculta').toggle('slow');
     $('#ActividadDeComparacion').toggle('slow');
     mathField.latex("");
     mathField2.latex("");
     ctx.clearRect(0,0, canvas.width, canvas.height);
     $( "#orden" ).val(1);
     for(el in brd4.objects) {
     brd4.removeObject(brd4.objects[el]);
     }
      $( "#btn5" ).prop( "disabled", false );
     // $( "#btn6" ).prop( "disabled", true );
     
     A++;
       if(A < 4){
        TerceraParte(FraccionesA[0], FraccionesA[A], brd4);
       }
       else{
           B++;
           if(B < 4 ){
            TerceraParte(FraccionesB[0], FraccionesB[B], brd4);  
           }       
       }
      
       
  }
  a++;
  BarraProgresiva(brd4, 6, a); 
        
};
 
  
 var A = 1; //índice del arreglo FraccionesA
 var B = 0; //índice del arreglo FraccionesB
 TerceraParte(FraccionesA[0], FraccionesA[A], brd4);
 BarraProgresiva(brd4, 6, a);
 
 //Diseño de la actividad de comparación 
    
var FraccionA = document.getElementById("FraccionA");
var FraccionB = document.getElementById("FraccionB");
var MQ = MathQuill.getInterface(2);
var config = {};
var config2 = {};
var mathField = MQ.MathField(FraccionA, config);
var mathField2= MQ.MathField(FraccionB, config2);
    /**
     Básicamente se imprimirán las fracciones con las que se trabajó mediante
     la impresión en mathquill, separadas las fracciones por un input, cuyas opciones
     serán <, = y >.
     */
    var valor;
    function Compara(frac1, frac2) {
       mathField.write('\\frac{'+frac1.x+'}{'+frac1.y+'}');
       mathField.blur();
       mathField2.write('\\frac{'+frac2.x+'}{'+frac2.y+'}');
       mathField2.blur();
       if(frac1.x/frac1.y < frac2.x/frac2.y){ 
           valor = 1;
       } //frac1 menor que frac2
       else{
           valor = 3;
       }  //frac1 mayor que frac2
       
    }; 
    
btn7.onclick = function(){  //botón verificar
     ctx.clearRect(0,0, canvas.width, canvas.height);
     ctx.font="25px Arial";
     ctx.fillStyle = "red";
    if(parseInt($( "#orden" ).val()) === valor){
       ctx.fillText("¡Correcto!",450,60); 
       $( "#btn7" ).prop( "disabled", true );
       $( "#btn6" ).prop( "disabled", false );
       console.log("síe netré");
    }
    else{
       ctx.fillText("Observa la posición que ocupan las fracciones en la recta y vuelve a intentarlo",70,60);  
      $( "#btn6" ).prop( "disabled", true );
       $( "#btn7" ).prop( "disabled", false );
    }
    
};



 
    
 
}); //termina jQuery




