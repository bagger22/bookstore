import { useNavigate } from "react-router-dom"
import notfound from "./notFound.module.css"

export const NotFound = () => {
 const navigate = useNavigate()

 return (
  <>
    <div className={notfound.notfound_container}>
        <p className={notfound.notfound_text}>Page not found. Return <a className={notfound.notfound_link} href="#" onClick={() => navigate(-1)}>back.</a></p>
        <p className={notfound.notfound_emoji}>(╯°□°）╯︵ ┻━┻</p>
    </div>
  </>
 )
}
 
