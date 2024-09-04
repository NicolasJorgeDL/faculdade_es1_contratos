"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
    return new Date("1997", "01", "12");
  }
  const splitedDate = string.split("/");

  return new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0]);
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
  const [date, setDate] = React.useState(defaultValue);

  console.log(defaultValue)
  console.log("date",defaultValue)
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
                  {format(defaultValue.from, "dd/LL/y")} - {format(defaultValue.to, "dd/LL/y")}
                </>
              ) : (
                format(defaultValue.from, "dd/LL/y")
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
            selected={defaultValue}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const data = [
  {
    id: "m5gr84i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "11/05/2024",
    dtFinal: "14/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "ml198d",
    objetivo: "Software de organização de arquivos",
    descricao: "A licença do software de ",
    dtInicial: "11/05/2024",
    dtFinal: "14/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 150,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "ml198d",
    objetivo: "Software de organização de arquivos",
    descricao: "A licença do software de ",
    dtInicial: "11/05/2024",
    dtFinal: "14/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "ml198d",
    objetivo: "Software de organização de arquivos",
    descricao: "A licença do software de ",
    dtInicial: "11/05/2024",
    dtFinal: "14/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 2000,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "ml198d",
    objetivo: "Software de organização de arquivos",
    descricao: "A licença do software de ",
    dtInicial: "11/05/2024",
    dtFinal: "14/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 2300,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "ml198d",
    objetivo: "Software de organização de arquivos",
    descricao: "A licença do software de ",
    dtInicial: "11/05/2024",
    dtFinal: "14/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "15gr65i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "04/02/2024",
    dtFinal: "26/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "15gr65i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "04/02/2024",
    dtFinal: "26/08/2024",
    valor: 4300,
    status: "em contratacao",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "15gr65i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "04/02/2024",
    dtFinal: "26/08/2024",
    valor: 4300,
    status: "paralisado",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "15gr65i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "04/02/2024",
    dtFinal: "26/08/2024",
    valor: 4300,
    status: "paralisado",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "15gr65i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "04/02/2024",
    dtFinal: "26/08/2024",
    valor: 4300,
    status: "paralisado",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "15gr65i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "04/02/2024",
    dtFinal: "26/08/2024",
    valor: 4300,
    status: "paralisado",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  {
    id: "u5ga84i9",
    objetivo: "Atualização dos Sistemas Operacionais",
    descricao:
      "Atualizar todos os computadores da empresa que utilizam 'Windows 7' para o Windows 10",
    dtInicial: "11/05/2024",
    dtFinal: "14/08/2024",
    valor: 4300,
    status: "paralisado",
    gestor: "Alicia Freitas",
    pagamentos: [
      {
        forma: "cartão de credito",
        valor: 2000,
        comprovante: "1272551",
      },
      {
        forma: "pix",
        valor: 500,
        comprovante: "6158323",
      },
    ],
    empresa: {
      nome: "Torradeira TI",
      responsavel: "Oliver Guerreiro",
    },
  },
  // {
  //   id: "3u1reuv4",
  //   amount: 242,
  //   status: "success",
  //   email: "Abe45@gmail.com",
  // },
  // {
  //   id: "derv1ws0",
  //   amount: 837,
  //   status: "processing",
  //   email: "Monserrat44@gmail.com",
  // },
  // {
  //   id: "5kma53ae",
  //   amount: 874,
  //   status: "success",
  //   email: "Silas22@gmail.com",
  // },
  // {
  //   id: "bhqecj4p",
  //   amount: 721,
  //   status: "failed",
  //   email: "carmella@hotmail.com",
  // },
];

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: "objetivo",
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
      <div className="lowercase">{row.getValue("objetivo")}</div>
    ),
  },
  {
    accessorKey: "dtInicial",
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
        {format(transformToDate(row.getValue("dtInicial")), "dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "dtFinal",
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
        {format(transformToDate(row.getValue("dtFinal")), "dd/MM/yyyy")}
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
    accessorKey: "pagamentos",
    header: ({ column }) => {
      return <div variant="ghost">Conclusão(%)</div>;
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valor"));
      const payments = row.getValue("pagamentos");

      if (payments == []) {
        return <div>0%</div>;
      }

      return (
        <div className="text-center font-medium">
          {percentageOfValue(valor, payments)}
        </div>
      );
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
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                onClick={() => {
                  table.options.setOpenEditDialog(true);
                  table.options.setEditContract(contrato);
                }}
              >
                Editar
              </Button>
              {/* Editar */}
            </DropdownMenuItem>
            <DropdownMenuItem>Detalhes</DropdownMenuItem>
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
  const [openPayDialog, setPayDialog] = React.useState(false);
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


        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
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
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
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
