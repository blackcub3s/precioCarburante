document.addEventListener("DOMContentLoaded", () => {
    const radiosCarburant = document.getElementsByName('carburant');
    const radioDiesel = radiosCarburant[0];
    const radioGasolina = radiosCarburant[1];

    const inputPreu21 = document.getElementById("entrada21perCent");    //agafaem l'imput que contindrà el preu del carburant el 21 de març (dia amb 21% iva)

    //obting el valor del formulari de carburant quan canvia 
    radioDiesel.addEventListener("change", () => {
        emplenaSortidaPreu_iva10percent(radioDiesel.value, inputPreu21.value);  //radioDiesel.value es "D"
    });
    
    radioGasolina.addEventListener("change", () => {
        emplenaSortidaPreu_iva10percent(radioGasolina.value, inputPreu21.value); //radioGasolina.value es "D"
    });


    

});

//PRE: carburant: es D o G
//.    preuDiaPrevi_21PerCent: es el preu que tenia el carburant el dia 21 de març, abans de la pujada de l'iva
//POST: s'emplena el
function emplenaSortidaPreu_iva10percent(carburant, preuDiaPrevi_21PerCent) {
    const dom10perCent = document.getElementById("sortidaDades10perCent");
    if (carburant === "D") {
        let IEH_diesel = 0.378; 
        dom10perCent.textContent = rebaixaPreuCombustible_21_a_10(IEH_diesel, preuDiaPrevi_21PerCent);
    } else if (carburant === "G") {
        let IEH_gasolina = 0.472;
        dom10perCent.textContent = rebaixaPreuCombustible_21_a_10(IEH_gasolina, preuDiaPrevi_21PerCent);
    }
}


//RAONAMENTS PREVIS: 
//EXPRESSIO 1 CAS PARTICULAR: (x + 0,379)*1.21 = 1.65 --> (preuBase + IEH)*1.21 = preuSurtidorPrevi       [amb 21% iva]
//EXPRESSIO 2 CAS PARTICULAR: (x + 0,379)*1.10 = Y -----> (preuBase + IEH)*1.10 = preuSurtidorActual.     [amb 10% iva]
//x es preu base || Y es preu al surtidor amb 10% de iva

//PRE: IEH --> impost del carburant (diferent entre diesel i gasolina)
//.    preuSurtidorPrevi --> el preu que veiem a surtidor el dia previ a la baixada de l'iva (21 de març)
//POST: preuSurtidorActual --> el preu que HAURIEM DE VEURE en surtidor el dia posterior a la baixada de l'iva al 10% (22 de març)
function rebaixaPreuCombustible_21_a_10(IEH, preuSurtidorPrevi) {
    let preuBase = (preuSurtidorPrevi - 1.21*IEH)/1.21;      //expressio 1 aillada per trobar preuBase (la X d'expressio 1)
    let preuSurtidorActual = (preuBase + IEH)*1.10;
    return preuSurtidorActual; 
}