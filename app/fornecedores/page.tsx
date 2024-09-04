import React from "react";
import TableFornecedores from "./custom_component/table_fornecedores";

export default function Contratos() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full">
        <TableFornecedores />
    </main>
  );
}
