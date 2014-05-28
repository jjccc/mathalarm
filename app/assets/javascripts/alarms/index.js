$(document).ready(function(){
  $.pnotify.defaults.delay = 4000;
  $.pnotify.defaults.styling = "bootstrap";
  if (gon.message != ""){
    $.pnotify({
      text: gon.message,
      type: 'success'
    });
  }
  bind_manage_form_controls();    
});

function bind_manage_form_controls(){
  bind_show_form_links("show-add-sample-", "add-sample-");
  bind_show_form_links("show-add-receiver-", "add-receiver-");
  bind_show_form_links("show-remove-alarm-", "remove-alarm-");
  
  bind_import_buttons();
    
  bind_cancel_form_buttons("cancel-add-sample-", "add-sample-");
  bind_cancel_form_buttons("cancel-add-receiver-", "add-receiver-");
  bind_cancel_form_buttons("cancel-remove-alarm-", "remove-alarm-");
  
  bind_before_send_form("remove-alarm-", "Eliminando alarma...");
  bind_before_send_form("add-sample-", "Añadiendo muestra...");
  bind_before_send_form("add-receiver-", "Añadiendo destinatario...");
}

function bind_before_send_form(prefix, message){   
  $("form[id^='" + prefix + "']").each(function(){
    $(this).on("ajax:beforeSend", function(){      
      id = $(this).closest(".panel-footer").siblings("input").val();  
      $("#" + prefix + id.toString()).addClass("hide");
      $.pnotify(message);
    });
  });
}

function bind_import_buttons(){
  $("a[id^='import-sample-']").each(function(){
    $(this).on("click", function(){
      // Limpiamos el formulario poder recargarlo.
      $("#import-dialog").removeData();
      
      id = $(this).closest(".panel-footer").siblings("input").val();
      $("#import-dialog").modal({
        show: true,
        remote: Routes.new_alarm_import_path(id, {method: 'get', from_index: true})
      });
    });
  });
}

function hide_visible_forms(){
  // Hide all visible forms
  $("form[id^='add-sample-'],form[id^='add-receiver-'],div[id^='remove-alarm-']").each(function(){
    $(this).addClass("hide");
  }); 
}

function bind_show_form_links(link_prefix, form_prefix){
  // Show inline dialog and previously hide all visible forms.
  $("a[id^='" + link_prefix + "']").each(function(){
      $(this).on("click", function(){        
        hide_visible_forms();
        
        // Show the current visible form and hide dropdown menu
        id = $(this).closest(".panel-footer").siblings("input").val();
        $("#" + form_prefix + id.toString()).removeClass("hide");
      });
  });
}

function bind_cancel_form_buttons(button_prefix, form_prefix){
  // Hide inline dialog.
  $("button[id^='" + button_prefix + "']").each(function(){
      $(this).on("click", function(){
        // Show the current visible form
        id = $(this).closest(".panel-footer").siblings("input").val();
        $("#" + form_prefix + id.toString()).addClass("hide");
      });
  });
}

