import { Toaster as SonnerToaster } from "sonner";

const Toaster = () => {
  return (
    <SonnerToaster
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-950 group-[.toaster]:text-slate-50 group-[.toaster]:border-slate-800 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-slate-50 group-[.toast]:text-slate-950",
          cancelButton:
            "group-[.toast]:bg-slate-800 group-[.toast]:text-slate-50",
        },
      }}
    />
  );
};

export { Toaster as default };
export { Toaster };
