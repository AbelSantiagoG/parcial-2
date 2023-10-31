import React, { useState } from "react";
import { image } from "../../assets";
import "./users.scss";
import { Box, Chip, Grid, IconButton, Modal, Typography, Checkbox} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

export const Users = () => {
  // Manejo de estado abierto | cerrado de la modal
  const [open, setOpen] = useState(false);
  // Objeto que va contener la informaci贸n del cliente seleccionado
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
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
        <input type="text" name="Nombres" placeholder="Firstname" ></input>
        <input type="text" name="Apellidos" placeholder="Lastname"></input>
        <input type="text" name="Email" placeholder="Email"></input>
        <input type="text" name="Phone" placeholder="Phone"></input>
        <div className="passwords-container">
          <input type="text" name="password" placeholder="Password"></input>
          <input type="text" name="repeat-password" placeholder="Repeat password"></input>
        </div>
        <div className="button-container">
          <button class="Registrarse">Registrarse</button>
          <button class="Cancelar">Cancelar</button>
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
              <Grid item xs={7} md={7}>
                <h1>pene</h1>
                <div className="client-information">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {selectedClient?.clientName}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p>{selectedClient?.description}</p>
                    <Chip label={selectedClient?.clientType} color="primary" />
                  </Typography>
                </div>
              </Grid>
            </Box>
          </Grid>
        </Modal>
      </div>
    </div>
  );
};