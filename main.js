$(document).ready(function() {

    //Preparo template Handlebars
    var source = $("#calendario-template").html();
    //Preparo template con funzione
    var template = Handlebars.compile(source);

    var firstDay = '2018-01-01'; //Data iniziale
    var lastDay = '2018-12-01'; //Data finale
    var momentData = moment(firstDay);

    var stopGen = moment('2018-01-01'); //Imposto mese iniziale limite
    var stopDec = moment('2018-12-01'); //Imposto mese finale limite

    getMonth(); //Richiamo funzione che crea il primo mese
    createDays(); //Richiamo funzione che crea giorni
    $(".arrow.left").prop('disabled',true); //Rendo non disponibile da subito la freccia sinistra

    $(".arrow.right").click(function() { //Al click su freccia destra
            momentData.add(1,'month'); //Aggiungo un mese
            $(".month-name,.month").empty(); //elimino mese precedente
            moveDays(); //Funzione che mette giorni al posto giusto
            getMonth(); //Prendo e stampo nuovo mese
            $(".arrow.left").prop('disabled',false); //Rendo disponibile la freccia sinistra

            if (momentData.isSameOrAfter(stopDec)) { //Controllo se è l'ultimo mese disponibile
                $(this).prop('disabled',true); //Se non è disponibile disabilito freccia
            }
    });

    $(".arrow.left").click(function() {
            momentData.subtract(1,'month'); //Sottraggo un mese
            $(".month-name,.month").empty(); //elimino mee precedente
            moveDays(); //Funzione che mette giorni al posto giusto
            getMonth(); //Prendo e stampo nuovo mese
            $(".arrow.right").prop('disabled',false); //Rendo disponibile la freccia destra

            if (momentData.isSameOrBefore(stopGen)) { //Controllo se è disponibile un mese precedente
                $(this).prop('disabled',true); //Se non è disponibile disabilito freccia
            }
            moveDays();
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
        var dataClone = moment(momentData); //Creo clone della data

        for (var i = 0; i < daysMonth; i++) { //Ciclo per i giorni del mese
            var placeholder = {
                varDataDay : dataClone.format('YYYY-MM-DD'), //Stampo data
                varDay : (i + 1) //Stampo giorno del mese
            };
            var finalHtml = template(placeholder); //Prendo template
            dataClone.add(1, 'days'); //Aggiungo un giorno per il Data
            $(".month").append(finalHtml); //Appendo in html
        }
        $(".month-name").append(monthN + " 2018"); //Appendo nome del mese
    }

    function getHoliday(monthSel) { //Funzione che segna festitività su calendario
        $.ajax ({ //Chiamata AJAX per recuperare dati film
            'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
            'data' : {
                'year' : 2018,
                'month' : monthSel
            },
            'method' : 'GET', //Metodo GET
            'success' : function(result) { //Caso funzionamento richiesta
                var res = result.response; //Prendo risultati da API
                for (var i = 0; i < res.length; i++) { //Scorro array API
                    var holDay = res[i].date; //Prendo data festa
                    var holName = "<span>" + res[i].name + "</span>"; //Prendo nome festa
                $(".day[data-day=" + holDay + "]").addClass("holiday").append(holName); //Appendo dati in caso di corrispondenza
                }
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

    function createDays() { //Funzione che crea giorni
        var dataClone = moment(momentData); //Creo clone della data
        for (var i = 1; i <= 7; i++) { //Ciclo per 7 volte
            var temp = dataClone.weekday(i); //Prendo giorno della settimana in una variabile temporanea
            var day = "<span>" + temp.format('dddd') + "</span>"; //Prendo giorno testuale
            temp.add(1,'days'); //Aggiungo un giorno
            $("#days").append(day); //Appendo giorno
        }
    }

    function moveDays() {
        var dataClone = moment(momentData); //Creo clone della data
        var firstDayOfMonth = dataClone.weekday();
        if (firstDayOfMonth != 1) {
            if (firstDayOfMonth == 0) {
                var diff = 6;
            } else {
                var diff = firstDayOfMonth - 1;
            }
            var quad = "<div class=\"day\"></div>"
            for (var i = 0; i < diff; i++) {
                $(".month").append(quad);
            }
        }
        console.log(firstDayOfMonth);
    }
});
