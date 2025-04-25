package com.api.cadastrocliente.cadastrocliente.service;

import com.api.cadastrocliente.cadastrocliente.model.Cliente;
import com.api.cadastrocliente.cadastrocliente.model.Logradouro;
import com.api.cadastrocliente.cadastrocliente.repository.ClienteRepository;
import com.api.cadastrocliente.cadastrocliente.repository.LogradouroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private LogradouroRepository logradouroRepository;

    // retorna cliente por ID
    public Cliente findClienteById(Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    // retorna todos os clientes
    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }

    // Verifica se o cliente tem logradour, define cliente em logradouro e salva(cria) e retorna cliente
    public Cliente saveCliente(Cliente cliente) {
        if (cliente.getLogradouros() != null) {
            cliente.getLogradouros().forEach(logradouro -> logradouro.setCliente(cliente));
        }

        return clienteRepository.save(cliente);
    }




    // Valida se os campos são diferente de null, atualiza e retorna cliente
    public Cliente updateCliente(Long id, Cliente clienteAtualizado) {
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Atualiza campos simples
        if (clienteAtualizado.getNome() != null) clienteExistente.setNome(clienteAtualizado.getNome());
        if (clienteAtualizado.getEmail() != null) clienteExistente.setEmail(clienteAtualizado.getEmail());
        if (clienteAtualizado.getLogotipo() != null) clienteExistente.setLogotipo(clienteAtualizado.getLogotipo());

        // Atualiza logradouros
        List<Logradouro> novosLogradouros = clienteAtualizado.getLogradouros();

        // Remove logradouros que não estão mais na nova lista
        clienteExistente.getLogradouros().removeIf(existing ->
                novosLogradouros.stream().noneMatch(novo ->
                        novo.getId() != null && novo.getId().equals(existing.getId()))
        );

        // Adiciona ou atualiza logradouros
        for (Logradouro novo : novosLogradouros) {
            if (novo.getId() == null) {
                // Novo logradouro
                novo.setCliente(clienteExistente);
                clienteExistente.getLogradouros().add(novo);
            } else {
                // Atualiza logradouro existente
                for (Logradouro existente : clienteExistente.getLogradouros()) {
                    if (existente.getId().equals(novo.getId())) {
                        existente.setRua(novo.getRua());
                        existente.setNumero(novo.getNumero());
                        // Adicione mais campos aqui
                        break;
                    }
                }
            }
        }

        return clienteRepository.save(clienteExistente);
    }




    // deleta cliente
    public void deleteCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        clienteRepository.delete(cliente);
    }



    public Cliente addLogradouro(Long idCliente, Logradouro novoLogradouro) {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        novoLogradouro.setCliente(cliente);
        cliente.getLogradouros().add(novoLogradouro);

        return clienteRepository.save(cliente);
    }



    @Transactional
    public void removeLogradouro(Long idCliente, Long idLogradouro) {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Logradouro logradouroRemover = cliente.getLogradouros().stream()
                .filter(l -> l.getId().equals(idLogradouro))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Logradouro não encontrado"));

        cliente.getLogradouros().remove(logradouroRemover);
        logradouroRepository.delete(logradouroRemover);
    }





}
