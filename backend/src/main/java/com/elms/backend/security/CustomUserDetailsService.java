package com.elms.backend.security;

import com.elms.backend.entity.Employee;
import com.elms.backend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService
        implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(
            String email
    ) throws UsernameNotFoundException {

        Employee employee = employeeRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Employee not found"
                        )
                );

        return new User(
                employee.getEmail(),
                employee.getPassword(),
                List.of(
                        new SimpleGrantedAuthority(
                                employee.getRole().name()
                        )
                )
        );
    }
}