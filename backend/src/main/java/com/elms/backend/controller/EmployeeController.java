package com.elms.backend.controller;

import com.elms.backend.dto.request.ApplyLeaveRequest;
import com.elms.backend.dto.request.LoginRequest;
import com.elms.backend.dto.request.RegisterRequest;
import com.elms.backend.dto.request.UpdateLeaveStatusRequest;
import com.elms.backend.dto.response.ApiResponse;
import com.elms.backend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;


    @PostMapping("/register")
    public ApiResponse registerEmployee(
            @Valid @RequestBody RegisterRequest request
    ) {

        return employeeService.registerEmployee(request);
    }

    @PostMapping("/login")
    public ApiResponse loginEmployee(
            @Valid @RequestBody LoginRequest request
    ) {

        return employeeService.loginEmployee(request);
    }

    @GetMapping("/profile")
    public String profile() {

        return "Protected API Accessed Successfully";
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @PostMapping("/apply-leave")
    public ApiResponse applyLeave(
            @RequestBody ApplyLeaveRequest request,
            Authentication authentication
    ) {

        return employeeService.applyLeave(
                request,
                authentication.getName()
        );
    }

    @PreAuthorize("hasAuthority('EMPLOYEE')")
    @GetMapping("/my-leaves")
    public ApiResponse getMyLeaves(

            Authentication authentication,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "createdAt")
            String sortBy
    ) {

        return employeeService.getMyLeaves(
                authentication.getName(),
                page,
                size,
                sortBy
        );
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping("/pending-leaves")
    public ApiResponse getPendingLeaves(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "createdAt")
            String sortBy
    ) {

        return employeeService.getPendingLeaves(
                page,
                size,
                sortBy
        );
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/dashboard")
    public ApiResponse getDashboardData() {
        return employeeService.getDashboardData();
    }
    
    @PreAuthorize("hasAuthority('MANAGER')")
    @PutMapping("/update-leave-status/{leaveId}")
    public ApiResponse updateLeaveStatus(
            @PathVariable Long leaveId,
            @RequestBody UpdateLeaveStatusRequest request
    ) {

        return employeeService.updateLeaveStatus(
                leaveId,
                request
        );
    }
}