package com.backend_link.service;

import com.backend_link.ApiResponse;
import com.backend_link.model.RegistroModelo;
import com.backend_link.repository.LinkImportantesRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LinkImportantesSevice {
    @Autowired
    LinkImportantesRepository linkImportantesRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public ApiResponse<List<RegistroModelo>> buscarRegistros( String datoBusqueda) throws JsonProcessingException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JavaType type = mapper.getTypeFactory().constructMapType(HashMap.class, String.class, String.class);
            JsonNode root = mapper.readTree(datoBusqueda);

            Map<String, String> datoDinamicoDeBusqueda = mapper.convertValue(root, type);

            Query query = new Query();

            for (Map.Entry<String, String> entry : datoDinamicoDeBusqueda.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();

                query.addCriteria(Criteria.where(key).regex(value, "i").and("borradoLogico").is(false));
            }
            List<RegistroModelo> data = mongoTemplate.find(query, RegistroModelo.class);

            if (data.isEmpty()) {
                return new ApiResponse<>(true, "no se encontraron resultados", data);
            }
            return new ApiResponse<>(false, "búsqueda exitos", data);
        } catch (Exception exception) {
            return new ApiResponse<>(true, "Ocurrió un error: " + exception.getMessage(), null);
        }
    }

    public ApiResponse<RegistroModelo> crearRegistro(RegistroModelo datosRegistro) {
            datosRegistro.setId(null);
        try {
            Query query = new Query(Criteria.where("area").is(datosRegistro.getArea())
                    .and("titulo").is(datosRegistro.getTitulo())
                    .and("link").is(datosRegistro.getLink())
            );
            RegistroModelo registroExistente = mongoTemplate.findOne(query, RegistroModelo.class);

            if (registroExistente != null) {
                return new ApiResponse<>(true, "registro existente", null);
            }
            RegistroModelo registroGuardado = mongoTemplate.save(datosRegistro);
            return new ApiResponse<>(false, "", registroGuardado);
        } catch (Exception exception) {
            return new ApiResponse<>(true, "Ocurrió un error: " + exception.getMessage(), null);
        }
    }

    public ApiResponse<RegistroModelo> editarRegistro(Map<String, Object> datosAActualizar) {
        Object id = datosAActualizar.get("id");
        datosAActualizar.remove("id");

        if (id == null) {
            return new ApiResponse(true, "fallo en el identificador del registro", null);
        }

        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update();
        datosAActualizar.forEach(update::set);
        update.set("dateEditado", Instant.now());

        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true);
        RegistroModelo datoActualizado = mongoTemplate.findAndModify(query, update, options, RegistroModelo.class);
        System.out.println(datoActualizado);
        if (datoActualizado == null) {
            return new ApiResponse<>(false, "error al modificar el registro", null);
        }
        ApiResponse<RegistroModelo> response = new ApiResponse<>(false, "actualización exitosa", datoActualizado);
        return ResponseEntity.ok(response).getBody();
    }

    public ApiResponse<RegistroModelo> borradoLogicoRegistro(ObjectId id) {
        Query query = new Query(Criteria.where("id").is(id).and("borradoLogico").is(false));
        Update update = new Update().set("borradoLogico", true);

        UpdateResult result = mongoTemplate.updateFirst(query, update, RegistroModelo.class);
        System.out.println(update);
        if (result.getModifiedCount() > 0) {
            return new ApiResponse<>(false, "registro borrado", null);
        } else {
            if (result.getMatchedCount() == 0) {
                return new ApiResponse<>(true, "el registro no existe", null);
            } else {
                return new ApiResponse<>(true, "error al eliminar el registro", null);
            }
        }
    }

}
