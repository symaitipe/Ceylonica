package com.ceylonica.product.service;

import com.ceylonica.product.entity.Product;
import com.ceylonica.product.model.ProductDTO;
import com.ceylonica.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    // Define image stored file path....

    private final String IMAGE_UPLOAD_DIRECTORY = "resources/static/images/";

    // Create a product...............

    public ProductDTO addProduct(ProductDTO productDTO) {

        try {
            Product product = convertProductDTOtoProduct(productDTO);

            Product savedProduct = productRepository.save(product);

            return convertProducttoProductDTO(savedProduct);
        } catch (IOException e) {
            throw new RuntimeException("Failed to Add Product");
        }

    }

    // Find product by specific Id...............

    public ProductDTO getByProductId(Integer productId) {
        return productRepository.findById(productId)
                .map(this::convertProducttoProductDTO)
                .orElse(null);
    }

    // Find all products...............

    public ArrayList<ProductDTO> getAllProducts() {
        List<Product> ProductList = productRepository.findAll();
        ArrayList<ProductDTO> ProductDTOList = new ArrayList<>();

        for (Product product : ProductList) {

            ProductDTO productDTO = convertProducttoProductDTO(product);
            ProductDTOList.add(productDTO);

        }
        return ProductDTOList;
    }

    // Update Product.............

    public ProductDTO updateProduct(ProductDTO productDTO) {
        if (productDTO.getProductId() == null) {
            throw new RuntimeException("Product ID is required for update.");
        }

        Optional<Product> productOptional = productRepository.findById(productDTO.getProductId());

        if (productOptional.isPresent()) {
            Product product = productOptional.get();

            product.setProductName(productDTO.getProductName());
            product.setProductPrice(productDTO.getProductPrice());
            product.setProductDescription(productDTO.getProductDescription());
            product.setCategoryId(productDTO.getCategoryId());
            product.setAdditionalInformation(productDTO.getAdditionalInformation());

            // Handle updates for card images
            if (productDTO.getCardImages() != null && !productDTO.getCardImages().isEmpty()) {
                List<String> currentCardImages = product.getCardImageURLs();
                if (currentCardImages == null) {
                    currentCardImages = new ArrayList<>();
                }
                processImages(productDTO.getCardImages(), currentCardImages);
                product.setCardImageURLs(currentCardImages);
            }

            // Handle updates for detail images
            if (productDTO.getDetailImages() != null && !productDTO.getDetailImages().isEmpty()) {
                List<String> currentDetailImages = product.getDetailImageURLs();
                if (currentDetailImages == null) {
                    currentDetailImages = new ArrayList<>();
                }
                processImages(productDTO.getDetailImages(), currentDetailImages);
                product.setDetailImageURLs(currentDetailImages);
            }

            productRepository.save(product);
            return convertProducttoProductDTO(product);
        } else {
            throw new RuntimeException("Product not found with ID: " + productDTO.getProductId());
        }
    }

    // delete product...........

    public String deleteProduct(Integer productId) {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            String productName = product.getProductName();
            productRepository.deleteById(productId);
            return productName + " Deleted Successfully";
        }
        return "Product Not Found";
    }

    // convert product to productDTO's for get from database........

    public ProductDTO convertProducttoProductDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();

        productDTO.setProductId(product.getProductId());
        productDTO.setProductName(product.getProductName());
        productDTO.setProductPrice(product.getProductPrice());
        productDTO.setProductDescription(product.getProductDescription());
        productDTO.setCategoryId(product.getCategoryId());
        productDTO.setCardImageUrls(product.getCardImageURLs());
        productDTO.setDetailImageUrls(product.getDetailImageURLs());
        productDTO.setAdditionalInformation(product.getAdditionalInformation());

        return productDTO;
    }

    // convert productDTO's to product for store in database........

    public Product convertProductDTOtoProduct(ProductDTO productDTO) throws IOException {
        Product product = new Product();

        product.setProductName(productDTO.getProductName());
        product.setProductPrice(productDTO.getProductPrice());
        product.setProductDescription(productDTO.getProductDescription());
        product.setCategoryId(productDTO.getCategoryId());
        product.setAdditionalInformation(productDTO.getAdditionalInformation());

        List<String> cardImageUrls = new ArrayList<>();
        if (productDTO.getCardImages() != null) {
            for (MultipartFile file : productDTO.getCardImages()) {
                if (!file.isEmpty()) {
                    String fileName = saveImage(file);
                    cardImageUrls.add(fileName);
                }
            }
        }
        product.setCardImageURLs(cardImageUrls);

        List<String> detailImageUrls = new ArrayList<>();
        if (productDTO.getDetailImages() != null) {
            for (MultipartFile file : productDTO.getDetailImages()) {
                if (!file.isEmpty()) {
                    String fileName = saveImage(file);
                    detailImageUrls.add(fileName);
                }
            }
        }
        product.setDetailImageURLs(detailImageUrls);

        return product;

    }

    private void processImages(List<MultipartFile> newFiles, List<String> currentUrls) {
        try {
            for (MultipartFile file : newFiles) {
                if (!file.isEmpty()) {
                    String fileName = saveImage(file);
                    currentUrls.add(fileName);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to update product images", e);
        }
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
