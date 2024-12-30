package com.pp2.pilkkitournament.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import service.GenerateRandomLakes;
import model.Lake;


@RestController
@RequestMapping("/api/pilkki")
@CrossOrigin(origins = "http://localhost:5173")
public class PilkkiController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PilkkiController.class);

    @GetMapping("/")
    @ResponseBody
    public String index() {
        return "Greetings from Spring Boot!";
    }


    @GetMapping("/viewLakes")
    public Lake[] viewLakes(
            @RequestParam int suurinkalaCap,
            @RequestParam int halfhourCap
    ) throws Exception {
        LOGGER.info("Received request to viewLakes with parameters: suurinkalaCap={}, halfhourCap={}", suurinkalaCap, halfhourCap);

        GenerateRandomLakes randomLakes = new GenerateRandomLakes(suurinkalaCap, halfhourCap);
        return randomLakes.generate();
    }
}