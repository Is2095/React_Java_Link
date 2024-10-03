package com.backend_link.controller;

import com.backend_link.ApiResponse;
import com.backend_link.model.RegistroModelo;
import com.backend_link.repository.LinkImportantesRepository;
import com.backend_link.service.LinkImportantesSevice;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LinkImportantesController {

    @Autowired
    private LinkImportantesSevice service;

    @Autowired
    private LinkImportantesRepository linkImportantesRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/buscar")
    public ApiResponse<List<RegistroModelo>> buscarRegistros(@RequestBody String datoBusqueda) throws JsonProcessingException {
        return service.buscarRegistros(datoBusqueda);
    }

    @PostMapping("/registrolink")
    public ApiResponse<RegistroModelo> crearRegistro(@RequestBody @Valid RegistroModelo datosRegistro) {
        return service.crearRegistro(datosRegistro);
    }

    @PatchMapping("/editar")
    public ApiResponse<RegistroModelo> editarRegistro(@RequestBody @Valid Map<String, Object> datosAActualizar) {
        return service.editarRegistro((datosAActualizar));
    }

    @DeleteMapping("/borradoLogico/{id}")
    public ApiResponse<RegistroModelo> borradoLogicoRegistro(@PathVariable ObjectId id) {
      return service.borradoLogicoRegistro(id);
    }

}
