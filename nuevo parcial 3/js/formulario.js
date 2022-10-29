function enviar_formulario(){
    var nombre = document.getElementById('nombres');var apellido=document.getElementById('apellidos'); var telefono=document.getElementById('telefono'); var nick=document.getElementById('nick');
    var contra=document.getElementById('contra'); var rcontra=document.getElementById('rcontra'); var check=document.getElementById('termino');var fecha=document.getElementById('fecha');var correo=document.getElementById('correo');
    var sexo=document.getElementById('sexo');var nivel=document.getElementById('nivel'); var pais=document.getElementById('pais');
    var compra=document.getElementById('compra'); var pago=document.getElementById('pago');

    document.getElementById("diverror").innerHTML = '';
    var error = "";
    var errorBool= false;

    if(nombre.value==="" || nombre.value == null){
      error = '<h4 class="error">* El campo nombre es requerido.</h4>';
      errorBool= true;
    }
    if(apellido.value==="" || apellido.value == null) {
      error = error + '<h4 class="error">* El campo apellido es requerido.</h4>';
      errorBool= true;
    }
    if(telefono.value==="" || telefono.value == null) {
      error =error+ '<h4 class="error">* El campo telefono es requerido.</h4>';
      errorBool= true;
    }
    if(nick.value==="" || nick.value == null) error =error+ '<h4 class="error">* El campo carnet  de usuario es requerido.</h4>';

    if(fecha.value==="" || fecha.value == null) error =error +  '<h4 class="error">*se requiere llenar el campo fecha de cumpleaños.</h4>';

    if(rcontra.value!== contra.value) error =error+ '<h4 class="error">* La contraseña no coincide.</h4>';
    var ps=false, ps2=false;
    if(contra.value==="" || contra.value == null) {
      error =error+ '<h4 class="error">se requiere llenar el campo  contraseña.</h4>';
    }else{
      ps=true;
    }
    if(rcontra.value==="" || rcontra.value == null){
      error =error+ '<h4 class="error"> se requiere llenar el campo confirmar contraseña.</h4>';

    }else{
      ps2=true;
    }

    

   if(ps2 && ps){
    if( (rcontra.value.length== contra.value.length) && rcontra.value.length<7 && contra.value.length<7 ){
      error =error+ '<h4 class="error">* la contraseño es valida con mas de 7 digitos.</h4>';
    }else{
    
    var espacios = false;
    var cont = 0;

    while (!espacios && (cont < contra.value.length)) {
      if (contra.value.charAt(cont) == " ")espacios = true;
          
      cont++;
    }
    if (espacios) {
      error =error+ '<h4 class="error">* La contraseña no puede tener espacios en blanco.</h4>';
    }
   }
   }
   
   if(!check.checked){
    error =error+ '<h4 class="error">* Debe aceptar los terminos y condiciones.</h4>';
   }

   if(error != "") {
    
   }else{

    var edad = getAge(fecha.value);
    var monedas =1;
    if(edad <17){
      monedas=2;
    }

    error =error+ `<h3 class="error">informacion del solicitante <hr >`;  error =error+ `<h4 style="margin-top:9px;" class="error"><strong>carnet: </strong> ${nick.value}</h4>`;
    error =error+ `<h4 class="error mtlabel">Nombres: ${nombre.value}</h4>`;  error =error+ `<h4 class="error mtlabel"><strong>Apellidos: </strong> ${apellido.value}</h4>`; error =error+ `<h4 class="error mtlabel"><strong>Telefono: </strong> ${telefono.value}</h4>`;error =error+ `<h4 class="error mtlabel"><strong>Fecha Nacimiento: </strong> ${fecha.value}</h4>`;
    error =error+ `<h4 class="error mtlabel">email: ${correo.value}</h4>`;
    error =error+ `<h4 class="error mtlabel"><strong>Sexo: </strong> ${sexo.value}</h4><br>`;error =error+ `<h4 class="error mtlabel"><strong>Edad: </strong> ${edad}</h4><br>`;error =error+ `<h3 class="error">datos acerca del solicitante</h3><hr >`;
    error =error+ `<h4 style="margin-top:9px;" class="error">carnet ${nick.value}</h4>`; error =error+ `<h4 class="error mtlabel">experiencia del solicitante: ${nivel.value}</h4>`;
    error =error+ `<h4 class="error mtlabel">municipio: ${pais.value}</h4>`;error =error+ `<h4 class="error mtlabel">categoria: ${compra.value}</h4>`;
    error =error+ `<h4 class="error mtlabel">forma de pago al solicitante: ${pago.value}</h4>`;error =error+ `<br><h3 class="error mtlabel">logro obtenido: ${monedas}</h3>`;
    error=error+'<button type="button" onclick="enviarFormulario()">enviar formulario <img src="imagenes/c.jpg" height="10" width="10" alt=""></button>';
   }
   document.getElementById("diverror").innerHTML=error;

  }

    var modal = document.getElementById("myModal");var btn = document.getElementById("myBtn");var span = document.getElementsByClassName("close")[0];

    
    btn.onclick = function() {
      modal.style.display = "block";
      enviar_formulario();
    }

  
    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    function enviarFormulario(){
        const data = new FormData();
        data.append('nombres', document.getElementById('nombres').value); data.append('apellidos', document.getElementById('apellidos').value);
        data.append('telefono', document.getElementById('telefono').value); data.append('nick', document.getElementById('nick').value); data.append('contra', document.getElementById('contra').value); data.append('fecha', document.getElementById('fecha').value);
        data.append('correo', document.getElementById('correo').value); data.append('sexo', document.getElementById('sexo').value);
        data.append('nivel', document.getElementById('nivel').value);
        data.append('pais', document.getElementById('pais').value);data.append('compra', document.getElementById('compra').value);data.append('pago', document.getElementById('pago').value);

        fetch('../post.php', {
          method: 'POST',
          body: data
        })
        .then(function(response) {
          if(response.ok) {
              return response.text()
          } else {

              alert("Error");
          }

        })
        .then(function(texto) {
          console.log(texto);
        })
        .catch(function(err) {
          console.log(err);
        });

        alert("se han enviado correctamente la informacion");
        location.reload();
    }
 function getAge(dateString) {
      var today = new Date();var birthDate = new Date(dateString);var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }
