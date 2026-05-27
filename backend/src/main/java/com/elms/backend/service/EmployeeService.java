package com.elms.backend.service;

import com.elms.backend.dto.request.ApplyLeaveRequest;
import com.elms.backend.dto.request.LoginRequest;
import com.elms.backend.dto.request.RegisterRequest;
import com.elms.backend.dto.request.UpdateLeaveStatusRequest;
import com.elms.backend.dto.response.ApiResponse;

public interface EmployeeService {

    ApiResponse registerEmployee(RegisterRequest request);

    ApiResponse loginEmployee(LoginRequest request);

    ApiResponse applyLeave(
            ApplyLeaveRequest request,
            String email
    );

    ApiResponse getMyLeaves(
            String email,
            int page,
            int size,
            String sortBy
    );

    ApiResponse getPendingLeaves(
            int page,
            int size,
            String sortBy
    );

    ApiResponse updateLeaveStatus(
            Long leaveId,
            UpdateLeaveStatusRequest request
    );

    ApiResponse getDashboardData();
}