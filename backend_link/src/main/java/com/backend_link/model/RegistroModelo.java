package com.backend_link.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroModelo {

    @Id
    private String id;

    @NotNull
    @NotBlank
    private String area;

    @NotNull
    @NotBlank
    private String titulo;

    private String lenguaje;
    private Boolean capa;

    @NotNull
    @NotBlank
    private String link;

    @NotNull
    @NotBlank
    private String descripcion;
    private String ejemplo;
    private LocalDate date = LocalDate.now();
    private LocalDate dateEditado = LocalDate.now();
    private Boolean borradoLogico = false;

}
