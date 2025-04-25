package com.api.cadastrocliente.cadastrocliente.controller;


import com.api.cadastrocliente.cadastrocliente.model.Cliente;
import com.api.cadastrocliente.cadastrocliente.model.Logradouro;
import com.api.cadastrocliente.cadastrocliente.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    /**
     *
     * @param id -> Identificador do cliente a ser buscado
     * @return Retorna o cliente com status 200
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Cliente getClienteById(@PathVariable Long id) {
        return clienteService.findClienteById(id);
    }



    /**
     * Endpoint para retornar todos os clientes
     * @return retorna com o status 200
     */
    @GetMapping
    public ResponseEntity<List<Cliente>> findAllClientes() {
        List<Cliente> clientes = clienteService.findAllClientes();
        return ResponseEntity.ok(clientes);
    }


    /**
     *
     * @param cliente -> dados do cliente recebidos no corpo da requisição
     * @return Cliente criado com status 201
     */
    @PostMapping
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.saveCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
    }



    /**
     *
     * @param id -> identificador do cliente a ser atualizado
     * @param cliente -> Recebe no corpo da requisição o dado a ser atualizado no banco de dados
     * @return Cliente atualizado com o status 200
     */
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        Cliente atualizado = clienteService.updateCliente(id, cliente);
        return ResponseEntity.ok(atualizado);
    }


    /**
     *
     * @param id -> Identificador do cliente a ser deletado
     * @return Cliente deletado com o status 204 (No content)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }


    /**
     *
     * @param id -> Identificador do cliente a ser adicionado com o novo logradouro
     * @param novoLogradouro -> Recebe no corpo da requisição os dados do novo logradouro
     * @return - Logradouro adicionado com status 200
     */
    @PostMapping("/{id}/logradouros")
    public ResponseEntity<Cliente> addLogradouro(
            @PathVariable Long id,
            @RequestBody Logradouro novoLogradouro
    ) {
        Cliente clienteAtualizado = clienteService.addLogradouro(id, novoLogradouro);
        return ResponseEntity.ok(clienteAtualizado);
    }


    @DeleteMapping("/{idCliente}/logradouros/{idLogradouro}")
    public ResponseEntity<Void> removeLogradouro(
            @PathVariable Long idCliente,
            @PathVariable Long idLogradouro
    ) {
        clienteService.removeLogradouro(idCliente, idLogradouro);
        return ResponseEntity.noContent().build();
    }





}
