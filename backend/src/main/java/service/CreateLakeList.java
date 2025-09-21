package service;

import javax.imageio.IIOException;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class CreateLakeList {

    private ArrayList<String> lakes;
    private ArrayList<String> nightLakes;

    /**
     * Constructor
     * 
     * @param night True if night. Otherwise day
     */
    public CreateLakeList(boolean night) throws Exception {
        lakes = new ArrayList<>();
        nightLakes = new ArrayList<>();
        readLakesFromFile(night);
    }

    /**
     * Reads the lake names from .txt files. Night lakes are in their
     * own .txt file.
     * 
     * @param night True if night. Otherwise day
     * @throws Exception If .txt is missing
     */
    public void readLakesFromFile(boolean night) throws Exception {
        String fileName;
        if (night) {
            fileName = "night.txt";
        } else {
            fileName = "lakes.txt";
        }

        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("properties/" + fileName);
        if (inputStream == null) {
            throw new Exception("File not found in resources/properties: " + fileName);
        }

        try (BufferedReader fi = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            ArrayList<String> temp = new ArrayList<>();
            while ((line = fi.readLine()) != null) {
                line = line.trim();
                temp.add(line);
            }
            if (night) {
                nightLakes = temp;
            } else {
                lakes = temp;
            }
        } catch (FileNotFoundException e) {
            throw new Exception("File not found");
        } catch (IIOException e) {
            throw new Exception("Problem with file: " + e.getMessage());
        }
    }

    public ArrayList<String> getLakes() {
        return lakes;
    }

    public ArrayList<String> getNightLakes() {
        return nightLakes;
    }

    public static void main(String[] args) throws Exception {
        CreateLakeList lakeList = new CreateLakeList(true);

        for (String l : lakeList.getNightLakes()) {
            System.out.println(l);
        }
    }
}
