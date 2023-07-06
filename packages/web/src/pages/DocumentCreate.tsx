import { toast } from "react-toastify";
import api from "../services/api";
import { useState } from "react";

function DocumentCreate()
{
    const [title, setTitle] = useState('')

    function handleCreateDocument()
    {
        const promise = api.post('/documents', { title })
        .then(({data}) => window.open(data.documentURL, '_blank'))
        toast.promise(promise, {
            pending: 'Criando documento...',
            error: 'Falha ao criar documento.',
            success: 'Documento criado com sucesso.'
        })
    }

    return <div className="flex items-center justify-center h-screen">
        <div className="w-96 flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold">Criar documento</h1>
            <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite aqui"
                value={title}
                onChange={(event: any) => setTitle(event.target.value)}
            />
            <button className="bg-blue-500 rounded px-3 py-2 text-white" onClick={handleCreateDocument}>Criar</button>
        </div>
    </div>
}

export default DocumentCreate;