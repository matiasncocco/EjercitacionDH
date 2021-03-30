let autosImportados = require("./MODULOS");

let persona = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 2000000 ,
    capacidadDePagoTotal: 10000000,
};

const concesionaria = {

   autos: autosImportados,

   buscarAuto: function buscarAuto(patenteBuscada){
        for (let i = 0; i < this.autos.length; i++){
            if (this.autos[i].patente === patenteBuscada ){
                this.autos[i].vendido = true;
                return this.autos[i];
            } ;
        } return null;

    },

    venderAuto: function (patente){
        let auto;
        if (this.buscarAuto(patente) != null){
            auto = this.buscarAuto(patente);
            auto.vendido = true;
        }
    },

   autosParaLaVenta: function autosParaLaVenta(){
       return this.autos.filter(element => !element.vendido)
    },

    autosNuevos: function autosNuevos(){
        return this.autosParaLaVenta().filter(element => element.km < 100);
    },

    listaDeVentas: function listaDeVentas(){
        let ventas = [];
        this.autos.forEach(element => {
            if (element.vendido == true){
                ventas.push(element.precio);
            }
        });
        return ventas;
    },

    totalDeVentas: function totalDeVentas(){
        let totalListaVentas = this.listaDeVentas();
        if (totalListaVentas.length !== 0){
           totalListaVentas = totalListaVentas.reduce((acum,num)=> acum + num,0);
        }
        else{
            return 0
        }
        return totalListaVentas
    },

    puedeComprar: function(auto,persona){
        let precioCuota = auto.precio / auto.cuotas;
        if (persona.capacidadDePagoTotal > auto.precio && persona.capacidadDePagoEnCuotas > precioCuota){
            return true;
        } 
        else{
            return false;
        }
    },
    autosQuePuedeComprar: function(persona){
        let autoDentroDelPresupuesto = [];

        for (let i = 0; i < this.autos.length; i++){
            if (this.puedeComprar(this.autos[i],persona) == true){
                autoDentroDelPresupuesto.push(this.autos[i]);
            }
        }
              
       return autoDentroDelPresupuesto;
    }
};

/*
1) Obtener los autos para la venta

2) Por cada uno de los autos debe de probar si la persona puede comprarlo, ¿ya hay alguna funcionalidad que me permita hacer esto?.

3) Luego debemos retornar los que pueda comprar, ¿hay alguna manera de poder filtrar la lista de autos para la venta del punto 1 con el paso 2?
*/
console.log(concesionaria.autosQuePuedeComprar(persona));