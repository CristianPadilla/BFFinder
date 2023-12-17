package com.cpadilla.petservice.model;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PetRequest {

    private int id;
    @NotNull(message = "name field is mandatory")

    @Size(min = 2, max = 15, message = "name must have between 2 and 15 characters")
    private String name;
    @Digits(integer = 3, fraction = 1, message = "just 1 decimal allowed")
    private double weight;
    @Min(value = 0, message = "age cannot be negative number")
    @Max(value = 50, message = "maximum allowed age is 50")
    private int age;
    private boolean vaccinated;
    private boolean dangerous;
    @Pattern( regexp = "[sml]", message = "size valid values are s, m, l")
    private String size;
    private boolean sterilized;
    private boolean dewormed;
    @Positive
    private int ownerId;
    @Positive
    private int breedId;
}
