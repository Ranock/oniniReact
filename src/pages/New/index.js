import React, {useState, useMemo} from 'react'
import camera from '../../assets/camera.svg'
import api from '../../services/api';

import './styles.css';

export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        () =>{     
            return thumbnail ? URL.createObjectURL(thumbnail) : null      
        },
        [thumbnail]
    )

    async function handleSubmit(event){
        event.preventDefault();
        // console.log('aaa');
        let data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price',price);
        data.append('techs', techs);

        await api.post('/spots', data, {headers :{user_id}})
        history.push('/dashboard'); 
    } 
    return (
            <form onSubmit={handleSubmit}>
                <label id="thumbnail" 
                        style={{backgroundImage : `url(${preview})`}}
                        className={ thumbnail ? `has-thumbnail` : ''}
                    >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                    <img src={camera} alt="Select img"/>
                </label>
                <label htmlFor="company">Empresa *</label>
                <input 
                    type="text" 
                    id="company"
                    placeholder="Sua empresa incrível" 
                    value={company}
                    onChange={event => setCompany(event.target.value)}/>

                <label htmlFor="techs">Tecnologias *</label>
                <input 
                    type="text" 
                    id="techs"
                    placeholder="Quais tecnologias vocês usam?" 
                    value={techs}
                    onChange={event => setTechs(event.target.value)}/>
                <label htmlFor="price">Valor da diária (em branco para gratuito) *</label>
                <input 
                    type="text" 
                    id="price"
                    placeholder="Digite o valor cobrado por dia" 
                    value={price}
                    onChange={event => setPrice(event.target.value)}/>

                <button type="submit" className="btn">Cadastrar</button>
            </form>
        )
}