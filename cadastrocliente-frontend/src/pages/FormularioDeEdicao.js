import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

export default function FormularioDeEdicao() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nome: '',
        email: '',
        logotipo: '',
        logradouros: [{ rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' }]
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/clientes/${id}`)
            .then(response => setCliente(response.data))
            .catch(err => console.error(err));
    }, [id]);

    const atualizarCamposFormulario = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    }

    const atualizarLogradouro = (e, index) => {
        const novosLogradouros = [...cliente.logradouros];
        novosLogradouros[index] = { ...novosLogradouros[index], [e.target.name]: e.target.value };
        setCliente({ ...cliente, logradouros: novosLogradouros });
    }

    const enviarFormularioAtualizacao = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/clientes/${id}`, cliente)
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    }

    const voltarAoInicio = () => {
        navigate('/');
    }

    const carregarImagem = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result.split(',')[1];
            setCliente({ ...cliente, logotipo: base64 });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container style={{ backgroundColor: '#282c34' }} className="py-4 minHeight: '100vh'">

            <div className='d-flex justify-content-center py-4 text-primary'>
                <h2>Editar Cliente</h2>
            </div>

            <Form style={{ color: 'white' }} className='d-flex flex-column gap-4' onSubmit={enviarFormularioAtualizacao}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={cliente.nome}
                        onChange={atualizarCamposFormulario}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={cliente.email}
                        onChange={atualizarCamposFormulario}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Logotipo (imagem)</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={carregarImagem} />
                </Form.Group>

                {cliente.logradouros.map((logradouro, index) => (
                    <div key={index}>
                        <h5>Logradouro {index + 1}</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Rua</Form.Label>
                            <Form.Control
                                type="text"
                                name="rua"
                                value={logradouro.rua}
                                onChange={(e) => atualizarLogradouro(e, index)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero"
                                value={logradouro.numero}
                                onChange={(e) => atualizarLogradouro(e, index)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                                type="text"
                                name="complemento"
                                value={logradouro.complemento}
                                onChange={(e) => atualizarLogradouro(e, index)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                name="bairro"
                                value={logradouro.bairro}
                                onChange={(e) => atualizarLogradouro(e, index)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={logradouro.cidade}
                                onChange={(e) => atualizarLogradouro(e, index)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                name="estado"
                                value={logradouro.estado}
                                onChange={(e) => atualizarLogradouro(e, index)}
                            />
                        </Form.Group>
                    </div>
                ))}

                <div className="d-flex justify-content-end gap-5">
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                    <Button variant="warning" onClick={voltarAoInicio}>
                        Voltar
                    </Button>
                </div>
            </Form>


        </Container>
    );
}
