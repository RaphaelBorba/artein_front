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
import { ChevronRight, TableProperties } from "lucide-react";

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

  const navigations: NavigationItem[] = [
    {
      isDropdown: true,
      title: "Cadastro de Clientes",
      sons: [
        { title: "Cadastro Geral", path: "cadastro_geral" },
        { title: "Pacientes", path: "pacientes" },
        { title: "Alunos", path: "alunos" },
      ],
    },
    {
      isDropdown: false,
      title: "Funcionários",
      path: "funcionarios",
    },
    {
      isDropdown: false,
      title: "Atendimento",
      path: "atendimento",
    },
    {
      isDropdown: true,
      title: "Treinamentos",
      sons: [
        { title: "Cursos", path: "cursos" },
        { title: "Turmas", path: "turmas" },
        { title: "Lista de Presença", path: "lista_de_presenca" },
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
        { title: "Contas a Pagar", path: "contas_a_pagar" },
        { title: "Contas a Receber", path: "contas_a_receber" },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isOpen ? (
          <p className="h-9 w-full overflow-hidden text-center text-2xl font-bold">
            Gestão de Clientes
          </p>
        ) : (
          <p className="h-10 w-full text-center text-2xl font-bold">G</p>
        )}
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
                          <a href={subnav.path}>
                            <span>{subnav.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </div>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ) : (
            <div key={nav.title}>
              <SidebarMenuButton
                className="py-6 hover:bg-[#1E282C] hover:text-white active:bg-[#1E282C] active:text-white"
                tooltip={nav.title}
              >
                <TableProperties />
                <span>{nav.title}</span>
              </SidebarMenuButton>
            </div>
          )
        )}
      </SidebarContent>

      {/* Footer can be uncommented and customized if needed */}
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
