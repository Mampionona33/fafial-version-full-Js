import { Sidebar, SidebarProps } from "primereact/sidebar";
import { Link } from "react-router-dom";

const AppSidebar = ({ visible, onHide }: SidebarProps) => {
  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      header={<h1 className="px-3 font-bold ">Menu</h1>}
      closeIcon={
        <span
          className="material-symbols-outlined hover:text-gray-400 w-4 h-4 pr-5"
          style={{ fontSize: "18px" }}
        >
          arrow_back_ios_new
        </span>
      }
      showCloseIcon
      className="w-64 shadow-sm rounded-tr-md rounded-br-md bg-slate-100"
    >
      <hr className="mt-2" />
      <div className="card flex justify-content-center  pl-4 pt-5">
        <Link to={"/"}>Dashboard</Link>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
