"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronRight, LogOut, TableProperties, User } from "lucide-react";
import Link from "next/link";

interface NavigationItem {
  isDropdown: boolean;
  title: string;
  sons?: {
    title: string;
    path: string;
  }[];
  path?: string;
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();
  const isOpen = sidebar.state === "expanded";

  const [activeCollapsible, setActiveCollapsible] = React.useState<string | null>(null);

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleMenuClick = (nav: NavigationItem, event: React.MouseEvent) => {
    if (!isOpen) {
      event.preventDefault();
      sidebar.setOpen(true);
    }
  };

  const navigations: NavigationItem[] = [
    {
      isDropdown: true,
      title: "Cadastro Clientes",
      sons: [
        { title: "Cadastro Geral", path: "/cc/cadastro_geral" },
        { title: "Pacientes", path: "/cc/pacientes" },
        { title: "Alunos", path: "/cc/alunos" },
      ],
    },
    {
      isDropdown: false,
      title: "Funcionários",
      path: "/funcionarios",
    },
    {
      isDropdown: false,
      title: "Atendimento",
      path: "/atendimento",
    },
    {
      isDropdown: true,
      title: "Treinamentos",
      sons: [
        { title: "Cursos", path: "/treinamentos/cursos" },
        { title: "Turmas", path: "/treinamentos/turmas" },
        { title: "Lista de Presença", path: "/treinamentos/lista_de_presenca" },
      ],
    },
    {
      isDropdown: true,
      title: "Fichas",
      sons: [
        { title: "Curso 1", path: "" },
        { title: "Curso 2", path: "" },
        { title: "Curso 3", path: "" },
      ],
    },
    {
      isDropdown: true,
      title: "Financeiro",
      sons: [
        { title: "Contas a Pagar", path: "/financeiro/contas_a_pagar" },
        { title: "Contas a Receber", path: "/financeiro/contas_a_receber" },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="cursor-pointer">
        <Link href={'/'}>
          {isOpen ? (
            <p className="h-9 w-full overflow-hidden text-center text-2xl font-bold">
              Gestão de Clientes
            </p>
          ) : (
            <p className="h-10 w-full text-center text-2xl font-bold">G</p>
          )}
        </Link>

      </SidebarHeader>

      <SidebarContent className="gap-0 bg-[#222D32] text-[#b8c7ce]">
        {isOpen && (
          <span className="bg-[#1a2226] py-4 pl-4 text-sm text-[#4b646f]">Menu</span>
        )}

        {navigations.map((nav) =>
          nav.isDropdown ? (
            <Collapsible
              key={nav.title}
              asChild
              open={activeCollapsible === nav.title}
              onOpenChange={(isOpen) => {
                setActiveCollapsible(isOpen ? nav.title : null);
              }}
              className="group/collapsible"
            >
              <div>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={nav.title}
                    className="py-6 hover:!bg-[#1E282C] hover:!text-white"
                    onClick={(event) => handleMenuClick(nav, event)}
                  >
                    <TableProperties />
                    <span>{nav.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="hover:bg-[#1E282C] hover:text-white">
                  <SidebarMenuSub className="border-none bg-[#2C3B41]">
                    {nav.sons?.map((subnav) => (
                      <div key={subnav.title}>
                        <SidebarMenuSubButton
                          className="py-3 text-[#b8c7ce] hover:bg-[#1E282C] hover:text-white active:bg-[#1E282C] active:text-white"
                          asChild
                        >
                          <Link href={subnav.path}>
                            <span>{subnav.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </div>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ) : (
            <div key={nav.title}>
              <Link href={nav.path!}>
                <SidebarMenuButton
                  className="py-6 hover:bg-[#1E282C] hover:text-white active:bg-[#1E282C] active:text-white"
                  tooltip={nav.title}
                  onClick={(event) => handleMenuClick(nav, event)}
                >
                  <TableProperties />
                  <span>{nav.title}</span>
                </SidebarMenuButton>
              </Link>
            </div>
          )
        )}
      </SidebarContent>

      {/* LOGOUT DROPDOWN MENU IN SIDEBAR FOOTER */}
      <SidebarFooter className="border-t border-[#1a2226] bg-[#222D32] p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex gap-3 text-[#b8c7ce] hover:bg-[#1E282C] hover:text-white">
              <User size={20} />
              {isOpen && <span>Nome do Usuário</span>}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 border-none bg-[#2C3B41] p-2 !text-[#b8c7ce]"
          >
            <DropdownMenuItem
              className="cursor-pointer hover:!bg-[#1E282C] hover:!text-[#b8c7ce]"
              onClick={handleLogout}
            >
              <LogOut className="mr-2" size={16} />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar >
  );
}
