package com.elms.backend.service.impl;

import com.elms.backend.dto.request.ApplyLeaveRequest;
import com.elms.backend.dto.request.LoginRequest;
import com.elms.backend.dto.request.RegisterRequest;
import com.elms.backend.dto.request.UpdateLeaveStatusRequest;
import com.elms.backend.dto.response.ApiResponse;
import com.elms.backend.dto.response.DashboardResponse;
import com.elms.backend.dto.response.LoginResponse;
import com.elms.backend.entity.Employee;
import com.elms.backend.entity.Leave;
import com.elms.backend.enums.LeaveStatus;
import com.elms.backend.repository.EmployeeRepository;
import com.elms.backend.repository.LeaveRepository;
import com.elms.backend.service.EmployeeService;
import com.elms.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final LeaveRepository leaveRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    @Override
    public ApiResponse registerEmployee(RegisterRequest request) {

        if (employeeRepository.existsByEmail(request.getEmail())) {

            return new ApiResponse(
                    false,
                    "Email already exists",
                    null
            );
        }

        Employee employee = Employee.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .casualLeaveBalance(10)
                .sickLeaveBalance(8)
                .earnedLeaveBalance(12)
                .role(request.getRole())
                .build();

        employeeRepository.save(employee);

        return new ApiResponse(
                true,
                "Employee registered successfully",
                employee
        );
    }

    @Override
    public ApiResponse loginEmployee(LoginRequest request) {

        Employee employee = employeeRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (employee == null) {

            return new ApiResponse(
                    false,
                    "Employee not found",
                    null
            );
        }

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                employee.getPassword()
        );

        if (!matches) {

            return new ApiResponse(
                    false,
                    "Invalid password",
                    null
            );
        }

        String token = jwtUtil.generateToken(
                employee.getEmail()
        );

        return new ApiResponse(
                true,
                "Login successful",
                new LoginResponse(
                        token,
                        employee.getRole().name()
                )
        );
    }

    @Override
    public ApiResponse applyLeave(
            ApplyLeaveRequest request,
            String email
    ) {

        Employee employee = employeeRepository
                .findByEmail(email)
                .orElse(null);

        if (employee == null) {

            return new ApiResponse(
                    false,
                    "Employee not found",
                    null
            );
        }

        switch (request.getLeaveType()) {

            case CASUAL -> {

                if (employee.getCasualLeaveBalance() <= 0) {

                    return new ApiResponse(
                            false,
                            "No casual leave balance available",
                            null
                    );
                }
            }

            case SICK -> {

                if (employee.getSickLeaveBalance() <= 0) {

                    return new ApiResponse(
                            false,
                            "No sick leave balance available",
                            null
                    );
                }
            }

            case EARNED -> {

                if (employee.getEarnedLeaveBalance() <= 0) {

                    return new ApiResponse(
                            false,
                            "No earned leave balance available",
                            null
                    );
                }
            }
        }

        Leave leave = Leave.builder()
                .leaveType(request.getLeaveType())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .reason(request.getReason())
                .status(LeaveStatus.PENDING)
                .employee(employee)
                .build();

        leaveRepository.save(leave);

        return new ApiResponse(
                true,
                "Leave applied successfully",
                leave
        );
    }

    @Override
    public ApiResponse getMyLeaves(
            String email,
            int page,
            int size,
            String sortBy
    ) {

        Employee employee = employeeRepository
                .findByEmail(email)
                .orElse(null);

        if (employee == null) {

            return new ApiResponse(
                    false,
                    "Employee not found",
                    null
            );
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).descending()
        );

        return new ApiResponse(
                true,
                "Leave history fetched successfully",
                leaveRepository.findByEmployeeId(
                        employee.getId(),
                        pageable
                )
        );
    }

    @Override
    public ApiResponse getPendingLeaves(
            int page,
            int size,
            String sortBy
    ) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).descending()
        );

        return new ApiResponse(
                true,
                "Pending leaves fetched successfully",
                leaveRepository.findByStatus(
                        LeaveStatus.PENDING,
                        pageable
                )
        );
    }

    @Override
    public ApiResponse updateLeaveStatus(
            Long leaveId,
            UpdateLeaveStatusRequest request
    ) {

        Leave leave = leaveRepository
                .findById(leaveId)
                .orElse(null);

        if (leave == null) {

            return new ApiResponse(
                    false,
                    "Leave not found",
                    null
            );
        }

        leave.setStatus(request.getStatus());

        leave.setManagerComment(
                request.getManagerComment()
        );

        Employee employee = leave.getEmployee();

        if (request.getStatus() == LeaveStatus.APPROVED) {

            switch (leave.getLeaveType()) {

                case CASUAL -> employee.setCasualLeaveBalance(
                        employee.getCasualLeaveBalance() - 1
                );

                case SICK -> employee.setSickLeaveBalance(
                        employee.getSickLeaveBalance() - 1
                );

                case EARNED -> employee.setEarnedLeaveBalance(
                        employee.getEarnedLeaveBalance() - 1
                );
            }

            employeeRepository.save(employee);
        }

        leaveRepository.save(leave);

        return new ApiResponse(
                true,
                "Leave status updated successfully",
                leave
        );
    }

    @Override
    public ApiResponse getDashboardData() {

        DashboardResponse dashboard =
                new DashboardResponse(

                        employeeRepository.count(),

                        leaveRepository.count(),

                        leaveRepository.countByStatus(
                                LeaveStatus.APPROVED
                        ),

                        leaveRepository.countByStatus(
                                LeaveStatus.REJECTED
                        ),

                        leaveRepository.countByStatus(
                                LeaveStatus.PENDING
                        )
                );

        return new ApiResponse(
                true,
                "Dashboard data fetched successfully",
                dashboard
        );
    }
}