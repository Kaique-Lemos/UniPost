import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster, toast } from "sonner";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ nome: "", curso: "", matricula: "" });
  const [editando, setEditando] = useState(null);

  const API_URL = "http://127.0.0.1:8000/api/alunos/";

  // 🔄 Buscar alunos
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setAlunos(data))
      .catch((err) => {
        console.error("Erro ao buscar alunos:", err);
        toast.error("Falha ao carregar alunos do servidor.");
      });
  }, []);

  // 🔄 HandleChange
  const handleChange = (e) => {
    setNovoAluno({ ...novoAluno, [e.target.name]: e.target.value });
  };

  // ➕ Adicionar aluno (POST)
  const handleAdicionar = () => {
    if (!novoAluno.nome || !novoAluno.curso || !novoAluno.matricula) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAluno),
    })
      .then((res) => res.json())
      .then((alunoCriado) => {
        setAlunos([...alunos, alunoCriado]);
        setNovoAluno({ nome: "", curso: "", matricula: "" });
        toast.success(`Aluno "${alunoCriado.nome}" adicionado com sucesso!`);
      })
      .catch((err) => {
        console.error("Erro ao adicionar aluno:", err);
        toast.error("Erro ao adicionar aluno.");
      });
  };

  // ✏️ Editar aluno
  const handleEditar = (id) => {
    const aluno = alunos.find((a) => a.id === id);
    setNovoAluno(aluno);
    setEditando(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 💾 Salvar edição (PUT)
  const handleSalvarEdicao = () => {
    fetch(`${API_URL}${editando}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAluno),
    })
      .then((res) => res.json())
      .then((alunoAtualizado) => {
        setAlunos(alunos.map((a) => (a.id === editando ? alunoAtualizado : a)));
        setNovoAluno({ nome: "", curso: "", matricula: "" });
        setEditando(null);
        toast.success(`Aluno "${alunoAtualizado.nome}" atualizado!`);
      })
      .catch((err) => {
        console.error("Erro ao editar aluno:", err);
        toast.error("Erro ao salvar edição.");
      });
  };

  // ❌ Excluir aluno (DELETE)
  const handleExcluir = (id) => {
    fetch(`${API_URL}${id}/`, { method: "DELETE" })
      .then(() => {
        setAlunos(alunos.filter((a) => a.id !== id));
        toast.success("Aluno excluído com sucesso.");
      })
      .catch((err) => {
        console.error("Erro ao excluir aluno:", err);
        toast.error("Erro ao excluir aluno.");
      });
  };

  return (
    <div
      className="min-h-screen p-4 md:p-10 flex justify-center items-start relative overflow-auto"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/featured/notebook-4k-f7k0g3xufpxxwjk9.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/40 z-0"></div>
      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-xl p-6 md:p-8 mt-12 md:mt-24 relative z-10">
        <Toaster richColors position="top-center" />
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-gray-800">
          Cadastro de Alunos
        </h1>

        {/* Formulário */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="flex-1 w-full">
            <label htmlFor="nome" className="text-xs text-gray-600 ml-1 mb-1 block">Nome</label>
            <Input
              id="nome"
              type="text"
              name="nome"
              placeholder="Nome do aluno"
              value={novoAluno.nome}
              onChange={handleChange}
              className="text-gray-900 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="curso" className="text-xs text-gray-600 ml-1 mb-1 block">Curso</label>
            <Input
              id="curso"
              type="text"
              name="curso"
              placeholder="Curso"
              value={novoAluno.curso}
              onChange={handleChange}
              className="text-gray-900 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="matricula" className="text-xs text-gray-600 ml-1 mb-1 block">Matrícula</label>
            <Input
              id="matricula"
              type="text"
              name="matricula"
              placeholder="Matrícula"
              value={novoAluno.matricula}
              onChange={handleChange}
              className="text-gray-900 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>

          {/* Botão Condicional */}
          {editando ? (
            <Button
              onClick={handleSalvarEdicao}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              Salvar Edição
            </Button>
          ) : (
            <Button
              onClick={handleAdicionar}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              Incluir Novo Aluno
            </Button>
          )}
        </div>

        {/* Tabela */}
        <div className=" border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-gray-700 text-center">Id</TableHead>
                <TableHead className="text-gray-700 text-center">Nome</TableHead>
                <TableHead className="text-gray-700 text-center">Curso</TableHead>
                <TableHead className="text-gray-700 text-center">Matrícula</TableHead>
                <TableHead className="text-gray-700 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {alunos.map((aluno) => (
                <TableRow key={aluno.id} className="border-gray-200 hover:bg-gray-50">
                  <TableCell className="text-center">{aluno.id}</TableCell>
                  <TableCell className="font-medium text-center">{aluno.nome}</TableCell>
                  <TableCell className="text-center">{aluno.curso}</TableCell>
                  <TableCell className="text-center">{aluno.matricula}</TableCell>
                  <TableCell className="text-center space-x-2">

                    {/* Botão de Editar */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditar(aluno.id)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Editar
                    </Button>

                    {/* Botão de Excluir com ALERTA DE CONFIRMAÇÃO */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white border-gray-200 text-gray-900">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gray-900">Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600">
                            Esta ação não pode ser desfeita. O aluno "{aluno.nome}" será permanentemente excluído.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleExcluir(aluno.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Confirmar Exclusão
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;