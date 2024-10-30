"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  CalendarIcon,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function transformToDate(string) {
  if (!string) {
    return new Date("1997-01-12");
  }
  // const splitedDate = string.split("-");
  // console.log(string)
  // console.log(splitedDate)

  const dataretorno = new Date(string);
  
  return dataretorno
}

function percentageOfValue(value, payments) {
  const totalPayment = payments.reduce(totalPay, 0);
  function totalPay(total, item) {
    return total + item.valor;
  }
  const porcentagem = (totalPayment / value) * 100;
  return `${Math.round(porcentagem)}%`;
}

function DatePickerWithRange({ className }, defaultValue) {
  const [date, setDate] = React.useState({});

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/LL/y")} - {format(date.to, "dd/LL/y")}
                </>
              ) : (
                format(date.from, "dd/LL/y")
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ptBR}
            initialFocus
            
            mode="range"
            defaultMonth={defaultValue?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// adiciona a url base
const apiService = new ApiService('http://localhost:3001');




const data = apiService.servicoTodosOsContratos("/contratos");

// [
//   {
//       id: "1",
//       objetoContrato: "descrição do contrato",
//       dataInicio: "2024-10-30",
//       dataFim: "2025-01-30",
//       latitude: "-423214",
//       longitude: "-42489122",
//       valor:4520,
//       status:"em contratação",
//       servico:{
//         id:2,
//         servico: "instalaão de software"
//       },
//       empresa: {
//         nome: "Torradeira TI",
//         responsavel: "Oliver Guerreiro",
//       },
//   },
// ];

export const columns = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "objetoContrato",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Objetivo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("objetoContrato")}</div>
    ),
  },
  {
    accessorKey: "dataInicio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Inicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">
        {format(transformToDate(row.getValue("dataInicio")), "dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "dataFim",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Finalização
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">
        {format(transformToDate(row.getValue("dataFim")), "dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "valor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valor"));

      const formatted = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(valor);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const contrato = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-center">Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                className="w-full"
                variant="ghost"
                onClick={() => {
                  table.options.setOpenEditDialog(true);
                  table.options.setEditContract(contrato);
                }}
              >
                Editar
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                className="w-full"
                variant="ghost"
                onClick={() => {
                  table.options.setOpenDetailDialog(true);
                  table.options.setEditContract(contrato);
                }}
              >
                Detalhes
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                className="w-full"
                variant="ghost"
                onClick={() => {
                  table.options.setPayDialog(true);
                  table.options.setEditContract(contrato);
                }}
              >
                Cadastrar Pagamento
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TableContract() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDetailDialog, setOpenDetailDialog] = React.useState(false);
  const [payDialog, setPayDialog] = React.useState(false);
  const [editContract, setEditContract] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    openEditDialog,
    setOpenEditDialog: setOpenEditDialog,
    setEditContract: setEditContract,
    openDetailDialog,
    setOpenDetailDialog: setOpenDetailDialog,
    payDialog,
    setPayDialog:setPayDialog,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Pesquisar pelo objetivo"
          value={table.getColumn("objetivo")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("objetivo")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {DatePickerWithRange("",{})}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-auto bg-slate-700">
              <PlusCircle className=" h-4 w-4 m-1" />
              Novo Contrato
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <p className="font-bold text-3xl">Novo Contrato</p>
              </DialogTitle>
              <DialogDescription>
                Criar um novo contrato no sistema
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Input className="col-span-3" id="objetivo"></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  placeholder="Descrição"
                  id="descricao"
                  className="resize-none col-span-3"
                ></Textarea>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="valor">Valor</Label>
                <Input className="col-span-3" type="float" id="valor"></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="gestor">Gestor</Label>
                <Input className="col-span-3" id="gestor"></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="gestor">Datas</Label>
                {DatePickerWithRange("",{})}
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="em contratacao">
                      Em Contratação
                    </SelectItem>
                    <SelectItem value="paralisado">Paralisado</SelectItem>
                    <SelectItem value="cancellado">Cancellado</SelectItem>
                    <SelectItem value="concluido">Concluido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="status">Tipos de Contrato</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="servico de ti">
                      Serviço de TI
                    </SelectItem>
                    <SelectItem value="obras">Obras</SelectItem>
                    <SelectItem value="mao de obra">Mão de Obra</SelectItem>
                    <SelectItem value="instalacao de produtos">Instalação de Produtos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="status">Empresa contratada</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Empresa" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="Microfone Soft">
                    Microfone Soft
                    </SelectItem>
                    <SelectItem value="State Y">State Y</SelectItem>
                    <SelectItem value="Seta">Seta</SelectItem>
                    <SelectItem value="CloseAi">CloseAi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button type="subimit" className="w-auto bg-slate-700">
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>


        <Dialog
              open={table.options.openEditDialog}
              onOpenChange={table.options.setOpenEditDialog}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <p className="font-bold text-3xl">Editar Contrato</p>
                  </DialogTitle>
                  <DialogDescription>
                    Edite os campos do contrato
                  </DialogDescription>
                </DialogHeader>
             
                <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Input className="col-span-3" id="objetivo" defaultValue={editContract.objetivo}></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  placeholder="Descrição"
                  id="descricao"
                  className="resize-none col-span-3"
                  defaultValue={editContract.descricao}
                ></Textarea>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="valor">Valor</Label>
                <Input className="col-span-3" type="float" id="valor" defaultValue={editContract.valor}></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="gestor">Gestor</Label>
                <Input className="col-span-3" id="gestor" defaultValue={editContract.gestor}></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
              
                <Label htmlFor="gestor">Datas</Label>
                {DatePickerWithRange("",{
                  from: transformToDate(editContract.dtInicial),
                  to: transformToDate (editContract.dtFinal)
                })}
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editContract.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="em contratacao">
                      Em Contratação
                    </SelectItem>
                    <SelectItem value="paralisado">Paralisado</SelectItem>
                    <SelectItem value="cancellado">Cancelado</SelectItem>
                    <SelectItem value="concluido">Concluido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button type="subimit" className="w-auto bg-slate-700">
                  Salvar
                </Button>
              </DialogFooter>
            </form>

              </DialogContent>
            </Dialog>


        <Dialog
              open={table.options.openDetailDialog}
              onOpenChange={table.options.setOpenDetailDialog}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <p className="font-bold text-3xl">Contrato</p>
                  </DialogTitle>
                  <DialogDescription>
                    Detalhes do contrato {editContract.id}
                  </DialogDescription>
                </DialogHeader>
             
                <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Input className="col-span-3" id="objetivo" defaultValue={editContract.objetivo} readOnly></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  readOnly
                  placeholder="Descrição"
                  id="descricao"
                  className="resize-none col-span-3"
                  defaultValue={editContract.descricao}
                ></Textarea>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="valor">Valor</Label>
                <Input className="col-span-3" type="float" id="valor" defaultValue={editContract.valor} readOnly></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="gestor">Gestor</Label>
                <Input className="col-span-3" id="gestor" defaultValue={editContract.gestor} readOnly></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
              
                <Label htmlFor="gestor">Inicio</Label>
                <Input className="col-span-1" id="dtInicio" defaultValue={editContract.dtInicial} readOnly></Input>
                <Label htmlFor="gestor">Termino</Label>
                <Input className="col-span-1" id="dtFinal" defaultValue={editContract.dtFinal} readOnly></Input>
                
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="status">Status</Label>
                <Input className="col-span-2 capitalize" defaultValue={editContract.status} readOnly />
              </div>
              <DialogFooter>
                <Button className="w-auto bg-slate-700">
                  Fechar
                </Button>
              </DialogFooter>
            </form>

              </DialogContent>
            </Dialog>


        <Dialog
              open={table.options.payDialog}
              onOpenChange={table.options.setPayDialog}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <p className="font-bold text-3xl">Pagamento Contrato</p>
                  </DialogTitle>
                  <DialogDescription>
                    Cadastrar Pagamento 
                  </DialogDescription>
                </DialogHeader>
             
                <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Input className="col-span-3" id="objetivo" defaultValue={editContract.objetivo} readOnly></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  readOnly
                  placeholder="Descrição"
                  id="descricao"
                  className="resize-none col-span-3"
                  defaultValue={editContract.descricao}
                ></Textarea>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="valorpagamento">Valor do Pagamento</Label>
                <Input className="col-span-2" type="float" id="valorpagamento"></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="forma">Forma</Label>
                <Input className="col-span-3" id="forma"></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="comprovante">Comprovante</Label>
                <Input className="col-span-3" id="comprovante" ></Input>
              </div>
              <DialogFooter>
                <Button variant="outline">
                  Cancelar
                </Button>
                <Button className="w-auto bg-slate-700">
                  Salvar
                </Button>
              </DialogFooter>
            </form>

              </DialogContent>
            </Dialog>

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
