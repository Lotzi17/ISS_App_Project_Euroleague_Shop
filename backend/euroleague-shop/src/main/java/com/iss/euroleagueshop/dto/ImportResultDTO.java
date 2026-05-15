package com.iss.euroleagueshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter @AllArgsConstructor
public class ImportResultDTO {
    private int importedCount;
    private int errorCount;
    private List<String> errors;
}
