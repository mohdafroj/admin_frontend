type Item = {
    name: string;
    link: string;
  };
  
  type SidebarSection = {
    name: string;
    items: Item[];
  };
  
  export type SidebarData = SidebarSection[];