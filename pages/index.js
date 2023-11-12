import styles from '@/styles/Home.module.css'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { verifica } from '@/services/user'

export default function Home() {

  return (
    <div>
      <h1>Index</h1>
    </div>
  )
}

export const getServerSideProps =  async ({ req, res }) => {
  try {
    const token = getCookie('authorization', {req, res})
    if (!token) throw new Error ('Token Inválido')

    verifica(token)
    return {
      props: {}
    }
  } catch (error) {
    return {
      redirect:{
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }
}
