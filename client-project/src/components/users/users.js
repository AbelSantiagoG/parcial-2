import React, { useState } from "react";
import { image } from "../../assets";
import "./users.scss";
import { Box, Chip, Grid, IconButton, Modal, Typography } from "@mui/material";
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

const users = [
  {
    id: 1,
    clientName: "Client 1",
    avatar: image.avatar1,
    description: "Descripción",
    clientType: "Free",
  },
  {
    id: 2,
    clientName: "Client 2",
    avatar: image.avatar2,
    description: "Descripción",
    clientType: "Premium",
  },
  {
    id: 3,
    clientName: "Client 3",
    avatar: image.avatar3,
    description: "Descripci贸n",
    clientType: "Free",
  },
];

export const Users = () => {
  // Manejo de estado abierto | cerrado de la modal
  const [open, setOpen] = useState(false);
  // Objeto que va contener la informaci贸n del cliente seleccionado
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpen = (clientId) => {
    // Buscar el cliente seleccionado
    const client = users.find((client) => client.id === clientId);
    setOpen(true);
    console.log(client);
    setSelectedClient(client);
  };

  return (
    <div className="body">
      <div className="registro-container">
        <input type="text" name="Nombres" value="Firstname"></input>
        <input type="text" name="Apellidos" value="Lastname"></input>
        <input type="text" name="Email" value="Email"></input>
      </div>
      <div className="passwords-container">
        <input type="text" name="password" value="Password"></input>
        <input type="text" name="repeat-password" value="Repeat password"></input>
      </div>

      <div className="client-selected">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid container spacing={2}>
            <Box sx={style}>
              <Grid item xs={5} md={5}>
                <img
                  src={selectedClient?.avatar}
                  alt={selectedClient?.clientName}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Grid>
              <Grid item xs={7} md={7}>
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