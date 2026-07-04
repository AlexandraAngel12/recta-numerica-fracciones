/* 
Convierte una cadena laTeX algebaica simple a lineal 
con la notación de Python
 */
var TeXToLinealPyt= function (cadena) {
  this.cadPyt= cadena;
  this.indice=0;
  this.pila= [];
  this.nError= -1;
};

TeXToLinealPyt.prototype = {
  fracToInfija: function() {
      var pos= this.cadPyt.indexOf("\\frac");
      var posLlaveDer= 0;
      var posLlaveIzq= 0;
      var subCad="";
        while (pos !== -1) {
            if (this.cadPyt[pos+5] !== "{" ) {
              this.nError=0;   //  "genero mal el esqueleto de fracción o se perdió el caracter {"
              return;
            }
            this.cadPyt= this.cadPyt.substring(0,pos)+ this.cadPyt.substring(pos+5);
            pos++;
            posLlaveDer=this.cadPyt.indexOf("}", pos);
            subCad=this.cadPyt.substring(pos, posLlaveDer);
            posLlaveIzq=subCad.lastIndexOf("{");
            while (posLlaveIzq !== -1) {
                pos= posLlaveDer+1;
                posLlaveDer=this.cadPyt.indexOf("}", pos);
                subCad=subCad.substring(0, posLlaveIzq);
                posLlaveIzq=subCad.lastIndexOf("{", pos);
            }
            this.cadPyt= this.cadPyt.substring(0,posLlaveDer+1)+ "/"+ this.cadPyt.substring(posLlaveDer+1);
            pos= this.cadPyt.indexOf("\\frac");
        }
        return this.cadPyt;
    },
    cdotToasterisco: function (){
      var re = "\\cdot";
      this.cadPyt= this.cadPyt.replace(re, '*');
    },
    fracToDiag: function () {
        re= /}{/g;
        this.cadPyt= this.cadPyt.replace(re, "}/{");
        var re= /\\frac/g;
        this.cadPyt= this.cadPyt.replace(re, "");
    },
    llavesAParen: function () {
        var re= /{/g;
        this.cadPyt= this.cadPyt.replace(re, "(");
        re= /}/g;
        this.cadPyt= this.cadPyt.replace(re, ")");
    },
     Sinllaves: function () {   //esta parte es para recuperar el número a trabajar
        var re= /{/g;
        this.cadPyt= this.cadPyt.replace(re, "");
        re= /}/g;
        this.cadPyt= this.cadPyt.replace(re, "");
    },
    quitaEtiqParen:  function () {
        var re= /\\left|\\right/g;
        this.cadPyt= this.cadPyt.replace(re, "");
      
    },
    insertaAster: function () {
        var re= /[0-9.a-z]\(|\)[0-9.a-z\(]|[0-9.a-z]\[/gi;
        this.cadPyt= this.cadPyt.replace(re, function (cad) {
            var cads= cad[0]+ "*"+ cad[1];
            return cads;
        });
    },
    bloqueaFun: function () {
      var re= /\\sqrt|\\sin|\\cos|\\tan|\\ctg|\\sec/g;
      this.cadPyt= this.cadPyt.replace(re, function (cad) {
            var cads= "[math."+ cad.substring(1) + "]";
            return cads;
        });
  
    },
    quitaBloq: function () {
      var re= /[\[\]]/g;
        this.cadPyt= this.cadPyt.replace(re, "");
    },
    signoPot: function () {
      var re= /\^/g;
        this.cadPyt= this.cadPyt.replace(re, "**");
    }
//    ,
//    segundoFiltro: function () {
//      var re = /\\frac/g;
//      this.cadPyt= this.cadPyt.replace(re, "");
//    }
//  leeToken: function() {
//    this.nerror=-1;
//  },
};
