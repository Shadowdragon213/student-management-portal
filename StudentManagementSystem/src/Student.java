public class Student {
    int id;
    String name;
    int age;
    String course;

    public Student(int id, String name, int age, String course) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.course = course;
    }

    public String toString() {
        return id + "," + name + "," + age + "," + course;
    }

    public static Student fromString(String data) {
        String[] parts = data.split(",");
        return new Student(
                Integer.parseInt(parts[0]),
                parts[1],
                Integer.parseInt(parts[2]),
                parts[3]
        );
    }
}