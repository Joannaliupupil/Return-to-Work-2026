package com.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AlgorithmPracticeTest {
    private final AlgorithmPractice solution = new AlgorithmPractice();

    @Test
    void testEmptyString() {
        assertTrue(solution.isValid(""));
    }

    @Test
    void testSimplePar() {
        assertTrue(solution.isValid("()"));
        assertTrue(solution.isValid("{}"));
        assertTrue(solution.isValid("[]"));
    }

    @Test
    void testMixedValid() {
        assertTrue(solution.isValid("()[]{}"));
        assertTrue(solution.isValid("{[()]}"));
        assertTrue(solution.isValid("{{[]}}()"));
    }
    
    @Test
    void testInvalidCases() {
        assertFalse(solution.isValid("(]"));
        assertFalse(solution.isValid("([)]"));
        assertFalse(solution.isValid("{{}"));
        assertFalse(solution.isValid("]"));
    }
    
    @Test
    void testNullInput() {
        assertFalse(solution.isValid(null));
    }
}