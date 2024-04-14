package service;

import model.Lake;

import java.util.ArrayList;
import java.util.Random;

/**
 * Generates 10 randomly selected lakes, time of days, seasons, competition durations and competition types with few
 * exceptions. Every lake needs to be unique and one lake is selected as a night, because the night is not available at all
 * lakes. Three mornings, mid-days, evenings and one night. Maximum of four 30min competitions and max 3 largest fish
 * competition type.
 */
public class GenerateRandomLakes {

    private ArrayList<String> names = new ArrayList<>();
    private ArrayList<String> times = new ArrayList<>();
    private ArrayList<String> seasons = new ArrayList<>();
    private ArrayList<String> lengths = new ArrayList<>();
    private ArrayList<String> compTypes = new ArrayList<>();

    private CreateLakeList lakes = new CreateLakeList(false);
    private CreateLakeList nlakes = new CreateLakeList(true);

    public GenerateRandomLakes() throws Exception {

    }

    /**
     * Generates 10 random lakes, times, seasons, competition time and competition type by calling various methods.
     * Generated variables are added in the attributes and then are added to Lake array.
     * @return Array of 10 different lakes
     * @throws Exception if something goes wrong.
     */
    public Lake[] generate() throws Exception {
        Lake[] result = new Lake[10];
        setRandomNames(); // adds lakes to 'names' arraylist
        initTimes(); // initializes 'times' arrayList
        setRandomSeasons(); // adds 10 random seasons to 'seasons' arrayList
        setRandomLengths(); // adds 10 random competition durations to 'lengths' arrayList
        setRandomCompTypes(); //adds 10 random competition types to 'compTypes' arrayList

        // ArrayLists are added to Lake array.
        for (int i = 0; i < 10; i++) {
            Lake lake = new Lake(names.get(i), times.get(i), seasons.get(i), lengths.get(i), compTypes.get(i));
            result[i] = lake;
        }
        return result;
    }

    /**
     * Randomly picks 10 different unique lakes and adds them to the arraylist. Nighttime lake is added separately,
     * because night is not available on all lakes.
     */
    private void setRandomNames() {
        Random rand = new Random();

        // Adds 9 random unique lakes (daytime)
        for (int i = 0; i < 9; i++) {
            int randomIndex = rand.nextInt(lakes.getLakes().size());
            String lake = lakes.getLakes().get(randomIndex);

            if (names.contains(lake)) {
                i--;
                continue;
            }
            names.add(lake);
        }

        // adds one unique nighttime lake
        while (true) {
            int randomIndex = rand.nextInt(nlakes.getNightLakes().size());
            String nlake = nlakes.getNightLakes().get(randomIndex);

            if (!names.contains(nlake)) {
                names.add(nlake);
                break;
            }
        }
    }


    private void initTimes() {
        times.add("aamu");
        times.add("aamu");
        times.add("aamu");
        times.add("keskipäivä");
        times.add("keskipäivä");
        times.add("keskipäivä");
        times.add("ilta");
        times.add("ilta");
        times.add("ilta");
        times.add("yö");
    }

    /**
     * Adds 3 mornings, mid-days, evenings and one night to the seasons arraylist
     */
    private void setRandomSeasons() {
        Random rand = new Random();
        String[] temp = new String[] {"syystalvi", "keskitalvi", "kevättalvi"};

        for (int i = 0; i < 10; i++) {
            int randomIndex = rand.nextInt(temp.length - 1); // -1 to prevent index out of bounds
            String season = temp[randomIndex];
            seasons.add(season);
        }
    }

    /**
     * Adds 10 either 15min or 30min times to the 'lengths' arraylist. Can add 30min up to 4 times.
     */
    private void setRandomLengths() {
        Random rand = new Random();
        ArrayList<String> temp = new ArrayList<>();
        temp.add("15min");
        temp.add("30min");

        int halfHour = 0;
        for (int i = 0; i < 10; i++) {
            int randomIndex = rand.nextInt(temp.size());
            String length = temp.get(randomIndex);

            // If 30min is randomly selected and there are already four 30min lengths, 15min is added instead.
            if (length.equals("30min") && halfHour >= 4) {
                length = "15min";
            }

            lengths.add(length);

            // Increases 'halfHour' variable by one each time if 30min is added to the arraylist.
            if (length.equals("30min")) {
                halfHour++;
            }
        }
    }

    /**
     * Adds 10 random competition types to the 'compTypes' arraylist. Maximum of 3 largest fish competition types
     * can be added.
     */
    private void setRandomCompTypes() {
        Random rand = new Random();
        ArrayList<String> temp = new ArrayList<>();
        temp.add("kaikki lajit");
        temp.add("suurin kala");
        temp.add("kolme suurinta");
        temp.add("viisi suurinta");

        int suurinKala = 0;
        for (int i = 0; i < 10; i++) {
            int randomIndex = rand.nextInt(temp.size());
            String compType = temp.get(randomIndex);

            // Checks if there are three 'suurinKala' competition types already rolled. Replaces 'compType' with 'kaikki lajit' if true.
            if ((compType.equals("suurin kala") || compType.equals("kolme suurinta") || compType.equals("viisi suurinta")) && suurinKala >= 3) {
                compType = "kaikki lajit";
            }

            compTypes.add(compType);

            // Increases 'suurinKala' variable by one each time if any of the suurin kala type is added to the arraylist.
            if (compType.equals("suurin kala") || compType.equals("kolme suurinta") || compType.equals("viisi suurinta")) {
                suurinKala++;
            }
        }
    }


    public static void main(String[] args) throws Exception {
        try {
            GenerateRandomLakes generator = new GenerateRandomLakes();
            Lake[] lakes1 = generator.generate();

            for (int i = 0; i < lakes1.length; i++) {
                Lake lake = lakes1[i];
                System.out.println("Lake " + (i + 1) + ":");
                System.out.println("Name: " + lake.getName());
                System.out.println("Time: " + lake.getTime());
                System.out.println("Season: " + lake.getSeason());
                System.out.println("Length: " + lake.getLength());
                System.out.println("Competition Type: " + lake.getCompType());
                System.out.println();
            }

        } catch (Exception e) {
            throw new Exception("something went wrong " + e.getMessage());
        }
    }
}
