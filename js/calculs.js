document.addEventListener("DOMContentLoaded", () => {
    const radiosCarburant = document.getElementsByName('carburant');
    const radioDiesel = radiosCarburant[0];
    const radioGasolina = radiosCarburant[1];

    const inputPreu21 = document.getElementById("entrada21perCent");    //agafem l'imput que contindrà el preu del carburant el 21 de març (dia amb 21% iva)

    //obtinc el valor del formulari de carburant quan canvia el radio button i el mostro en la sortida de dades
    radioDiesel.addEventListener("change", () => {
        emplenaSortidaPreu_iva10percent(radioDiesel.value, parseFloat(inputPreu21.value));  //radioDiesel.value es "D"
    });
    
    radioGasolina.addEventListener("change", () => {
        emplenaSortidaPreu_iva10percent(radioGasolina.value, parseFloat(inputPreu21.value)); //radioGasolina.value es "D"
    });

    //NOMES PERMETIO CÀLCUL quan s'afegeix preu d'ahir 
    // 21 de març al input de type number si hi ha algun radiobutton sel·leccionat
    inputPreu21.addEventListener("input", () => {
        if (radioDiesel.checked)
            emplenaSortidaPreu_iva10percent(radioDiesel.value, parseFloat(inputPreu21.value)); 
        if (radioGasolina.checked)
            emplenaSortidaPreu_iva10percent(radioGasolina.value, parseFloat(inputPreu21.value));
    });

    

});

//PRE: carburant: es D o G
//     preuDiaPrevi_21PerCent: es el preu que tenia el carburant el dia 21 de març, abans de la pujada de l'iva
//POST: s'emplena el <p> que conté la informació de sortida.
function emplenaSortidaPreu_iva10percent(carburant, preuDiaPrevi_21PerCent) {
    const dom10perCent = document.getElementById("sortidaDades10perCent");
    if (carburant === "D") {
        let IEH_previ_diesel = 0.379; //segons Ley 38/1992, de 28 de diciembre, de Impuestos Especiales --> https://www.boe.es/eli/es/l/1992/12/28/38/con (vigent abans de l'entrada del real decret 21 març 2026)
        let IEH_nou_diesel = 0.26731; //segons real decret 21 març 2026 --> https://www.boe.es/boe/dias/2026/03/21/pdfs/BOE-A-2026-6544.pdf --> epígrafe 1.3
        dom10perCent.textContent = rebaixaPreuCombustible_21_a_10(IEH_previ_diesel, preuDiaPrevi_21PerCent, IEH_nou_diesel);
    } else if (carburant === "G") {
        let IEH_previ_gasolina = 0.472;   //segons Ley 38/1992, de 28 de diciembre, de Impuestos Especiales --> https://www.boe.es/eli/es/l/1992/12/28/38/con (vigent abans de l'entrada del real decret 21 març 2026)
        let IEH_nou_gasolina95 = 0.30432; //segons real decret 21 març 2026 --> https://www.boe.es/boe/dias/2026/03/21/pdfs/BOE-A-2026-6544.pdf --> epígrafe 1.2.2
        dom10perCent.textContent = rebaixaPreuCombustible_21_a_10(IEH_previ_gasolina, preuDiaPrevi_21PerCent, IEH_nou_gasolina95);
    }
}
/*
RAONAMENTS PREVIS: 
Obtinc el preu base de la gasolina el dia 21 de març amb IEH previ (més car) i amb IVA a 21%:
       EXPR 1    (x + 0,378)*1.21 = 1.65  ---*-->   (preuBase + IEH_previ)*1.21 = preuSurtidorPrevi          
Obtinc el preu base de la gasolina que hi hauria d'haver el 22 de març amb el nou IEH i l'IVA al 10%:
       EXPR 2:   (x + 0,26731)*1.10 = Y   ---*-->   (preuBase + IEH_nou)*1.10 = preuSurtidorActual.    
        --------------------------------------------------------------------
        --  *NOTA: x es preu base || Y es preu al surtidor                --
        --------------------------------------------------------------------

PRE: 
     - IEH_PREVI --> impost del carburant (diferent entre diesel i gasolina) abans del RD 21 de març 2026
     - preuSurtidorPrevi --> el preu que veiem a surtidor el dia previ a la baixada de l'IVA i IEH (21 de març)
POST: 
     - preuSurtidorActual --> el preu que HAURIEM DE VEURE en surtidor el dia posterior a la baixada de l'iva al 10% i IEH (22 de març).
*/
function rebaixaPreuCombustible_21_a_10(IEH_previ, preuSurtidorPrevi, IEH_nou) {
    let preuBase = (preuSurtidorPrevi - 1.21*IEH_previ)/1.21;      //EXPR 1 aillada per trobar preuBase (la X d'EXPR 1)
    let preuSurtidorActual = (preuBase + IEH_nou)*1.10;
    return preuSurtidorActual; 
}