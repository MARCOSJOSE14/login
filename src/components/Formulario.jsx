import Link from 'next/link'
import { useState } from 'react'

const Formulario = () => {
  const [datof, setDatof] = useState({
    id: '',
    pas: ''
  })

  const savedato = ({ target: { name, value } }) => {
    setDatof({
      ...datof,
      [name]: value
    })
  }

  return (
    <>
      <div className="h-screen w-screen bg-purple-700 items-center justify-center flex flex-col">
        <h1 className=" p-5 font-bold text-3xl mb-5 text-white">
          Bienvenido a la página de Login
        </h1>

        <div className="bg-white p-5 rounded-xl grid">
          <form className="grid ">

            <input
              className="m-3 pl-2 text-base py-2 rounded-lg border-black border mb-1"
              type="text"
              name="id"
              required
              placeholder="Ingresa tu DNI"
              onChange={savedato}
            />
            {(datof.id.length !== 8 && datof.id.length !== 0) &&
              <label className='text-xs flex justify-center text-red-500'>EL DNI debe tener 8 digitos</label>
            }

            {((!/^[a-zA-Z]+$/.test(datof.id)) && datof.id.length !== 0) &&
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
