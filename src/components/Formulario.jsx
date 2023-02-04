import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Formulario = () => {
  const { push } = useRouter()

  const [datof, setDatof] = useState({
    id: '',
    pas: ''
  })

  const [incorrecto, setIncorrecto] = useState(false)

  const savedato = ({ target: { name, value } }) => {
    setDatof({
      ...datof,
      [name]: value
    })
  }

  const vali = async (e) => {
    e.preventDefault()
    setIncorrecto(false)
    const { data } = await axios.post('api/login', datof)
    if (data) {
      push('/')
    } else {
      setIncorrecto(true)
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-purple-700 items-center justify-center flex flex-col">
        <h1 className=" p-5 font-bold text-3xl mb-5 text-white">
          Bienvenido a la página de Login
        </h1>

        <div className="bg-white p-5 rounded-xl grid">
          <form
          className="grid "
          onSubmit={vali}>

            {incorrecto && <label>DNI y/o contraseña Incorrectos</label>}

            <input
              className="m-3 pl-2 text-base py-2 rounded-lg border-black border mb-1"
              type="text"
              name="id"
              required
              maxLength="8"
              placeholder="Ingresa tu DNI"
              onChange={savedato}
            />

            {((!/^\d+$/.test(datof.id)) && datof.id.length !== 0) &&
              <label className='text-xs flex justify-center text-red-500'>EL DNI solo debe tener números</label>
            }

            <input
              type="password"
              className="m-3 pl-2 text-base py-2 rounded-lg border-black border"
              name="pass"
              required
              placeholder="Ingresa tu Contraseña"
              onChange={savedato}
            />

            <button className="mt-3 py-3 border rounded-xl bg-purple-700 text-white">
              Iniciar Sesión
            </button>
          </form>

          <span className="underline underline-offset-1 flex justify-center mt-12 ">
            <Link href={'/'}>¿Olvidaste tu contraseña?</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Formulario
