# Sample code execution for algorithm questions

def bubble_sort_complexity_demo():
    """Demonstrates why Bubble Sort has O(n²) complexity"""
    def bubble_sort(arr):
        n = len(arr)
        comparisons = 0
        
        # Outer loop runs n-1 times
        for i in range(n-1):
            # Inner loop runs n-1-i times
            for j in range(n-1-i):
                comparisons += 1
                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        
        print(f"Total comparisons: {comparisons}")
        return arr

    # Example with 5 elements
    test_array = [64, 34, 25, 12, 22]
    print("Original array:", test_array)
    sorted_array = bubble_sort(test_array.copy())
    print("Sorted array:", sorted_array)
    print(f"For n=5, comparisons = 4+3+2+1 = 10 = n*(n-1)/2")

def binary_search_demo():
    """Demonstrates Binary Search O(log n) complexity"""
    def binary_search(arr, target):
        left = 0
        right = len(arr) - 1
        steps = 0
        
        print("Searching for:", target)
        print("Array:", arr)
        
        while left <= right:
            steps += 1
            mid = (left + right) // 2
            print(f"Step {steps}: Checking position {mid}, value {arr[mid]}")
            
            if arr[mid] == target:
                print(f"Found {target} at position {mid} in {steps} steps")
                return mid
            elif arr[mid] < target:
                left = mid + 1
                print("Target is larger, searching right half")
            else:
                right = mid - 1
                print("Target is smaller, searching left half")
        
        print(f"Target {target} not found after {steps} steps")
        return -1

    # Example: Search in array of 16 elements
    sorted_array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]
    binary_search(sorted_array, 15)
    print("For n=16, maximum steps = log₂(16) = 4 steps")

def space_complexity_demo():
    """Demonstrates space complexity differences"""
    import sys
    
    def bubble_sort_in_place(arr):
        """Space Complexity: O(1) - only uses a few variables"""
        n = len(arr)
        for i in range(n-1):
            for j in range(n-1-i):
                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        return arr

    def merge_sort_extra_space(arr):
        """Space Complexity: O(n) - creates temporary arrays"""
        if len(arr) <= 1:
            return arr
        
        mid = len(arr) // 2
        left = merge_sort_extra_space(arr[:mid])
        right = merge_sort_extra_space(arr[mid:])
        
        # Merge requires additional O(n) space
        merged = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1
        
        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged

    test_array = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", test_array)
    
    print("\n--- Space Complexity Comparison ---")
    print("Bubble Sort: O(1) - sorts in place")
    print("Merge Sort: O(n) - needs temporary arrays")
    print("Quick Sort: O(log n) average - recursion stack")

# Run demonstrations
if __name__ == "__main__":
    print("=== ALGORITHM COMPLEXITY DEMONSTRATIONS ===\n")
    
    print("1. Bubble Sort Complexity:")
    bubble_sort_complexity_demo()
    
    print("\n" + "="*50 + "\n")
    
    print("2. Binary Search Complexity:")
    binary_search_demo()
    
    print("\n" + "="*50 + "\n")
    
    print("3. Space Complexity Analysis:")
    space_complexity_demo()
