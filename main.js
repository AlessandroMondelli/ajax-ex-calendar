$(document).ready(function() {

    //Preparo template Handlebars
    var source = $("#calendario-template").html();
    //Preparo template con funzione
    var template = Handlebars.compile(source);

    var firstDay = '2018-01-01'; //Data iniziale
    var lastDay = '2018-12-01'; //Data finale
    var momentData = moment(firstDay);

    getMonth(); //Funzione che crea il primo mese

    $(".arrow.right").click(function() { //Al click su freccia destra
            momentData.add(1,'month'); //Aggiungo un mese
            $(".month-name,.month").empty(); //elimino mee precedente
            getMonth(); //Prendo e stampo nuovo mese

            if (momentData.isSameOrAfter(lastDay)) { //Controllo se è l'ultimo mese disponibile
                $(this).prop('disabled',true); //Se non è disponibile disabilito freccia
            }
    });

    $(".arrow.left").click(function() {
            momentData.subtract(1,'month'); //Sottraggo un mese
            $(".month-name,.month").empty(); //elimino mee precedente
            getMonth(); //Prendo e stampo nuovo mese

            if (momentData.isSameOrBefore(firstDay)) { //Controllo se è disponibile un mese precedente
                $(this).prop('disabled',true); //Se non è disponibile disabilito freccia
            }
    });


    //*** FUNZIONI ***//

    function getMonth() { //Funzione che prende mese e giorni del mese
        var days = momentData.daysInMonth(); //Giorni presenti nel mese richiesto
        var month = momentData.format('MMMM'); //Prendo mese
        var nMonth = momentData.month(); //Prendo numero del mese
        appendMonth(days,month); //Passo dati a funzione che stamperà a schermo
        getHoliday(nMonth); //Passo dati a funzoone che verifica festività
    }

    function appendMonth(daysMonth,monthN) { //Funzione che stampa a schermo
        for (var i = 0; i < daysMonth; i++) { //Ciclo per i giorni del mese
            var placeholder = {
                varDay : (i + 1) //Stampo giorno del mese
            };
            var finalHtml = template(placeholder); //Prendo template
            $(".month").append(finalHtml); //Appendo in html
        }
        $(".month-name").append(monthN + " 2018"); //Appendo nome del mese
    }

    function getHoliday(monthSel) {
        $.ajax ({ //Chiamata AJAX per recuperare dati film
            'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
            'data' : {
                'year' : 2018,
                'month' : monthSel
            },
            'method' : 'GET', //Metodo GET
            'success' : function(result) { //Caso funzionamento richiesta
                var res = result.response;
                console.log(res);
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

});
