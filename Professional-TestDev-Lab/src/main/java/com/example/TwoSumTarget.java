package com.example;

import java.util.Arrays;

public class TwoSumTarget {

    public int[] twosum(int[] nums,int target){
        int[] newNum = new int[2];
        int len = nums.length;
        for(int i = 0; i< len;i++){
            for(int j = i+1;j< len;j++){
                if(nums[i] + nums[j] == target){
                    return new int[]{i, j};
                }
            }

        }
    return new int[0];

    }
    public static void main(String[] args) {
        TwoSumTarget solution = new TwoSumTarget();

        int[] nums = {2, 7, 8, 15};
        int target = 10;
    System.out.println("Hello World!");  // 看这个能不能打印

        int[] result = solution.twosum(nums,target);

        

        System.out.println("测试两数之和"+ Arrays.toString(result));
        
    }

    
    
}

