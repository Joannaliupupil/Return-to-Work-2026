import java.util.*;

public class TestArrayandLinked {
    public static void main(String[] args) {
        // 测试1：ArrayList访问快
        List<Integer> arrayList = new ArrayList<>();
        for (int i = 0; i < 100000; i++) {
            arrayList.add(i);
        }
        
        long start = System.currentTimeMillis();
        int value = arrayList.get(50000);  // 访问中间元素
        long end = System.currentTimeMillis();
        System.out.println("ArrayList访问耗时: " + (end - start) + "ms");
        
        // 测试2：LinkedList插入快
        List<Integer> linkedList = new LinkedList<>();
        for (int i = 0; i < 100000; i++) {
            linkedList.add(i);
        }
        
        start = System.currentTimeMillis();
        linkedList.add(0, 999);  // 在开头插入
        end = System.currentTimeMillis();
        System.out.println("LinkedList开头插入耗时: " + (end - start) + "ms");
    }
}