package com.elms.backend.exception;

import com.elms.backend.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleException(
            Exception ex
    ) {

        ApiResponse response = new ApiResponse(
                false,
                ex.getMessage(),
                null
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(
            MethodArgumentNotValidException.class
    )
    public ResponseEntity<ApiResponse>
    handleValidationException(
            MethodArgumentNotValidException ex
    ) {

        String errorMessage = ex
                .getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        ApiResponse response = new ApiResponse(
                false,
                errorMessage,
                null
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }
}