import React, { useRef, useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';

function comprarEntrada() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [tipoPago, setTipoPago] = useState(null);
  const [cantidadEntradas, setCantidadEntradas] = useState(0);
  const [ciudad, setCiudad] = useState('');
  const [pelicula, setPelicula] = useState(null);

  const messages = useRef(null);
  const toast = useRef(null);

  const opcionesDias = [
    { label: 'Lunes', value: 1 },
    { label: 'Martes', value: 2 },
    { label: 'Miércoles', value: 3 },
    { label: 'Jueves', value: 4 },
    { label: 'Viernes', value: 5 },
  ];

  const opcionesPago = [
    { label: 'Tarjeta', value: 'card' },
    { label: 'Efectivo', value: 'cash' },
  ];

  const opcionesPeliculas = [
    { label: 'Wifi Ralph', value: 'Wifi Ralph' },
    { label: 'Dragon Ball Super Broly', value: 'Dragon Ball Super Broly' },
    { label: 'Cascanueces', value: 'Cascanueces' },
    { label: 'El Grinch', value: 'El Grinch' },
  ];

  const handleDropdownChange = (e) => {
    setSelectedOption(e.value);
  };

  const validarDatos = () => {
    const errores = [];

    if (!selectedOption) {
      errores.push({ severity: 'error', summary: 'Error', detail: 'Selecciona un día.' });
    }
    if (!tipoPago) {
      errores.push({ severity: 'error', summary: 'Error', detail: 'Selecciona un tipo de pago.' });
    }
    if (!cantidadEntradas || cantidadEntradas <= 0) {
      errores.push({ severity: 'error', summary: 'Error', detail: 'Ingresa una cantidad de entradas válida.' });
    }
    if (!ciudad || ciudad.trim() === '') {
      errores.push({ severity: 'error', summary: 'Error', detail: 'Ingresa una ciudad.' });
    }
    if (!pelicula) {
      errores.push({ severity: 'error', summary: 'Error', detail: 'Selecciona una película.' });
    }

    return errores;
  };

  const crearEntrada = (datosEntrada) => {
    try {
      const entradasExistentes = JSON.parse(localStorage.getItem('entradas') || '[]');

      const nuevaEntrada = {
        id: Date.now(),
        ...datosEntrada,
        fechaCompra: new Date().toISOString(),
      };

      entradasExistentes.push(nuevaEntrada);
      localStorage.setItem('entradas', JSON.stringify(entradasExistentes));

      return { success: true, entrada: nuevaEntrada };

    } catch (error) {
      console.error('Error al crear la entrada:', error);
      return { success: false, error: 'Error al guardar la entrada.'};
    }
  };

  const handleSubmit = () => {

  };
  
  return (
    <div className='col'>
      <div className="card flex flex-wrap gap-3 p-fluid">
        <div className='flex-auto'>
          <h2>Día</h2>
          <Dropdown 
            value={selectedOption}
            options={opcionesDias}
            onChange={handleDropdownChange}
            placeholder="Selecciona una opción"
            className="w-full md:w-14rem"
          />
        </div>
        <div className='flex-auto'>
          <h2>Tipo de Pago</h2>
          <SelectButton
            value={tipoPago}
            options={opcionesPago}
            onChange={(e) => setTipoPago(e.value)}
          />
        </div>
        <div className='flex-auto'>
          <h2>Cantidad de entradas</h2>
          <InputNumber 
            value={cantidadEntradas}
            onValueChange={(e) => setCantidadEntradas(e.value)}
            placeholder="Cantidad de entradas"
          />
        </div>
        <div className='flex-auto'>
          <h2>Ciudad</h2>
          <InputText 
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Ciudad"
          />
        </div>
        <div className='flex-auto'>
          <h2>Pelicula</h2>
          <ListBox 
            value={pelicula}
            onChange={(e) => setPelicula(e.target.value)}
            placeholder="Selecciona una película"
            options={opcionesPeliculas}
          />
        </div>

      </div>
    </div>
    
  )
}
export default comprarEntrada