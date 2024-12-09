import { toast, Toaster } from "sonner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoParent from "./components/TodoParent";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import { deleteTodo } from "./crud";

export default function App() {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [confirmDeleted, setConfirmDeleted] = useState(false);
  const [deletedTodoId, setDeletedTodoId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <Header list={list} setList={setList} />
      <main className="grow">
        <div className="container mx-auto py-10">
          <TodoParent
            setDeletedTodoId={setDeletedTodoId}
            setConfirmDeleted={setConfirmDeleted}
            setList={setList}
            list={list}
          ></TodoParent>
        </div>
      </main>
      <Footer />
      <Dialog open={confirmDeleted} onOpenChange={setConfirmDeleted}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rostan ham o'chirmoqchimisiz</DialogTitle>
            <DialogDescription>
              O'ylab ish qiling, keyin orqaga qaytarib bo'lmaydi
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button onClick={() => setConfirmDeleted(false)} variant="outline">
              Yo'q
            </Button>
            <Button
              onClick={() => {
                if (deletedTodoId) {
                  setList(deleteTodo(deletedTodoId, list));
                  setDeletedTodoId(null);
                  setConfirmDeleted(false);
                  toast.success("Ma'lumot muvaffaqiyatli o'chirildi");
                }
              }}
              variant="destructive"
            >
              Ha
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster position="top-center" richColors />
    </>
  );
}
