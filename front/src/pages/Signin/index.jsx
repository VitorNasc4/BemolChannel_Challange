import { FiMail, FiLock } from "react-icons/fi"
import { useAuth } from "../../hooks/auth"
import { useState } from "react"

import {Link} from "react-router-dom"

import {Input} from "../../components/Input"
import {Buttons} from "../../components/Buttons"

import {Container, Form, Background} from "./styles"

export function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const {signIn} = useAuth()

    function handleSignIn() {
        signIn({email, password})
    }

    return (
        <Container>
            <Form>
                <h1>BemolChannel</h1>
                <p>Aplicação para cadastro de usuários</p>
                <h2>Faça seu login</h2>

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />
                
                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Buttons title="Entrar" onClick={handleSignIn}/>

                <Link to="/register">
                    Criar conta
                </Link>

            </Form>

            <Background />
        </Container>
    )
}