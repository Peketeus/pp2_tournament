package model;

public class Lake {

    private final String name;
    private final String time;
    private final String season;
    private final String length;
    private final String compType;

    /**
     * Constructor
     * @param name Lake's name
     * @param time Time of day
     * @param season Time of year
     * @param length Competition length
     * @param compType Type of competition
     */
    public Lake(String name, String time, String season, String length, String compType) {
        this.name = name;
        this.time = time;
        this.season = season;
        this.length = length;
        this.compType = compType;
    }


    public String getName() {
        return name;
    }


    public String getTime() {
        return time;
    }


    public String getSeason() {
        return season;
    }


    public String getLength() {
        return length;
    }


    public String getCompType() {
        return compType;
    }
}
