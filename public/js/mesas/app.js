
(function () {

    'use strict';

    var byId = function (id) {
        return document.getElementById(id);
    },
            loadScripts = function (desc, callback) {
                var deps = [], key, idx = 0;

                for (key in desc) {
                    deps.push(key);
                }

                (function _next() {
                    var pid,
                            name = deps[idx],
                            script = document.createElement('script');

                    script.type = 'text/javascript';
                    script.src = desc[deps[idx]];

                    pid = setInterval(function () {
                        if (window[name]) {
                            clearTimeout(pid);

                            deps[idx++] = window[name];

                            if (deps[idx]) {
                                _next();
                            } else {
                                callback.apply(null, deps);
                            }
                        }
                    }, 30);

                    document.getElementsByTagName('head')[0].appendChild(script);
                })()
            },
            console = window.console;

    function sorterSillas() {
        [].forEach.call(byId('wrapper').getElementsByClassName('silla'), function (el) {
            Sortable.create(el, {
                group: 'sillas',
                animation: 150
            });
        });
    }

    function creaObjMesa(evt){
        var id=evt.item.id.split('-');
        var contenedor = evt.item.parentNode.id.split('-');
        
                var objeto = {};
                objeto["mesa"] = id[0];
                objeto["sillas"] = id[1];
                objeto["tipo"] = id[2];
                objeto["contenedor"]=contenedor[0];
                objeto["contenedor_columna"]=contenedor[1];
                objeto["contenedor_fila"]=contenedor[2];

                return objeto;
    }

    [].forEach.call(byId('wrapper').getElementsByClassName('asigna_mesas_1'), function (el) {
        Sortable.create(el, {
            group: {
                name: 'mesas',
                put: ["mesas", "mesas_generadas"]
            },
            animation: 150,
            filter: ".js-remove",
            onFilter: function (evt) {
                var item = evt.item,
                        ctrl = evt.target;
                if (Sortable.utils.is(ctrl, ".js-remove")) {
                    item.parentNode.removeChild(item);
                }
            },
            onEnd: function (evt) {
                
                var id=evt.item.id.split('-');
                var contenedor = evt.item.parentNode.id.split('-');
                
                arrayMesas.forEach(function (arr) {
                        if (arr.mesa === id[0] && arr.sillas === id[1] && arr.tipo === id[2]) {
                            arr.contenedor = contenedor[0];
                            arr.contenedor_columna=contenedor[1];
                            arr.contenedor_fila=contenedor[2];
                        }
                    });
                    
                    console.log(arrayMesas);
            }
        });
    });

    Sortable.create(generador_sillas, {
        group: {
            name: 'mesas_generadas',
            pull: 'clone'
        },
        animation: 150,
        onEnd: function (evt) {
                arrayMesas.push(creaObjMesa(evt));
                console.log(arrayMesas);
            }
    });

    $('[data-toggle="tooltip"]').tooltip();
    $('.invitados').popover();




    $("#generador_sillas").html(generarMesa($("#no_sillas").val(), $("#no_mesa").val(), 1));

    function generarMesa(no_sillas, no_mesa, tipo_mesa) {

        var silla = 1;
        var mesa = '<div id="' + no_mesa + '-'+no_sillas+'-'+tipo_mesa+'" class="contenedor_mesa">' +
                '<div class="js-remove">✖</div>' +
                '<div class="mesa">' + no_mesa + '</div>';

        if (tipo_mesa == "1") {
            var value = 360 / no_sillas;
            for (var i = 0; i < 360; i = i + value) {
                mesa += '<div  class="sillas_contenedor" style="transform:rotateZ(' + i + 'deg);"><div class="silla" id="mesa-' + no_mesa + '-silla-' + silla + '"></div></div>';
                silla++;
            }
        }

        if (tipo_mesa == "2") {
            value = 180 / no_sillas;
            for (i = 0; i < 180; i = i + value) {

                var grados = i + 90;

                switch (no_sillas) {
                    case 1:
                        grados = i + 180;
                        break;
                    case 2:
                        grados = (i + 90 + 45);
                        break;
                    case 3:
                        grados = (i + 90 + 30);
                        break;
                    case 4:
                        grados = (i + 90 + 20);
                        break;
                    case 5:
                        grados = (i + 90 + 18);
                        break;
                    case 6:
                        grados = (i + 90 + 16);
                        break;
                    case 7:
                        grados = (i + 90 + 14);
                        break;
                    case 8:
                        grados = (i + 90 + 12);
                        break;
                    case 9:
                        grados = (i + 90 + 10);
                        break;
                    case 10:
                        grados = (i + 90 + 8);
                        break;
                    case 11:
                        grados = (i + 90 + 6);
                        break;
                }
                mesa += '<div  class="sillas_contenedor" style="transform:rotateZ(' + grados + 'deg);"><div class="silla" id="mesa-' + no_mesa + '-silla-' + silla + '"></div></div>';
                silla++;
            }
        }

        return mesa += '</div>';
    }



    $("#no_sillas, #no_mesa, #media_luna").bind('keyup mouseup click', function () {
        var tipo = 1;
        if ($('#media_luna').is(":checked")) {
            tipo = 2;
        }
        $("#generador_sillas").html(generarMesa($("#no_sillas").val(), $("#no_mesa").val(), tipo));
        
        sorterSillas();
    });


    sorterSillas();
    
    
   
})();