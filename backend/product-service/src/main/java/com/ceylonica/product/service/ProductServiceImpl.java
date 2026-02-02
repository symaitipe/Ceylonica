package com.ceylonica.product.service;

import com.ceylonica.product.entity.Product;
import com.ceylonica.product.model.ProductDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {




    // convert product to productDTO's for get from database........

    public ProductDTO convertProducttoProductDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();

        productDTO.setProductName(product.getProductName());
        productDTO.setProductPrice(product.getProductPrice());
        productDTO.setProductDescription(product.getProductDescription());
        productDTO.setCategoryId(product.getCategoryId());
        productDTO.setImageUrls(product.getProductImagesURL());
        productDTO.setAdditionalInformation(product.getAdditionalInformation());

        return productDTO;
    }

    // Define image stored file path....

    private final String IMAGE_UPLOAD_DIRECTORY = "resources/static/images/";

    // convert productDTO's to product for store in database........

    public Product convertProductDTOtoProduct(ProductDTO productDTO) throws IOException {
        Product product = new Product();

        product.setProductName(productDTO.getProductName());
        product.setProductPrice(productDTO.getProductPrice());
        product.setProductDescription(productDTO.getProductDescription());
        product.setCategoryId(productDTO.getCategoryId());
        product.setAdditionalInformation(productDTO.getAdditionalInformation());

        List<String> imageUrls = new ArrayList<>();

        if (productDTO.getProductImages() != null) {
            for (MultipartFile file : productDTO.getProductImages()) {
                if (!file.isEmpty()) {
                    String fileName = saveImage(file);
                    imageUrls.add(fileName);
                }
            }
        }

        product.setProductImagesURL(imageUrls);

        return product;

    }

    private String saveImage(MultipartFile file) throws IOException {

        // Create the directory if it doesn't exist

        Path uploadPath = Paths.get(IMAGE_UPLOAD_DIRECTORY);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate a unique name for the image to avoid overwriting

        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(uniqueFileName);

        // Save the file bytes

        Files.copy(file.getInputStream(), filePath);

        return uniqueFileName;
    }
}
