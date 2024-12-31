package service;

import model.Lake;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Generates 10 randomly selected lakes, time of days, seasons, competition durations and competition types with few
 * exceptions. Every lake needs to be unique and one lake is selected as a night, because the night is not available at all
 * lakes. 9 randomly selected day times and one night. Maximum of 'halfHourCap' 30min competitions and maximum of 'suurinKalaCap' largest fish
 * competition type.
 */
public class GenerateRandomLakes {

    private int suurinkalaCap = 0;
    private int halfhourCap = 0;

    private static final List<String> SUURIN_KALA_TYPES = List.of("suurin kala", "kolme suurinta", "viisi suurinta");
    private static final List<String> TIMES = List.of("aamu", "keskipäivä", "ilta");
    private static final String[] SEASONS = {"syystalvi", "keskitalvi", "kevättalvi"};

    private final Random rand = new Random();

    private ArrayList<String> names = new ArrayList<>();
    private ArrayList<String> times = new ArrayList<>();
    private ArrayList<String> seasons = new ArrayList<>();
    private ArrayList<String> lengths = new ArrayList<>();
    private ArrayList<String> compTypes = new ArrayList<>();

    private CreateLakeList lakes = new CreateLakeList(false);
    private CreateLakeList nlakes = new CreateLakeList(true);

    public GenerateRandomLakes(int suurinkalaCap, int halfhourCap) throws Exception {
        setSuurinkalaCap(suurinkalaCap);
        setHalfhourCap(halfhourCap);
    }

    public void setSuurinkalaCap(int cap) {
        this.suurinkalaCap = cap;
    }


    public void setHalfhourCap(int cap) {
        this.halfhourCap = cap;
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


    /**
     * Randomly selects 9 different times of day + one night
     */
    private void initTimes() {
        for (int i = 0; i < 9; i++) {
            times.add(TIMES.get(rand.nextInt(TIMES.size())));
        }
        times.add("yö");
    }


    /**
     * Randomly selects seasons. Syystalvi, keskitalvi or kevättalvi.
     */
    private void setRandomSeasons() {
        for (int i = 0; i < 10; i++) {
            seasons.add(SEASONS[rand.nextInt(SEASONS.length)]);
        }
    }


    /**
     * Adds 10 either 15min or 30min times to the 'lengths' arraylist. Can add 30min up to 'halfHourCap' times.
     */
    private void setRandomLengths() {
        int halfHour = 0;
        for (int i = 0; i < 10; i++) {
            String length = rand.nextBoolean() ? "30min" : "15min";
            if (length.equals("30min") && halfHour >= halfhourCap) {
                length = "15min";
            }
            lengths.add(length);
            if (length.equals("30min")) {
                halfHour++;
            }
        }
    }


    /**
     * Adds 10 random competition types to the 'compTypes' arraylist. Maximum of 'suurinKalaCap' largest fish competition types
     * can be added.
     */
    private void setRandomCompTypes() {
        ArrayList<String> temp = new ArrayList<>();
        temp.add("kaikki lajit");
        temp.add("ruutupilkki");
        temp.add("suurin kala");

        int suurinKala = 0;
        
        for (int i = 0; i < 10; i++) {
            int randomIndex = rand.nextInt(temp.size());
            String compType = temp.get(randomIndex);

            if (compType.equals("suurin kala")) {
                int randIndex = rand.nextInt(3);
                compType = SUURIN_KALA_TYPES.get(randIndex);
            }

            // Checks if there are 'suurinKalaCap' amount of 'suurinKala' competition types already rolled. Replaces 'compType' with 'kaikki lajit' if true.
            if (SUURIN_KALA_TYPES.contains(compType) && suurinKala >= suurinkalaCap) {
                compType = "kaikki lajit";
            }

            compTypes.add(compType);

            // Increases 'suurinKala' variable by one each time if any of the suurin kala type is added to the arraylist.
            if (SUURIN_KALA_TYPES.contains(compType)) {
                suurinKala++;
            }
        }
    }


    /**
     * Running main tests the class and generates random lakes.
     * @param args not in use
     * @throws Exception if something goes wrong while trying to read a .txt file.
     */
    public static void main(String[] args) throws Exception {
        try {
            GenerateRandomLakes generator = new GenerateRandomLakes(3, 3);
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
