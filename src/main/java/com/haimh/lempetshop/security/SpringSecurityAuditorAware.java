package com.haimh.lempetshop.security;

import com.haimh.lempetshop.config.Constants;
import com.haimh.lempetshop.security.utils.SecurityUtils;
import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * Implementation of {@link AuditorAware} based on Spring Security.
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    /**
     * Get current audit user or return SYSTEM role if not found.
     *
     * @return role
     */
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of(SecurityUtils.getCurrentUserLogin().orElse(Constants.SYSTEM));
    }
}
