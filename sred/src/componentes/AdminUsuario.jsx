import React from 'react';
import { BiSearch, BiX, BiPencil, BiTrash, BiCaretDown } from 'react-icons/bi';

function AdminUsuario() {
    return (
        <>
        <div className="container-fluid">
            <h1 className="mt-5">Panel de administración</h1>
            <div className="row mt-5">
                <div className="col-12">
                    <ul className="nav nav-tabs">
                        <li className="nav-item w-50">
                            <a className="nav-link active" aria-current="page" href="#">Usuarios</a>
                        </li>
                        <li className="nav-item w-50">
                            <a className="nav-link" href="#">Recintos</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border border-top-0 p-3">
                <div className="row">
                    <div className="d-flex col-12 col-md-6 mb-3">
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                                <BiSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscador"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                            />
                            <span className="input-group-text" id="addon-wrapping">
                                <BiX />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-12" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered table-hover align-middle mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th></th>
                                <th>
                                    Nombre <span><BiCaretDown /></span>
                                </th>
                                <th>
                                    Email <span><BiCaretDown /></span>
                                </th>
                                <th>
                                    Rol <span><BiCaretDown /></span>
                                </th>
                                <th>
                                    Fecha <span><BiCaretDown /></span>
                                </th>
                                <th>
                                    DNI <span><BiCaretDown /></span>
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <div className="containerImagen">
                                        <img width="50px" src="./src/assets/logo.jpg" alt="" />
                                    </div>
                                </td>
                                <td>Usuario 1</td>
                                <td>usuario@gmail.com</td>
                                <td>Administrador</td>
                                <td>31-12-2004</td>
                                <td>53835091O</td>
                                <td><i className="btn btn-outline-primary"><BiPencil /></i></td>
                                <td><i className="btn btn-outline-danger"><BiTrash /></i></td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="containerImagen">
                                        <img width="50px" src="./src/assets/logo.jpg" alt="" />
                                    </div>
                                </td>
                                <td>Usuario 1</td>
                                <td>usuario@gmail.com</td>
                                <td>Administrador</td>
                                <td>31-12-2004</td>
                                <td>53835091O</td>
                                <td><i className="btn btn-outline-primary"><BiPencil /></i></td>
                                <td><i className="btn btn-outline-danger"><BiTrash /></i></td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="containerImagen">
                                        <img width="50px" src="./src/assets/logo.jpg" alt="" />
                                    </div>
                                </td>
                                <td>Usuario 1</td>
                                <td>usuario@gmail.com</td>
                                <td>Administrador</td>
                                <td>31-12-2004</td>
                                <td>53835091O</td>
                                <td><i className="btn btn-outline-primary"><BiPencil /></i></td>
                                <td><i className="btn btn-outline-danger"><BiTrash /></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminUsuario