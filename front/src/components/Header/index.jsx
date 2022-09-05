import {RiShutDownLine} from "react-icons/ri"
import { Container, Profile, Logout } from "./styles"
import {useAuth} from "../../hooks/auth"

export function Header() {
  const {signOut, user} = useAuth()
  return (
    <Container>
      <Profile to="/profile">
        <div>
          <span>Bem vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      <Logout onClick={signOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}