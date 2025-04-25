import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function FormularioDeAdicao() {

    const [cliente, setCliente] = useState({
        nome: '',
        email: '',
        logotipo: '',
        logradouros: [{
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: ''
        }]
    })

    const navegar = useNavigate()

    const atualizarCliente = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value })
    }

    const atualizarLogradouro = (e) => {
        const { name, value } = e.target
        setCliente({
            ...cliente,
            logradouros: [{
                ...cliente.logradouros[0],
                [name]: value
            }]
        })
    };

    const carregarImagem = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            const base64 = reader.result.split(',')[1]
            setCliente({ ...cliente, logotipo: base64 })
        };

        if (file) {
            reader.readAsDataURL(file)
        }
    };

    const enviarFormulario = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/clientes', cliente)
            .then(() => navegar('/'))
            .catch(err => console.error(err))
    };

    return (
        <Container style={{ backgroundColor: '#282c34', color: 'white' }} className="py-5">
            <div className='d-flex justify-content-center py-4 text-primary'>
                <h1>Dados Cliente</h1>
            </div>
            <Form className='d-flex flex-column gap-4' onSubmit={enviarFormulario}>

                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" value={cliente.nome} onChange={atualizarCliente} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={cliente.email} onChange={atualizarCliente} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Logotipo (imagem)</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={carregarImagem} />
                </Form.Group>

                <h5 className="mt-4">Logradouro</h5>

                <Form.Group className="mb-3">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control type="text" name="rua" value={cliente.logradouros[0].rua} onChange={atualizarLogradouro} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Número</Form.Label>
                    <Form.Control type="text" name="numero" value={cliente.logradouros[0].numero} onChange={atualizarLogradouro} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control type="text" name="complemento" value={cliente.logradouros[0].complemento} onChange={atualizarLogradouro} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control type="text" name="bairro" value={cliente.logradouros[0].bairro} onChange={atualizarLogradouro} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" name="cidade" value={cliente.logradouros[0].cidade} onChange={atualizarLogradouro} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control type="text" name="estado" value={cliente.logradouros[0].estado} onChange={atualizarLogradouro} />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="text" name="cep" value={cliente.logradouros[0].cep} onChange={atualizarLogradouro} />
                </Form.Group>

                <Button type="submit" variant="success">Cadastrar Cliente</Button>
            </Form>
        </Container>
    );

}