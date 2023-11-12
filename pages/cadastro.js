import Logincard from "@/components/Logincard";
import styles from "../styles/Login.module.css";
import Input from "@/components/Input";
import Button from "@/components/button";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Cadastro() {

  const[formData, setFormData] = useState({
    name:'',
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
      const response = await fetch(`/api/user/cadastro`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      console.log(json)
      console.log(response.status)
      if(response.status !== 201) throw new Error(json)

      setCookie('authorization', json)
      router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.background}>
      <Logincard title="Crie sua conta">
        <form onSubmit={handleForm} className={styles.form}>
          <Input type="text" placeholder="Seu nome" required value={formData.name} onChange={(e) => {handlerFormEdit(e, 'name')}} />
          <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={(e) => {handlerFormEdit(e, 'email')}} />
          <Input type="password" placeholder="Sua senha" required value={formData.password} onChange={(e) => {handlerFormEdit(e, 'password')}} />
          <Button>Cadastrar</Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link href="/login">Entre na sua conta</Link>
        </form>
      </Logincard>
    </div>
  );
}
