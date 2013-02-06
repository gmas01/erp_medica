$(function() {
	String.prototype.toCharCode = function(){
		var str = this.split(''), len = str.length, work = new Array(len);
		for (var i = 0; i < len; ++i){
			work[i] = this.charCodeAt(i);
		}
		return work.join(',');
	};
	
	$('#header').find('#header1').find('span.emp').text($('#lienzo_recalculable').find('input[name=emp]').val());
	$('#header').find('#header1').find('span.suc').text($('#lienzo_recalculable').find('input[name=suc]').val());
        
	var $username = $('#header').find('#header1').find('span.username');
	$username.text($('#lienzo_recalculable').find('input[name=user]').val());
	
	var $contextpath = $('#lienzo_recalculable').find('input[name=contextpath]');
	var controller = $contextpath.val()+"/controllers/crmconsultas";
    
	//Barra para las acciones
	$('#barra_acciones').append($('#lienzo_recalculable').find('.table_acciones'));
	
	var $new_consulta = $('#consultas').find('input[name=buscar]');
        var $select_opciones =$('#consultas').find('select[name=consultar_como]');
	//alert($new_consulta);
	
	//aqui va el titulo del catalogo
	$('#barra_titulo').find('#td_titulo').append('Consultas');
	
	
	$tabs_li_funxionalidad = function(){
		$('#forma-registro-window').find('#submit').mouseover(function(){
			$('#forma-registro-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/bt1.png");
			//$('#forma-centrocostos-window').find('#submit').css({backgroundImage:"url(../../img/modalbox/bt1.png)"});
		});
		$('#forma-registro-window').find('#submit').mouseout(function(){
			$('#forma-registro-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/btn1.png");
			//$('#forma-centrocostos-window').find('#submit').css({backgroundImage:"url(../../img/modalbox/btn1.png)"});
		});
		$('#forma-registro-window').find('#boton_cancelar').mouseover(function(){
			$('#forma-registro-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/bt2.png)"});
		})
		$('#forma-registro-window').find('#boton_cancelar').mouseout(function(){
			$('#forma-registro-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/btn2.png)"});
		});
		
		$('#forma-registro-window').find('#close').mouseover(function(){
			$('#forma-registro-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close_over.png)"});
		});
		$('#forma-registro-window').find('#close').mouseout(function(){
			$('#forma-registro-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close.png)"});
		});		
		
		$('#forma-registro-window').find(".contenidoPes").hide(); //Hide all content
		$('#forma-registro-window').find("ul.pestanas li:first").addClass("active").show(); //Activate first tab
		$('#forma-registro-window').find(".contenidoPes:first").show(); //Show first tab content
		
		//On Click Event
		$('#forma-registro-window').find("ul.pestanas li").click(function() {
			$('#forma-registro-window').find(".contenidoPes").hide();
			$('#forma-registro-window').find("ul.pestanas li").removeClass("active");
			var activeTab = $(this).find("a").attr("href");
			$('#forma-registro-window').find( activeTab , "ul.pestanas li" ).fadeIn().show();
			$(this).addClass("active");
			return false;
		});
	}
	
        $select_opciones.children().remove();
        var opciones_html='';
            opciones_html+='<option value="0" selected="yes" >--Seleccione el tipo de Consulta--</option>';
            opciones_html+='<option value="1">Registro Visitas</option>';
            opciones_html+='<option value="2">Registro Llamadas</option>';
            opciones_html+='<option value="3">Registro Casos</option>';
            opciones_html+='<option value="4">Registro Oportunidades</option>';
            opciones_html+='<option value="5">Contactos/Prospectos/Clientes</option>';
         $select_opciones.append(opciones_html);
         
         //valida la fecha seleccionada
            function mayor(fecha, fecha2){
		var xMes=fecha.substring(5, 7);
		var xDia=fecha.substring(8, 10);
		var xAnio=fecha.substring(0,4);
		var yMes=fecha2.substring(5, 7);
		var yDia=fecha2.substring(8, 10);
		var yAnio=fecha2.substring(0,4);

		if (xAnio > yAnio){
			return(true);
		}else{
			if (xAnio == yAnio){
				if (xMes > yMes){
					return(true);
				}
				if (xMes == yMes){
					if (xDia > yDia){
						return(true);
					}else{
						return(false);
					}
				}else{
					return(false);
				}
			}else{
				return(false);
			}
		}
            }
            //muestra la fecha actual
            var mostrarFecha = function mostrarFecha(){
                var ahora = new Date();
                var anoActual = ahora.getFullYear();
                var mesActual = ahora.getMonth();
                mesActual = mesActual+1;
                mesActual = (mesActual <= 9)?"0" + mesActual : mesActual;
                var diaActual = ahora.getDate();
                diaActual = (diaActual <= 9)?"0" + diaActual : diaActual;
                var Fecha = anoActual + "-" + mesActual + "-" + diaActual;		
                return Fecha;
            }

             //Alimentando el select del mes
                                        
            var array_meses = {
                0:"- Seleccionar -",  
                1:"Enero",  
                2:"Febrero", 
                3:"Marzo", 
                4:"Abirl", 
                5:"Mayo", 
                6:"Junio", 
                7:"Julio", 
                8:"Agosto", 
                9:"Septiembre", 
                10:"Octubre", 
                11:"Noviembre", 
                12:"Diciembre"
            };

            
         
        //Plugin de registro de llamadas
        $registro_llamadas = function(){
            
            var id_to_show = 1;
            $(this).modalPanelLlamadas();
            var form_to_show1 = 'formaCrmRegistroLlamadas';
            $('#' + form_to_show1).each (function(){this.reset();});
            var $forma_selected1 = $('#' + form_to_show1).clone();
            $forma_selected1.attr({id : form_to_show1 + id_to_show});

            $('#forma-llamadas-window').css({"margin-left": -400,"margin-top": -265});
            $forma_selected1.prependTo('#forma-llamadas-window');
            $forma_selected1.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
            $tabs_li_funxionalidad();

            //variables para la forma
            var $select_agente =$('#forma-llamadas-window').find('select[name=select_agente]');
            var $select_tipo =$('#forma-llamadas-window').find('select[name=select_tipo]');
            var $select_status =$('#forma-llamadas-window').find('input[name=status]');
            var $select_etapa =$('#forma-llamadas-window').find('input[name=etapa]');
            var $fecha_inicial =$('#forma-llamadas-window').find('input[name=fecha_inicial]');
            var $fecha_final =$('#forma-llamadas-window').find('input[name=fecha_final]');
            var $consultar =$('#forma-llamadas-window').find('input[name=buscar]');
            var $metas =$('#forma-llamadas-window').find('input[name=metas]');
            var $totales =$('#forma-llamadas-window').find('input[name=totales]');
            var $porcentaje =$('#forma-llamadas-window').find('input[name=porcentaje]');
            var $llam_entrantes =$('#forma-llamadas-window').find('input[name=entrantes]');
            var $llam_salientes =$('#forma-llamadas-window').find('input[name=salientes]');
            var $llam_planeadas =$('#forma-llamadas-window').find('input[name=planeadas]');
            var $con_exito =$('#forma-llamadas-window').find('input[name=con_exito]');
            var $con_cita =$('#forma-llamadas-window').find('input[name=con_cita]');
            var $con_seguimiento =$('#forma-llamadas-window').find('input[name=con_seguimiento]');
            var $efectividad =$('#forma-llamadas-window').find('input[name=efectividad]');
            var $gestion =$('#forma-llamadas-window').find('input[name=gestion]');
            var $avance =$('#forma-llamadas-window').find('input[name=avance]');
            var $planeacion =$('#forma-llamadas-window').find('input[name=planeacion]');
            
            
            var $cerrar_plugin = $('#forma-llamadas-window').find('#close');
            var $cancelar_plugin = $('#forma-llamadas-window').find('#boton_cancelar');
            
            $select_status.attr({'value' : 0});
            $select_etapa.attr({'value': 0});
            
            $select_tipo.children().remove();
            var tipo_html='';
                
                tipo_html+='<option value="1">Cliente</option>';
                tipo_html+='<option value="2">Prospecto</option>';
            $select_tipo.append(tipo_html);
            
            var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatos.json';
		var parametros={
                    
                    iu: $('#lienzo_recalculable').find('input[name=iu]').val()
                }
             $.post(input_json,parametros,function(entry){
            /*     
            //cargar select del Mes inicial
               $mes_inicial.children().remove();
               var select_html = '';
               for(var i in array_meses){
                       if(parseInt(i) == 1 ){
                               select_html += '<option value="' + i + '" selected="yes">' + array_meses[i] + '</option>';	
                       }else{
                               select_html += '<option value="' + i + '"  >' + array_meses[i] + '</option>';	
                       }
               }
               $mes_inicial.append(select_html);
               
               //mes final
               $mes_final.children().remove();
               var select_html = '';
               for(var i in array_meses){
                       if(parseInt(i) == 1 ){
                               select_html += '<option value="' + i + '" selected="yes">' + array_meses[i] + '</option>';	
                       }else{
                               select_html += '<option value="' + i + '"  >' + array_meses[i] + '</option>';	
                       }
               }
               $mes_final.append(select_html);
               
               //validando que el mes final no sea menor que el mes inicial
                
                $mes_inicial.change(function(){
			var valor_mes = $(this).val();
			
			//cargar select del Mes Final
			var i=parseInt(valor_mes);
			var select_html='';
			$mes_final.children().remove();
			while (i<=12){
				select_html += '<option value="' + i + '"  >' + array_meses[i] + '</option>';
				i=i+1;
			}
			$mes_final.append(select_html);
			
			//$div_reporte_estadisticasventas.children().remove();
		});*/
                
                //Alimentando los campos select_agente
                $select_agente.children().remove();
                    var motivo_hmtl = '';
                    $.each(entry['Agentes'],function(entryIndex,motivo){
                            motivo_hmtl += '<option value="' + motivo['id'] + '"  >' + motivo['nombre_agente'] + '</option>';
                    });
                    $select_agente.append(motivo_hmtl);


                });//fin json
                $fecha_inicial.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
            });
			
		$fecha_inicial.DatePicker({
			format:'Y-m-d',
			date: $fecha_inicial.val(),
			current: $fecha_inicial.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_inicial.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_inicial.val(),mostrarFecha());
					$fecha_inicial.DatePickerHide();
					/*if (valida_fecha==true){
						jAlert("Fecha no valida",'! Atencion');
						$fecha_inicial.val(mostrarFecha());
					}else{
						$fecha_inicial.DatePickerHide();	
					}*/
				}
			}
		});
		
			
        
        //fecha para la proxima visita
		$fecha_final.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
		});
		
		$fecha_final.DatePicker({
			format:'Y-m-d',
			date: $fecha_final.val(),
			current: $fecha_final.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_final.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_final.val(),mostrarFecha());
					$fecha_final.DatePickerHide();
					/*if (valida_fecha==true){
						$fecha_final.DatePickerHide();	
					}else{
						jAlert("Fecha no valida, debe ser mayor a la actual.",'! Atencion');
						$fecha_final.val(mostrarFecha());
					}*/
				}
			}
		});
                
             
                //click para hacer la consulta
		$consultar.click(function(event){ 
                    
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_DatosBuscador.json';
                    $arreglo = {
                        
                        'agente':$select_agente.val(),
                        'status':$select_status.val(),
                        'etapa':$select_etapa.val(),
                        'tipo_seleccion':$select_tipo.val(),
                        'fecha_inicial':$fecha_inicial.val(),
                        'fecha_final':$fecha_final.val(),
                         'id':id_to_show,
                        'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                    }
                    

                    $.post(input_json,$arreglo,function(entry){
                        
                        $metas.attr({'value':entry['Registros']['0']['cantidad_llamadas']});
                        $totales.attr({'value':entry['Registros']['0']['llamadas_totales']});
                        $porcentaje.attr({'value':entry['Registros']['0']['porcentaje_llamadas']});
                        $llam_entrantes.attr({'value':entry['Registros']['0']['llamadas_entrantes']});
                        $llam_salientes.attr({'value':entry['Registros']['0']['llamadas_salientes']});
                        $llam_planeadas.attr({'value':entry['Registros']['0']['llamadas_planeadas']});
                        $con_exito.attr({'value':entry['Registros']['0']['llamadas_con_exito']});
                        $con_cita.attr({'value':entry['Registros']['0']['llamadas_con_cita']});
                        $con_seguimiento.attr({'value':entry['Registros']['0']['llamadas_con_seguimiento']});
                        $efectividad.attr({'value':entry['Registros']['0']['efectividad']});
                        $gestion.attr({'value':entry['Registros']['0']['gestion']});
                        $avance.attr({'value':entry['Registros']['0']['avance']});
                        $planeacion.attr({'value':entry['Registros']['0']['planeacion']});




                    });
		});
            
            
            $cerrar_plugin.bind('click',function(){
                var remove = function() {$(this).remove();};
                $('#forma-llamadas-overlay').fadeOut(remove);
            });

            $cancelar_plugin.click(function(event){
                var remove = function() {$(this).remove();};
                $('#forma-llamadas-overlay').fadeOut(remove);

            });

        }
        
        //fin de la forma Registro Llamadas

         //Plugin de registro de visitas
        $registro_visitas = function(){

            var id_to_show = 2;
            $(this).modalPanelVisitas();
            var form_to_show2 = 'formaCrmRegistroVisitas';
            $('#' + form_to_show2).each (function(){this.reset();});
            var $forma_selected2 = $('#' + form_to_show2).clone();
            $forma_selected2.attr({id : form_to_show2 + id_to_show});

            $('#forma-visitas-window').css({"margin-left": -400, 	"margin-top": -265});
            $forma_selected2.prependTo('#forma-visitas-window');
            $forma_selected2.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
            $tabs_li_funxionalidad();

            var $select_agente =$('#forma-visitas-window').find('select[name=select_agente]');
            var $select_tipo =$('#forma-visitas-window').find('select[name=select_tipo]');
            var $select_status =$('#forma-visitas-window').find('input[name=status]');
            var $select_etapa =$('#forma-visitas-window').find('input[name=etapa]');
            var $fecha_inicial =$('#forma-visitas-window').find('input[name=fecha_inicial]');
            var $fecha_final =$('#forma-visitas-window').find('input[name=fecha_final]');
            var $consultar =$('#forma-visitas-window').find('input[name=buscar]');
            var $metas =$('#forma-visitas-window').find('input[name=metas]');
            var $totales =$('#forma-visitas-window').find('input[name=totales]');
            var $porcentaje =$('#forma-visitas-window').find('input[name=porcentaje]');
            
            var $con_exito =$('#forma-visitas-window').find('input[name=con_exito]');
            var $con_cita =$('#forma-visitas-window').find('input[name=con_cita]');
            var $con_seguimiento =$('#forma-visitas-window').find('input[name=con_seguimiento]');
            var $efectividad =$('#forma-visitas-window').find('input[name=efectividad]');
            var $gestion =$('#forma-visitas-window').find('input[name=gestion]');
            var $avance =$('#forma-visitas-window').find('input[name=avance]');
           
            
            
            var $cerrar_plugin = $('#forma-visitas-window').find('#close');
            var $cancelar_plugin = $('#forma-visitas-window').find('#boton_cancelar');
            
            $select_status.attr({'value' : 0});
            $select_etapa.attr({'value': 0});
            
            $select_tipo.children().remove();
            var tipo_html='';
                
                tipo_html+='<option value="1">Cliente</option>';
                tipo_html+='<option value="2">Prospecto</option>';
            $select_tipo.append(tipo_html);
            
             var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatos.json';
		var parametros={
                    
                    iu: $('#lienzo_recalculable').find('input[name=iu]').val()
                }
             $.post(input_json,parametros,function(entry){
                 
            //Alimentando los campos select_agente
                    $select_agente.children().remove();
                    var motivo_hmtl = '';
                    $.each(entry['Agentes'],function(entryIndex,motivo){
                            motivo_hmtl += '<option value="' + motivo['id'] + '"  >' + motivo['nombre_agente'] + '</option>';
                    });
                    $select_agente.append(motivo_hmtl);
            
            
             });//fin json
             
             $fecha_inicial.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
            });
			
		$fecha_inicial.DatePicker({
			format:'Y-m-d',
			date: $fecha_inicial.val(),
			current: $fecha_inicial.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_inicial.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_inicial.val(),mostrarFecha());
					$fecha_inicial.DatePickerHide();
					/*if (valida_fecha==true){
						jAlert("Fecha no valida",'! Atencion');
						$fecha_inicial.val(mostrarFecha());
					}else{
						$fecha_inicial.DatePickerHide();	
					}*/
				}
			}
		});
		
			
        
        //fecha para la proxima visita
		$fecha_final.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
		});
		
		$fecha_final.DatePicker({
			format:'Y-m-d',
			date: $fecha_final.val(),
			current: $fecha_final.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_final.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_final.val(),mostrarFecha());
					$fecha_final.DatePickerHide();
					/*if (valida_fecha==true){
						$fecha_final.DatePickerHide();	
					}else{
						jAlert("Fecha no valida, debe ser mayor a la actual.",'! Atencion');
						$fecha_final.val(mostrarFecha());
					}*/
				}
			}
		});
            
             //click para hacer la consulta
		$consultar.click(function(event){ 
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_DatosBuscador.json';
                    $arreglo = {
                        
                        'agente':$select_agente.val(),
                        'status':$select_status.val(),
                        'etapa':$select_etapa.val(),
                        'tipo_seleccion':$select_tipo.val(),
                        'fecha_inicial':$fecha_inicial.val(),
                        'fecha_final':$fecha_final.val(),
                         'id':id_to_show,
                        'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                    }
                   

                    $.post(input_json,$arreglo,function(entry){
                        
                        $metas.attr({'value':entry['Visitas']['0']['cantidad_visitas']});
                        $totales.attr({'value':entry['Visitas']['0']['visitas_totales']});
                        $porcentaje.attr({'value':entry['Visitas']['0']['porcentaje_visitas']});
                        
                        $con_exito.attr({'value':entry['Visitas']['0']['visitas_con_exito']});
                        $con_cita.attr({'value':entry['Visitas']['0']['visitas_con_cita']});
                        $con_seguimiento.attr({'value':entry['Visitas']['0']['visitas_con_seguimiento']});
                        $efectividad.attr({'value':entry['Visitas']['0']['efectividad']});
                        $gestion.attr({'value':entry['Visitas']['0']['gestion']});
                        $avance.attr({'value':entry['Visitas']['0']['avance']});
                       




                    });
		});

                $cerrar_plugin.bind('click',function(){
                    var remove = function() {$(this).remove();};
                    $('#forma-visitas-overlay').fadeOut(remove);
                });

                $cancelar_plugin.click(function(event){
                    var remove = function() {$(this).remove();};
                    $('#forma-visitas-overlay').fadeOut(remove);

                });

        }
        //fin de la forma Registro visitas

         //Plugin de registro de casos
        $registro_casos = function(){

            var id_to_show = 3;
            $(this).modalPanelCasos();
            var form_to_show3 = 'formaCrmRegistroCasos';
            $('#' + form_to_show3).each (function(){this.reset();});
            var $forma_selected3 = $('#' + form_to_show3).clone();
            $forma_selected3.attr({id : form_to_show3 + id_to_show});

            $('#forma-casos-window').css({"margin-left": -400, 	"margin-top": -265});
            $forma_selected3.prependTo('#forma-casos-window');
            $forma_selected3.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
            $tabs_li_funxionalidad();

            var $select_agente =$('#forma-casos-window').find('select[name=select_agente]');
            var $select_tipo =$('#forma-casos-window').find('select[name=select_tipo]');
            var $select_status =$('#forma-casos-window').find('select[name=estatus]');
            var $select_etapa =$('#forma-casos-window').find('input[name=etapa]');
            var $fecha_inicial =$('#forma-casos-window').find('input[name=fecha_inicial]');
            var $fecha_final =$('#forma-casos-window').find('input[name=fecha_final]');
            var $consultar =$('#forma-casos-window').find('input[name=buscar]');
            var $metas =$('#forma-casos-window').find('input[name=metas]');
            var $totales =$('#forma-casos-window').find('input[name=totales]');
            var $porcentaje =$('#forma-casos-window').find('input[name=porcentaje]');
            
            var $con_exito =$('#forma-casos-window').find('input[name=con_exito]');
            var $con_cita =$('#forma-casos-window').find('input[name=con_cita]');
            var $con_seguimiento =$('#forma-casos-window').find('input[name=con_seguimiento]');
            var $efectividad =$('#forma-casos-window').find('input[name=efectividad]');
            var $gestion =$('#forma-casos-window').find('input[name=gestion]');
            var $avance =$('#forma-casos-window').find('input[name=avance]');
           
            
            
            var $cerrar_plugin = $('#forma-casos-window').find('#close');
            var $cancelar_plugin = $('#forma-casos-window').find('#boton_cancelar');
            
            
            $select_etapa.attr({'value': 0});
            
            $select_tipo.children().remove();
            var tipo_html='';
                
                tipo_html+='<option value="1">Cliente</option>';
                tipo_html+='<option value="2">Prospecto</option>';
            $select_tipo.append(tipo_html);
            
             var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatos.json';
		var parametros={
                    
                    iu: $('#lienzo_recalculable').find('input[name=iu]').val()
                }
             $.post(input_json,parametros,function(entry){
                 
            //Alimentando los campos select_agente
                    $select_agente.children().remove();
                    var motivo_hmtl = '';
                    $.each(entry['Agentes'],function(entryIndex,motivo){
                            motivo_hmtl += '<option value="' + motivo['id'] + '"  >' + motivo['nombre_agente'] + '</option>';
                    });
                    $select_agente.append(motivo_hmtl);
            
            
             });//fin json
             
             $select_status.children().remove();
             var status_html='';
                status_html +='<option value="1" selected="yes">Abierto</option>';
                status_html +='<option value="0" >Cerrado</option>';
            $select_status.append(status_html);
             
             $fecha_inicial.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
            });
			
		$fecha_inicial.DatePicker({
			format:'Y-m-d',
			date: $fecha_inicial.val(),
			current: $fecha_inicial.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_inicial.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_inicial.val(),mostrarFecha());
					$fecha_inicial.DatePickerHide();
					/*if (valida_fecha==true){
						jAlert("Fecha no valida",'! Atencion');
						$fecha_inicial.val(mostrarFecha());
					}else{
						$fecha_inicial.DatePickerHide();	
					}*/
				}
			}
		});
		
			
        
        //fecha para la proxima visita
		$fecha_final.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
		});
		
		$fecha_final.DatePicker({
			format:'Y-m-d',
			date: $fecha_final.val(),
			current: $fecha_final.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_final.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_final.val(),mostrarFecha());
					$fecha_final.DatePickerHide();
					/*if (valida_fecha==true){
						$fecha_final.DatePickerHide();	
					}else{
						jAlert("Fecha no valida, debe ser mayor a la actual.",'! Atencion');
						$fecha_final.val(mostrarFecha());
					}*/
				}
			}
		});
            
             //click para hacer la consulta
		$consultar.click(function(event){ 
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_DatosBuscador.json';
                    $arreglo = {
                        
                        'agente':$select_agente.val(),
                        'status':$select_status.val(),
                        'etapa':$select_etapa.val(),
                        'tipo_seleccion':$select_tipo.val(),
                        'fecha_inicial':$fecha_inicial.val(),
                        'fecha_final':$fecha_final.val(),
                         'id':id_to_show,
                        'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                    }
                   

                    $.post(input_json,$arreglo,function(entry){
                        
                        $metas.attr({'value':entry['Visitas']['0']['cantidad_visitas']});
                        $totales.attr({'value':entry['Visitas']['0']['visitas_totales']});
                        $porcentaje.attr({'value':entry['Visitas']['0']['porcentaje_visitas']});
                        
                        $con_exito.attr({'value':entry['Visitas']['0']['visitas_con_exito']});
                        $con_cita.attr({'value':entry['Visitas']['0']['visitas_con_cita']});
                        $con_seguimiento.attr({'value':entry['Visitas']['0']['visitas_con_seguimiento']});
                        $efectividad.attr({'value':entry['Visitas']['0']['efectividad']});
                        $gestion.attr({'value':entry['Visitas']['0']['gestion']});
                        $avance.attr({'value':entry['Visitas']['0']['avance']});
                       




                    });
		});

                $cerrar_plugin.bind('click',function(){
                    var remove = function() {$(this).remove();};
                    $('#forma-casos-overlay').fadeOut(remove);
                });

                $cancelar_plugin.click(function(event){
                    var remove = function() {$(this).remove();};
                    $('#forma-casos-overlay').fadeOut(remove);

                });

        }
        //fin de la forma Registro Casos
        
        //Plugin de registro de oportunidades
        $registro_oportunidades = function(){

            var id_to_show = 4;
            $(this).modalPanelOportunidades();
            var form_to_show4 = 'formaCrmRegistroOportunidades';
            $('#' + form_to_show4).each (function(){this.reset();});
            var $forma_selected4 = $('#' + form_to_show4).clone();
            $forma_selected4.attr({id : form_to_show4 + id_to_show});

            $('#forma-oportunidades-window').css({"margin-left": -400, 	"margin-top": -265});
            $forma_selected4.prependTo('#forma-oportunidades-window');
            $forma_selected4.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
            $tabs_li_funxionalidad();

            //variables para la forma
            var $select_agente =$('#forma-oportunidades-window').find('select[name=select_agente]');
            var $select_etapa =$('#forma-oportunidades-window').find('select[name=etapa]');
            var $fecha_inicial =$('#forma-oportunidades-window').find('input[name=fecha_inicial]');
            var $fecha_final =$('#forma-oportunidades-window').find('input[name=fecha_final]');
            var $consultar =$('#forma-oportunidades-window').find('input[name=buscar]');
            var $cerrar_plugin = $('#forma-oportunidades-window').find('#close');
            var $cancelar_plugin = $('#forma-oportunidades-window').find('#boton_cancelar');
            
             var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatos.json';
		var parametros={
                    
                    iu: $('#lienzo_recalculable').find('input[name=iu]').val()
                }
             $.post(input_json,parametros,function(entry){
                 
            //Alimentando los campos select_agente
                    $select_agente.children().remove();
                    var motivo_hmtl = '';
                    $.each(entry['Agentes'],function(entryIndex,motivo){
                            motivo_hmtl += '<option value="' + motivo['id'] + '"  >' + motivo['nombre_agente'] + '</option>';
                    });
                    $select_agente.append(motivo_hmtl);
            
            
             });//fin json
             
             $fecha_inicial.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
            });
			
		$fecha_inicial.DatePicker({
			format:'Y-m-d',
			date: $fecha_inicial.val(),
			current: $fecha_inicial.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_inicial.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_inicial.val(),mostrarFecha());
					
					if (valida_fecha==true){
						jAlert("Fecha no valida",'! Atencion');
						$fecha_inicial.val(mostrarFecha());
					}else{
						$fecha_inicial.DatePickerHide();	
					}
				}
			}
		});
		
			
        
        //fecha para la proxima visita
		$fecha_final.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
		});
		
		$fecha_final.DatePicker({
			format:'Y-m-d',
			date: $fecha_final.val(),
			current: $fecha_final.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_final.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_final.val(),mostrarFecha());
					
					if (valida_fecha==true){
						$fecha_final.DatePickerHide();	
					}else{
						jAlert("Fecha no valida, debe ser mayor a la actual.",'! Atencion');
						$fecha_final.val(mostrarFecha());
					}
				}
			}
		});
                
                 //click para hacer la consulta
		$consultar.click(function(event){ 
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_DatosBuscador.json';
                    $arreglo = {
                        'agente':$select_agente.val(),
                        'etapa':$select_etapa.val(),
                        'fecha_inicial':$fecha_inicial.val(),
                        'fecha_final':$fecha_final.val(),
                        'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                    }


                    $.post(input_json,$arreglo,function(entry){






                    });
		});
                
                $cerrar_plugin.bind('click',function(){
                    var remove = function() {$(this).remove();};
                    $('#forma-oportunidades-overlay').fadeOut(remove);
                });

                $cancelar_plugin.click(function(event){
                    var remove = function() {$(this).remove();};
                    $('#forma-oportunidades-overlay').fadeOut(remove);

                });

        }
        //fin de la forma Registro Oportunidades
        
            //Plugin de registro de Prospectos/Contactos/Clientes
            $registro_varios = function(){

                var id_to_show = 5;
                $(this).modalPanelVarios();
                var form_to_show5 = 'formaCrmRegistroVarios';
                $('#' + form_to_show5).each (function(){this.reset();});
                var $forma_selected5 = $('#' + form_to_show5).clone();
                $forma_selected5.attr({id : form_to_show5 + id_to_show});

                $('#forma-registro-window').css({"margin-left": -400, 	"margin-top": -265});
                $forma_selected5.prependTo('#forma-registro-window');
                $forma_selected5.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
                $tabs_li_funxionalidad();

                var $select_agente =$('#forma-registro-window').find('select[name=select_agente]');
                var $select_tipo =$('#forma-registro-window').find('select[name=select_tipo]');
                var $select_status =$('#forma-registro-window').find('input[name=status]');
                var $select_etapa =$('#forma-registro-window').find('input[name=etapa]');
                var $fecha_inicial =$('#forma-registro-window').find('input[name=fecha_inicial]');
                var $fecha_final =$('#forma-registro-window').find('input[name=fecha_final]');
                var $consultar =$('#forma-registro-window').find('input[name=buscar]');
                var $metas =$('#forma-registro-window').find('input[name=metas]');
                var $totales =$('#forma-registro-window').find('input[name=totales]');
                var $porcentaje =$('#forma-registro-window').find('input[name=porcentaje]');
                var $contacto =$('#forma-registro-window').find('input[name=contactos]');
               



                var $cerrar_plugin = $('#forma-registro-window').find('#close');
                var $cancelar_plugin = $('#forma-registro-window').find('#boton_cancelar');

                $select_status.attr({'value' : 0});
                $select_etapa.attr({'value': 0});

                $select_tipo.children().remove();
                var tipo_html='';

                    tipo_html+='<option value="1">Cliente</option>';
                    tipo_html+='<option value="2">Prospecto</option>';
                $select_tipo.append(tipo_html);

                 var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatos.json';
                    var parametros={

                        iu: $('#lienzo_recalculable').find('input[name=iu]').val()
                    }
                 $.post(input_json,parametros,function(entry){

                //Alimentando los campos select_agente
                    $select_agente.children().remove();
                    var motivo_hmtl = '';
                    $.each(entry['Agentes'],function(entryIndex,motivo){
                            motivo_hmtl += '<option value="' + motivo['id'] + '"  >' + motivo['nombre_agente'] + '</option>';
                    });
                    $select_agente.append(motivo_hmtl);
            
            
             });//fin json
             
             $fecha_inicial.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
            });
			
		$fecha_inicial.DatePicker({
			format:'Y-m-d',
			date: $fecha_inicial.val(),
			current: $fecha_inicial.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_inicial.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_inicial.val(),mostrarFecha());
					$fecha_inicial.DatePickerHide();
					/*if (valida_fecha==true){
						jAlert("Fecha no valida",'! Atencion');
						$fecha_inicial.val(mostrarFecha());
					}else{
						$fecha_inicial.DatePickerHide();	
					}*/
				}
			}
		});
		
			
        
        //fecha para la proxima visita
		$fecha_final.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
		});
		
		$fecha_final.DatePicker({
			format:'Y-m-d',
			date: $fecha_final.val(),
			current: $fecha_final.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha_final.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha_final.val(),mostrarFecha());
					$fecha_final.DatePickerHide();
					/*if (valida_fecha==true){
						$fecha_final.DatePickerHide();	
					}else{
						jAlert("Fecha no valida, debe ser mayor a la actual.",'! Atencion');
						$fecha_final.val(mostrarFecha());
					}*/
				}
			}
		});
            
             //click para hacer la consulta
		$consultar.click(function(event){ 
                    var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_DatosBuscador.json';
                    $arreglo = {
                        
                        'agente':$select_agente.val(),
                        'status':$select_status.val(),
                        'etapa':$select_etapa.val(),
                        'tipo_seleccion':$select_tipo.val(),
                        'fecha_inicial':$fecha_inicial.val(),
                        'fecha_final':$fecha_final.val(),
                         'id':id_to_show,
                        'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
                    }
                   

                    $.post(input_json,$arreglo,function(entry){
                        
                        $metas.attr({'value':entry['Varios']['0']['prospectos_meta']});
                        $totales.attr({'value':entry['Varios']['0']['total_contactos']});
                        $porcentaje.attr({'value':entry['Varios']['0']['porcentaje_cumplido']});
                        
                        $contacto.attr({'value':entry['Varios']['0']['contactos']});
                        
                       




                    });
		});

                $cerrar_plugin.bind('click',function(){
                    var remove = function() {$(this).remove();};
                    $('#forma-registro-overlay').fadeOut(remove);
                });

                $cancelar_plugin.click(function(event){
                    var remove = function() {$(this).remove();};
                    $('#forma-registro-overlay').fadeOut(remove);

                });

        }
        //fin de la forma Registro Prospectos/Contactos/Clientes
        
	$new_consulta.click(function(event){
            
           var opcion = $select_opciones.val();
           
                switch (parseInt(opcion)){
                    case 1:    
                        $registro_visitas();
                    break;
                    case 2:
                        $registro_llamadas();
                    break;
                    case 3:
                        $registro_casos();
                    break;
                    case 4:
                        $registro_oportunidades();
                    break;
                    case 5:
                        $registro_varios();
                    break;
                    
                    default:
                        
                }

                
        });
});
