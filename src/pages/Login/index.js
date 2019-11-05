
import React, {useState}  from 'react'
import api from '../../services/api'

export default function Login({history}) {
    const [email, setEmail]  = useState('');
    
   async function handleSubmit(event){
        event.preventDefault()
        let response = await api.post('/users', {email});
        const {_id} = response.data;
        localStorage.setItem('user', _id);
        history.push('/dashboard');
    }

    return (
        <>        
            <p>OfereÇa <strong>Spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"> E-mail *</label>
                <input 
                    type="text" 
                    id="email"
                    placeholder="Seu melhor email" 
                    value={email}
                    onChange={event => setEmail(event.target.value)}/>
                <button type="submt" className="btn">Entrar</button>
            </form>
        </>
        )
}