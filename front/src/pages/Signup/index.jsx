import {api} from "../../services/api"
import { useState } from "react"

import { FiMail, FiLock, FiUser, FiMapPin } from "react-icons/fi"

import {Link, useNavigate} from "react-router-dom"

import {Input} from "../../components/Input"
import {Buttons} from "../../components/Buttons"


import {Container, Form, Background} from "./styles"

export function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cep, setCep] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    function handleSignup() {
        if (!name || !email || !password) {
            return alert("Preencha todos os campos")
        }

        api.post("/user", {name, email, password, cep, city, address})
            .then(() => {
                alert("Usuário cadastrado com sucesso")
                navigate("/")
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("Não foi possível cadastrar")
                }
            })
    }   


    async function searchCep(value) {
        const endpoint = `http://viacep.com.br/ws/${value}/json`
        const data = await fetch(endpoint).then(data => data.json()).then(({localidade, logradouro}) => ({
            localidade, 
            logradouro 
            
        }))

        if (!data) {
            alert("Não foi possível localizar o cep")
        }

        setCity(data.localidade)
        setAddress(data.logradouro)

    }

    const handleSearchCep = async (value)  => {
        searchCep(value)
    }

    return (
        <Container>
            <Background />
            <Form>
                <h1>BemolChannel</h1>
                <p>Aplicação para cadastro de usuários</p>
                <h2>Crie sua conta</h2>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="CEP"
                    type="number"
                    icon={FiMapPin}
                    onChange={e => setCep(e.target.value)}
                    onBlur={e => handleSearchCep(e.target.value)}
                />
                <Input 
                    placeholder="Cidade"
                    type="text"
                    icon={FiMapPin}
                    onChange={e => setCity(e.target.value)}
                    value={city ? city : ""}
                />
                <Input 
                    placeholder="Endereço"
                    type="text"
                    icon={FiMapPin}
                    onChange={e => setAddress(e.target.value)}
                    value={address ?address : ""}
                />
                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                    id="cep"
                />
                
                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Buttons title="Cadastrar" onClick={handleSignup}/>

                <Link to="/">
                    Voltar para login
                </Link>

            </Form>

        </Container>
    )
}