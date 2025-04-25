import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Collapse } from 'react-bootstrap';
import axios from 'axios';

export default function ListaClientes() {

    const [clientes, setClientes] = useState([])
    const [openIndex, setOpenIndex] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8080/clientes')
            .then(response => setClientes(response.data))
            .catch(err => console.error(err))
    }, [])

    const toggleDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const removerCliente = (id) => {
        if (window.confirm("Tem certeza que deseja remover este cliente?")) {
            axios.delete(`http://localhost:8080/clientes/${id}`)
                .then(() => {
                    setClientes(clientes.filter(c => c.id !== id))
                })
                .catch(err => console.error(err))
        }
    }

    const editarCliente = (id) => {
        navigate(`/editar-cliente/${id}`)
        //console.log(`Editar cliente ${id}`);
    }

    return (
        <div style={{ backgroundColor: '#282c34' }} className="container vh-100">
            <div className='d-flex justify-content-center py-4 text-primary'>
                <h1>Lista de Clientes</h1>
            </div>

            {clientes.map((cliente, index) => (

                <Card key={cliente.id} className="mb-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <Card.Title>{cliente.nome}</Card.Title>
                            <div>



                                <Button variant="primary" size="sm" onClick={() => toggleDetails(index)}>
                                    ▼
                                </Button>
                            </div>
                        </div>
                        <Collapse in={openIndex === index}>
                            <div>
                                <Card.Text><strong>Email:</strong> {cliente.email}</Card.Text>
                                {cliente.logotipo && (
                                    <img
                                        src={`data:image/png;base64,${cliente.logotipo}`}
                                        alt="Logotipo"
                                        style={{ width: 100 }}
                                    />
                                )}
                                <ul>
                                    {cliente.logradouros.map((log, i) => (
                                        <li key={i}>
                                            {log.rua}, {log.numero} - {log.bairro}, {log.cidade} - {log.estado}
                                        </li>
                                    ))}
                                </ul>

                                <div className='d-flex justify-content-center gap-4'>
                                    <Button variant="success" size="sm" onClick={() => editarCliente(cliente.id)} className="me-2">
                                        Editar
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => removerCliente(cliente.id)} className="me-2">
                                        Remover
                                    </Button>
                                </div>


                            </div>
                        </Collapse>
                    </Card.Body>
                </Card>
            ))}

            <div className="d-flex justify-content-end mb-3">
                <Button
                    variant="success"
                    onClick={() => navigate('/adicionar')}
                    style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0}}
                >
                    +
                </Button>
            </div>


        </div>
    );
}
