'use client';
import dynamic from "next/dynamic";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider } from "@/components/providers/toast-provider";

const AdminPanel = dynamic(() => import("./AdminPanelContent"), { ssr: false });

export default function AdminPanelPage() {
  return (
    <ToastProvider>
      <AdminLayout>
        <AdminPanel />
      </AdminLayout>
    </ToastProvider>
  );
}
