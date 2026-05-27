package com.elms.backend.dto.request;

import com.elms.backend.enums.LeaveType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ApplyLeaveRequest {

    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String reason;
}