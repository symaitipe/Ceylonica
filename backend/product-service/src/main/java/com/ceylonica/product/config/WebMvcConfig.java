package com.ceylonica.product.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Maps requests starting with /product-images/ to the local product-images/
        // directory
        registry.addResourceHandler("/product-images/**")
                .addResourceLocations("file:product-images/");
    }
}
