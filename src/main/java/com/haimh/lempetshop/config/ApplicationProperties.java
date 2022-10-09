package com.haimh.lempetshop.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Lem Pet Shop Manager.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {}
