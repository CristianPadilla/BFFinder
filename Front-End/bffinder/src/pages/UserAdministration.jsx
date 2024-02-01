import React from "react";
import NavHome from "../Components/NavHome";
import TableAdmin from "../Components/TableAdmin";

const UserAdministration = () => {



  return (
    <div>
      <section id="content">
        <NavHome />
        <main>
          <div className="main-content-admin">
            <h1>Solicitudes de Registro de Refugios </h1>

            <div className="table-container">
              <TableAdmin />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default UserAdministration;
