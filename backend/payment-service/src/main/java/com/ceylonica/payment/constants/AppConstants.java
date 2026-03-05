package com.ceylonica.payment.constants;


public final class AppConstants {
    private AppConstants() {}

    // Headers forwarded by API Gateway after JWT validation
    public static final String HEADER_USER_ID   = "X-User-Id";
    public static final String HEADER_USER_ROLE = "X-User-Role";

    public static final String ROLE_ADMIN = "ROLE_ADMIN";
}

