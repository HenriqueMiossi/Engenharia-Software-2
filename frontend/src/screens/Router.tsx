import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ListarClientes from "./ListarClientes/ListarClientes";
import ConsultarCliente from "./ConsultarCliente/ConsultarCliente";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ListarClientes />} path = "/"/>
                <Route element={<ConsultarCliente />} path = "/cliente/:id"/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
