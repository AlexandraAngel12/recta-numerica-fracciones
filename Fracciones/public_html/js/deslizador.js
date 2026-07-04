/* 
Se define el objeto Deslizador, junto con las funciones que ayudan a sujetar 
el disco del deslizador.
 */


 
var Punto = function(x,y){
    this.x = x;
    this.y = y;
};

Punto.prototype = {
    Copia: function() {
        return new Punto(this.x, this.y);
    }
};

var Deslizador = function(ctx, xi, yi, longitud, n){
    this.ctx = ctx;
    this.inicio = new Punto(xi, yi);
    this.longitud = longitud;
    this.min = 1;
    this.max = n;
    this.incr = 1;
    this.valor = 1;
    this.posDisco = this.inicio.Copia();
};

Deslizador.prototype = {
    InfoDisco: function(posCursorx) {
        this.posDisco.x = this.posDisco.x - Math.floor((this.posDisco.x-posCursorx)/(this.longitud/this.max))*(this.longitud/this.max);         
        this.valor = Math.floor((this.posDisco.x - this.inicio.x)*(this.max/this.longitud) + this.incr + 0.1);
        return this.valor;        
    },
    Dibuja: function() {
            this.ctx.strokeStyle="gray";
            this.ctx.beginPath();
            this.ctx.moveTo(this.inicio.x, this.inicio.y);
            this.ctx.lineTo(this.inicio.x+this.longitud, this.inicio.y);
            this.ctx.stroke();
            this.ctx.fillStyle="black";
            this.ctx.font="20px Georgia";
            this.ctx.fillText(this.valor,this.posDisco.x - 3,this.posDisco.y-30);
            Disco(this.ctx, this.posDisco, 7, "gray");
            Disco(this.ctx, this.posDisco, 3, "black"); 
          }
};

function Disco(ctx, centro, radio, color) {
  ctx.fillStyle= color;
  ctx.beginPath();
  ctx.arc(centro.x,centro.y, radio, 0, 2*Math.PI);
  ctx.fill();
};

function windowToCanvas(canvas, x, y) {
   var bbox = canvas.getBoundingClientRect();                                             
   return { x: x - bbox.left,       
            y: y - bbox.top        
          };
};

function DistanciaEntrePuntos(p1, p2) {
  return Math.sqrt( (p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y) );
}; 

//A continuación se define a la fracción como un objeto, se le pasa el contexto también

var Frac = function (ctx,x,y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
};

Frac.prototype = {
    Grafico: function(iniciox,inicioy,ancho,largo){
            s = ancho/this.n;  //se divide el ancho del rectángulo "unidad" entre el denominador, asi se calcula
                      //la longitud de cada segmento 1/n.
            this.ctx.fillStyle = "lightcoral";  //se sombrea el área que corresponde al numerador
            this.ctx.beginPath();
            this.ctx.moveTo(iniciox,inicioy-largo);
            this.ctx.lineTo(iniciox+this.m*s,inicioy-largo); //se rellena el área del rectángulo unidad sombreando m segmentos de longitud 1/n
            this.ctx.lineTo(iniciox+this.m*s,inicioy);
            this.ctx.lineTo(iniciox,inicioy);
            this.ctx.closePath();
            this.ctx.fill();  
            this.ctx.strokeStyle = "blue";  //se pintan las líneas de acuerdo al denominador
            this.ctx.beginPath();
            for (var i = 1; i < this.n; i++) {
                this.ctx.moveTo(iniciox+s*i, inicioy-largo);
                this.ctx.lineTo(iniciox+s*i,inicioy );   
                }
            this.ctx.closePath();
            this.ctx.stroke();      
        },
     Info: function(e,ix,iy){
            
            length1 = this.ctx.measureText(this.m*e).width;
            length2 = this.ctx.measureText(this.n*e).width; 
            if(length1 > length2){
                 var mayor = length1;
            }
            else{
                 var mayor = length2;
            }
            this.ctx.font="45px Georgia";
            this.ctx.fillText(this.m*e,ix-10+(mayor/length1)*4,iy);
            this.ctx.fillText(this.n*e,ix-10,iy+45);
            this.ctx.strokeStyle = "blue";
            this.ctx.beginPath();
            this.ctx.moveTo(ix-10,iy+10);
            this.ctx.lineTo(ix+mayor*2,iy+10);
            this.ctx.stroke();
            
          },
     Afrac: function(cadena) {
            var array = cadena.split('/');
            return new Frac(this.ctx,parseInt(array[0]),parseInt(array[1]));
        },
     EsIgual: function(frac){
         if(this.m*frac.n === this.n*frac.m){
             return true;
         }
         else{
             if(frac.m > 0 && frac.n > 0){
             if(this.m !== frac.m){
             this.ctx.fillText("Revisa el numerador",580,540);
             }
             if(this.n !== frac.n){
             this.ctx.fillText("Revisa el denominador",580,590);
             }
         }
         else{
             if(frac.m === 0 || frac.n === 0 ){
             this.ctx.fillText("Expresión inválida",580,540);
             }
             else{
             this.ctx.fillText("Falta información",580,540);
         }
     }
         }
     }
  };
  
  //función que genera un número entero al azar entre el min y el max dados
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };