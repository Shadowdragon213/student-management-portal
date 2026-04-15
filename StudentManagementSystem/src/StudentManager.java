import java.util.ArrayList;

public class StudentManager {
    ArrayList<Student> students = new ArrayList<>();

    public void addStudent(Student s) {
        students.add(s);
    }

    public void viewStudents() {
        for (Student s : students) {
            System.out.println(s);
        }
    }

    public void deleteStudent(int id) {
        students.removeIf(s -> s.id == id);
    }

    public Student searchStudent(int id) {
        for (Student s : students) {
            if (s.id == id) return s;
        }
        return null;
    }

    public ArrayList<Student> getAllStudents() {
        return students;
    }
}