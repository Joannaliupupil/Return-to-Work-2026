package com.example;
import java.util.*;

public class AlgorithmPractice {

    public boolean isValid(String s){
        if(s == null || s.length() % 2 != 0)return false;
        Stack<Character> stack = new Stack<>();
        for(char c:s.toCharArray()){
            if(c == '(') stack.push(')');
            else if(c == '[') stack.push(']');
            else if(c == '{') stack.push('}');
            else if(stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        AlgorithmPractice solution = new AlgorithmPractice();
        System.out.println("=== 直接运行测试 ===");
        System.out.println("空字符串: " + solution.isValid(""));
        System.out.println("(): " + solution.isValid("()"));
        System.out.println("[]: " + solution.isValid("[]"));
        System.out.println("{}: " + solution.isValid("{}"));
        System.out.println("(]: " + solution.isValid("(]"));
        System.out.println("null: " + solution.isValid(null));
    }
    
}
