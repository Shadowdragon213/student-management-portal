import java.io.*;
import java.util.ArrayList;

public class FileHandler {
    private static final String FILE_NAME = "students.txt";

    public static void saveToFile(ArrayList<Student> students) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (Student s : students) {
                writer.write(s.toString());
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving file");
        }
    }

    public static ArrayList<Student> loadFromFile() {
        ArrayList<Student> students = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;
            while ((line = reader.readLine()) != null) {
                students.add(Student.fromString(line));
            }
        } catch (IOException e) {
            System.out.println("No previous data found.");
        }
        return students;
    }
}