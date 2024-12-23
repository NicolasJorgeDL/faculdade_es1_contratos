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
import ApiService from "@/app/contratos/custom_component/ApiService";

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

function excluirHandle(id){
  const deleteFornecedor = async () => {
    try {
      const response = await apiService.servicoExcluirFornecedor(
        `/empresas/${id}`
      );
      setData(response); // Armazena os dados
    } catch (error) {
      console.log(error);
    }
  };

  deleteFornecedor(); // Chama a função quando o componente monta
}


const apiService = new ApiService("http://localhost:8080");

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-10">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Empresa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("empresa")}</div>
    ),
  },
  {
    accessorKey: "responsavel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Responsavel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("responsavel")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const fornecedor = row.original;

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
                  table.options.setEditFornecedor(fornecedor);
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
                  table.options.setOpenDeleteDialog(true);
                  table.options.setEditFornecedor(fornecedor);
                }}
              >
                Excluir
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TableFornecedores() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [editFornecedor, setEditFornecedor] = React.useState([]);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // Função para carregar os dados
    const fetchData = async () => {
      try {
        const response = await apiService.servicoTodosOsFornecedores(
          "/empresas"
        );
        setData(response); // Armazena os dados
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Chama a função quando o componente monta
  }, []);

  console.log(data);
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
    openDeleteDialog,
    setOpenDeleteDialog: setOpenDeleteDialog,
    setEditFornecedor: setEditFornecedor,
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
          placeholder="Pesquisar pelo nome da empresa"
          value={table.getColumn("empresa")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("empresa")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-auto bg-slate-700">
              <PlusCircle className=" h-4 w-4 m-1" />
              Novo Fornecedor
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <p className="font-bold text-3xl">Novo Fornecedor</p>
              </DialogTitle>
              <DialogDescription>
                Criar um novo Fornecedor no sistema.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="nome">Nome</Label>
                <Input className="col-span-3" id="nome"></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="responsavel">Responsavel</Label>
                <Input
                  placeholder="Responsavel"
                  id="responsavel"
                  className="col-span-3"
                ></Input>
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
                <p className="font-bold text-3xl">Editar Fornecedor</p>
              </DialogTitle>
              <DialogDescription>
                Edite as informações do fornecedor
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="nome">nome</Label>
                <Input
                  className="col-span-3"
                  id="nome"
                  defaultValue={editFornecedor.empresa}
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-3">
                <Label htmlFor="responsavel">Responsavel</Label>
                <Input
                  placeholder="Responsavel"
                  id="responsavel"
                  className="col-span-3"
                  defaultValue={editFornecedor.responsavel}
                ></Input>
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
          open={table.options.openDeleteDialog}
          onOpenChange={table.options.setOpenDeleteDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <p className="font-bold text-3xl">Excluir Fornecedor</p>
              </DialogTitle>
              <DialogDescription>
                Não é reversivel, deseja realmente excluir o fornecedor.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="flex items-center text-right gap-3">
                <Label htmlFor="empresa" className="text-2x1 font-bold">
                  Excluir o Fornecedor: {editFornecedor.empresa} ?
                </Label>
              </div>
              <div className="flex items-center text-right gap-3">
                <Label htmlFor="responsavel">
                  Responsavel: {editFornecedor.responsavel}
                </Label>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button type="subimit" className="w-auto bg-red-700" onClick={()=>excluirHandle(editFornecedor.id)}>
                  Excluir
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
