package controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import service.GenerateRandomLakes;
import model.Lake;


@RestController
@RequestMapping("/api/pilkki")
@CrossOrigin(origins = "http://localhost:3000")
public class PilkkiController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PilkkiController.class);

    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }


    @GetMapping("/viewLakes")
    public Lake[] viewLakes() throws Exception {
        LOGGER.info("Received request to viewLakes.");

        GenerateRandomLakes randomLakes = new GenerateRandomLakes();
        return randomLakes.generate();
    }
}