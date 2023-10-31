import React, { useState, useEffect } from "react";
import "./users.scss";
import { Box, Chip, Grid, IconButton, Modal, Typography, Checkbox, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export const Users = () => {
  const [formUser, setFormUser] = useState({firstname: '', lastname: '', email:'',current_password:'',phone_number:''});
  const [open, setOpen] = useState(false);
  const url= "http://localhost:3100/api/v1/users"
  const urlPostUser= "http://localhost:3100/api/v1/auth/signin"
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  }

  useEffect(() => {
    fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}, []);


  

const handleSubmit = (e) => {
  setFormUser(true)
  e.preventDefault();
  console.log(formUser)
      fetch(urlPostUser, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formUser),
      })
          .then((response) => response.json())
          .then((data) => {
              console.log('Post creado:', data);

          })
          .catch((error) => {
              console.error('Error al crear el post:', error);
          });
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormUser({
        ...formUser,
        [name]: value,
    });
  }
  
  return (  
    <div className="body">
      <div class="button1">
        <div class="elbutton">
          <button class="Login">Login</button>
        </div>
      </div>
      <h1>Registro</h1>
      <div className="registro-container">
        <TextField
          name="firstname"
          label="Firstname"
          variant="outlined"
          fullWidth
          margin="normal"
          value= {formUser.firstname}
          onChange={handleInputChange}
        />
        <TextField
          name="lastname"
          label="Lastname"
          variant="outlined"
          fullWidth
          margin="normal"
          value = {formUser.lastname}
          onChange={handleInputChange}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value = {formUser.email}
          onChange={handleInputChange}
        />
        <TextField
            name="phone"
            label="Phone_number"
            variant="outlined"
            fullWidth
            margin="normal"
            value = {formUser.phone}
            onChange={handleInputChange}
        />
        <div className="passwords-container">
        <TextField
          name="current_password"
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value = {formUser.current_password}
          onChange={handleInputChange}
        />
        <TextField
            name="repeat_password"
            label="Repeat password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value=" "
            onChange={handleInputChange}
        />
        </div>
        <div className="button-container">
          <button class="Registrarse" onClick={handleSubmit}>Registrarse</button>
          <button class="Cancelar" >Cancelar</button>
        </div>
        <div className="final">
          <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              color="primary"
          />
          <button class="button-Autorizacion" onClick={handleOpen}>Autorizo tratamiento de datos</button>
        </div>
        
      </div>
      

      <div className="selected">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid container spacing={2}>
            <Box sx={style}>
                <h3 >
                    POLÍTICA GENERAL DE TRATAMIENTO DE DATOS PERSONALES CLIENTES, PROSPECTOS DE CLIENTES, FUNCIONARIOS, PROVEEDORES Y VISITANTES
                </h3>
                <h3 >
                    ENTRADA EN VIGENCIA: OCTUBRE DE 2023 
                </h3>
                <h3 >
                  ÚLTIMA VERSIÓN: OCTUBRE DE 2023 
                </h3>
                  INTRODUCCIÓN:
                  Nombre pág. S.A.S. (en adelante, Nombre pág) es responsable de los Datos Personales e información que le suministran sus clientes, 
                  prospectos de clientes proveedores, contratistas, y visitantes (en adelante, los Titulares).
                  En la presente Política de Tratamiento se establecen las finalidades, medidas y procedimientos de las Bases de Datos 
                  de Nombre pág así como los mecanismos con que los Titulares cuentan para conocer, actualizar, rectificar, suprimir los datos suministrados o revocar 
                  la autorización que se otorga con la aceptación de la presente Política de Tratamiento.
                  La aceptación de propuestas, la celebración de contratos, el diligenciamiento de formatos, el acceso a los Servicios de la página web www.nombrepág.co 
                  (en adelante la Página Web) y/o la aceptación expresa o inequívoca de las presente políticas, implica la aceptación de los Titulares de la Política de Tratamiento 
                  y Protección de Datos Personales y su autorización para los usos y otros tratamientos que aquí se describen.
                  <h3 >
                  DEFINICIONES
                  </h3>
                  
                  Para los efectos de la presente Política de Privacidad, se entiende por:
                  1.1. Dato personal: Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.
                  1.2. Dato público: Dato personal que no es semiprivado, privado o sensible. Entre otros, son los datos relativos al estado civil de las personas, a su profesión u oficio y a su calidad de comerciante o de servidor público. Por su naturaleza, los datos públicos pueden estar contenidos, entre otros, en registros y documentos públicos.
                  1.3. Dato Privado: Es el dato que por su naturaleza íntima o reservada sólo es relevante para el Titular.
                  1.4. Dato personal sensible: Se entiende como datos sensibles aquellos que afecten la intimidad del titular o cuyo uso indebido pueda afectar la intimidad del Titular o la potencialidad de generar su discriminación.
                  1.5. Dato personal semiprivado: son aquellos datos que no tienen una naturaleza íntima, reservada, ni pública y cuyo conocimiento o divulgación puede interesar no solo a su titular, sino a un grupo de personas o a la sociedad en general. En este caso, para su Tratamiento se requiere a autorización expresa del Titular de la información. Por ejemplo: datos de carácter financiero, datos relativos a las relaciones con las entidades de seguridad social (EPS, AFP, ARL, Cajas de Compensación).
                  1.6. Base de Datos: Conjunto organizado de Datos Personales que sea objeto de Tratamiento. Para los efectos del presente documento se entiende como Base de Datos, aquella que contiene información de los Titulares.
                  1.7. Titular: Persona natural cuyos Datos Personales sean objeto de Tratamiento. Para los efectos del presente documento se entiende como Titulares, a los proveedores, contratistas, colaboradores, clientes, usuarios y visitantes de Nombre Pág.
                  1.8. Responsable del Tratamiento: Es la Persona natural o jurídica de naturaleza pública o privada, que, actuando por ella misma o con otros, decida sobre la Base de Datos y/o el Tratamiento de los datos. Para los efectos de la presente Política para el Tratamiento de Datos Personales se entiende como Responsable del Tratamiento a Nombre Pág.
                  1.9. Encargado del Tratamiento: Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, realice el Tratamiento de Datos Personales por cuenta del Responsable del Tratamiento (Nombre Pág).
                  1.10. Tratamiento: Cualquier operación o conjunto de operaciones sobre Datos Personales, tales como la recolección, almacenamiento, uso, circulación o supresión.

            </Box>
          </Grid>
        </Modal>
      </div>
    </div>
  );
};