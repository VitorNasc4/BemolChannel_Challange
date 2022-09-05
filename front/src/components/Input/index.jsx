import {Container} from "./styles"

export function Input({icon: Icon, ...rest}) {
    return (
        <Container>
            {Icon && <Icon size={20} />}  {/*  Se existir icon, crie <Icon />  */ }
            <input {...rest}/> 
        </Container>
    )
}