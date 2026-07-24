package com.example.student.service;

import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student addStudent(Student student) {
        return repository.save(student);
    }

    public Student updateStudent(Long id, Student student) {
        Student existing = repository.findById(id).orElseThrow();

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setCourse(student.getCourse());

        return repository.save(existing);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
}