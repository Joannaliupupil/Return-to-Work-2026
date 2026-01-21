package com.example;

public class SimpleTest {
    public static void main(String[] args) {
        AlgorithmPractice solution = new AlgorithmPractice();
        
        System.out.println("=== 完整测试套件 ===");
        System.out.println("每个测试后面应该是期望的结果");
        
        // 测试用例表
        TestCase[] testCases = {
            new TestCase("空字符串", "", true),
            new TestCase("简单括号", "()", true),
            new TestCase("方括号", "[]", true),
            new TestCase("花括号", "{}", true),
            new TestCase("混合括号", "()[]{}", true),
            new TestCase("嵌套括号", "{[()]}", true),
            new TestCase("复杂嵌套", "{{[]}}()", true),
            new TestCase("不匹配类型", "(]", false),
            new TestCase("顺序错误", "([)]", false),
            new TestCase("只有左括号", "(((", false),
            new TestCase("只有右括号", ")))", false),
            new TestCase("单左括号", "(", false),
            new TestCase("单右括号", ")", false),
            new TestCase("null值", null, false),
            new TestCase("奇数长度", "({)", false),
            new TestCase("有效长串", "{[()()[]{}]}", true),
            new TestCase("无效长串", "{[}]", false),
        };
        
        int passed = 0;
        int total = testCases.length;
        
        for (TestCase tc : testCases) {
            boolean result = solution.isValid(tc.input);
            String status = (result == tc.expected) ? "✅" : "❌";
            
            if (result == tc.expected) {
                System.out.println(status + " " + tc.name + ": 通过");
                passed++;
            } else {
                System.out.println(status + " " + tc.name + ": 失败");
                System.out.println("   输入: " + formatInput(tc.input));
                System.out.println("   期望: " + tc.expected);
                System.out.println("   实际: " + result);
            }
        }
        
        System.out.println("\n=== 测试结果 ===");
        System.out.println("通过: " + passed + "/" + total);
        System.out.println("成功率: " + String.format("%.1f%%", (passed * 100.0 / total)));
    }
    
    private static String formatInput(String input) {
        return input == null ? "null" : "\"" + input + "\"";
    }
    
    static class TestCase {
        String name;
        String input;
        boolean expected;
        
        TestCase(String name, String input, boolean expected) {
            this.name = name;
            this.input = input;
            this.expected = expected;
        }
    }
}