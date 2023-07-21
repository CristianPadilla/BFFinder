import React from 'react'

const FormikRegisterFoundationPage = () => {
  return (
   <>
   <form className="sign-up-form" id="sign-up-form">
     <h2 className="titulo">Registrarse</h2>

     <div className="input-field">
       <i className="fas fa-user" />
       <input type="text" placeholder="Nombre" value="" name="firstname" />
     </div>
     <div className="input-field">
       <i className="fas fa-envelope" />
       <input
         type="email"
         placeholder="ejemplo@mail.com"
         value=""
         name="email"
       />
     </div>

     <input
       type="submit"
       id="sign-up-btn"
       value="Registrarse"
       className="btn"
       // onClick={registerUser}
     />
   </form>
 </>
  )
}

export default FormikRegisterFoundationPage
