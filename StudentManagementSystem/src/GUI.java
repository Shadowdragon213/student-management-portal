import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class GUI {
    StudentManager manager = new StudentManager();

    public GUI() {
        manager.students = FileHandler.loadFromFile();

        JFrame frame = new JFrame("Student Management Portal");
        frame.setSize(500, 500);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        JLabel title = new JLabel("Student Management Portal", JLabel.CENTER);
        title.setFont(new Font("Arial", Font.BOLD, 20));
        frame.add(title, BorderLayout.NORTH);

        JPanel inputPanel = new JPanel(new GridLayout(4, 2));
        JTextField idField = new JTextField();
        JTextField nameField = new JTextField();
        JTextField ageField = new JTextField();
        JTextField courseField = new JTextField();

        inputPanel.add(new JLabel("ID:"));
        inputPanel.add(idField);
        inputPanel.add(new JLabel("Name:"));
        inputPanel.add(nameField);
        inputPanel.add(new JLabel("Age:"));
        inputPanel.add(ageField);
        inputPanel.add(new JLabel("Course:"));
        inputPanel.add(courseField);

        frame.add(inputPanel, BorderLayout.WEST);

        JPanel buttonPanel = new JPanel(new GridLayout(5, 1));
        JButton addBtn = new JButton("Add Student");
        JButton viewBtn = new JButton("View Students");
        JButton deleteBtn = new JButton("Delete Student");
        JButton countBtn = new JButton("Count Students");
        JButton clearBtn = new JButton("Clear Fields");

        buttonPanel.add(addBtn);
        buttonPanel.add(viewBtn);
        buttonPanel.add(deleteBtn);
        buttonPanel.add(countBtn);
        buttonPanel.add(clearBtn);

        frame.add(buttonPanel, BorderLayout.CENTER);

        JTextArea output = new JTextArea();
        output.setEditable(false);
        frame.add(new JScrollPane(output), BorderLayout.SOUTH);

        addBtn.addActionListener(e -> {
            int id = Integer.parseInt(idField.getText());
            String name = nameField.getText();
            int age = Integer.parseInt(ageField.getText());
            String course = courseField.getText();

            manager.addStudent(new Student(id, name, age, course));
            output.setText("Student Added Successfully!");
        });

        viewBtn.addActionListener(e -> {
            StringBuilder data = new StringBuilder();
            for (Student s : manager.getAllStudents()) {
                data.append(s).append("\n");
            }
            output.setText(data.toString());
        });

        deleteBtn.addActionListener(e -> {
            int id = Integer.parseInt(idField.getText());
            manager.deleteStudent(id);
            output.setText("Student Deleted!");
        });

        countBtn.addActionListener(e -> {
            output.setText("Total Students: " + manager.getAllStudents().size());
        });

        clearBtn.addActionListener(e -> {
            idField.setText("");
            nameField.setText("");
            ageField.setText("");
            courseField.setText("");
        });

        frame.setVisible(true);
    }
}