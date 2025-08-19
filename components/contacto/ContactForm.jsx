'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Alert, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, FormHelperText } from '@mui/material';
//import pool from "@/lib/db";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: 'success', msg: '' });
  const [asuntos, setAsuntos] = useState([])
  const [asuntosSelect, setAsuntosSelect] = useState([]);
  const [mail, setMail] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ipaddress, setipaddress] = useState("");


  useEffect(() => {
    const getClientLocation = async () => {
      const res = await fetch('https://ipinfo.io/json');
      const locationData = await res.json();
      setipaddress(locationData.ip)
    };

    const getAsuntos = async () => {
      const res = await fetch('/api/asuntos');
      const data = await res.json();
      setAsuntos(data)
    };

    getClientLocation();
    getAsuntos();

  }, []);

  const handleAsuntosChange = (event) => {
    const value = event.target.value
    setAsuntosSelect(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleMailChange = (event) => {
    const value = event.target.value
    setMail(value);
  };

  const handleNombreChange = (event) => {
    const value = event.target.value
    setNombre(value);
  };

  const handleMensajeChange = (event) => {
    const value = event.target.value
    setMensaje(value);
  };

  const onSubmit = async () => {
    event.preventDefault()
    setLoading(true);
    try {
      if (!nombre || !mail || asuntosSelect.length == 0 || !mensaje) throw new Error('Debes completar todos los campos');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nombre, mail, asuntosSelect, mensaje, ipaddress}),
      });

      console.log(res)

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error al enviar el mensaje');
      }

      setAlert({ open: true, type: 'success', msg: '¡Mensaje enviado! Te responderé pronto.' });

      setMail("");
      setNombre("");
      setMensaje("");
      setAsuntosSelect([])

    } catch (err) {
      setAlert({ open: true, type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <div>
          <TextField
            label="Nombre"
            fullWidth
            onChange={(e) => handleNombreChange(e)}
            value={nombre}
            sx={{
              '& .MuiInputLabel-root': { color: '#38bdf8' }, // Label
              '& .MuiInputBase-input': { color: 'white' },   // Texto
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                '& fieldset': { borderColor: '#38bdf8' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
              },
              '& .MuiFormHelperText-root': { color: '#f87171' }, // Texto de error
            }}
          />
        </div>
        <div>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={mail}
            onChange={(e) => handleMailChange(e)}
            sx={{
              '& .MuiInputLabel-root': { color: '#38bdf8' }, // Label
              '& .MuiInputBase-input': { color: 'white' },   // Texto
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                '& fieldset': { borderColor: '#38bdf8' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
              },
              '& .MuiFormHelperText-root': { color: '#f87171' }, // Texto de error
            }}
          />
        </div>
        <div className='max-w-full'>
          <FormControl fullWidth>
            <InputLabel
              id="asunto-label"
              sx={{ color: '#38bdf8', '&.Mui-focused': { color: '#38bdf8' } }}
            >
              Asuntos
            </InputLabel>

            <Select
              labelId="asunto-label"
              id="Asuntos"
              multiple
              fullWidth
              value={asuntosSelect}
              onChange={(e) => handleAsuntosChange(e)}
              input={<OutlinedInput label="Asunto" />}
              renderValue={(selected) => {
                return(
                  <div className='flex flex-row flex-wrap gap-1 w-full'>
                    {selected.map(option => (
                      <div key={option.id_asunto} className="bg-slate-400 bg-opacity-75 rounded-2xl p-2">
                        {option.asunto}
                      </div>
                      )
                    )}
                  </div>
                )
              }}
              sx={{
                // caja del input (igual que TextField)
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px white solid' },
                '& .MuiOutlinedInput-notchedOutline': { border: '1px #38bdf8 solid' },
                // texto del select
                '& .MuiSelect-select': { color: 'white' },
                // icono flecha
                '& .MuiSelect-icon': { color: '#38bdf8' },
              }}
              // el menú se renderiza en un portal: estilízalo aquí
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'rgba(0,0,0,0.9)',
                    color: 'white',
                    border: '1px solid #38bdf8',
                    boxShadow: '0 0 0 1px rgba(56,189,248,0.2), 0 10px 30px rgba(0,0,0,0.6)',
                    height: "33%",
                  },
                },
              }}
            >
                {asuntos.map((asunto) => (
                  <MenuItem
                    key={asunto.id_asunto}
                    value={asunto}
                    sx={{
                      bgcolor: 'transparent',
                      '&.Mui-selected': { bgcolor: 'rgba(56,189,248,0.25)' },
                      '&:hover': { bgcolor: 'rgba(56,189,248,0.15)' },
                    }}
                  >
                    <Checkbox
                      checked={asuntosSelect.includes(asunto)}
                      sx={{ color: '#38bdf8', '&.Mui-checked': { color: '#38bdf8' } }}
                    />
                    <ListItemText primary={asunto.asunto} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            label="Mensaje"
            multiline
            minRows={5}
            fullWidth
            value={mensaje}
            onChange={(e) => handleMensajeChange(e)}
            inputProps={{ maxLength: 512 }}
            sx={{
              '& .MuiInputLabel-root': { color: '#38bdf8' }, // Label
              '& .MuiInputBase-input': { color: 'white' },   // Texto
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                '& fieldset': { borderColor: '#38bdf8' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
              },
              '& .MuiFormHelperText-root': { color: '#f87171' }, // Texto de error
            }}
          />
        </div>
        <div >
          <Button type="submit" variant="contained" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={20} /> : 'Enviar'}
          </Button>
        </div>
      </form>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.type} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
