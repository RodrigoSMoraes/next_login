import Logincard from "@/components/Logincard";
import styles from "../styles/Login.module.css";
import Input from "@/components/Input";
import Button from "@/components/button";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Login() {
  const[formData, setFormData] = useState({
    email:'',
    password:''
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handlerFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]:event.target.value
    })
  }

  const handleForm = async (event) => {
    try {
      event.preventDefault()
      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      console.log(json)
      console.log(response.status)
      if(response.status !== 200) throw new Error(json)

      setCookie('authorization', json)
      router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.background}>
      <Logincard title="Entre em sua conta">
        <form className={styles.form} onSubmit={handleForm}>
          <Input type="email" placeholder="Seu e-mail" value={formData.email} required onChange={(e) => {handlerFormEdit(e, 'email')}}/>
          <Input type="password" placeholder="Sua senha" value={formData.password} required onChange={(e) => {handlerFormEdit(e, 'password')}}/>
          <Button>Entrar</Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link href="/cadastro">Ainda não é cadastrado? </Link>
        </form>
      </Logincard>
    </div>
  );
}
