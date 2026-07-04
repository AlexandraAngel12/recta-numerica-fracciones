$(document).ready(function() {
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var btn1 = document.getElementById("btn1");
var btn3 = document.getElementById("btn3");
var brd1 = JXG.JSXGraph.initBoard('box1', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
var brd2 = JXG.JSXGraph.initBoard('box2', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
var brd3 = JXG.JSXGraph.initBoard('box3', {boundingbox: [-0.2, 1, 2.2, -1], showNavigation: false, showCopyright: false});
var brd4 = JXG.JSXGraph.initBoard('boxespecial', {boundingbox: [-0.2, 1.5, 2.2, -0.5], showNavigation: false, showCopyright: false});
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
var ejercicios = [uno,unmedio,uncuarto, unoctavo, dostercios, unsexto, cuatrotercios, dos];

    /**
     Dibuja el eje X del 0 al 2, con etiquetas superiores
     */
    function Inicio(board) {
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
    
 Inicio(brd1);
  brd1.create('ticks', [ax, 1], {strokeColor: 'black', strokeWidth:4, minorTicks: 2, majorHeight: 15, minorHeight: 12, drawLabels: false});
  brd1.create('ticks', [ax, [0]], {strokeColor: 'black', strokeWidth:4, majorHeight: 15});
  for (var i = 0; i <= 6; i++) {
            frac = new Frac(ctx,i,3);      
            EtiquetaInf(frac,brd1);
        } 
 seg1 = brd1.create('segment', [[0, 0.1], [2/3, 0.1]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd1.create('segment', [[0, 0], [3/3, 0]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true});  
 seg1 = brd1.create('segment', [[0, 0.6], [2/3, 0.6]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd1.create('segment', [[2/3, 0.6], [5/3, 0.6]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true});  
 seg1 = brd1.create('segment', [[3/3, 0.8], [5/3, 0.8]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd1.create('segment', [[0, 0.8], [3/3, 0.8]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true});  
 
  Inicio(brd2);
  brd2.create('ticks', [ax, [1/2,2/3]], {strokeColor: 'black', strokeWidth:4, majorHeight: 12, minorHeight: 12, drawLabels: false});
  brd2.create('ticks', [ax, [0,1,2]], {strokeColor: 'black', strokeWidth:4, majorHeight: 15});
  
  EtiquetaSup(unmedio,brd2,"mediumvioletred");
  EtiquetaSup(dostercios,brd2,"midnightblue");


 seg1 = brd2.create('segment', [[0, 0.1], [2/3, 0.1]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd2.create('segment', [[0, 0], [1/2, 0]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true});  
 seg1 = brd2.create('segment', [[0, 0.8], [2/3, 0.8]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd2.create('segment', [[2/3, 0.8], [7/6, 0.8]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true});  
 seg1 = brd2.create('segment', [[1/2, 0.9], [7/6, 0.9]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd2.create('segment', [[0, 0.9], [1/2, 0.9]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true}); 
  Inicio(brd3);
  brd3.create('ticks', [ax, [1/2,2/3]], {strokeColor: 'black', strokeWidth:4, majorHeight: 15, minorHeight: 12, drawLabels: false});
  brd3.create('ticks', [ax, [0]], {strokeColor: 'black', strokeWidth:4, majorHeight: 15});

  EtiquetaSup(unmedio,brd3,"mediumvioletred");
  EtiquetaSup(dostercios,brd3,"midnightblue");


 seg1 = brd3.create('segment', [[0, 0.1], [2/3, 0.1]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd3.create('segment', [[0, 0], [1/2, 0]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true});  
 seg1 = brd3.create('segment', [[0, 0.8], [2/3, 0.8]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd3.create('segment', [[2/3, 0.8], [7/6, 0.8]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true});  
 seg1 = brd3.create('segment', [[1/2, 0.9], [7/6, 0.9]], {strokeColor: 'midnightblue',strokeWidth:4,highlightStrokeColor: 'blue'});
 seg1.setAttribute({fixed: true});  
 seg2 = brd3.create('segment', [[0, 0.9], [1/2, 0.9]], {strokeColor: 'mediumvioletred',strokeWidth:4,highlightStrokeColor: 'red'});
 seg2.setAttribute({fixed: true}); 
 brd3.create('ticks', [ax, 1], {strokeColor: 'black', strokeWidth:4, minorTicks: 5, majorHeight: 17, minorHeight: 10, drawLabels: false});
 for (var i = 0; i <= 12; i++) {
            frac = new Frac(ctx,i,6);      
            EtiquetaInf(frac,brd3);
        }




//básicamente esta función existe por que a los puntos no se les puede poner
//el nombre de una fracción en vertical es de de la forma:     a
//                                                            ---
//                                                             b
//ya que solo permite a/b, por eso se crean tres puntos uno con nombre a, otro
//con nombre --- y el último  con nombre b, luego se asocian para que se muevan juntos
//dando el efecto de ser un solo punto
function PuntoMovil(fraccion, board, CorX, CorY){
            p1 = board.create('point', [CorX, CorY], {name: fraccion.x, color: 'red', size:6});
            p1.label.setAttribute({ color: 'red', fontSize: 16, offset: [-5, 45]});  
           
            p12 = board.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: '---', color: 'none'});
            p12.label.setAttribute({color: 'red', fontSize: 18, offset: [-10, 38]});
           
            p13 = board.create('point', [function(){ return p1.X();}, function(){ return p1.Y();}], {name: fraccion.y, color: 'none'});
            p13.label.setAttribute({ color: 'red', fontSize: 16, offset: [-5, 25]});         
};


 var pA1, pB1, slider;
 
 function TerceraParte(frac1,frac2,board) {
       
     ax = board.create('line', [[0, 0], [1, 0]], {color: 'black'});  //línea que hará
        ax.setAttribute({fixed: true});  //el papel del eje X
        Inicio(board);
         pA1 = board.create('point', [0.1, 0.4], {name: frac1.x, color: 'midnightblue', size:6});
         pA1.label.setAttribute({ color: 'midnightblue', fontSize: 16, offset: [-5, 45]});  
          
         pA = board.create('point', [function(){ return pA1.X();}, function(){ return pA1.Y();}], {name: frac1.x, color: 'none'});
         pA.label.setAttribute({color: 'midnightblue', fontSize: 16, offset: [-5, 45]});
         
         pA = board.create('point', [function(){ return pA1.X();}, function(){ return pA1.Y();}], {name: '---', color: 'none'});
         pA.label.setAttribute({color: 'midnightblue', fontSize: 18, offset: [-10, 38]});
           
         pA = board.create('point', [function(){ return pA1.X();}, function(){ return pA1.Y();}], {name: frac1.y, color: 'none'});
         pA.label.setAttribute({ color: 'midnightblue', fontSize: 16, offset: [-5, 25]}); 
         
         pB1 = board.create('point', [0.2, 0.4], {name: frac2.x, color: 'mediumvioletred', size:6});
         pB1.label.setAttribute({ color: 'mediumvioletred', fontSize: 16, offset: [-5, 45]});  
           
         pB = board.create('point', [function(){ return pB1.X();}, function(){ return pB1.Y();}], {name: frac2.x, color: 'none'});  
         pB.label.setAttribute({ color: 'mediumvioletred', fontSize: 16, offset: [-5, 45]});  
         
         pB = board.create('point', [function(){ return pB1.X();}, function(){ return pB1.Y();}], {name: '---', color: 'none'});
         pB.label.setAttribute({color: 'mediumvioletred', fontSize: 18, offset: [-10, 38]});
           
         pB = board.create('point', [function(){ return pB1.X();}, function(){ return pB1.Y();}], {name: frac2.y, color: 'none'});
         pB.label.setAttribute({ color: 'mediumvioletred', fontSize: 16, offset: [-5, 25]}); 
          
        slider = board.create('slider',[[0,1],[1.2,1],[1,1,12]],{name:'S',snapWidth:1, precision:0, withLabel:false});
        slider.baseline.setAttribute({color: "blue"}); 
        slider.highline.setAttribute({color: "blue"});                         
        leyenda = board.create('text', [1.3,1,function(){ return 'cada unidad se divide en '+slider.Value();}],{color:'blue', fontSize:20});
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

                                                                            
        point0 = board.create('point',[function(){return 0/slider.Value();},0], {name:0, size:7, face:'+',color:'black'});
        point0.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya0 = board.create('point', [function(){return 0/slider.Value();}, 0], {name: '----', color:'none'});
        raya0.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]});
        deno0 = board.create('point',[function(){return 0/slider.Value();},0], {name: function(){return slider.Value();}, color:'none'});

        point1 = board.create('point',[function(){return 1/slider.Value();},0], {name:1, size:7, face:'+',color:'black'});
        point1.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya1 = board.create('point', [function(){return 1/slider.Value();}, 0], {name: '----', color:'none'});
        raya1.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno1 = board.create('point',[function(){return 1/slider.Value();},0], {name: function(){return slider.Value();}, color:'none'});
       
        point2 = board.create('point',[function(){return 2/slider.Value();},0], {name:2, size:7, face:'+',color:'black'});
        point2.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya2 = board.create('point', [function(){return 2/slider.Value();}, 0], {name: '----', color:'none'});
        raya2.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno2 = board.create('point',[function(){return 2/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});

        point3 = board.create('point',[function(){return 3/slider.Value();},0], {name:3, size:7, face:'+',color:'black'});
        point3.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya3 = board.create('point', [function(){return 3/slider.Value();}, 0], {name: '----', color:'none'});
        raya3.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno3 = board.create('point',[function(){return 3/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
      
        point4 = board.create('point',[function(){return 4/slider.Value();},0], {name:4,size:7, face:'+',color:'black'});
        point4.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya4 = board.create('point', [function(){return 4/slider.Value();}, 0], {name: '----', color:'none'});
        raya4.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno4 = board.create('point',[function(){return 4/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point5 = board.create('point',[function(){return 5/slider.Value();},0], {name:5,size:7, face:'+',color:'black'});
        point5.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya5= board.create('point', [function(){return 5/slider.Value();}, 0], {name: '----',color:'none'});
        raya5.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno5 = board.create('point',[function(){return 5/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point6 = board.create('point',[function(){return 6/slider.Value();},0], {name:6,size:7, face:'+',color:'black'});
        point6.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya6 = board.create('point', [function(){return 6/slider.Value();}, 0], {name: '----',color:'none'});
        raya6.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno6 = board.create('point',[function(){return 6/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
     
        point7 = board.create('point',[function(){return 7/slider.Value();},0], {name:7,size:7, face:'+',color:'black'});
        point7.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya7 = board.create('point', [function(){return 7/slider.Value();}, 0], {name: '----',color:'none'});
        raya7.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno7 = board.create('point',[function(){return 7/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
      
        point8 = board.create('point',[function(){return 8/slider.Value();},0], {name:8,size:7, face:'+',color:'black'});
        point8.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya8 = board.create('point', [function(){return 8/slider.Value();}, 0], {name: '----',color:'none'});
        raya8.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno8 = board.create('point',[function(){return 8/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point9 = board.create('point',[function(){return 9/slider.Value();},0], {name:9,size:7, face:'+',color:'black'});
        point9.label.setAttribute({ color: 'black', fontSize: 16, offset: [-5, -20]}); 
        raya9 = board.create('point', [function(){return 9/slider.Value();}, 0], {name: '----', color:'none'});
        raya9.label.setAttribute({color: 'black', fontSize: 14, offset: [-10, -29]}); 
        deno9 = board.create('point',[function(){return 9/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point10 = board.create('point',[function(){return 10/slider.Value();},0], {name:10,size:7, face:'+',color:'black'});
        point10.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya10 = board.create('point', [function(){return 10/slider.Value();}, 0], {name: '-----',color:'none'});
        raya10.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno10 = board.create('point',[function(){return 10/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point11 = board.create('point',[function(){return 11/slider.Value();},0], {name:11,size:7, face:'+',color:'black'});
        point11.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya11 = board.create('point', [function(){return 11/slider.Value();}, 0], {name: '-----',color:'none'});
        raya11.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno11 = board.create('point',[function(){return 11/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point12 = board.create('point',[function(){return 12/slider.Value();},0], {name:12,size:7, face:'+',color:'black'});
        point12.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya12 = board.create('point', [function(){return 12/slider.Value();}, 0], {name: '-----',color:'none'});
        raya12.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno12 = board.create('point',[function(){return 12/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point13 = board.create('point',[function(){return 13/slider.Value();},0], {name:13,size:7, face:'+',color:'black'});
        point13.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya13 = board.create('point', [function(){return 13/slider.Value();}, 0], {name: '-----',color:'none'});
        raya13.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno13 = board.create('point',[function(){return 13/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point14 = board.create('point',[function(){return 14/slider.Value();},0], {name:14,size:7, face:'+',color:'black'});
        point14.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya14 = board.create('point', [function(){return 14/slider.Value();}, 0], {name: '-----',color:'none'});
        raya14.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno14 = board.create('point',[function(){return 14/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point15 = board.create('point',[function(){return 15/slider.Value();},0], {name:15,size:7, face:'+',color:'black'});
        point15.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya15= board.create('point', [function(){return 15/slider.Value();}, 0], {name: '-----',color:'none'});
        raya15.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno15 = board.create('point',[function(){return 15/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point16 = board.create('point',[function(){return 16/slider.Value();},0], {name:16,size:7, face:'+',color:'black'});
        point16.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya16 = board.create('point', [function(){return 16/slider.Value();}, 0], {name: '-----',color:'none'});
        raya16.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno16 = board.create('point',[function(){return 16/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
      
        point17 = board.create('point',[function(){return 17/slider.Value();},0], {name:17,size:7, face:'+',color:'black'});
        point17.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya17 = board.create('point', [function(){return 17/slider.Value();}, 0], {name: '-----',color:'none'});
        raya17.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno17 = board.create('point',[function(){return 17/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point18 = board.create('point',[function(){return 18/slider.Value();},0], {name:18,size:7, face:'+',color:'black'});
        point18.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya18 = board.create('point', [function(){return 18/slider.Value();}, 0], {name: '-----',color:'none'});
        raya18.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno18 = board.create('point',[function(){return 18/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point19 = board.create('point',[function(){return 19/slider.Value();},0], {name:19,size:7, face:'+',color:'black'});
        point19.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya19 = board.create('point', [function(){return 19/slider.Value();}, 0], {name: '-----',color:'none'});
        raya19.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno19 = board.create('point',[function(){return 19/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point20 = board.create('point',[function(){return 20/slider.Value();},0], {name:20,size:7, face:'+',color:'black'});
        point20.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya20 = board.create('point', [function(){return 20/slider.Value();}, 0], {name: '-----',color:'none'});
        raya20.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno20 = board.create('point',[function(){return 20/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point21 = board.create('point',[function(){return 21/slider.Value();},0], {name:21,size:7, face:'+',color:'black'});
        point21.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya21 = board.create('point', [function(){return 21/slider.Value();}, 0], {name: '-----',color:'none'});
        raya21.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno21 = board.create('point',[function(){return 21/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point22 = board.create('point',[function(){return 22/slider.Value();},0], {name:22,size:7, face:'+',color:'black'});
        point22.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya22 = board.create('point', [function(){return 22/slider.Value();}, 0], {name: '-----',color:'none'});
        raya22.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno22 = board.create('point',[function(){return 22/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
       
        point23 = board.create('point',[function(){return 23/slider.Value();},0], {name:23,size:7, face:'+',color:'black'});
        point23.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya23 = board.create('point', [function(){return 23/slider.Value();}, 0], {name: '-----',color:'none'});
        raya23.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno23 = board.create('point',[function(){return 23/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point24 = board.create('point',[function(){return 24/slider.Value();},0], {name:24,size:7, face:'+',color:'black'});
        point24.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
        raya24 = board.create('point', [function(){return 24/slider.Value();}, 0], {name: '-----',color:'none'});
        raya24.label.setAttribute({color: 'black', fontSize: 14, offset: [-12, -29]}); 
        deno24 = board.create('point',[function(){return 24/slider.Value();},0], {name: function(){return slider.Value();},color:'none'});
        
        point25 = board.create('point',[function(){return 36/slider.Value();},function(){return f(slider.Value());}], {name:''});
        point25.label.setAttribute({ color: 'black', fontSize: 16, offset: [-10, -20]}); 
     
    };

    /**
     Función que recibe una fracción, la ubica en la recta y la etiqueta inferiormente
     */
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
    
// 
// 
    /**
     Etiqueta la fracción que recibe superiormente y la ubica
     */
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
 
 var A = 1;
 var B = 0;
 var FraccionesA = [unmedio,unsexto,uncuarto,unquinto];
 var FraccionesB = [untercio,uncuarto,unsexto,unmedio];
 
 var mensaje, mensaje1, mensaje2, mensaje3;
 var letrero = false;
 var PosCorSlider;
  
 btn1.onclick = function(){   //botón construir segmentos
      $( "#btn2" ).prop( "disabled", true );
      $( "#btn3" ).prop( "disabled", true );
      
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
 
 var f1masf2;
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
                     mensaje3 = brd4.create('text',[0.2,0.3, 'Mueve el deslizador para etiquetar ambas fracciones inferiormente'], {fontSize:20, color:"red"});
                     mensaje3.setAttribute({fixed: true}); 
                     letrero = true;
                        }
                    }
                     else{
                     PosCorSlider = false;  
                     mensaje3 = brd4.create('text',[0.2,0.3, 'Mueve el deslizador para etiquetar ambas fracciones inferiormente'], {fontSize:20, color:"red"});
                     mensaje3.setAttribute({fixed: true}); 
                     letrero = true;
                        }
                    
            }
           //verifico la posición del punto 1
            if( (Math.sqrt((pA1.X()-arreglo[0].x/arreglo[0].y)*(pA1.X()-arreglo[0].x/arreglo[0].y))<0.04) && (Math.sqrt((pA1.Y())*(pA1.Y()))<0.1) ){
                contador++;   
              }
            else{
                mensaje1 = brd4.create('text',[0.6,0.7, 'Revisa la posición de la fracción'], {fontSize:20, color:"midnightblue"});
                mensaje1.setAttribute({fixed: true}); 
                letrero = true;
            }
            //verifico la posición del punto 2
            if( (Math.sqrt((pB1.X()-arreglo[l].x/arreglo[l].y)*(pB1.X()-arreglo[l].x/arreglo[l].y))<0.04) && (Math.sqrt((pB1.Y())*(pB1.Y()))<0.1) ){
                contador++;   
              }
            else{
                mensaje2 = brd4.create('text',[0.6,0.5, 'Revisa la posición de la fracción'], {fontSize:20, color:"mediumvioletred"});
                mensaje2.setAttribute({fixed: true}); 
                letrero = true;
            }
          if(contador === 3){
              mensaje = brd4.create('text',[0.3,1.2, 'Bien hecho, ahora coloca un segmento detrás del otro '], {fontSize:20, color:"orange"});
              mensaje.setAttribute({fixed: true}); 
              seg = brd4.create('segment', [[0, 0.075], [arreglo[l].x/arreglo[l].y, 0.075]], {strokeWidth: '5', strokeColor: 'mediumvioletred'});
              seg = brd4.create('segment', [[0, 0.025],[arreglo[0].x/arreglo[0].y,0.025]], {strokeWidth: '4', strokeColor: 'midnightblue'});
              brd4.removeObject(pA1);
             
              brd4.removeObject(pB1);
              $('#CapturaRespuesta').toggle('slow');
              $( "#btn1" ).prop( "disabled", true );
              $( "#btn2" ).prop( "disabled", false );
              mathField6.write('\\frac{'+arreglo[0].x+'}{'+arreglo[0].y+'}+\\frac{'+arreglo[l].x+'}{'+arreglo[l].y+'}=');
              mathField7.write('\\frac{}{}');   
              f1masf2 = ((arreglo[0].x)*(arreglo[l].y) + (arreglo[0].y*arreglo[l].x))/(arreglo[0].y*arreglo[l].y);

            s1 = brd4.create('segment', [CorX, CorY], {name: arreglo[l].x, color: 'red', withLabel:true});
            s1.label.setAttribute({ color: 'red', fontSize: 16, offset: [-5, 45]});  
           
            s12 = brd4.create('segment', [function(){ return s1.X();}, function(){ return s1.Y();}], {name: '---', color: 'none', withLabel:true});
            s12.label.setAttribute({color: 'red', fontSize: 18, offset: [-10, 38]});
           
            s13 = brd4.create('segment', [function(){ return s1.X();}, function(){ return s1.Y();}], {name: arreglo[l].y, color: 'none', withLabel:true});
            s13.label.setAttribute({ color: 'red', fontSize: 16, offset: [-5, 25]}); 
           }
           else{
            //  $( "#btn3" ).prop( "disabled", true );
              return;
           }          
 };
 

 
 
 
 $( "#btn3" ).prop( "disabled", true ); //de entrada el botón está deshabilitado
                                        //se habilitará hasta que se resuelva correctamente el ejercicio
 
btn3.onclick = function(){ //botón Continuar para generar otro ejercicio
     ctx.clearRect(0,0, canvas.width, canvas.height);
    if(B === 3){
     $( "#btn1" ).prop( "disabled", true );
     $( "#btn3" ).prop( "disabled", true ); 
     //ctx.font = "35px Georgia";
     alert("Haz completado la lección");
     ctx.fillStyle = "orange";
     ctx.font = "30px Georgia";
     ctx.fillText("Haz concluido todas las lecciones, ¡muchas gracias por participar!",100,50);

  }
  else{
     $('#CapturaRespuesta').toggle('slow');
     mathField6.latex("");
     mathField7.latex("");
     for(el in brd4.objects) {
     brd4.removeObject(brd4.objects[el]);
     }
      $( "#btn1" ).prop( "disabled", false );
      $( "#btn3" ).prop( "disabled", true );
     
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
};
 
  
 var A = 1; //índice del arreglo FraccionesA
 var B = 0; //índice del arreglo FraccionesB
 TerceraParte(FraccionesA[0], FraccionesA[A], brd4);
  
var Fraccion1 = document.getElementById("Fraccion1");
var Fraccion2 = document.getElementById("Fraccion2");
var Fraccion3 = document.getElementById("Fraccion3");
var Fraccion4 = document.getElementById("Fraccion4");
var Fraccion5 = document.getElementById("Fraccion5");
var Fraccion6 = document.getElementById("Fraccion6");
var Fraccion7 = document.getElementById("Fraccion7");
var MQ = MathQuill.getInterface(2);

//
var config= {
    handlers: {
    edit: function() {
             
                    }
                }
};
var config2= {
    handlers: {
    edit: function() {
        
                    }
                }
};
var config3= {
    handlers: {
                }
};
var config4= {
    handlers: {
                }
};
var config5= {
    handlers: {
                }
};
var config6= {
    handlers: {
                }
};

var respuesta;

var config7= {
    handlers: {
        edit: function() {
                respuesta = mathField7.latex(); //procesa el latex que se encuentra en el 
                                         //campo de MathQuill
                ValidaRespuesta(respuesta);
                },
        enter: function() {
                ctx.clearRect(0,0, canvas.width, canvas.height);
                texToPyt = new TeXToLinealPyt(respuesta);
                texToPyt.fracToDiag();
                texToPyt.Sinllaves();
                texToPyt.quitaEtiqParen();
                RevisaEstructura(texToPyt.cadPyt);
                }
            }
};


var datos = [];
function RevisaEstructura(cad){
    if(cad !== ""){
        datos = extraer(cad);
       
        if(cad.length === 1 || isNaN(parseInt(datos[0])) || isNaN(parseInt(datos[datos.length-1]))) {
            alert("Respuesta no válida");
            mathField7.latex("");
            mathField7.write('\\frac{}{}');
            mathField7.blur();
        }
        else{
           
            if(f1masf2 === parseInt(datos[0])/parseInt(datos[1]) ){
                ctx.fillStyle = "orange";
                ctx.font = "30px Georgia";
                ctx.fillText("¡Muy Bien!",500,50);
                $( "#btn3" ).prop( "disabled", false );
              
                
            }
            else{
                ctx.fillStyle = "orange";
                ctx.font = "30px Georgia";
                ctx.fillText("Revisa tu respuesta",400,50);
            }
          
        }
    }
    else{
     alert("Respuesta no válida");
     mathField7.latex("");
     mathField7.write('\\frac{}{}');
     mathField7.blur();
    }
    
};

var mathField = MQ.MathField(Fraccion1, config);
var mathField2= MQ.MathField(Fraccion2, config2);
var mathField3 = MQ.MathField(Fraccion3, config3);
var mathField4= MQ.MathField(Fraccion4, config4);
var mathField5= MQ.MathField(Fraccion5, config5);
var mathField6= MQ.MathField(Fraccion6, config6);
var mathField7= MQ.MathField(Fraccion7, config7);

mathField.write('\\frac{2}{3}');
mathField2.write('\\frac{'+3+'}{'+3+'}');
mathField3.write('\\frac{5}{3}');
mathField4.write('\\frac{2}{3}+\\frac{'+3+'}{'+3+'}=\\frac{5}{3}');
mathField5.write('\\frac{1}{2}+\\frac{'+2+'}{'+3+'}=\\frac{7}{6}');

var filtro=function(e){  
    var caracAcept="0123456789/\b\x0d"; //  "\b" es backspace, \x0d enter   
    var tecla=String.fromCharCode(e.which); // which contiene el Código Ascii del caracter oprimido.
    return caracAcept.indexOf(tecla)>=0; //  si regresa falso el caracter no se captura, en otro caso se captura.   
};  


Fraccion7.onkeypress = filtro;

function ValidaRespuesta(cad){
   var exp2 = /\{\\/;
   if ( exp2.test(cad)  ){
       alert("no se admiten fracciones de fracciones");
       mathField7.latex("");
       mathField7.write('\\frac{}{}');
       mathField7.blur();
       
      }
   var exp1 = /[0-9]{3,}/;
   if(exp1.test(cad)){
        alert("introduce a lo más dos dígitos");
        mathField7.latex("");
        mathField7.write('\\frac{}{}');
        mathField7.blur();
   }
   var exp3 = /\}\{0\}/;
   if(exp3.test(cad)){
        alert("El denominador debe ser distinto de cero"); 
        mathField7.latex("");
        mathField7.write('\\frac{}{}');
        mathField7.blur();
   }
   //var exp4 =  /{[0-9]*\+}|{\+[0-9]*}/g;
     var exp4 = /\}[0-9]/g; 
    if(exp4.test(cad)){
        alert("Expresión no válida, la fracción debe capturarse de la forma: numerador/denominador"); 
        mathField7.latex("");
        mathField7.write('\\frac{}{}');
        mathField7.blur();
   }
   var exp5 = /[0,9]\\frac/g;
   if(exp5.test(cad)){
        alert("Expresión no válida, la fracción debe capturarse de la forma: numerador/denominador"); 
        mathField7.latex("");
        mathField7.write('\\frac{}{}');
        mathField7.blur();
   }   
};

function extraer(cadena) {
  var array;
  array = cadena.split('/');
  return array;
};

var filtro2 = function(e){  
    mathField6.blur();
    var caracAcept=""; //  "\b" es backspace, \x0d enter   
    
    var tecla=String.fromCharCode(e.keyCode); // which contiene el Código Ascii del caracter oprimido.
    
    return caracAcept.indexOf(tecla)>=0; //  si regresa falso el caracter no se captura, en otro caso se captura.   
};

var filtro3 = function(){
    mathField6.blur();
    return false;  
};

Fraccion6.onkeypress = filtro2;
Fraccion6.onkeydown = filtro3;

 $( "#Fraccion6" ).prop( "disabled", true );



}); //termina jQuery






