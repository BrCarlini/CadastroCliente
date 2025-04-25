package com.api.cadastrocliente.cadastrocliente.repository;

import com.api.cadastrocliente.cadastrocliente.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
