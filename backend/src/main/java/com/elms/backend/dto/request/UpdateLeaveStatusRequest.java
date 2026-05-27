package com.elms.backend.dto.request;

import com.elms.backend.enums.LeaveStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateLeaveStatusRequest {

    private LeaveStatus status;

    private String managerComment;
}