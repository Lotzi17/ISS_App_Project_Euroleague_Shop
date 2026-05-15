package com.iss.euroleagueshop;

import com.iss.euroleagueshop.entity.Product;
import com.iss.euroleagueshop.entity.Role;
import com.iss.euroleagueshop.entity.User;
import com.iss.euroleagueshop.repository.ProductRepository;
import com.iss.euroleagueshop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EuroleagueShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(EuroleagueShopApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(UserRepository userRepo,
                               ProductRepository productRepo,
                               PasswordEncoder encoder) {
        return args -> {
            // Admin user
            if (userRepo.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("admin123"));
                admin.setEmail("admin@euroleague.shop");
                admin.setRole(Role.ADMIN);
                userRepo.save(admin);
            }

            // Regular user
            if (userRepo.findByUsername("user").isEmpty()) {
                User user = new User();
                user.setUsername("user");
                user.setPassword(encoder.encode("user123"));
                user.setEmail("user@euroleague.shop");
                user.setRole(Role.USER);
                userRepo.save(user);
            }

            // Seed products with real Stitch images
            if (productRepo.count() == 0) {
                Object[][] products = {
                    // name, desc, price, stock, category, team, imageUrl
                    {
                        "Wilson EuroLeague Game Ball",
                        "Mingea oficială EuroLeague Wilson, utilizată în meciurile profesioniste. Piele premium, grip superior.",
                        129.99, 15, "Equipment", "EuroLeague",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuByCi8kEVK7Y2GQIhwV-Qz9C44E5yxHgWmel-uGeUuJBUj6GXz3BAQHknz2R5wUhgpVgpZO4P4pQsrJonD9o7CaqNNHIdLhikweSjy79_cDYShrtJe1wrjCemapAQASDA1tpmgHM1EkdUoY09P0MbhrSP2o6o_otf18BLZ3gPBcE4Msts53Dwdlcj4O9TiOpeer6R-usb1KWHrRlvbHzdgs-bw_WSGzIfHltYX0q9dCn__mTn-ssf-_uQSL7Zww-aUNx8JjtkExCWGH"
                    },
                    {
                        "Court Master V2 — Black/Orange",
                        "Pantofi de baschet de înaltă performanță. Amortizare maximă, stabilitate laterală și talpă cu grip pentru orice suprafață.",
                        185.00, 40, "Footwear", "EuroLeague",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuAoZzlAt25iMRfW9GuMXqkPVMTEMIT_ryPI-cqXvscp4aDLhrTBYNgQMQ6Sai_piyXDK8fRShDpFSR4zEBcYtNfWLc7KQtRGVa7hRzDVsmXQBw0U2owxjsqUAjccGWO5y3gdc5xWVvt-h5dIdHXaMloMALqTqYmW1HCB42pr6RIWxmNj_rUV9LZMxesLK8qCuobJItcg2tRed9IVwJAXVKuafos74lCxPPMdCzvPc1zAa0KKpBvAwdm30yGzybLtrP7--iyfmkzI-PT"
                    },
                    {
                        "Real Madrid Home Jersey 2024/25",
                        "Tricoul oficial al echipei Real Madrid pentru sezonul EuroLeague 2024/25. Material Dri-FIT, croială atletică.",
                        95.00, 50, "Jerseys", "Real Madrid",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdYWDVTLwKgrvSeI_AsbgWtudU1NOY2aDNLyDcS5RAZpWc-bI7p5JS0zq5b7fG6xWEAA_7aDoK_izmgQVZGWPVFoCDNid9flNcU8U_-qQociUgGZKCuyIWmHTB1Ztu4zRWPszZF_nzgGpxwqU5xdRPTkFNVdm8ifBTV15djn7nkXzB9CVpdu4OCefU8ysiS4vhENOgHhjj6RmxmxF-RN928e048fTuLOAMnlI-Y0qRXBaGp7-GcR_H8wZBrFT3yOIL2shOpvzaVxqs"
                    },
                    {
                        "Flight Tech Low — Speed Series",
                        "Pantof low-cut pentru jucătorii care prioritizează viteza și agilitatea. Tehnologie React Foam pentru răspuns instant.",
                        160.00, 25, "Footwear", "Barcelona",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBrZJXTn4gqTosIjGFUY5rodW2FW6WYfelXEJpBcXrtoV85vwip0oWBlxp65tT9u-_-uHrJey_VyfhZZzAgBlZAUqbhT_je0bvFomVH66fM5860_CuO36ADYtTEuLEsTUf0uOve3uB8s022HIxjXesJh14p_j-r_PVIGZtxgR-bvGj0KFG6TZy5Yp7JuOtYW3BJnUJVJnFY921l2s9hvu4m7FdgGBtrZIIXfcwgQ8TqEIOcPsqZU9A0j1Bdywa6yQQHIqvw550gAbt5"
                    },
                    {
                        "Pro-Mesh Shorts — Black/Orange",
                        "Pantaloni scurți de antrenament din material mesh respirabil cu detalii portocalii. Talie elastică, buzunare laterale.",
                        45.00, 80, "Clothing", "Anadolu Efes",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBro3tawMVJHFRGydGgcnNvb5-uPJRAMlpcuJhr6vjANGJHvKacAW82J2UaGTyhVydmrK8ZtcCSCpsexRvO0I20dQiU5Vm6eAzZSt9h_5CKNXkwdTSUd35fE6RXNp3LpUx8xD_2bChWhpwKR3sMFW4Yjygt5wryrFTl1FS4fsZNPGFVCL0HCmasCpGxKmyUzoME923GsyuW3367Vy2L18oVCeLNe6yNgExFDGSBDyxqgxRxj-pBHy0zrhNQvx6fY7hXm-4ksO11Bpv5"
                    },
                    {
                        "Blacktop Chain Net",
                        "Plasă de coș din lanț metalic negru mat — pentru terenurile outdoor cu stil. Compatibilă cu orice inel standard.",
                        30.00, 60, "Equipment", "EuroLeague",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuB2YW_ETynUpcx7J4rMaASLVb4FXueXz-UDdYFfzF7cpd1n50CrmI-BGdk4c9iRNyFM2xN3Md-nAXY0voyoJGNvNswxMWjukjeuEujukbNgQvEXn-S9p_fRjLqsxZDFpKdpf8DG-jWfaY3k-fnXlfGN6OE9wo-a2u_QjoeF6XxjoiJje654fCB4_tRr0mITq2W4r4m0wT-aFZTFPT34yMzb60dqDK_aebW7BeUIEp64ECuCKQlvFPyMaqKBuYcxg6qQUNiMxRBIFMnk"
                    },
                    {
                        "Fenerbahce Beko Away Jersey",
                        "Tricoul away oficial al echipei Fenerbahce Beko. Ediție limitată sezon 2024/25, material tehnic anti-transpirație.",
                        89.99, 30, "Jerseys", "Fenerbahce Beko",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCFnpOmEPb-yOMPGMi-HM3aS_ipva2xU381_AxtX2QR3MEc8DL_CIeatOEi25HFPbdF1Xkuxxy65fs3RFGNrmH_rnER-FzA5-h_WdBCdBCeI5Rr-pEqn8RQ47em96GVAAhnKdugf86KsfenbTVRHU5HqcePM4EfVICDDHG1YgRn07KP0nQU7FFdwNUQV8BXR8MYvyI7-sXShlw9_DqEjCOjtfWgBw2PAujOnz_nGxVn4xZuS-g7qjKE3MeFoFXh0lylLeCxbuh2doaM"
                    },
                    {
                        "CSKA Moscow Hoodie Elite",
                        "Hanorac oficial CSKA Moscow din colecția Elite Series. Fleece gros, broderie cu logo echipei.",
                        69.99, 20, "Clothing", "CSKA Moscow",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDFz6vv3vwe4MRimeQfwrLDbSvOEOoyF2VejisoA1qwS3OrZLvbcfEVJ5QV-Cm215xTW3b6gvpN9P9HzYbQcTeGQKkUqAJSXCyTcQ25w0SIzaucZ6UbuI9ha-MMpYUzyWdrgJi8kFUtDMDV-xuxfMRfjKlYqmZC6Zh7hfhP5dpH5F9LF_aDbaDa_pFS6Mw-wHVV0FVnAQ-OifGVhCUYczoiTfIxhl_CJm1PHho46d2ovRMqOLhgTJK1wZ4Ge8RKh6rDVDvk1p_Mp7yf"
                    },
                };

                for (Object[] p : products) {
                    Product product = new Product();
                    product.setName((String) p[0]);
                    product.setDescription((String) p[1]);
                    product.setPrice((Double) p[2]);
                    product.setStock((Integer) p[3]);
                    product.setCategory((String) p[4]);
                    product.setTeam((String) p[5]);
                    product.setImageUrl((String) p[6]);
                    productRepo.save(product);
                }
            }
        };
    }
}
