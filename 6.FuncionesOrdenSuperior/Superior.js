//Funciones que pueden retonar funciones o recibir funciones por parametros

function mayorQue(numeroFijo){
    return (numeroMovil) => numeroMovil > numeroFijo;

};

const mayorQue21 = mayorQue(21);

/*

function mayorQue21 (numeroMovil){
    return numeroMovil > 21;

}

*/