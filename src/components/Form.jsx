import React, { useState } from 'react';
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import axios from "axios";
import './form.scss';

const Form = () => {
    const [clientName, setClientName] = useState('');
    const [clientSurname, setClientSurname] = useState('');
    const [clientType, setClientType] = useState('osoba');
    const [clientId, setClientId] = useState('');
    const [image, setImage] = useState(null);

    const userData = {
        Imię: clientName,
        Nazwisko: clientSurname,
        Typ: clientType,
        Id: clientId, 
        Zdjęcie: image,
      }
   
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleSubmit = (e) => {
        
       console.log(userData)

        axios.post('/Contractor/Save', userData)
        .then(res => {alert(res + "\nRejestracja przebiegła pomyślnie")})
        .catch(err => {alert(err + "\nNie znaleziono metody zapisu")});

        e.preventDefault();
        e.target.reset();
        setClientName('');
        setClientSurname('');
        setImage(null);
    }

   
    return (
        <div className='container'>
            <div className='heading'>
               <AiOutlineUserAdd/>
                <h2>Rejestracja nowego kontrahenta</h2> 
            </div>
            <section className='basic-info'>
                <h3>{clientName ? clientName : <span>----------</span>}</h3>
                <div>
                    {image ? <img src={image} alt="client_image"/> : <MdAddAPhoto/>}
                </div>
            </section>
            <form onSubmit={handleSubmit}>
                <label>Imię:</label>
                <input type="text" onChange={(e) => setClientName(e.target.value)} required/>
                <label>Nazwisko:</label>
                <input type="text" onChange={(e) => setClientSurname(e.target.value)} required/>
                <label>Typ (Osoba lub Firma)</label>
                <select id="client" onChange={(e) => setClientType(e.target.value)} required>
                    <option value="osoba">Osoba</option>
                    <option value="firma">Firma</option>
                </select>
                <label>Numer identyfikacyjny - 
                    <b>
                        {clientType === 'osoba' && ' PESEL'}
                        {clientType === 'firma' && ' NIP'}
                     </b>
                    </label>
                <input 
                type="text" 
                required 
                onChange={(e) => setClientId(e.target.value)}
                onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }}}
                minLength={clientType === 'osoba' ? "11" : "10"} 
                maxLength={clientType === 'osoba' ? "11" : "10"} 
                />
                <label>Wybierz zdjęcie(jpg lub jpeg):</label>
                <input type="file" name="myImage" accept="image/jpg, image/jpeg" onChange={onImageChange}/>
                <button type='submit'>Wyślij</button>
            </form>
        </div>
    );
}

export default Form;
