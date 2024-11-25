'use client';
import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("./AdminPanelContent"), { ssr: false });

export default AdminPanel;
