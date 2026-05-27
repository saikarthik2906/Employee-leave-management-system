package com.elms.backend.repository;

import com.elms.backend.entity.Leave;
import com.elms.backend.enums.LeaveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRepository
        extends JpaRepository<Leave, Long> {

    Page<Leave> findByEmployeeId(
            Long employeeId,
            Pageable pageable
    );

    Page<Leave> findByStatus(
            LeaveStatus status,
            Pageable pageable
    );

    Long countByStatus(LeaveStatus status);
}