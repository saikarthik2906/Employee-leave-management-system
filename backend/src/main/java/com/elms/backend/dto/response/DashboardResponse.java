package com.elms.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardResponse {

    private Long totalEmployees;

    private Long totalLeaves;

    private Long approvedLeaves;

    private Long rejectedLeaves;

    private Long pendingLeaves;
}